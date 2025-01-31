# Kartvya Web Application

Application uses the [Next.js](https://nextjs.org/) pages router + [Mantine](https://mantine.dev/) from [next-app-template](https://github.com/mantinedev/next-app-template). It makes use of following techs

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Deployment

### Amplify:

Amplify picks up commits to the master branch and automatically deployed.
environment variables are saved on the Amplify
But to use them need to update amplify.yml in `https://<region>.console.aws.amazon.com/amplify/apps/<application_id>/build`
the file's copy is being maintained in amplify.yml.
