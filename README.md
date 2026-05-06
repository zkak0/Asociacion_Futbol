# BAM Master

Proyecto Next.js + Tailwind CSS con un backend local estilo PocketBase.

## Qué hay en este proyecto

- `app/page.js`: UI principal del dashboard y gestión de secciones.
- `app/api/pb/[...slug]/route.js`: backend local que expone rutas REST y trabaja sobre un archivo JSON.
- `data/db.json`: archivo de datos local que actúa como la base de datos de desarrollo.
- `app/globals.css`, `app/layout.js`, `next.config.js`: configuración y estilos de la app.

## Configuración local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar en desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   npm start
   ```

## Backend local estilo PocketBase

### Cómo funciona

- El backend es una API dentro de Next.js en `app/api/pb/[...slug]/route.js`.
- Usa `data/db.json` como base de datos local.
- Lee y escribe este archivo cuando se realizan operaciones `GET`, `POST`, `PATCH` y `DELETE`.

### Rutas disponibles

- `GET /api/pb/collections/<collection>/records`: devuelve todos los registros de la colección.
- `GET /api/pb/collections/<collection>/records/<id>`: devuelve un registro por ID.
- `POST /api/pb/collections/<collection>/records`: crea o actualiza un registro.
- `PATCH /api/pb/collections/<collection>/records/<id>`: actualiza un registro existente.
- `DELETE /api/pb/collections/<collection>/records/<id>`: elimina un registro.
- `POST /api/pb/auth/login`: autentica un usuario por `cedula` y `password`.

### Colecciones existentes

El archivo `data/db.json` contiene colecciones como:

- `clubs`
- `players`
- `matches`
- `users`
- `suspensions`
- `liguillaMatches`
- `liguillaGroups`

## ¿Dónde se guardan los datos?

- Cuando abras la aplicación (`npm run dev`), el frontend usa el backend local de Next.js.
- Todas las operaciones que modifican datos escriben en `data/db.json`.
- Si agregas un club, jugador o partido, la información queda guardada en ese archivo.

### ¿Qué pasa si abro la app?

1. Arrancas la app con `npm run dev`.
2. El servidor de Next.js ejecuta `app/api/pb/[...slug]/route.js`.
3. El backend lee `data/db.json` cada vez que solicita datos.
4. Si guardas o editas algo, se escribe de nuevo en `data/db.json`.
5. El siguiente arranque vuelve a leer `data/db.json` con los datos actualizados.

## Importante

- `data/db.json` no está ignorado por git, así que sus datos pueden comitearse si quieres guardarlos en el repo.
- El backend local es solo para desarrollo. No es una base de datos de producción.
- Si clonas este repositorio en otra máquina, debes ejecutar `npm install` y `npm run dev`; el contenido de `data/db.json` también se clonará si está en el repositorio.

## Subir a GitHub

Ya se ha configurado el repositorio remoto y el proyecto se ha subido a:

`https://github.com/zkak0/Asociacion_Futbol`

Si necesitas volver a empujar después de hacer cambios:

```bash
git add .
git commit -m "Describe tus cambios"
git push
```

## Notas finales

- Para que tus datos sigan funcionando cuando trabajes desde casa, conserva `data/db.json` en el repositorio o haz una copia de seguridad local.
- Si quieres usar otro archivo de datos en una copia nueva, puedes reemplazar `data/db.json` y reiniciar la app.
