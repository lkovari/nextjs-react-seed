# Next.js + React Monorepo Seed with Tailwind, Sass, and TypeScript

`````

````bash
# Pnpm Installation (if not yet installed)
npm install -g pnpm
`````

```md
## Step-by-Step Monorepo Setup

This guide helps you set up a pnpm-based monorepo for Next.js apps and shared React libraries.
```

```bash
# Step 1: Initialize Root Workspace
cd nextjs-react-seed
pnpm init
```

`````yaml
# Create pnpm-workspace.yaml at the root
packages:
  - 'apps/*'
  - 'packages/*'
```

````bash
# Step 2: Install TurboRepo
pnpm add -D turbo
```

````json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

````json
// Step 3: Root tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "paths": {
      "@repo/common-lib/*": ["./packages/common-lib/src/*"]
    }
  },
  "exclude": ["node_modules"]
}
```

````bash
# Step 4: Create apps and packages folders
mkdir -p apps packages
```

````bash
# Step 5: Create Main Next.js App
cd apps
pnpm create next-app main-app --ts --tailwind --eslint --app --src-dir --use-pnpm
cd main-app
pnpm add sass
cd ../..
```

````json
// apps/main-app/package.json → ensure name is "main-app"
{
  "name": "main-app",
  ...
}
```

````json
// apps/main-app/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "common-lib": ["../../packages/common-lib/src"],
      "common-lib/*": ["../../packages/common-lib/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

````ts
// apps/main-app/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/common-lib/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
```

````bash
# Step 6: Create React Library (common-lib)
cd packages
mkdir common-lib
cd common-lib
pnpm init
```

````json
// packages/common-lib/package.json
{
  "name": "common-lib",
  "version": "1.0.0",
  "description": "Shared React components and utilities",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint .",
    "clean": "rm -rf .turbo node_modules dist"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tsup": "^8.0.2",
    "typescript": "^5.4.2"
  }
}
```

````bash
# Install common-lib dev dependencies
pnpm add -D react react-dom @types/react @types/react-dom typescript tsup
```

````json
// packages/common-lib/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "lib": ["es2022", "dom"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

````ts
// packages/common-lib/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
});
```

````bash
# Create source folders
mkdir -p src/components
```

````tsx
// packages/common-lib/src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
```

````ts
// packages/common-lib/src/index.ts
export { default as Button } from './components/Button';
```

````bash
# Go back to root
cd ../..
```

````bash
# Step 7: Install all dependencies in the monorepo
pnpm install
```

````json
// Step 8: Add common-lib as a dependency to main-app
{
  "name": "main-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.1.0",
    "common-lib": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "sass": "^1.71.1"
  }
}
```

````tsx
// Step 9: Use common-lib in MainApp (apps/main-app/src/app/page.tsx) STILL NOT IMPLEMENTED!
'use client';

import { useState } from 'react';
import { Button } from 'common-lib';
import '../styles/globals.scss';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        Welcome to MainApp!
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        This is a sample Next.js app using components from `common-lib`.
      </p>

      <div className="flex items-center space-x-4 mb-8">
        <Button
          onClick={handleButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transform hover:scale-105"
        >
          Click me!
        </Button>
        <span className="text-3xl font-semibold text-indigo-700">
          Clicks: {count}
        </span>
      </div>

      <p className="text-lg text-gray-500 mt-4">
        Tailwind CSS and Sass (SCSS) are both configured.
      </p>
    </div>
  );
}
```

````scss
/* apps/main-app/src/styles/globals.scss */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.my-custom-class {
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: #2c3e50;
  }
}
```

````bash
# Step 10: Run your app
pnpm dev --filter main-app
```

````bash
# Or run all dev scripts via Turbo
pnpm dev
```

````bash
# Build common-lib
pnpm build --filter common-lib
```

````bash
# Build main-app
pnpm build --filter main-app
```

# TODO
- add prettier
- add main layout with css grid, include header, footer, aside, body
- turn it to responsive on mobile view should looks good
- add a hamburger icon which appear only when the ui breakpoint is smaller than xs
- show menu items on overlay when click to hamburger icon
`````

```

```
