# Architecture

## 🚀 Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [OGL](https://github.com/oframe/ogl)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Tooling**: ESLint, PostCSS

## 📂 Folder Structure

- `src/` - Core application logic, routing (Next.js App Router), and UI layouts.
- `public/` - Static assets like images, icons, and fonts.
- `registry/` - The core UI components registry where reusable Prism-Bits components are stored.
- `scripts/` - Node.js helper scripts for generating component previews and validating the registry.

## 🏗️ System Architecture

The following diagram illustrates how the different layers of Prism-Bits interact, from the build process to runtime execution.

```mermaid
graph TD
    subgraph Build Phase
        A[registry/ Components] -->|scripts/generate-react-preview-map.mjs| B(Component Previews Map)
        C[scripts/validate-registry.mjs] -->|Validates| A
    end

    subgraph Runtime Next.js Application
        D[Next.js Server]
        E[Client Components]
        F[Server Components]
        
        B -.-> D
        D --> F
        F --> E
        
        subgraph Styling & Animation
            G[Tailwind CSS] --> E
            H[Framer Motion / OGL] --> E
        end
    end

    subgraph Deployment
        D -->|Vercel / Static Hosting| I[End User Browser]
    end
```

## 🔄 Data Flow & Rendering Model
1. **Component Registry**: Developers add new UI components to the `registry/`.
2. **Build Scripts**: During `predev` and `prebuild`, scripts map the registry components so they can be dynamically previewed in the docs.
3. **Static Generation**: Next.js uses `generateStaticParams` in category and component slug pages to pre-render routes at build time. The application is statically exported (`output: 'standalone'` or similar static hosting optimizations) rather than relying on heavy SSR at runtime.
4. **Application Layer**: The Next.js client router serves the pre-rendered pages, consuming the generated component maps for live previews.
5. **User Interaction**: Users view the live components, copy code, and interact with the UI, styled by Tailwind and animated by Framer Motion.

## 🌐 External Services & Deployment
Currently, Prism-Bits operates as a statically generated frontend web application without requiring a dedicated backend database. It relies on standard hosting providers (e.g., Vercel) for edge deployments, leveraging Next.js's static site generation (SSG) for fast loading.
