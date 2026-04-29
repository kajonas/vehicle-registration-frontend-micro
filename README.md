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

> **Note:** Development requests are configured to call `http://localhost:8080` directly via `src/environments/environment.ts`.
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

## Build and Run with Docker Desktop

This project includes a multi-stage `Dockerfile` that builds the Angular app and serves it with Nginx.
The Docker image is configured to run a development build (`npm run build:dev`), so it uses `src/environments/environment.ts` (`apiBaseUrl: http://localhost:8080`).

You can use either direct Docker commands or Docker Compose.

### 1. Build the Docker image

```powershell
docker build -t vehicle-registration-frontend:latest .
```

### 2. Run the container

```powershell
docker run --name vehicle-registration-frontend -d -p 8088:80 vehicle-registration-frontend:latest
```

Open the app at `http://localhost:8088`.

### 3. Verify container is running

```powershell
docker ps --filter "name=vehicle-registration-frontend"
docker logs vehicle-registration-frontend
```

### 4. Stop and remove the container

```powershell
docker stop vehicle-registration-frontend
docker rm vehicle-registration-frontend
```

### Optional: Use Docker Compose (recommended for repeat runs)

The project includes `docker-compose.yml` so you can build and run with one command set.

```powershell
docker compose build
docker compose up -d
```

Open the app at `http://localhost:8088`.

```powershell
docker compose ps
docker compose logs -f frontend
```

Stop services (container remains available to restart quickly):

```powershell
docker compose stop
```

Stop and remove the container/network:

```powershell
docker compose down
```

### Notes about backend API when running in Docker

- The container serves frontend files only; backend API must run separately.
- Docker image API URL is defined in `src/environments/environment.ts`.
- If your backend is not reachable at `http://localhost:8080`, update `apiBaseUrl` in `src/environments/environment.ts`, then rebuild the image.

---

## Running Tests

```bash
npm test
```

---

## Environment Configuration

| File | Used when |
|------|-----------|
| `src/environments/environment.ts` | Development (`ng serve`, `npm run build:dev`) and Docker image build (`Dockerfile`) |
| `src/environments/environment.prod.ts` | Production (`npm run build`, `npm run build:prod`) |

To change the backend API URL used by development and Docker image builds, edit `apiBaseUrl` in `src/environments/environment.ts`.

To change the backend API URL for production builds, edit `apiBaseUrl` in `src/environments/environment.prod.ts`.

If you switch back to relative API paths, local proxy targets are configured in `proxy.conf.json`.

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
