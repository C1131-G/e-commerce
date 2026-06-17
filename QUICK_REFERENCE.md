# E-Commerce Project - Quick Reference Guide

## 🚀 Quick Start

### Installation
```bash
cd c:\Users\Admin\e-commerce
pnpm install
```

### Development
```bash
pnpm dev
# Open http://localhost:3000
```

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

---

## 📁 Project Structure at a Glance

```
e-commerce/
├── app/                    # Main Next.js application
│   ├── page.tsx           # Home (redirects to login)
│   ├── layout.tsx         # Root layout
│   ├── login2/            # Login page
│   ├── signup/            # Signup page
│   └── authorizer/        # Authorizer features
├── apps/web/              # Alternative React app
├── packages/              # Shared packages (UI components)
├── prisma/                # Database schema
└── public/                # Static files
```

---

## 🔑 Key Technologies

| Technology | Purpose | Command |
|-----------|---------|---------|
| **Next.js** | React framework with routing | `pnpm dev` |
| **React** | UI components | Imported automatically |
| **TypeScript** | Type safety | Compile with `pnpm build` |
| **Prisma** | Database ORM | `pnpm prisma studio` |
| **Tailwind** | CSS framework | Utility classes |
| **pnpm** | Package manager | `pnpm install` |

---

## 🎯 Common Tasks

### Create a New Page
```typescript
// app/new-page/page.tsx
'use client';

export default function NewPage() {
  return <h1>New Page</h1>;
}
```

**Route:** `/new-page`

### Create an API Endpoint
```typescript
// app/api/hello/route.ts
export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'Hello' }), {
    status: 200,
  });
}
```

**Endpoint:** `GET /api/hello`

### Use Prisma to Query Database
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Find all users
const users = await prisma.user.findMany();

// Create a user
const newUser = await prisma.user.create({
  data: { email: 'user@example.com', name: 'John' },
});

// Update a user
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' },
});

// Delete a user
await prisma.user.delete({ where: { id: 1 } });
```

### Add a State Variable
```typescript
'use client';

import { useState } from 'react';

export default function Component() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### Make an API Call
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

### Style with Tailwind
```typescript
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-800">Title</h1>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Click me
  </button>
</div>
```

### Use Icons from Lucide
```typescript
import { Mail, Lock, CheckCircle, XCircle } from 'lucide-react';

export default function Component() {
  return (
    <div>
      <Mail size={24} />
      <Lock size={24} />
      <CheckCircle size={24} color="green" />
      <XCircle size={24} color="red" />
    </div>
  );
}
```

---

## 🏗️ Directory Purposes

### `app/` - Routes & Pages
- File structure = URL routes
- `page.tsx` renders the page
- `layout.tsx` wraps pages
- `api/` folder for API routes

### `prisma/` - Database
- `schema.prisma` defines models
- Run migrations with `pnpm prisma migrate dev`
- View database with `pnpm prisma studio`

### `public/` - Static Assets
- Images, icons, fonts
- Served as-is without processing

### `packages/ui/` - Reusable Components
- Shared UI components
- Used across multiple projects

### `apps/web/` - Alternative App
- Separate React application
- Older/alternative UI

---

## 📖 File Locations

| File | Purpose | When to Edit |
|------|---------|--------------|
| `package.json` | Dependencies | When installing packages |
| `tsconfig.json` | TypeScript config | Path aliases, strict mode |
| `next.config.ts` | Next.js config | Images, rewrites, redirects |
| `postcss.config.mjs` | CSS processing | Tailwind configuration |
| `eslint.config.mjs` | Code quality | Linting rules |
| `prisma/schema.prisma` | Database schema | When changing database structure |

---

## 🔗 File Routing Examples

```
File Path                           → URL Route
─────────────────────────────────────────────────────
app/page.tsx                        → /
app/dashboard/page.tsx              → /dashboard
app/users/[id]/page.tsx             → /users/123
app/api/users/route.ts              → /api/users
app/authorizer/dashboard/page.tsx   → /authorizer/dashboard
```

---

## 🎯 Component Patterns

### Client Component (Interactive)
```typescript
'use client';

import { useState } from 'react';

export default function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Server Component (Fetch Data)
```typescript
// Default in Next.js (no 'use client')
import { getUserData } from '@/lib/db';

export default async function ServerComponent() {
  const user = await getUserData();
  return <div>{user.name}</div>;
}
```

### Dynamic Routes
```typescript
// app/items/[id]/page.tsx
export default function ItemPage({ params }: { params: { id: string } }) {
  return <h1>Item: {params.id}</h1>;
}
```

---

## 🗄️ Database Operations Cheat Sheet

### CRUD Operations
```typescript
// CREATE
const item = await prisma.model.create({
  data: { field: 'value' },
});

// READ
const item = await prisma.model.findUnique({
  where: { id: 1 },
});

// UPDATE
const updated = await prisma.model.update({
  where: { id: 1 },
  data: { field: 'new value' },
});

// DELETE
await prisma.model.delete({
  where: { id: 1 },
});

// READ MULTIPLE
const items = await prisma.model.findMany({
  where: { status: 'active' },
  orderBy: { createdAt: 'desc' },
  take: 10,  // Limit
  skip: 0,   // Offset
});
```

---

## 🎨 Tailwind CSS Quick Reference

### Spacing
```
p-4    padding: 1rem
m-4    margin: 1rem
gap-4  gap: 1rem
```

### Typography
```
text-sm       font-size: 0.875rem
text-lg       font-size: 1.125rem
text-xl       font-size: 1.25rem
font-bold     font-weight: 700
text-gray-800 color: gray
```

### Colors
```
bg-blue-600    background: blue
text-red-500   color: red
border-gray-300  border: gray
```

### Layout
```
flex           display: flex
grid           display: grid
grid-cols-4    grid-template-columns: repeat(4, minmax(0, 1fr))
items-center   align-items: center
justify-between  justify-content: space-between
```

### Responsive
```
md:grid-cols-2   @media (min-width: 768px) grid-cols: 2
lg:grid-cols-4   @media (min-width: 1024px) grid-cols: 4
```

---

## 🔍 Debugging Tips

### Check Build Errors
```bash
pnpm build
```

### Check TypeScript Errors
```bash
# Files are checked automatically
# Fix import paths and type mismatches
```

### View Database
```bash
pnpm prisma studio
# Opens http://localhost:5555
```

### Check Development Server Logs
```
# Terminal where `pnpm dev` is running
# Errors and warnings appear here
```

### Browser Console
- Open DevTools: F12
- Check for JavaScript errors
- Network tab to see API calls

---

## 📱 Responsive Design

### Mobile First Approach
```typescript
<div className="
  grid grid-cols-1      // 1 column on mobile
  sm:grid-cols-2        // 2 columns on small screens
  md:grid-cols-3        // 3 columns on medium screens
  lg:grid-cols-4        // 4 columns on large screens
  gap-4
">
```

### Common Breakpoints
```
sm:  640px   (landscape phones)
md:  768px   (tablets)
lg:  1024px  (small laptops)
xl:  1280px  (desktops)
2xl: 1536px  (large desktops)
```

---

## 🔐 Security Best Practices

### Never Log Sensitive Data
```typescript
// ❌ Don't do this
console.log(password);  // DANGEROUS!

// ✅ Do this
console.log('Authentication attempt');
```

### Hash Passwords
```typescript
import bcrypt from 'bcrypt';

const hashed = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashed);
```

### Use Environment Variables
```typescript
// ❌ Don't
const apiKey = 'sk_live_abc123';

// ✅ Do
const apiKey = process.env.API_KEY;
```

### Validate Input
```typescript
// ✅ Always validate
if (!email || !email.includes('@')) {
  return 'Invalid email';
}
```

---

## 📚 Learning Resources

| Topic | Resource |
|-------|----------|
| **Next.js** | https://nextjs.org/docs |
| **React** | https://react.dev |
| **Prisma** | https://www.prisma.io/docs |
| **Tailwind** | https://tailwindcss.com/docs |
| **TypeScript** | https://www.typescriptlang.org/docs |

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
# Windows: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
pnpm dev -- -p 3001
```

### Issue: Module not found
- Check import path spelling
- Ensure file exists
- Restart dev server

### Issue: Prisma client not generated
```bash
# Generate Prisma client
pnpm prisma generate
```

### Issue: TypeScript errors
- Check type definitions
- Use `any` as last resort (not ideal)
- Read error message carefully

### Issue: Changes not showing
- Hard refresh browser (Ctrl+Shift+R)
- Clear `.next` folder
- Restart dev server

---

## ✅ Pre-Launch Checklist

- [ ] All TypeScript errors fixed
- [ ] All ESLint warnings resolved
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] API endpoints tested
- [ ] Authentication working
- [ ] Forms validated
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Security review completed

---

## 🚀 Deployment Commands

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📞 When You Get Stuck

1. **Read the error message carefully** - It usually tells you what's wrong
2. **Check documentation** - Most answers are in official docs
3. **Search online** - Stack Overflow, GitHub issues
4. **Check your code** - Most bugs are typos or logic errors
5. **Restart dev server** - Sometimes helps
6. **Clear cache** - Delete `.next`, `node_modules`, `pnpm-lock.yaml`

---

**Version**: 1.0  
**Last Updated**: 2026-06-10
