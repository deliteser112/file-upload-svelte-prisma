# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Technologies Used

- **SvelteKit**: Front-end framework for building highly interactive user interfaces.
- **Docker**: Containerization platform to simplify deployment and ensure consistency across environments.
- **PostgreSQL**: Open source relational database for robust data management.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.

## Prerequisites

Before starting, ensure you have the following installed:
- Node.js
- Docker
- PostgreSQL

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Technologies Used

- **SvelteKit**: Front-end framework for building highly interactive user interfaces.
- **Docker**: Containerization platform to simplify deployment and ensure consistency across environments.
- **PostgreSQL**: Open source relational database for robust data management.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.

## Prerequisites

Before starting, ensure you have the following installed:
- Node.js
- Docker
- PostgreSQL

### Clone the Project

Clone the repository to your local machine:

```bash
git clone [your-repo-link]
cd [your-repo-directory]
