# Project Title: Task & Calendar Management App

## Overview

This project is a **full-stack application** using **Node.js**, **Express**, **SQLite**, and **React** to provide a calendar and task management system. The **frontend** offers daily and monthly views for tasks and scheduling, while the **backend** exposes a RESTful API with data persisted in SQLite. Additionally, it leverages IndexedDB in the browser for enhanced client-side performance.

Beyond standard full-stack features, the project highlights:

1. **DevOps Orientation**:
   - Clean, modular backend ready for containerization and integration into CI/CD pipelines, enabling **rapid deployment** to production.
   - Dynamic configuration via environment variables (`.env`) ensures flexibility for various deployment environments.
2. **Fast Iteration**:
   - The project’s scope is well-defined and can be quickly delivered as an MVP, aligned with a "Software Development Kit + Continuous Integration/Continuous Deployment" approach.
   - Frontend-backend separation allows **parallel development** in teams, speeding up delivery cycles.
3. **Scalability & Extensibility**:
   - Emphasis on **modular** code organization—components in the frontend, controllers/routes/models in the backend—making it straightforward to expand or customize.
   - Demonstrates **DevOps** best practices for building and deploying agile software.
4. **Versatile for Various Roles**:
   - Showcases **full-stack** skills (DB design, REST API development, frontend UI/UX).
   - Also underscores **DevOps** and **Agile** principles crucial to roles involving rapid software delivery.

## Key Features

1. **Multiple Calendars (SubCalendars)**:
   Create multiple calendars (e.g. “Work,” “Personal”) to categorize tasks.
2. **Task Management**:
   - Create, read, update, and delete tasks (CRUD operations).
   - Toggle completion status.
   - Filter tasks by date or calendar.
3. **Daily & Monthly Views**:
   - **Day View**: Focus on tasks for a selected date; directly edit or toggle completion.
   - **Month View**: Displays a monthly overview of tasks; clicking a day jumps to its details.
4. **IndexedDB + SQLite**:
   - **SQLite** on the server for persistent storage.
   - **IndexedDB** in the browser for faster local reads and caching.
5. **RESTful API**:
   - Endpoints for tasks: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`.
   - Endpoints for sub-calendars: `GET /api/subCalendars`, `POST /api/subCalendars`.

## Tech Stack

- **Frontend**:
  - [React.js](https://reactjs.org/)
  - [date-fns](https://date-fns.org/) for date handling
  - IndexedDB (using [idb](https://github.com/jakearchibald/idb))
  - CSS (or CSS Modules) for styling
- **Backend**:
  - [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
  - [SQLite](https://www.sqlite.org/)
  - Well-structured RESTful API with controllers, models, and routes
- **Deployment & Running**:
  - Local development with `npm / yarn`
  - Containerization (e.g., Docker) for quick CI/CD integration

## Quick Start

Below is a typical local development workflow:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables** (optional):

   - In the 

     ```
     .env
     ```

      file, you may specify: 

     ```
     PORT=4000
     DB_PATH=./src/db/database.db
     ```

4. **Run the development environment**:

   - Start the backend: 

     ```bash
     npm run server
     ```

   - Start the frontend: 

     ```bash
     cd client
     npm start
     ```

   - Navigate to [http://localhost:3000](http://localhost:3000/) in your browser to view the app.

## Project Structure

```bash
.
├── controllers/         # Express controllers handling business logic
│   ├── subCalendarController.js
│   └── taskController.js
├── db/                  # Database setup and initialization
├── models/              # Database models for tasks and subCalendars
├── routes/              # Express routes mapping HTTP endpoints to controllers
│   ├── subCalendars.js
│   └── tasks.js
├── src/                 # React source code
│   ├── components/      # UI components (Calendar, Task, Navigation, etc.)
│   ├── services/        # Global state management & utilities (taskContext, dbUtils)
│   └── App.jsx
├── .env                 # Environment variables
├── package.json
└── README.md
```

- **controllers/**: Handles API logic for tasks and sub-calendars.
- **models/**: Database layer with CRUD operations.
- **routes/**: Routes define the API endpoints.
- **src/**: React application with component-based architecture and IndexedDB usage.

## DevOps / CI/CD Approach

- **Automated Testing**
  - Add unit and integration tests (e.g., [Jest](https://jestjs.io/) + [Supertest](https://www.npmjs.com/package/supertest)) to be run automatically on commit or pull requests.
- **Continuous Integration**
  - Use GitHub Actions, GitLab CI, or Jenkins to automate testing and building on every code push.
  - Generate build artifacts (bundled frontend, optimized backend) upon successful tests.
- **Continuous Deployment**
  - Deploy artifacts to target environments (AWS, Azure, Heroku, etc.) automatically or semi-automatically via scripts.
  - For **Docker-based** deployments, build and publish images, then pull and run the container for upgrades.

## Future Enhancements

- **User System & Authentication**: Multi-user roles, login access control.
- **Notifications & Reminders**: Email/SMS or real-time push for due tasks.

## Conclusion

This project demonstrates **end-to-end** development with **Node.js + Express + SQLite + React**, showcasing:

- **Frontend** component-based design and interactive UX.
- **Backend** RESTful APIs and structured data handling.
- **DevOps** culture (CI/CD pipelines, environment management) and **agile** mindset.

**Contact**:

- Email: zihan_kuang@outlook.com
- LinkedIn:  https://www.linkedin.com/in/zihan-kuang-6087b2329/
