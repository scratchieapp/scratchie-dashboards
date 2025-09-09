# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application called "scratchie-dashboards" - a workplace safety and recognition platform with multiple dashboard views for administrators, companies, and individual sites. The application features interactive data visualizations, maps, and a comprehensive award system.

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
- **shadcn/ui** - Component library built on Radix UI and Tailwind CSS
- **@radix-ui** - Unstyled, accessible UI primitives (dialog, checkbox, label, etc.)
- **react-map-gl** (v7.1.7) - React wrapper for Mapbox GL JS
- **mapbox-gl** (v3.9.0) - Interactive map library
- **tailwindcss** (v3.4.20) - Utility-first CSS framework
- **class-variance-authority** - Utility for managing component variants
- **clsx** & **tailwind-merge** - Utilities for conditional class names

### Project Structure
- `/src` - React components and application code
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component with routing between dashboards
  - `/components` - React components
    - `AdminDashboard.tsx` - Admin dashboard with team performance metrics
    - `CompanyDashboard.tsx` - Company-level dashboard (McDonald's Westside QSR)
    - `SiteDashboard.tsx` - Site-specific dashboard (McDonald's Chisholm)
    - `MapView.tsx` - Reusable Mapbox component for location visualization
    - `ScratchieModal.tsx` - Multi-step award creation wizard
    - `WalletView.tsx` - Company-level wallet management for multiple sites
    - `SiteWalletView.tsx` - Individual site wallet management with PayTo integration
    - `/ui` - shadcn/ui components (dialog, input, textarea, checkbox, label, select, table, etc.)
  - `/lib` - Utility functions
    - `utils.ts` - Class name utility functions
- `/public` - Static assets served directly
  - McDonald's logo and other brand assets
- `/admin` - HTML mockups (reference only)
- TypeScript configuration split between:
  - `tsconfig.app.json` - Application TypeScript config
  - `tsconfig.node.json` - Node/build tooling TypeScript config
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration

### Development Workflow
- ESLint configured with React hooks and React refresh plugins
- Vite plugin for React with Fast Refresh support
- Module-based package structure (type: "module" in package.json)

## Features

### Dashboard Views
1. **Admin Dashboard** (`/admin`)
   - Team performance overview
   - Recognition activity metrics
   - Store engagement tracking
   - Budget utilization

2. **Company Dashboard** (`/company`)
   - Multi-site overview with interactive Mapbox
   - Recognition trends (stacked column charts)
   - Cost analysis and budget tracking
   - Site performance comparison
   - Wallet management for all sites with editable limits

3. **Site Dashboard** (`/site`)
   - Individual site metrics
   - Awards management system
   - Cost tracking and analysis
   - Comprehensive reporting tools
   - Team engagement metrics
   - Site-specific wallet management with PayTo integration

### Key Components
- **Scratchie Modal**: 5-step wizard for creating recognition awards
  - Award type selection (Scratchie/Turbo Scratchie)
  - Category selection (Safety, Team Collaboration, Guest Satisfaction, etc.)
  - Participant selection with search
  - Winner configuration
  - Recognition message with voice recording option

- **Interactive Maps**: Mapbox integration showing:
  - Head office locations
  - Active/inactive sites
  - Site details in popups

- **Reporting System**: Comprehensive reports including:
  - Monthly site reports
  - Performance vs targets
  - Financial summaries
  - Safety metrics
  - Downloadable PDF/Excel exports

- **Wallet Management**:
  - **Company Wallet View**: 
    - Overview of all site wallets with balance tracking
    - Editable monthly spending limits, minimum balances, and top-up amounts
    - Pagination and search for managing multiple sites
    - Low balance alerts and status indicators
    - Bulk import/export functionality
  - **Site Wallet View**:
    - Individual site wallet with PayTo instant payment integration
    - Sawtooth balance pattern visualization showing auto top-ups
    - Combined monthly budget status showing spent vs remaining
    - Transaction history with categorized spending
    - Automatic top-up configuration when balance hits minimum
    - Real-time balance tracking with $150-$450 operating range

### Environment Variables
- Mapbox API tokens should be configured for map functionality
- Public token: `pk.eyJ1IjoiamFtZXNrZWxsIiwiYSI6ImNtNTJ4M28yZzAyczUycnB0c2xjd2gxdWQifQ.E7BFtiI2JdgCH91Eb2yctw`