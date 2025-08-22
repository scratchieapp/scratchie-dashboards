# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application called "scratchie-dashboards" that uses Recharts for data visualization and Lucide React for icons.

## Commands

### Development
- `npm run dev` - Start the Vite development server with hot module replacement
- `npm run build` - Run TypeScript compiler and build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint on the codebase

### TypeScript
- Type checking is performed as part of the build process via `tsc -b`
- The project uses TypeScript ~5.8.3 with separate configs for app and node environments

## Architecture

### Build System
- **Vite** (v7.1.2) - Fast build tool with HMR support
- **React** (v19.1.1) - UI framework with React DOM
- **TypeScript** - Type safety with separate tsconfig files for app and node environments

### Key Dependencies
- **recharts** (v3.1.2) - Charting library for data visualization dashboards
- **lucide-react** (v0.540.0) - Icon library for UI components

### Project Structure
- `/src` - React components and application code
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component
- `/public` - Static assets served directly
- TypeScript configuration split between:
  - `tsconfig.app.json` - Application TypeScript config
  - `tsconfig.node.json` - Node/build tooling TypeScript config

### Development Workflow
- ESLint configured with React hooks and React refresh plugins
- Vite plugin for React with Fast Refresh support
- Module-based package structure (type: "module" in package.json)