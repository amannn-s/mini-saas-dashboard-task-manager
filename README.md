# Task Manager App

A simple task management web application built using **React**, **TypeScript**, and **MockAPI**. It allows users to create, edit, delete, and view tasks with features like filtering, sorting, and pagination.

## Features

- Create new tasks with title, description, status, due date, and priority
- Edit and update task details
- Delete tasks
- View tasks in a paginated table
- Visual task summary with status and priority indicators

## Tech Stack

- **React + TypeScript**
- **Vite** for frontend build
- **@tanstack/react-table** for data table functionality
- **MockAPI** as backend API
- **ShadCN/UI** components
- **Lucide React Icons**

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a .env file at the root and add:

```
VITE_ENDPOINT=685308ec0594059b23cff6d5
```

This is the MockAPI project ID. Your tasks will be stored at https://685308ec0594059b23cff6d5.mockapi.io/api/v1/tasks.

### 4. Run the app

```bash
npm run dev
```
