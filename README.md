# React + TypeScript + Vite
# Todo App

A modern, responsive, and premium-looking Todo App built with **React**, **TypeScript**, and **TailwindCSS**. Features include task management, subtasks, priorities, categories, search, filters, drag-and-drop, local storage persistence, and dark/light theme toggle.

---

## 🚀 Features

- **Add, Edit, and Delete Tasks**  
  Manage your todos with ease. Edit or remove tasks anytime.

- **Subtasks Support**  
  Break tasks into smaller actionable items.

- **Task Priorities and Categories**  
  Organize tasks with customizable priority (High, Medium, Low) and category labels.

- **Drag-and-Drop Reordering**  
  Easily rearrange tasks using intuitive drag-and-drop.

- **Filters & Search**  
  Filter tasks by status (`All`, `Active`, `Completed`) or by category.  
  Search tasks in real-time by their name.

- **Dark/Light Theme Toggle**  
  Switch between dark and light modes for a comfortable viewing experience.

- **Responsive & Premium Design**  
  Fully responsive layout with modern, clean, and smooth UI.

- **Persistent Storage**  
  Tasks are saved in local storage and persist across browser sessions.

- **Reminders (Optional)**  
  Browser notifications for tasks with due dates.

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript  
- **Styling**: TailwindCSS  
- **Icons**: Lucide React  
- **Drag & Drop**: @hello-pangea/dnd  
- **Hooks**: Custom hooks for local storage and reminders  

---

## 📁 Folder Structure

my-todo/
├─ src/
│ ├─ components/
│ │ ├─ Header.tsx
│ │ ├─ TodoInputCard.tsx
│ │ ├─ TodoCard.tsx
│ │ ├─ TodoListSection.tsx
│ │ ├─ TodoEditModal.tsx
│ │ └─ Footer.tsx
│ ├─ hooks/
│ │ ├─ useLocalStorage.ts
│ │ └─ useReminder.ts
│ ├─ types/
│ │ └─ todo.ts
│ └─ App.tsx
├─ package.json
└─ README.md

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
