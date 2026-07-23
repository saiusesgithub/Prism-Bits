# Architecture

## Tech Stack
- **Frontend Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## Folder Structure
- `src/` - Contains the main application logic, components, and pages.
- `public/` - Static assets like images and icons.
- `registry/` - UI components registry.
- `scripts/` - Helper scripts for generation and validation.

## Data Flow
Prism-Bits is primarily a frontend application that showcases UI components. The components are built using React and styled using Tailwind CSS. 
Next.js handles routing and rendering (Server-Side Rendering and Static Site Generation where applicable).
The user interacts with the application interface, which updates state dynamically or fetches local component metadata from the registry.

## External Services
At present, Prism-Bits operates without complex backend services, relying on standard static file hosting platforms like Vercel for deployment.
