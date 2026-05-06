import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function readDb() {
  const content = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(content);
}

async function writeDb(data) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  return data;
}

const createResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const getCollectionData = (db, collection) => {
  if (!Object.prototype.hasOwnProperty.call(db, collection)) {
    throw new Error(`Colección desconocida: ${collection}`);
  }
  return db[collection];
};

const findRecord = (collectionData, id) => {
  return collectionData.find((item) => String(item.id) === String(id));
};

export async function GET(request, { params }) {
  try {
    const slug = params.slug || [];
    const db = await readDb();

    if (slug.length === 1 && slug[0] === "bootstrap") {
      return createResponse(db);
    }

    if (slug[0] === "collections" && slug.length >= 3 && slug[2] === "records") {
      const collection = slug[1];
      const collectionData = getCollectionData(db, collection);
      if (slug.length === 4) {
        const record = findRecord(collectionData, slug[3]);
        if (!record) return createResponse({ message: "Registro no encontrado" }, 404);
        return createResponse(record);
      }
      return createResponse(collectionData);
    }

    return createResponse({ message: "Ruta no encontrada" }, 404);
  } catch (error) {
    return createResponse({ message: error.message || "Error interno" }, 500);
  }
}

export async function POST(request, { params }) {
  try {
    const slug = params.slug || [];
    const payload = await request.json();
    const db = await readDb();

    if (slug.length === 2 && slug[0] === "auth" && slug[1] === "login") {
      const user = db.users.find((item) => item.cedula === payload.cedula && item.password === payload.password);
      if (!user) {
        return createResponse({ message: "Cédula o contraseña incorrecta." }, 401);
      }
      const safeUser = { ...user };
      delete safeUser.password;
      return createResponse(safeUser);
    }

    if (slug[0] === "collections" && slug.length === 3 && slug[2] === "records") {
      const collection = slug[1];
      const collectionData = getCollectionData(db, collection);
      const record = { ...payload };
      if (!record.id) {
        record.id = record.cedula || String(Date.now());
      }
      const existing = findRecord(collectionData, record.id);
      if (existing) {
        Object.assign(existing, record);
      } else {
        collectionData.push(record);
      }
      await writeDb(db);
      const safeRecord = { ...record };
      if (collection === "users") delete safeRecord.password;
      return createResponse(safeRecord, existing ? 200 : 201);
    }

    return createResponse({ message: "Ruta no encontrada" }, 404);
  } catch (error) {
    return createResponse({ message: error.message || "Error interno" }, 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    const slug = params.slug || [];
    const payload = await request.json();
    if (slug[0] !== "collections" || slug.length !== 4 || slug[2] !== "records") {
      return createResponse({ message: "Ruta no encontrada" }, 404);
    }

    const db = await readDb();
    const collection = slug[1];
    const collectionData = getCollectionData(db, collection);
    const recordId = slug[3];
    const existing = findRecord(collectionData, recordId);
    if (!existing) {
      return createResponse({ message: "Registro no encontrado" }, 404);
    }
    Object.assign(existing, payload);
    await writeDb(db);
    const safeRecord = { ...existing };
    if (collection === "users") delete safeRecord.password;
    return createResponse(safeRecord);
  } catch (error) {
    return createResponse({ message: error.message || "Error interno" }, 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const slug = params.slug || [];
    if (slug[0] !== "collections" || slug.length !== 4 || slug[2] !== "records") {
      return createResponse({ message: "Ruta no encontrada" }, 404);
    }
    const db = await readDb();
    const collection = slug[1];
    const collectionData = getCollectionData(db, collection);
    const recordId = slug[3];
    const index = collectionData.findIndex((item) => String(item.id) === String(recordId));
    if (index === -1) {
      return createResponse({ message: "Registro no encontrado" }, 404);
    }
    collectionData.splice(index, 1);
    await writeDb(db);
    return createResponse({ message: "Eliminado" }, 200);
  } catch (error) {
    return createResponse({ message: error.message || "Error interno" }, 500);
  }
}
