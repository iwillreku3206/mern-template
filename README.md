# MERN Template

A template that uses the MERN stack (MongoDB, Express, React (CRA), Node) with the addition of a basic username/authkey authentication, MUI, Lerna, shared types, Typescript, and a simple MUI template

This is mainly for my own personal username

## Things to change when creating a new project

- `src/packages/backend/Config/fallback.ini`
  Change `DbName`

- `src/packages/backend/Config/Config.tsx`
  Change `mern-template-app` to your app's name

- `src/packages/frontend/src/pages/login/index.tsx`
  Change `MERN Template` to your app name

- `src/packages/frontend/src/pages/setup/index.tsx`
  Change `MERN Template` to your app name

- `src/packages/*/package.json`
  Change occurences of `@mern-template/` to `@your-app-name/`
