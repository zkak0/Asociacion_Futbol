# BAM Master

Proyecto Next.js con backend local estilo PocketBase usando `app/api/pb/[...slug]/route.js` y `data/db.json`.

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

## Subir a GitHub

Si aún no tienes git instalado, instálalo desde https://git-scm.com/. Luego crea el repositorio en GitHub y ejecuta:

```bash
cd path/to/bam-master
git init
git add .
git commit -m "Initial commit: BAM Master app with local PocketBase-style backend"
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git branch -M main
git push -u origin main
```

Si tienes GitHub CLI instalado puedes usar:

```bash
gh repo create <TU_USUARIO>/<TU_REPO> --public --source=. --remote=origin --push
```

## Nota sobre el backend local

El servidor local está basado en rutas de Next.js y usa `data/db.json` como base de datos de desarrollo. Para trabajar desde otra máquina, basta con clonar el repositorio y ejecutar `npm install` + `npm run dev`.
