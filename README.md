# Vehicle Registration Frontend

A standalone Angular frontend application for registering and viewing vehicles. It communicates with a backend REST API to load vehicle makes/models and save vehicle records.

This repository is self-contained and does not require a parent project to install, build, or run.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher (bundled with Node.js)
- Angular CLI (installed locally via `npm install` — no global install required)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

---

## Running the Application (Development)

Starts the dev server at `http://localhost:4200`. The app will automatically reload on file changes.

```bash
npm start
```

Or explicitly with the Angular CLI:

```bash
npx ng serve
```

To serve on a specific port:

```bash
npx ng serve --port 4201
```

### Stopping the Application

To stop the development server running in your current terminal, press `Ctrl + C` (and `Y` then Enter on Windows if prompted).

If the server was started in another window and port `4200` is still in use, find and stop that process:

```powershell
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

> **Note:** Development uses Angular's dev proxy (`proxy.conf.json`) to forward API calls to `http://localhost:8080` and avoid browser CORS issues.
> Keep the backend running on port `8080` while using `npm start`.

---

## Building the Application

### Development build

```bash
npm run build:dev
```

### Production build

```bash
npm run build
```

Optional explicit production command:

```bash
npm run build:prod
```

The production output is generated at `dist/vehicle-registration-frontend`. The production build uses `src/environments/environment.prod.ts` (API base URL: `http://localhost:8081`).

> On some Windows/npm setups, forwarding args to scripts (for example `npm run build -- --configuration development`) can be parsed incorrectly by Angular CLI. Use `npm run build:dev` instead.

---

## Running Tests

```bash
npm test
```

---

## Environment Configuration

| File | Used when |
|------|-----------|
| `src/environments/environment.ts` | Development (`ng serve`, `npm run build:dev`) - uses relative API paths through the dev proxy |
| `src/environments/environment.prod.ts` | Production (`npm run build`, `npm run build:prod`) |

To change the backend API URL for production, edit `apiBaseUrl` in `src/environments/environment.prod.ts`.

For local development proxy targets, edit `proxy.conf.json`.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── vehicle-form/        # Main form & vehicle list component
│   ├── models/
│   │   ├── make.model.ts        # Make interface
│   │   ├── model.model.ts       # Model interface
│   │   └── vehicle.model.ts     # Vehicle interface
│   └── services/
│       └── vehicle.service.ts   # HTTP calls to the backend API
├── environments/
│   ├── environment.ts           # Development environment config
│   └── environment.prod.ts      # Production environment config
├── index.html
├── main.ts                      # Application bootstrap (standalone)
└── styles.css
```

---

## Backend API

The app expects the following REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/catalog/makes` | Get all vehicle makes |
| `GET` | `/catalog/models/{makeId}` | Get models for a given make |
| `GET` | `/vehicle/vehicles` | Get all registered vehicles |
| `POST` | `/vehicle/save` | Save a new vehicle |
