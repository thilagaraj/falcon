# Technical Context: Falcon Project

## Overview
Falcon is a modern web application built as a hotel management/admin dashboard. It leverages React (with Vite) for the frontend, and is designed for scalability, modularity, and developer productivity.

## Main Technologies
- **React 18+**: UI library for building component-based interfaces.
- **Vite**: Fast development server and build tool.
- **JavaScript (ES2020+)**: Main programming language.
- **CSS/SCSS**: Styling, with utility classes and variables in `public/assets/css/`.
- **React Router**: For client-side routing.
- **Axios**: For HTTP requests.
- **React Context**: For global state management (e.g., Spinner, Alerts).
- **Jest & React Testing Library**: For testing (recommended).
- **ESLint**: For linting and code quality.

## Project Structure
- `src/` — Main source code
  - `components/` — Reusable UI components
  - `pages/` — Page-level components/views
  - `assets/` — Static assets (images, SVGs)
  - `constants/` — App-wide constants/messages
  - `helper/` — Utility/helper functions
  - `hook/` — Custom React hooks and context providers
  - `masterLayout/` — Layout components
  - `utils/` — Utility modules (e.g., axios config, date formatting)
- `public/` — Static files and global styles

## Architectural Patterns
- **Component-Driven Development**: UI is broken into small, reusable components.
- **Hooks & Context**: State and side effects are managed with hooks; shared state via context.
- **Separation of Concerns**: Logic, UI, and data-fetching are separated for maintainability.
- **Theming**: CSS variables and utility classes support light/dark themes and consistent design.

## Coding Conventions
- Follow ESLint rules (see `.eslint.config.js`).
- Use functional components and hooks.
- Use descriptive naming for files, components, and variables.
- Keep code modular and DRY (Don't Repeat Yourself).
- Use comments and documentation for complex logic.

## Build & Run
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint code: `npm run lint`
- Build for production: `npm run build`

## Additional Notes
- All new features should be added as modular components/pages.
- Use the provided utility classes for layout and spacing.
- For API integration, use the configured Axios instance in `src/utils/axios.js`.
- For global state, prefer React Context over prop drilling.

---
For more, see the project README and code comments. 