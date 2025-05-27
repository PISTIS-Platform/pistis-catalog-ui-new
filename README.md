# Frontend for TwinByData

This is the main repository for the TwinByData Frontend.

## Overview

- Vue.js (SPA)
- TailwindCSS 3 + PrimeVue 3
- TypeScript
- piveau.kit
- Histoire

## Project Setup

After you configured the project, you can proceed with the standard process of running/developing Vue3 applications.

### Install dependencies

```sh
pnpm install
```

**Setup configuration**
```sh
cp .env.template .env.local
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production with Piveau Vue components

```sh
pnpm build
```

### Preview components in Histoire

```sh
pnpm story:dev
```

## Configuration

For configuration, TwinByData uses config.js files which are tailored according to each customer requirements.

You can find ```config``` folder inside the project directory.

Folder contains ```config.js``` file which is used for production/deployment purposes and is changed at the runtime during the deployment process.

There is also ```config.dev.js``` file which contains configuration required to run the project locally with preset settings for one of the customers.

Folder dev-configs contains ```.js``` files with configs for each of the customers required to work/test local versions of customers project for development/testing purposes.

You can switch customer projects by either copying contents of one of the project ```.js``` files (```hof.js``` for example) into ```config.dev.js```, or you can change it using the ```change-project``` script which is available via ```pnpm```:
```sh
pnpm change-project <project-name>
```

You don't have to include .js at the end:
```sh
pnpm change-project hof
```

If the script doesn't work for you, make sure to run ```chmod +x change-project``` to make it executable.

## CI/CD Pipeline

The project uses GitLab CI/CD with the following stages:

### Build Stage
- **build-asset**: Builds the frontend assets
    - Uses Node.js 18 Alpine image
    - Utilizes PNPM for package management
    - Caches dependencies for faster builds
    - Produces distribution artifacts in `dist/` directory

- **build-and-push**: Creates and pushes Docker images
    - Builds Docker image using the latest artifacts
    - Pushes two tags to the registry:
        - Latest commit SHA (`$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA`)
        - Latest version (`$CI_REGISTRY_IMAGE:latest`)

### Deploy Stage
- **notify-deployment-ready**: Provides deployment instructions
    - Displays instructions for deploying to OpenShift
    - Shows the command to import the latest image:
      ```bash
      oc import-image piveau-vanilla-ui:latest --from=$IMAGE_LATEST --confirm -n piveau
      ```

### Notes
- Pipeline runs on `fokus-runner` tags
- Master branch deployments only
- Caching strategy uses pull-push policy for node_modules and PNPM store
