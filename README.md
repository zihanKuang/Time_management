### Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Features & SW Factory Alignment](#2-key-features--sw-factory-alignment)
3. [Tech Stack](#3-tech-stack)
4. [How to Run Locally](#4-how-to-run-locally)
5. [Project Structure](#5-project-structure)
6. [DevOps & CI/CD Approach](#6-devops--cicd-approach)
7. [SDK: Integrating in Other Projects](#7-sdk-integrating-in-other-projects)
8. [Future Enhancements](#8-future-enhancements)
9. [Conclusion](#9-conclusion)
10. [Contact](#10-contact)

------

## 1. Project Overview

This **Task & Calendar Management App** is a **full-stack** solution showcasing **Node.js**, **Express**, **SQLite**, and **React** to provide a rich feature set for managing calendars, tasks, and daily or monthly schedules. By design, it demonstrates a **DevOps** mindset with flexible CI/CD integration and swift, modular development cycles—ideal for organizations focusing on delivering software fast and frequently (*“SW Factory” style*).

**Key highlights**:

- **Frontend**: Built with React (using Indexed DB for faster local reads), offering daily and monthly calendars, sub-calendars, and a task management interface.
- **Backend**: Exposes a RESTful API (Node.js/Express) with data persisted in **SQLite** for simplicity and portability; designed for containerization and flexible environment configs.
- **DevOps Orientation**: Prepared for automated builds, testing, and deployments using environment variables, well-structured modules, and CI/CD-friendly architecture.

------

## 2. Key Features & SW Factory Alignment

1. **DevOps & SW Factory Readiness**
   - Clear separation of concerns in code structure (controllers/models/routes).
   - Quick setup for continuous integration and continuous deployment (e.g., Docker, GitHub Actions).
   - Minimal friction for feature additions and incremental deliveries.
2. **Fast Iteration**
   - Tight scope with immediate MVP potential: quickly spin up an internal pilot or proof-of-concept.
   - Frontend-backend decoupling allows parallel development, a cornerstone of rapid software factories.
3. **Task & Calendar Modules**
   - **SubCalendars**: Users can create multiple calendars (“Work”, “Personal”), each with its own tasks.
   - **Task Management**: CRUD operations, toggling completion status, and advanced filtering by calendar/date.
4. **User Experience**
   - **Daily View**: Focused snapshot of tasks for the day with easy toggles.
   - **Monthly View**: Quick overview of the entire month, day-click to show daily details.
5. **Extensible Architecture**
   - The app can be integrated into larger ecosystems with minimal overhead: highlight of an SDK-like approach for calendar and task functionalities.
   - Support for advanced expansions (e.g., user authentication, role-based access control, priority tasks, AI-based suggestions).

------

## 3. Tech Stack

| **Layer**      | **Technology**                                               |
| -------------- | ------------------------------------------------------------ |
| **Frontend**   | [React](https://reactjs.org/), IndexedDB (via [idb](https://github.com/jakearchibald/idb)), CSS Modules, [date-fns](https://date-fns.org/) |
| **Backend**    | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [SQLite](https://www.sqlite.org/) |
| **DevOps**     | Ready for Dockerization, `.env` configs, Git-based CI/CD (GitHub Actions) |
| **Testing**    | [Jest](https://jestjs.io/)                                   |
| **Deployment** | Container-based or standard Node environment                 |

------

## 4. How to Run Locally

Below is the typical local development workflow:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   ```bash
   npm install     # Installs backend dependencies
   cd client
   npm install     # Installs frontend dependencies
   cd ..
   ```

3. **Configure Environment Variables** *(optional)*

   Create a .env file in the root directory (same level as package.json) with variables like: 

   ```bash
   PORT=4000
   DB_PATH=./src/db/database.db
   ```
   
4. **Run the Development Servers**

   Start the backend: 

   ```bash
   npm run server
   ```

   Start the frontend: 

   ```bash
   cd client
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000/) in your browser to access the application.

------

## 5. Project Structure

```bash
.
├── backend/                 # Backend implementation
│   ├── src/                 # Core backend functionality
│   │   ├── controllers/     # API logic for tasks and calendars
│   │   ├── models/          # Database interaction layers
│   │   ├── routes/          # REST API endpoints
│   │   ├── db/              # SQLite setup and migrations
│   │   └── tests/           # Backend tests
│   ├── .github/workflows/   # CI/CD pipeline configuration
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies and scripts
│
├── src/                     # Frontend implementation
│   ├── App/                 # Main React App component
│   ├── components/          # Modular UI components
│   ├── services/            # React Context and state management
│   ├── utils/               # Utility functions
│   ├── __test__/            # Frontend unit tests
│   └── index.js             # Application entry point
│
├── public/                  # Static assets for the frontend
├── package.json             # Frontend dependencies and scripts
└── README.md                # Project documentation
```

------

## 6. DevOps & CI/CD Approach

1. **Automated Testing**

   Recommend `jest` for unit tests and `supertest` for integration testing, ensuring reliability.

2. **Continuous Integration**

   Configure CI pipelines to run tests and lint checks automatically.

3. **Continuous Deployment**

   **Containerization**: The Node + SQLite structure can be Dockerized quickly.

   Deployment to AWS, Azure, or on-premises servers can be triggered automatically once CI tests pass.

   `.env` usage for environment-specific configurations, ensuring portability.

4. **Agile & Iterative Delivery**

   The repository is organized for easy extension in sprints.

   Parallel development of frontend and backend fosters a shorter feedback loop.

This workflow embodies fast iteration, test-driven changes, and the kind of **continuous software delivery** desired in a modern software factory context.

------

## 7. **SDK: Integrating in Other Projects**

This project is modular enough to function like an **SDK** for task and calendar features in a React/Node ecosystem. Below is a high-level guide for integrating these modules into an external application:

### 7.1 Installation & Setup

1. **Include or reference the module**

   If published, you might do: 

   ```bash
   npm install my-task-calendar-sdk
   ```

   Otherwise, add this repo as a Git submodule or copy the relevant directories (`controllers`, `models`, `routes`, `services`) into your existing project.

2. **Backend Integration**

   **Routes**: Merge or mount the `taskRoutes` and `subCalendarRoutes` onto your existing Express application.

   **Models/Controllers**: Ensure your environment variables (`DB_PATH`, etc.) are correctly set so the SQLite DB is accessible.

   For containerization, add these modules to your Dockerfile and confirm your `.env` is included or injected at runtime.

3. **Frontend Integration**

   If you want to reuse the React components: 

   1. Import the `TaskProvider` from the `services/taskContext`.
   2. Wrap your top-level App (or a sub-tree) with ` ... `.
   3. Use the provided components like , in your existing React UI.

   Adjust styling as needed, or override the default CSS in your own theme.

4. **Environment Variables**

   Configure a .env file or environment variables in your deployment infrastructure. Example: 

   ```
   PORT=5000
   DB_PATH=/app/db/my-database.db
   ```

   This ensures the backend picks up the correct DB location and network port.

### 7.2 Example Usage in Your React App

```jsx
// In your main App.jsx
import React from 'react';
import { TaskProvider } from 'my-task-calendar-sdk'; // or your local path
import DayCalendar from 'my-task-calendar-sdk/components/Calendar/DayCalendar';
import MonthCalendar from 'my-task-calendar-sdk/components/Calendar/MonthCalendar';

function App() {
  return (
    <TaskProvider> 
      <div>
        <h1>My Existing App + Task SDK</h1>
        <MonthCalendar />
        <DayCalendar />
      </div>
    </TaskProvider>
  );
}

export default App;
```

This setup **instantly** grants your application the calendar logic and data model from the Task & Calendar Management SDK.

------

## 8. Future Enhancements

1. **User & Authentication**: Multi-tenant usage with secure logins and role-based access.
2. **CSV Import/Export**: For bulk data import and backups.
3. **Task Prioritization & AI Suggestions**: Automatic scheduling recommendations based on deadlines, workload, or ML-based ranking.
4. **Collaborative Features**: Shared calendars for team projects, real-time task updates via Web Sockets.

------

## 9. Conclusion

This **Task & Calendar Management** project demonstrates:

- **Full-stack** proficiency (React + Node.js/Express + SQLite).
- A design ready for **DevOps** pipelines, making it easy to continuously integrate, test, and deploy.
- **SDK-like modularity** for easy adoption in other projects, showcasing knowledge in agile development, containerization, and CI/CD best practices.
- A thoughtful approach to performance (Indexed DB caching) and architecture (controllers/models separation, environment variables, easy expansions).

------

## 10. Contact

- **Author**: Zihan Kuang
- **Email**: [zihan_kuang@outlook.com](mailto:zihan_kuang@outlook.com)
- **LinkedIn**: https://www.linkedin.com/in/zihan-kuang-6087b2329/
