# E-Commerce Project - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Directory Breakdown](#directory-breakdown)
5. [Key Technologies & Why](#key-technologies--why)
6. [File Explanations](#file-explanations)
7. [Architecture Flow](#architecture-flow)

---

## 🎯 Project Overview

This is a **Next.js-based e-commerce/farmer management platform** designed to manage farmers, authorizers, and administrative workflows. It includes:
- **Authentication System** (Login/Signup)
- **Role-Based Dashboards** (Authorizer views)
- **Farmer Data Management**
- **Task Assignment & Tracking**
- **Farmer Verification Pipeline**

The application is built with **Next.js 16**, **React 19**, **Prisma ORM**, and **PostgreSQL**, styled with **Tailwind CSS**.

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.6 | React framework with built-in routing, SSR, and optimization |
| **React** | 19.2.4 | UI component library and state management |
| **TypeScript** | 5.9.3 | Type safety for JavaScript code |
| **Tailwind CSS** | 4.3.0 | Utility-first CSS framework for styling |
| **Lucide React** | 1.17.0 | Icon library for UI components |

### Backend & Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Prisma** | 7.8.0 | ORM (Object-Relational Mapping) for database operations |
| **@prisma/client** | 7.8.0 | Prisma client for database queries |
| **PostgreSQL** | - | Relational database (configured in Prisma) |

### Development Tools
| Technology | Version | Purpose |
|-----------|---------|---------|
| **ESLint** | 9.39.4 | Code quality and style enforcement |
| **pnpm** | 11.4.0 | Package manager (faster than npm) |
| **TypeScript** | 5.9.3 | Static type checking |

---

## 📁 Project Structure

```
e-commerce/
├── app/                          # Main Next.js App Router directory
│   ├── globals.css               # Global CSS styles
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home/root page (redirects to login)
│   │
│   ├── authorizer/               # Authorizer role routes
│   │   ├── assigned/
│   │   │   └── page.tsx          # View assigned tasks
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main authorizer dashboard
│   │   ├── data/
│   │   │   └── farmers.ts        # Farmer data API/utilities
│   │   ├── farmers/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Individual farmer details
│   │   │       └── verification/
│   │   │           └── stage1/
│   │   │               └── page.tsx  # Farmer verification stage 1
│   │   ├── navigation/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Navigation/routing component
│   │   └── notifications/
│   │       └── page.tsx          # Notifications page
│   │
│   ├── login2/                   # Authentication pages
│   │   └── page.tsx              # Login form & logic
│   │
│   └── signup/
│       └── page.tsx              # User signup form & logic
│
├── apps/
│   └── web/                      # Secondary web app (older/alternative UI)
│       └── app/
│           ├── App.jsx           # Main React component
│           ├── main.jsx          # Entry point
│           ├── styles.css        # Component styles
│           └── Dashboard/        # Dashboard components
│
├── packages/
│   └── ui/                       # Shared UI components library
│
├── prisma/
│   └── schema.prisma             # Database schema definitions
│
├── public/                       # Static assets (images, icons, etc.)
│
├── Configuration Files:
│   ├── package.json              # Project dependencies & scripts
│   ├── pnpm-lock.yaml            # Locked dependency versions
│   ├── pnpm-workspace.yaml       # Monorepo configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── next.config.ts            # Next.js configuration
│   ├── postcss.config.mjs         # PostCSS configuration (for Tailwind)
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── prisma.config.ts          # Prisma configuration
│   └── README.md                 # Project README
```

---

## 📂 Directory Breakdown

### 1. **`app/` - Main Application Directory**
This is the **Next.js App Router** directory (introduced in Next.js 13+).

#### What it does:
- Contains all page routes
- Uses file-based routing (folder structure = URL routes)
- `page.tsx` files are rendered as pages
- `layout.tsx` provides layout structure

#### Key subdirectories:

**`app/authorizer/`** - Role-based Authorizer Module
- Manages farmer authorization and verification
- Contains dashboards, task assignments, and farmer data
- **Dashboard**: Main control center for authorizers
- **Farmers**: View and manage individual farmer records
- **Verification**: Multi-stage farmer verification process
- **Assigned**: View tasks assigned to this authorizer
- **Notifications**: Alert system

**`app/login2/`** - Authentication
- Login page with email/password validation
- Form handling and authentication logic
- Includes remember-me functionality

**`app/signup/`** - User Registration
- New user signup form
- Account creation logic

**Root Files:**
- `page.tsx`: Home page (auto-redirects to `/login2`)
- `layout.tsx`: Root layout wrapper for all pages
- `globals.css`: Application-wide CSS styles

---

### 2. **`apps/web/` - Alternative Web Application**

#### What it does:
- Monorepo structure for separate web app
- Contains a **React-based dashboard** (older/alternative UI)
- Uses JSX instead of TSX
- Separate from the main Next.js app

#### Structure:
- `App.jsx`: Main React component
- `main.jsx`: React entry point
- `Dashboard/`: Dashboard-related components
- `styles.css`: Component-level styles

**Why two apps?**
- Possibly for A/B testing different UIs
- Legacy code kept alongside new Next.js app
- Could be for different user roles or platforms

---

### 3. **`packages/ui/` - Shared UI Component Library**

#### What it does:
- Stores reusable UI components
- Can be used across multiple projects in the monorepo
- Promotes code reuse and consistency

#### Use case:
- Shared buttons, forms, modals, etc.
- Imported in both `app/` and `apps/web/`

---

### 4. **`prisma/` - Database Schema**

#### What it does:
- **`schema.prisma`**: Defines database structure
- Specifies models (tables) and relationships
- Configures database connection (PostgreSQL)
- Generates Prisma Client for queries

#### Key elements:
```prisma
generator client {
  provider = "prisma-client"
  output = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

**Generator**: Creates client code for database access
**Datasource**: Specifies PostgreSQL as the database

---

### 5. **`public/` - Static Assets**
- Images, icons, fonts, and other static files
- Served as-is by Next.js (no processing)

---

## 🔧 Key Technologies & Why

### **Next.js 16**
**Why used:**
- ✅ Full-stack React framework
- ✅ Built-in routing without libraries
- ✅ Server-side rendering (SSR) for better performance
- ✅ Static site generation (SSG) for fast loading
- ✅ API routes for backend endpoints
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Uses Turbopack for faster builds

### **React 19**
**Why used:**
- ✅ Latest version with performance improvements
- ✅ Component-based UI architecture
- ✅ Hooks for state management
- ✅ Client-side interactivity

### **TypeScript**
**Why used:**
- ✅ Type safety (catch errors before runtime)
- ✅ Better IDE autocomplete and documentation
- ✅ Refactoring support
- ✅ Code maintainability

### **Prisma ORM**
**Why used:**
- ✅ Type-safe database queries
- ✅ Auto-generated database client
- ✅ Migrations management
- ✅ Database agnostic (can switch databases)
- ✅ Excellent TypeScript support

### **Tailwind CSS**
**Why used:**
- ✅ Utility-first CSS (faster styling)
- ✅ No writing custom CSS
- ✅ Consistent design system
- ✅ Smaller CSS bundle size
- ✅ Built-in dark mode support

### **Lucide React**
**Why used:**
- ✅ Modern icon library with 5000+ icons
- ✅ Tree-shakeable (only import needed icons)
- ✅ React component-based
- ✅ Consistent design language

### **pnpm**
**Why used:**
- ✅ Faster than npm
- ✅ Monorepo support via `pnpm-workspace.yaml`
- ✅ Better disk space usage (shared dependencies)
- ✅ Stricter security model

---

## 📄 File Explanations

### **Configuration Files**

#### `package.json`
```json
{
  "scripts": {
    "dev": "next dev",      // Start development server
    "build": "next build",  // Build for production
    "start": "next start",  // Start production server
    "lint": "eslint"        // Run ESLint checks
  }
}
```

#### `next.config.ts`
- Configures Next.js behavior
- Add custom webpack config, plugins, etc.

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases, strict mode, etc.

#### `postcss.config.mjs`
- PostCSS plugins (mainly Tailwind CSS)

#### `eslint.config.mjs`
- Code quality rules and style enforcement

#### `pnpm-workspace.yaml`
```yaml
allowBuilds:
  '@prisma/engines': true  # Allow building native binaries
  prisma: true
  sharp: true
  unrs-resolver: true
```
- Defines monorepo workspace
- Specifies which packages can build native modules

#### `prisma.config.ts`
- Custom Prisma configuration (if needed)

---

## 🏗 Architecture Flow

### **User Journey Flow**

```
1. User visits http://localhost:3000
   ↓
2. app/page.tsx redirects to /login2
   ↓
3. app/login2/page.tsx - Login form
   ↓ (After authentication)
4. app/authorizer/dashboard/page.tsx - Main dashboard
   ↓
5. User can navigate to:
   - Assigned tasks (app/authorizer/assigned/)
   - Farmers list (app/authorizer/farmers/)
   - Farmer verification (app/authorizer/farmers/[id]/verification/stage1/)
   - Notifications (app/authorizer/notifications/)
```

### **Data Flow**

```
Frontend (React Components)
   ↓ (useEffect, onClick, etc.)
Prisma Client
   ↓ (Type-safe queries)
PostgreSQL Database
   ↓ (CRUD operations)
Server Response
   ↓
Component State Update
   ↓
Re-render UI
```

---

## 🚀 Running the Project

### **Development Server**
```bash
pnpm dev
# Opens on http://localhost:3000
```

### **Build for Production**
```bash
pnpm build
pnpm start
```

### **Check Code Quality**
```bash
pnpm lint
```

---

## 📊 Component Hierarchy

### **Root Layout**
```
app/layout.tsx
├── app/page.tsx (Redirects)
├── app/login2/page.tsx
├── app/signup/page.tsx
└── app/authorizer/
    ├── dashboard/page.tsx
    ├── farmers/[id]/page.tsx
    ├── assigned/page.tsx
    └── ...other routes
```

---

## 🔐 Authentication Flow

```
User enters email/password
   ↓
Login validation (email format check)
   ↓
API call to authenticate (if backend exists)
   ↓
Store session/token
   ↓
Redirect to authorizer dashboard
```

---

## 📈 Database Schema (Prisma)

The Prisma schema defines your database structure. Common models include:
- **User**: Admin/Authorizer users
- **Farmer**: Farmer information
- **Task**: Assigned verification tasks
- **Notification**: System notifications
- **Verification**: Verification records/stages

---

## 🎓 Learning Tips

1. **Next.js Routing**: File structure = URL routes (`app/authorizer/dashboard/page.tsx` → `/authorizer/dashboard`)
2. **React Components**: All `.tsx` files export React components
3. **Client vs Server**: Use `'use client'` directive for client-side components
4. **Prisma Queries**: Use `prisma.model.findMany()`, `create()`, `update()`, etc.
5. **Tailwind Classes**: Use utility classes like `flex`, `grid`, `p-4`, `text-lg`, etc.

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 📝 Summary Table

| Folder | Purpose | Tech | Status |
|--------|---------|------|--------|
| `app/` | Main Next.js routes | Next.js, React, TS | ✅ Active |
| `apps/web/` | Alternative React UI | React, JSX | ⚠️ Maintained |
| `packages/ui/` | Shared components | React, TS | 📦 Package |
| `prisma/` | Database schema | Prisma, PostgreSQL | 🗄️ Database |
| `public/` | Static files | Assets | 📂 Static |

---

**Last Updated**: 2026-06-10  
**Version**: 1.0  
**Project**: E-Commerce/Farmer Management Platform
