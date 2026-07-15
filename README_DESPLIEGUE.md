# Subir tu panel a internet (Vercel) — guía paso a paso

Al terminar tendrás una web tipo `https://panel-funerarias.vercel.app` a la que entras desde el móvil o cualquier ordenador, con **tus datos guardados y sincronizados** entre dispositivos. **Todo es gratis** (plan Hobby de Vercel + base de datos gratuita de Upstash).

> Yo ya he dejado el proyecto montado y probado (carpeta `panel-funerarias-web`). Lo que queda son pasos que requieren tus cuentas, por eso los tienes que hacer tú. Son unos 15 minutos. Si prefieres, puedo guiarte en directo o intentar hacerlo contigo en tu navegador — solo dímelo.

---

## Lo que hará falta (cuentas gratuitas)
- Una cuenta de **GitHub** (para alojar los archivos).
- Una cuenta de **Vercel** (para publicar la web). Puedes crearla entrando con tu cuenta de GitHub, así te ahorras una contraseña.

---

## Paso 1 · Subir los archivos a GitHub
1. Entra en **github.com**, crea cuenta (o inicia sesión).
2. Arriba a la derecha, botón **+ → New repository**.
3. Nombre: `panel-funerarias`. Déjalo en **Private** (privado). Pulsa **Create repository**.
4. En la página nueva, pulsa el enlace **"uploading an existing file"** (o **Add file → Upload files**).
5. Arrastra **el contenido de la carpeta `panel-funerarias-web`** (los archivos `index.html`, `package.json`, `vercel.json`, `.gitignore` y la carpeta `api`). Suéltalos ahí.
6. Abajo, pulsa **Commit changes**.

> Importante: sube el CONTENIDO de la carpeta, no la carpeta dentro de otra carpeta. En la raíz del repositorio deben verse `index.html` y la carpeta `api`.

---

## Paso 2 · Publicar en Vercel
1. Entra en **vercel.com** y pulsa **Sign Up** → **Continue with GitHub** (autoriza el acceso).
2. En el panel de Vercel: **Add New… → Project**.
3. Busca tu repositorio `panel-funerarias` y pulsa **Import**.
4. No cambies nada (Framework Preset: *Other*; sin comando de build). Pulsa **Deploy**.
5. Espera ~30 segundos. Te dará una URL tipo `https://panel-funerarias.vercel.app`. **Ya funciona** — pero de momento guarda los datos solo en cada dispositivo. Sigue al paso 3 para la sincronización.

---

## Paso 3 · Añadir la base de datos (para que los datos se sincronicen)
1. Dentro de tu proyecto en Vercel, pestaña **Storage**.
2. Pulsa **Create Database** o **Browse Marketplace** y elige **Upstash → Redis** (también aparece como "Upstash for Redis").
3. Acepta el plan **Free / Hobby**, ponle un nombre (p. ej. `funerarias-db`) y **conéctala a este proyecto**.
4. Vercel añadirá **solo** las claves de conexión al proyecto (no tienes que copiar nada). Mi código las detecta automáticamente.
5. Ve a **Deployments → (el último) → ⋯ → Redeploy** para que la web coja la base de datos.

Al recargar la web, arriba a la derecha verás **"✓ Sincronizado"**. A partir de ahí, lo que cambies en el móvil aparece en el ordenador y al revés.

---

## Paso 4 (recomendado) · Poner una contraseña
La web contiene tus leads y tu pipeline, así que conviene protegerla.
1. Proyecto en Vercel → **Settings → Environment Variables**.
2. Añade una variable:
   - **Key:** `APP_PASSWORD`
   - **Value:** la contraseña que quieras (p. ej. `mipanel2026`).
3. Guarda y haz **Redeploy** otra vez.
4. La próxima vez que abras la web te pedirá esa contraseña (solo una vez por dispositivo).

---

## Cómo actualizarlo en el futuro
Si más adelante quieres cambiar algo del panel, me lo pides, te doy el `index.html` nuevo y solo tienes que **subirlo a GitHub encima del anterior** (Add file → Upload files → Commit). Vercel lo republica solo en segundos. Tus datos guardados no se pierden.

---

## Resumen de lo que solo puedes hacer tú
1. Crear cuenta de GitHub y de Vercel.
2. Subir los archivos a GitHub (paso 1).
3. Importar y desplegar en Vercel (paso 2).
4. Conectar la base de datos Upstash y redeploy (paso 3).
5. Opcional: poner `APP_PASSWORD` y redeploy (paso 4).

Todo lo demás (el código del panel, la función que guarda los datos, la detección automática de la base de datos y la contraseña) ya está hecho y verificado.
