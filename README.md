# TaskFlow — Structured React Edition

A frontend-only task management SaaS UI converted from the original TaskFlow HTML/CSS/JavaScript implementation to a maintainable React codebase.

## Stack

- React
- Vite
- Vanilla CSS
- JavaScript (ES modules)

No backend, database, localStorage, or authentication service is used. Task data intentionally lives in React state and resets on refresh, matching the original assignment scope.

## Project structure

```text
src/
├── components/
│   ├── auth/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   └── tasks/
├── constants/
├── data/
├── hooks/
├── utils/
├── App.jsx
├── main.jsx
└── style.css
```

## Run

```bash
npm install
npm run dev
```

Demo login:

```text
username: admin
password: admin123
```

## Architecture notes

- `App.jsx` coordinates application-level state and composition.
- `useTasks` owns task CRUD state and derived statistics.
- `useToast` owns transient notifications and cleanup.
- `useKeyboardShortcuts` centralizes global keyboard behavior.
- Components are split by responsibility rather than by arbitrary file size.
- Task filtering/sorting and validation are pure utility functions.
- Initial task data and application constants are kept outside UI components.
- CSS remains shared to preserve the original visual design exactly.
