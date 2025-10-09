# Izzy & Zé Wedding RSVP Website

## Overview

This is a multilingual wedding RSVP website for Izzy & Zé's wedding in Évora, Portugal on September 5, 2026. The application provides a beautiful, video-driven single-page experience where guests can view event details and submit their RSVP through an embedded Airtable form. The site supports three languages: English, Portuguese, and Spanish (Mexican).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (no server-side routing needed)

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design follows "nostalgic minimalism" aesthetic with video backgrounds and elegant typography

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Component-level state with React hooks
- No complex global state - simple prop drilling for content

**Styling Approach**
- Custom Tailwind configuration with design system tokens for colors, spacing, and typography
- Google Fonts integration: Cormorant Garamond (serif, for emotional content) and Inter (sans-serif, for functional content)
- Black and white color palette in current phase with provisions for future warm tones
- Responsive design with mobile-first breakpoints

### Content & Internationalization

**Multi-language Support**
- Static content objects for three locales (en, pt, mx) defined in `/client/src/lib/content.ts`
- Route-based language switching (`/en`, `/pt`, `/mx`)
- Language switcher component in top-right corner with flag indicators
- No i18n library - simple content object approach for this limited use case

**Content Structure**
- Hero section content (couple names, date, location, CTA)
- Event details section content
- Airtable form URLs per language

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Minimal API surface - currently no active endpoints (routes placeholder exists)
- Vite middleware integration for development hot module replacement

**Development vs Production**
- Development: Vite dev server with HMR through Express middleware
- Production: Static assets served from built `/dist/public` directory
- Build process: Vite builds client, esbuild bundles server

### Data Storage

**Database Setup**
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Schema defined in `/shared/schema.ts` with basic user table (currently unused)
- In-memory storage implementation (`MemStorage`) in development
- Database credentials expected via `DATABASE_URL` environment variable

**Current Data Architecture**
- RSVP submissions handled entirely through embedded Airtable forms (external service)
- No database persistence required for current MVP functionality
- User authentication schema exists but is not implemented in the application flow

### External Dependencies

**Third-Party Services**
- **Airtable**: RSVP form hosting and data collection (3 separate forms for each language)
  - English form: `app5BN54ZOQHHWwxj/pagyjHpr2QSBvfVEe`
  - Portuguese form: `app5BN54ZOQHHWwxj/pagXknbKC6W9hN3gq`
  - Spanish form: `app5BN54ZOQHHWwxj/pagdAoXI7DqEi0qlN`

**External APIs & Resources**
- Google Fonts API for Cormorant Garamond and Inter typefaces
- Video assets expected to be served from `/assets` directory (configured in Vite alias)

**Database & Infrastructure**
- Neon PostgreSQL (serverless) - configured but optional for current implementation
- Drizzle Kit for schema migrations

**Development Tools**
- Replit-specific Vite plugins for runtime error overlay, cartographer, and dev banner
- ESBuild for server bundling in production

### Key Architectural Decisions

**Single-Page Application Choice**
- **Rationale**: Wedding RSVP sites need minimal navigation and maximum visual impact
- **Benefits**: Smooth scrolling experience, video background persists across sections, simpler deployment
- **Trade-offs**: SEO less critical for private event sites, no server-side rendering needed

**Embedded Forms Over Custom Backend**
- **Rationale**: Airtable provides form building, validation, and data management out of the box
- **Benefits**: Faster development, visual data management, built-in email notifications
- **Trade-offs**: Less control over form styling, dependency on third-party service
- **Alternative considered**: Custom form with database persistence (over-engineering for this use case)

**Route-Based Localization**
- **Rationale**: Simple implementation without additional libraries, SEO-friendly URLs
- **Benefits**: Shareable language-specific links, clear URL structure, no hydration complexity
- **Trade-offs**: Content duplication in routes, manual language switching required

**Video Background Hero**
- **Rationale**: Nostalgic home video aesthetic creates emotional connection
- **Implementation**: HTML5 video with gradient overlay for text legibility
- **Considerations**: Video optimization and fallback backgrounds for performance

**Minimal Backend Surface**
- **Rationale**: Current requirements don't need server-side processing
- **Benefits**: Simpler deployment, lower hosting costs, static site capabilities
- **Future considerations**: Backend ready for authentication, guest management, or custom RSVP processing if needed