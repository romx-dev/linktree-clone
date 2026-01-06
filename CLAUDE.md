# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Linktree clone built with Next.js 16 (App Router), featuring user authentication with Clerk and a PostgreSQL database managed with Prisma. Users can create personalized link pages with unique usernames.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm run lint

# Database management
npm run db:studio      # Open Prisma Studio GUI
npx prisma migrate dev # Create and apply migrations
npx prisma generate    # Regenerate Prisma Client (runs automatically on postinstall)
```

## Architecture

### Authentication & User Flow

The app uses **Clerk** for authentication and has a three-state user experience:

1. **Not authenticated**: Landing page with sign-in button
2. **Authenticated but no database profile**: Username claim form
3. **Authenticated with profile**: Dashboard with link management

**Key pattern**: Always check both Clerk user (`currentUser()`) and database user (`prisma.user.findUnique`) to determine which UI state to show.

### Database Architecture

**Prisma setup (custom configuration)**:
- Client is generated to `app/generated/prisma/` instead of `node_modules`
- Uses `@prisma/adapter-pg` for PostgreSQL connection pooling
- Singleton pattern in `lib/prisma.ts` prevents multiple instances in development

**Models**:
- `User`: Links Clerk authentication (`clerkId`) to app data, includes unique `username` for public profile URLs
- `Link`: User-created links with title and URL, related to User via `userId`

**Important**: The `clerkId` field on User is the bridge between Clerk Auth and the database. Always use it to look up users from Clerk sessions.

### Server Actions Pattern

All mutations are handled via Next.js Server Actions in `app/actions.ts`:
- `claimUsername`: Creates initial user profile
- `createLink`: Adds new link to user's profile
- `deleteLink`: Removes link (with ownership verification)

**Pattern**: Actions use `currentUser()` from Clerk, then fetch the database user to perform operations. Always use `revalidatePath("/")` after mutations to refresh cached data.

### Routing Structure

- `/` - Home page (landing/onboarding/dashboard depending on auth state)
- `/[username]` - Public profile pages with user's links
- `/api/users/route.ts` - API route (if needed for external integrations)

**Dynamic route**: The `[username]` route looks up users case-insensitively and returns 404 for non-existent profiles.

### Styling

- **Tailwind CSS v4** with PostCSS
- Custom color scheme: Yellow (`#FFDD00`) as primary accent, minimal grayscale palette
- **Component library**: Minimal shadcn/ui setup with custom Button component using `class-variance-authority`
- **Global styles**: Custom `.card` class defined in `globals.css` for consistent container styling

### Internationalization

UI text is in Portuguese (Brazilian):
- "Bem-vindo ao Linktree"
- "Fazer Login"
- "Adicionar Link"
- etc.

When adding new features, maintain Portuguese for user-facing text.

## Key Files

- `app/actions.ts` - All server mutations
- `lib/prisma.ts` - Database client singleton
- `prisma/schema.prisma` - Database schema
- `app/layout.tsx` - Root layout with Clerk provider and header
- `app/page.tsx` - Main page with three-state rendering logic
- `app/[username]/page.tsx` - Public profile view

## Environment Variables

Required in `.env`:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Used for generating profile URLs
```

## Database Schema Modifications

When modifying `prisma/schema.prisma`:
1. Run `npx prisma migrate dev --name description_of_change`
2. The Prisma Client will regenerate automatically in `app/generated/prisma/`
3. Update imports if model structure changes

## Common Patterns

**Fetching user with links**:
```typescript
const dbUser = await prisma.user.findUnique({
  where: { clerkId: user.id },
  include: { links: true },
});
```

**Server Action error handling**:
```typescript
try {
  await prisma.user.create({ data: { ... } });
} catch (error: any) {
  if (error.code === "P2002") {
    throw new Error("Username is already taken");
  }
  throw error;
}
```

**Ownership verification before deletion**:
```typescript
await prisma.link.deleteMany({
  where: {
    id: parseInt(linkId),
    userId: dbUser.id,
  },
});
```
