# E-Commerce Project - Technical Deep Dive

## 📑 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Details](#component-details)
3. [Database Design](#database-design)
4. [Authentication System](#authentication-system)
5. [Role-Based Access](#role-based-access)
6. [API Endpoints](#api-endpoints)
7. [State Management](#state-management)
8. [Styling Strategy](#styling-strategy)

---

## 🏛️ Architecture Overview

### **Three-Tier Architecture**

```
┌─────────────────────────────────────────┐
│  PRESENTATION LAYER (Frontend)          │
│  - React Components                     │
│  - Tailwind CSS Styling                 │
│  - Lucide Icons                         │
│  - TypeScript Type Safety               │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  APPLICATION LAYER (Next.js)            │
│  - Page Routes (app/)                   │
│  - API Routes (api/)                    │
│  - Server Components                    │
│  - Client Components                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  DATA LAYER (Backend)                   │
│  - Prisma ORM                           │
│  - PostgreSQL Database                  │
│  - Database Schema                      │
└─────────────────────────────────────────┘
```

### **Monorepo Structure with pnpm**

```
Root Project
├── app/               (Main Next.js application)
├── apps/web/          (Separate React app)
├── packages/ui/       (Shared UI components)
└── prisma/            (Database schema - shared)
```

**Why Monorepo?**
- Single version control repository
- Shared dependencies
- Easier code reuse
- Centralized CI/CD

---

## 🧩 Component Details

### **Page Components Structure**

#### **app/page.tsx** - Root Page (Entry Point)
```typescript
'use client';  // Client-side rendering
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Auto-redirect unauthenticated users to login
    router.replace('/login2');
  }, [router]);
  
  return null;  // Nothing to display (redirecting)
}
```

**Key Concepts:**
- `'use client'`: Forces client-side rendering
- `useEffect`: Runs after component mounts
- `router.replace()`: Redirect without history entry
- Returns `null`: Component doesn't render anything

---

#### **app/login2/page.tsx** - Authentication Gateway
```typescript
'use client';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload
    
    // Validation checks
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    // API call (pseudo-code)
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // });
  };
}
```

**Key Features:**
- Form validation (client-side)
- Password visibility toggle
- Remember-me functionality
- Error handling
- Loading states

---

#### **app/authorizer/dashboard/page.tsx** - Main Dashboard
```typescript
'use client';
import { useState, useMemo } from 'react';
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

// Mock Data (Replace with Prisma queries)
const mockTasks: Task[] = [
  { 
    id: 'T-001', 
    farmer: 'Ravi Kumar', 
    location: 'Plot A - 1.243, 103.823', 
    status: 'assigned', 
    urgency: 'high', 
    date: '2026-06-09' 
  },
  // ... more tasks
];

export default function AuthorizerDashboard() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [query, setQuery] = useState('');

  // Memoized calculation (runs only when tasks change)
  const counts = useMemo(() => {
    return tasks.reduce((acc, t) => {
      // Count tasks by status
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [tasks]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Status Cards */}
      <div className="bg-blue-100 p-4 rounded">
        <h3>Assigned</h3>
        <p className="text-2xl font-bold">{counts.assigned || 0}</p>
      </div>
      {/* More cards... */}
    </div>
  );
}
```

**Key Concepts:**
- **Type Safety**: `Task` interface defines data structure
- **State Management**: `useState` for component state
- **Memoization**: `useMemo` prevents unnecessary recalculations
- **Grid Layout**: Tailwind's `grid-cols-4` for responsive layout
- **Mock Data**: Placeholder until real API is connected

---

## 🗄️ Database Design

### **Expected Prisma Schema**

```prisma
// Prisma Schema (prisma/schema.prisma)

// User Model - For login authentication
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String    // Should be hashed!
  role      String    // "admin", "authorizer", "farmer"
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

// Farmer Model - Farmer information
model Farmer {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  phone         String
  location      String    // Coordinates: "lat, long"
  status        String    // "pending", "verified", "rejected"
  verificationStage  Int  // 1, 2, 3, etc.
  assignedTo    String?   // Authorizer ID
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  tasks         Task[]    // One farmer has many tasks
  verifications Verification[]
}

// Task Model - Verification tasks
model Task {
  id          String   @id @default(cuid())
  farmer      Farmer   @relation(fields: [farmerId], references: [id])
  farmerId    String
  assignedTo  String   // User ID of authorizer
  status      String   // "assigned", "in-progress", "completed", "rejected"
  urgency     String   // "low", "medium", "high"
  dueDate     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Verification Model - Track verification process
model Verification {
  id        String   @id @default(cuid())
  farmer    Farmer   @relation(fields: [farmerId], references: [id])
  farmerId  String
  stage     Int      // Which stage (1, 2, 3)
  status    String   // "pending", "approved", "rejected"
  comments  String?
  createdAt DateTime @default(now())
}

// Notification Model - System notifications
model Notification {
  id      String   @id @default(cuid())
  userId  String   // User ID receiving notification
  message String
  read    Boolean  @default(false)
  type    String   // "info", "warning", "error"
  createdAt DateTime @default(now())
}
```

### **Database Relations Diagram**

```
User (1) ──────────────► (Many) Task
                         (Assigned to)

Farmer (1) ────────────► (Many) Task
                        (Has tasks)

Farmer (1) ────────────► (Many) Verification
                        (Has verifications)

User (1) ──────────────► (Many) Notification
                         (Receives)
```

---

## 🔐 Authentication System

### **Current State**
- Basic form validation (client-side only)
- No backend authentication implemented
- Email format validation

### **Recommended Implementation**

#### **Step 1: Hash Password (Never store plain text!)**
```typescript
// Use bcrypt for password hashing
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 10);
// Store hashedPassword in database
```

#### **Step 2: Create Login API Route**
```typescript
// app/api/auth/login/route.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response('User not found', { status: 404 });

  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return new Response('Invalid password', { status: 401 });

  // Create JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  // Return token
  return new Response(JSON.stringify({ token }), { status: 200 });
}
```

#### **Step 3: Protect Routes with Middleware**
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Allow public routes
  if (request.nextUrl.pathname === '/login2' ||
      request.nextUrl.pathname === '/signup') {
    return NextResponse.next();
  }

  // Check token for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login2', request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login2', request.url));
  }
}

export const config = {
  matcher: ['/authorizer/:path*', '/dashboard/:path*']
};
```

---

## 🔒 Role-Based Access Control (RBAC)

### **Role Hierarchy**

```
ADMIN
  ├─ Full system access
  ├─ Manage users
  └─ View all reports

AUTHORIZER
  ├─ View assigned farmers
  ├─ Verify farmers
  ├─ Update task status
  └─ Cannot access admin panel

FARMER
  ├─ View own profile
  ├─ View verification status
  └─ Cannot access other farmer data
```

### **Implementation Example**

```typescript
// Middleware to check role
async function checkRole(userId: string, requiredRole: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.role === requiredRole;
}

// In route handler
export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  if (decoded.role !== 'authorizer') {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Process request...
}
```

---

## 🔌 API Endpoints (To Be Implemented)

### **Authentication**
```
POST   /api/auth/login          - User login
POST   /api/auth/signup         - User registration
POST   /api/auth/logout         - User logout
GET    /api/auth/me             - Get current user
```

### **Farmers**
```
GET    /api/farmers             - List all farmers
GET    /api/farmers/:id         - Get farmer details
POST   /api/farmers             - Create farmer
PUT    /api/farmers/:id         - Update farmer
DELETE /api/farmers/:id         - Delete farmer
```

### **Tasks**
```
GET    /api/tasks               - List tasks
GET    /api/tasks/:id           - Get task details
POST   /api/tasks               - Create task
PUT    /api/tasks/:id           - Update task
DELETE /api/tasks/:id           - Delete task
```

### **Verification**
```
GET    /api/verification/:id    - Get verification record
POST   /api/verification        - Create verification
PUT    /api/verification/:id    - Update verification (approve/reject)
```

### **Notifications**
```
GET    /api/notifications       - Get user notifications
PUT    /api/notifications/:id   - Mark as read
DELETE /api/notifications/:id   - Delete notification
```

---

## 🧠 State Management

### **Current Approach: React Hooks**

**Local Component State:**
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

### **Future: Global State Management Options**

1. **Context API + Hooks** (Recommended for medium projects)
```typescript
// contexts/AuthContext.tsx
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in components
const { user } = useContext(AuthContext);
```

2. **Zustand** (Simpler, performant)
```typescript
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

3. **Redux** (For large applications)
- More boilerplate but powerful
- Better for complex state flows

---

## 🎨 Styling Strategy

### **Tailwind CSS Utility Approach**

**Class Structure:**
```html
<!-- Layout -->
<div class="flex flex-col gap-4 p-6">
  
  <!-- Card Component -->
  <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    
    <!-- Typography -->
    <h2 class="text-xl font-bold text-gray-800 mb-2">
      Dashboard
    </h2>
    
    <!-- Status Badge -->
    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
      Active
    </span>
    
  </div>
  
</div>
```

### **Color Scheme**

```
Primary:    Blue (#3B82F6)       - Main actions
Success:    Green (#10B981)      - Completed, verified
Warning:    Yellow (#F59E0B)     - In-progress, pending
Danger:     Red (#EF4444)        - Rejected, errors
Gray:       Gray (#6B7280)       - Neutral, disabled
```

### **Responsive Breakpoints**

```css
sm:  640px   - Small devices
md:  768px   - Tablets
lg:  1024px  - Desktops
xl:  1280px  - Large desktops
```

**Example:**
```html
<!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────┐
│  User Action        │ (Click button, submit form)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│  Event Handler (onClick, onChange)  │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  State Update (setState)             │
│  - Form validation                   │
│  - Error handling                    │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  API Call (fetch/axios)              │
│  POST /api/endpoint                  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Server Processing                   │
│  - Validate request                  │
│  - Prisma query                      │
│  - Database operation                │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Response                            │
│  Return JSON data                    │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Update Component State              │
│  setData, setLoading, setError       │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Re-render UI                        │
│  Display updated data                │
└──────────────────────────────────────┘
```

---

## 📋 Development Checklist

- [ ] Set up environment variables (.env.local)
- [ ] Connect to PostgreSQL database
- [ ] Run Prisma migrations (`pnpm prisma migrate dev`)
- [ ] Implement authentication API routes
- [ ] Create protected middleware
- [ ] Set up error boundaries
- [ ] Add loading states and spinners
- [ ] Implement success/error notifications
- [ ] Add form validation (server-side)
- [ ] Set up logging system
- [ ] Add unit tests
- [ ] Configure deployment (Vercel)

---

## 🚀 Performance Optimization Tips

1. **Image Optimization**
   ```typescript
   import Image from 'next/image';
   <Image src="/avatar.png" alt="User" width={40} height={40} />
   ```

2. **Code Splitting**
   - Next.js does this automatically
   - Only load code needed for each page

3. **Memoization**
   ```typescript
   const MemoComponent = React.memo(ExpensiveComponent);
   const memoValue = useMemo(() => expensiveCalculation(), [dependency]);
   ```

4. **Lazy Loading**
   ```typescript
   const Component = dynamic(() => import('./Component'), {
     loading: () => <Spinner />,
   });
   ```

5. **Database Query Optimization**
   ```typescript
   // Use select to get only needed fields
   const users = await prisma.user.findMany({
     select: { id: true, email: true }
   });
   ```

---

**Version**: 1.0  
**Last Updated**: 2026-06-10
