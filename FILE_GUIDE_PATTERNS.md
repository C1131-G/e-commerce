# E-Commerce Project - File Guide & Code Patterns

## 📑 Complete File Reference

### **Root Directory Files**

#### **package.json**
```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",          // Start dev server (hot reload)
    "build": "next build",      // Production build
    "start": "next start",      // Run production server
    "lint": "eslint"            // Check code quality
  },
  "dependencies": {
    "@prisma/client": "^7.8.0",      // Database client
    "lucide-react": "^1.17.0",       // Icon library
    "next": "16.2.6",                // React framework
    "prisma": "^7.8.0",              // ORM tool
    "react": "19.2.4",               // UI library
    "react-dom": "19.2.4"            // React DOM rendering
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",    // PostCSS plugin for Tailwind
    "@types/node": "^20",            // Node.js type definitions
    "@types/react": "^19",           // React type definitions
    "@types/react-dom": "^19",       // React DOM type definitions
    "eslint": "^9",                  // Linter
    "eslint-config-next": "16.2.6",  // Next.js ESLint config
    "tailwindcss": "^4",             // CSS framework
    "typescript": "^5"               // Type checker
  }
}
```

**What to do with this file:**
- ❌ Don't edit manually for adding packages
- ✅ Use `pnpm add package-name` instead
- ❌ Don't modify version numbers directly
- ✅ Update with `pnpm update`

---

#### **tsconfig.json** - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",           // Compile to ES2020 JavaScript
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,               // Enable strict type checking
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "jsx": "react-jsx",           // Use JSX transform
    "paths": {
      "@/*": ["./src/*"]          // Path alias for imports
    }
  }
}
```

**Key Settings:**
- `strict: true` - Catches more errors at compile time
- `paths` - Allows `import { X } from '@/components'` instead of relative paths
- `noEmit: true` - TypeScript only checks types, doesn't compile

---

#### **next.config.ts** - Next.js Configuration
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add custom configuration here
  // Examples:
  // images: { domains: ['example.com'] }
  // redirects: async () => [...]
  // rewrites: async () => [...]
  // env: { API_URL: process.env.API_URL }
};

export default nextConfig;
```

**Common Configurations:**
```typescript
// Image optimization
images: {
  domains: ['api.example.com', 'cdn.example.com']
}

// Environment variables
env: {
  API_URL: process.env.API_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
}

// Redirects
redirects: async () => [
  {
    source: '/old-page',
    destination: '/new-page',
    permanent: true
  }
]

// API rewrites
rewrites: async () => ({
  beforeFiles: [
    {
      source: '/api/:path*',
      destination: 'http://backend:3000/:path*'
    }
  ]
})
```

---

#### **postcss.config.mjs** - PostCSS Configuration
```javascript
// Tells PostCSS how to process CSS
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Process Tailwind CSS
  },
};
```

**What it does:**
- Processes CSS before it reaches the browser
- Tailwind plugin adds all utility classes
- Can add other plugins (autoprefixer, cssnano, etc.)

---

#### **eslint.config.mjs** - Code Quality Configuration
```javascript
// Enforces coding standards
// Examples:
// - No unused variables
// - Proper indentation
// - No console.log in production
// - Proper import order
// - Semicolon usage
```

**Common Rules:**
```javascript
{
  "rules": {
    "no-unused-vars": "error",           // Error on unused vars
    "prefer-const": "warn",              // Warn on let -> const
    "no-console": "warn",                // Warn on console.log
    "@next/next/no-html-link-for-pages": "error",  // Next.js specific
    "react/react-in-jsx-scope": "off"   // Not needed in React 17+
  }
}
```

---

#### **pnpm-workspace.yaml** - Monorepo Configuration
```yaml
allowBuilds:
  '@prisma/engines': true    # Can build native code
  prisma: true
  sharp: true                # Image processing library
  unrs-resolver: true

packages:
  - 'apps/*'                 # Include apps folder
  - 'packages/*'             # Include packages folder
```

**What it means:**
- Treats project as monorepo
- Installs dependencies once at root
- Shares common packages between projects
- Each package can have its own package.json

---

#### **prisma.config.ts** - Prisma Configuration (if needed)
```typescript
// Custom Prisma settings
// Usually empty unless you need custom behavior

export const prismaConfig = {
  // Your custom configuration
};
```

---

#### **pnpm-lock.yaml** - Dependency Lock File
```yaml
# Don't edit manually!
# Contains exact versions of all installed packages
# Ensures reproducible installs across machines
```

**Why it exists:**
- Locks exact versions
- Prevents "works on my machine" issues
- Shared between team members
- Checked into Git

---

### **Application Directory Files**

#### **app/layout.tsx** - Root Layout Component

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "Farmer management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}  {/* All page content renders here */}
      </body>
    </html>
  );
}
```

**What it does:**
- Wraps all pages in the application
- Sets metadata (title, description, favicon, etc.)
- Includes shared HTML structure
- Perfect place for global providers/context

**Enhanced Example:**
```typescript
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

#### **app/page.tsx** - Home Page

**Current Implementation:**
```typescript
'use client';  // Runs in browser, not server

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login after page loads
    router.replace('/login2');
  }, [router]);
  
  return null;  // Nothing to show
}
```

**What happens:**
1. Page loads
2. `useEffect` runs (after component mounts)
3. Router redirects to `/login2`
4. Nothing is rendered

**Why redirect?**
- Ensures unauthenticated users go to login
- Home page is not user-facing
- Acts as a gateway

---

#### **app/globals.css** - Global Styles

```css
/* Applied to entire application */

@tailwind base;       /* Base Tailwind styles */
@tailwind components; /* Tailwind components */
@tailwind utilities;  /* Tailwind utilities */

/* Custom global styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Custom utility class */
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

**Structure:**
- `@tailwind` directives import Tailwind CSS
- Custom CSS added below
- Applied globally to all pages

---

### **Authentication Pages**

#### **app/login2/page.tsx** - Login Form

```typescript
'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';  // Import icons

export default function LoginPage() {
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setIsLoading(true);

    try {
      // API call (to be implemented)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe })
      // });

      // if (response.ok) {
      //   setSuccess(true);
      //   setTimeout(() => router.push('/authorizer/dashboard'), 1500);
      // } else {
      //   setError('Invalid credentials');
      // }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Login successful! Redirecting...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              Remember me
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
```

**Key Components:**
- Email validation regex
- Password visibility toggle
- Error/success messages
- Loading states
- Form layout with Tailwind

---

#### **app/signup/page.tsx** - Similar structure to login
- Additional fields: name, confirm password
- Password strength validation
- Terms and conditions checkbox

---

### **Authorizer Module**

#### **app/authorizer/dashboard/page.tsx** - Main Dashboard

```typescript
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, Hourglass, XCircle } from 'lucide-react';

// TypeScript Type Definition
type Task = {
  id: string;
  farmer: string;
  location: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'rejected';
  urgency: 'low' | 'medium' | 'high';
  date: string;
};

// Mock Data (Replace with Prisma)
const mockTasks: Task[] = [
  {
    id: 'T-001',
    farmer: 'Ravi Kumar',
    location: 'Plot A - 1.243, 103.823',
    status: 'assigned',
    urgency: 'high',
    date: '2026-06-09',
  },
  // ... more tasks
];

export default function AuthorizerDashboard() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [query, setQuery] = useState('');

  // Memoized calculations
  const counts = useMemo(() => {
    return tasks.reduce(
      (acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [tasks]);

  // Filter tasks by search query
  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.farmer.toLowerCase().includes(query.toLowerCase()) ||
        t.location.toLowerCase().includes(query.toLowerCase())
      ),
    [tasks, query]
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Authorizer Dashboard
        </h1>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Assigned"
            value={counts.assigned || 0}
            color="blue"
            icon={<Hourglass />}
          />
          <StatCard
            label="In Progress"
            value={counts['in-progress'] || 0}
            color="yellow"
            icon={<Hourglass />}
          />
          <StatCard
            label="Completed"
            value={counts.completed || 0}
            color="green"
            icon={<CheckCircle />}
          />
          <StatCard
            label="Rejected"
            value={counts.rejected || 0}
            color="red"
            icon={<XCircle />}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by farmer name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Farmer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-800 font-semibold">
                    <Link href={`/authorizer/farmers/${task.id}`}>
                      {task.id}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {task.farmer}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700 flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    {task.location}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <UrgencyBadge urgency={task.urgency} />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {task.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Components

function StatCard({ label, value, color, icon }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-6 shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-50 scale-150">{icon}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClasses = {
    assigned: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  );
}

function UrgencyBadge({ urgency }) {
  const urgencyClasses = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyClasses[urgency]}`}>
      {urgency}
    </span>
  );
}
```

**Key Patterns:**
- Type definitions with TypeScript
- `useMemo` for performance optimization
- Reusable components (StatCard, badges)
- Search functionality
- Table display with hover effects

---

### **Prisma Files**

#### **prisma/schema.prisma** - Database Schema

```prisma
// Database configuration
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define your data models here
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?

  @@map("users")
}
```

**Key Concepts:**
- `@id` - Primary key (unique identifier)
- `@unique` - Must be unique
- `@default()` - Default value
- `@relation()` - Database relationships
- `@@map()` - Database table name

---

## 🎯 Common Code Patterns

### **Pattern 1: Client Component with State**

```typescript
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### **Pattern 2: Fetch Data on Mount**

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### **Pattern 3: Conditional Rendering**

```typescript
function Component() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
        <div>Admin Panel</div>
      ) : (
        <div>User Area</div>
      )}

      {isAdmin && <div>Admin Tools</div>}
    </div>
  );
}
```

### **Pattern 4: Form Handling**

```typescript
'use client';

import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Success!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### **Pattern 5: Using Prisma in API Route**

```typescript
// app/api/users/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch' }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    const user = await prisma.user.create({
      data: { email, name },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create' }), {
      status: 500,
    });
  }
}
```

### **Pattern 6: Dynamic Routes**

```typescript
// app/users/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

---

## 📚 Next Steps to Learn

1. **Read the official Next.js documentation**
2. **Understand React Hooks** (useState, useEffect, useMemo)
3. **Learn Prisma** (queries, migrations, relations)
4. **Master Tailwind CSS** (utility classes, responsive design)
5. **Implement authentication** (JWT, sessions)
6. **Connect database** and create migrations
7. **Deploy** to Vercel

---

**Version**: 1.0  
**Last Updated**: 2026-06-10
