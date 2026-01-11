# Next.js + React Monorepo Seed

With **Tailwind CSS**, **Sass**, **TypeScript**, and **Turborepo**

---

I chose **Turborepo** because it provides the flexibility to easily extend this workspace with additional apps or libraries in the future.

---

## 🌐 Deployed Site

[https://nextjs-react-seed-main-app.vercel.app/](https://nextjs-react-seed-main-app.vercel.app/)

---

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## 🏗️ Build

### Prerequisites

Ensure you have pnpm installed. If not, install it:

```bash
npm install -g pnpm
```

### Install Dependencies

Before building, install all dependencies:

```bash
pnpm install
```

### Build All Packages

To build all packages in the monorepo (including the common library and main app):

```bash
pnpm build
```

This uses Turborepo to build all packages in the correct dependency order.

### Build Main App Only

To build only the main Next.js application:

```bash
pnpm build:main
```

Or from the `apps/main-app` directory:

```bash
cd apps/main-app
pnpm build
```

The build output will be in `apps/main-app/.next`.

### Build Common Library

To build only the common library package:

```bash
pnpm build:common
```

### Test Production Build Locally

After building, you can test the production build locally:

```bash
cd apps/main-app
pnpm start
```

This will start the production server on [http://localhost:3000](http://localhost:3000).

### Clean Build Artifacts

To clean all build artifacts and caches:

```bash
pnpm clean
```

---

## 🚀 Deploy to Vercel

### Prerequisites

Before deploying, ensure you have:

1. **A Vercel account** - If you don't have one, [sign up here](https://vercel.com/signup)
2. **Your code pushed to Git** - Your repository must be on GitHub, GitLab, or Bitbucket
3. **pnpm installed** - Vercel will automatically detect and use pnpm from your `package.json`

---

### Step-by-Step: Deploy via Vercel Dashboard

#### Step 1: Login to Vercel

1. Open your web browser and go to [https://vercel.com](https://vercel.com)
2. Click the **"Login"** button in the top-right corner
3. Choose your authentication method:
   - **GitHub** (recommended if your code is on GitHub)
   - **GitLab**
   - **Bitbucket**
   - Or use **Email**
4. Complete the authentication process
5. You'll be redirected to your Vercel Dashboard

#### Step 2: Access Your Project (If Already Deployed)

If you've already deployed this project before (like [https://nextjs-react-seed-main-app.vercel.app/](https://nextjs-react-seed-main-app.vercel.app/)):

1. In the Vercel Dashboard, you'll see a list of your projects
2. Look for your project (e.g., "nextjs-react-seed-main-app")
3. **Click on the project name** to open it
4. Skip to **Step 5: Redeploy** below

#### Step 3: Import a New Project (First Time Deployment)

If this is your first time deploying:

1. In the Vercel Dashboard, click the **"Add New..."** button (top-right)
2. Select **"Project"** from the dropdown menu
3. You'll see a list of your Git repositories
4. **Click on your repository** (e.g., "nextjs-react-seed" or similar)
5. If you don't see your repository:
   - Click **"Adjust GitHub App Permissions"** or **"Configure Git Provider"**
   - Grant Vercel access to your repositories
   - Refresh the page

#### Step 4: Configure Project Settings

After clicking on your repository, you'll see the **"Configure Project"** page:

1. **Project Name** (top of the page):
   - You can change it or leave the default
   - Example: `nextjs-react-seed-main-app`

2. **Framework Preset**:
   - Should auto-detect as **"Next.js"**
   - If not, select **"Next.js"** from the dropdown

3. **Root Directory**:
   - Click the **"Edit"** link next to "Root Directory"
   - Leave it as **`.`** (root) or set to **`apps/main-app`** if you prefer
   - Click **"Continue"**

4. **Build and Output Settings**:
   - Click **"Show Advanced Options"** or look for the settings icon
   - **Build Command**: Enter `pnpm build:main`
   - **Output Directory**: Enter `apps/main-app/.next`
   - **Install Command**: Enter `pnpm install`
   - **Node.js Version**: Leave as default (usually 20.x)

5. **Environment Variables** (if needed):
   - Click **"Environment Variables"** section
   - Click **"Add"** for each variable
   - Enter the variable name and value
   - Select the environment (Production, Preview, Development)
   - Click **"Save"**

6. **Deploy**:
   - Review all settings
   - Click the big blue **"Deploy"** button at the bottom

#### Step 5: Monitor the Build Process

After clicking "Deploy":

1. You'll see a **"Building"** screen with logs
2. Watch the build progress in real-time
3. The build will:
   - Install dependencies with `pnpm install`
   - Run `pnpm build:main`
   - Create the production build
   - Deploy to Vercel's edge network

4. **Wait for completion** - This usually takes 1-3 minutes

#### Step 6: Deployment Complete

Once the build completes:

1. You'll see a **"Congratulations!"** message
2. Click **"Visit"** to see your live site
3. Your site URL will be something like: `https://nextjs-react-seed-main-app.vercel.app/`
4. Bookmark this URL for future reference

#### Step 7: Redeploy After Changes

To deploy updates after making code changes:

1. **Push your changes to Git:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. **Automatic Deployment:**
   - Vercel automatically detects new commits
   - Go to your Vercel Dashboard
   - Click on your project
   - You'll see a new deployment starting automatically
   - Click on the deployment to see the build logs

3. **Manual Redeploy:**
   - In your project dashboard, go to the **"Deployments"** tab
   - Find the deployment you want to redeploy
   - Click the **"..."** (three dots) menu
   - Select **"Redeploy"**
   - Confirm by clicking **"Redeploy"** again

---

### Deploy via Vercel CLI (Alternative Method)

If you prefer using the command line:

#### Step 1: Install Vercel CLI

Open your terminal in the project root and run:

```bash
pnpm add -g vercel
```

Or using npm:

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will:
- Open your browser
- Ask you to authenticate
- Return to the terminal when done

#### Step 3: Deploy (Preview)

From your project root directory:

```bash
vercel
```

This will:
- Ask you to link to an existing project or create a new one
- Follow the prompts
- Create a preview deployment
- Give you a preview URL

#### Step 4: Deploy to Production

```bash
vercel --prod
```

This deploys to your production domain (e.g., `https://nextjs-react-seed-main-app.vercel.app/`)

---

### Project Configuration

#### Option 1: Vercel Dashboard Settings

To configure settings via the dashboard:

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** tab (top navigation)
3. Click **"General"** in the left sidebar
4. Scroll to **"Build & Development Settings"**
5. Update:
   - **Build Command**: `pnpm build:main`
   - **Output Directory**: `apps/main-app/.next`
   - **Install Command**: `pnpm install`
6. Click **"Save"**

#### Option 2: Create `vercel.json` File

For version-controlled configuration, create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "pnpm build:main",
  "outputDirectory": "apps/main-app/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

This file will be automatically detected by Vercel.

---

### Managing Environment Variables

To add or update environment variables:

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar
4. Click **"Add New"** button
5. Enter:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_API_URL`)
   - **Value**: Variable value
   - **Environment**: Select Production, Preview, and/or Development
6. Click **"Save"**
7. **Important**: After adding/updating variables, you must redeploy:
   - Go to **"Deployments"** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**

---

### Viewing Deployment Logs

To see what happened during a deployment:

1. Go to your project in Vercel Dashboard
2. Click **"Deployments"** tab
3. Click on any deployment
4. You'll see:
   - Build logs (install, build commands)
   - Build status (Success/Failed)
   - Deployment URL
   - Build time

---

### Troubleshooting

**Build fails?**
- Check the build logs in the deployment details
- Verify your build command: `pnpm build:main`
- Ensure all dependencies are in `package.json`
- Check that pnpm is being used (Vercel detects it automatically)

**Site not updating?**
- Wait a few minutes for DNS propagation
- Clear your browser cache
- Check if the deployment completed successfully

**Need to change domain?**
- Go to **Settings** → **Domains**
- Add your custom domain or change the project name

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

For more deployment options and details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## ✅ TODO

### 🔧 Fixes & Improvements

- [ ] TypeScript configuration best practices to modern Next.Js app
- [ ] update eslint.config.mjs to modern Next.Js best practices
- [ ] TypeScript AST custom rules for static check
- [ ] add Vitest as testing framework
- [ ] bad practices example what and why not to do
- [ ] Correct routing
- [ ] Check all styling; remove inline styles and use separated/global styles instead

### 🧪 Sandbox Pages (for learning purposes)

- [ ] Hooks (Next.js + React)
- [ ] Validation (Zod)
- [ ] Data handling via state management (Zustand)
- [ ] Deep dive into Turborepo features and usage
- [ ] Exploring `shadcn/ui` through examples
- [ ] Exploring `radix-ui` through examples
- [ ] Comparison: `biome.js` vs `eslint`
- [ ] Integrating `react-hook-form` with `@hookform/resolvers`


---
