# Hono + SPA + React

This repository demonstrates a simple Single Page Application (SPA) built with React and TypeScript, powered by the serverless framework Hono and deployed on Cloudflare Pages.

This template provides a minimal setup to get you started with:

- **React:** The front-end framework for building dynamic user interfaces.
- **TypeScript:** A superset of JavaScript that adds optional static typing for improved code quality.
- **Vite:** A fast development server and build tool for modern web development.
- **Hono:** A lightweight, minimal and fast serverless web framework for Deno and Cloudflare Workers.
- **Cloudflare Pages:** A platform for hosting static websites and serverless functions.
- **TanStack Router:** A performant and powerful routing library for React.

## Project Structure

The project structure is organized as follows:

- **`app/`**: Contains the source code for both the client and the API.
  - **`api/`**: Hono API code (`app/api/index.tsx`)
  - **`main.tsx`**: Entry point for the React application (`app/main.tsx`)
  - **`routes/`**: React Router routes (e.g., `app/routes/__root.tsx`, `app/routes/about.lazy.tsx`, `app/routes/index.lazy.tsx`)
  - **`style.css`**: Tailwind CSS stylesheet (`app/style.css`)
  - **`components/`**: React components (e.g., `app/components/notion-like-editor.tsx`)
- **`vite.config.ts`**: Vite configuration file (`vite.config.ts`)
- **`tailwind.config.js`**: Tailwind CSS configuration file (`tailwind.config.js`)
- **`tsconfig.app.json`**: TypeScript configuration file for the application (`tsconfig.app.json`)
- **`tsconfig.json`**: TypeScript configuration file for the entire project (`tsconfig.json`)
- **`tsconfig.node.json`**: TypeScript configuration file for Node.js (`tsconfig.node.json`)
- **`package.json`**: Project dependencies and scripts (`package.json`)
- **`_routes.json`**: Hono routes configuration for Cloudflare Pages (`_routes.json`)
- **`index.html`**: HTML template for the React application (`index.html`)
- **`README.md`**: This file! (`README.md`)
- **`LICENSE`**: MIT license (`LICENSE`)

## Setup and Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/laiso/hono-spa-react.git
   cd hono-spa-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   This will start two servers:
   - **Client:** Runs on `http://localhost:5173/` and serves the React application.
   - **API:** Runs on `http://localhost:3000/api` and serves the Hono API.

4. **Build for production:**
   ```bash
   npm run build
   ```

   This will generate optimized build artifacts in the `dist` directory.

## Deployment

1. **Deploy to Cloudflare Pages:**
   ```bash
   npm run deploy
   ```

   This will deploy the built application to your Cloudflare Pages account.

## Authentication

This template uses [Clerk](https://clerk.com) for authentication. To get started, sign up for a free account and create a new project. Then, update the following environment variables in the `.env` file:

```
export CLERK_PUBLISHABLE_KEY=pk_test_XXX
export CLERK_SECRET_KEY=sk_test_XXX
```

Clerk documentation is available at:

https://clerk.com/docs

## Expanding the ESLint Configuration

For production applications, consider updating the ESLint configuration to enable type-aware lint rules:

- **`tsconfig.json`**: Configure the `parserOptions` property to point to your TypeScript configuration files:
  ```json
  {
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "project": ["./tsconfig.json", "./tsconfig.node.json"],
      "tsconfigRootDir": __dirname
    }
  }
  ```

- **`.eslintrc.cjs`**: Replace `plugin:@typescript-eslint/recommended` with one of these options for type-checked linting:
  - `plugin:@typescript-eslint/recommended-type-checked`
  - `plugin:@typescript-eslint/strict-type-checked`
  - Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`

- **Install `eslint-plugin-react`:**
  ```bash
  npm install eslint-plugin-react
  ```

- **`.eslintrc.cjs`**: Add `plugin:react/recommended` and `plugin:react/jsx-runtime` to the `extends` list.

## Contributing

Contributions are welcome! Please open an issue or a pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.