# OptiSAS — Sales Automation System

A full-featured Sales Automation System frontend built for **Boxfusion PTY Ltd** as a Capstone project for the Department of Informatics, University of Pretoria. OptiSAS digitises B2B sales workflows — from lead capture through contract closure — replacing fragmented manual processes with a unified, role-aware web application.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
  - [Routing](#routing)
  - [State Management](#state-management)
  - [HTTP Client](#http-client)
  - [Styling](#styling)
  - [Multi-Tenancy](#multi-tenancy)
- [User Roles & Permissions](#user-roles--permissions)
- [API Reference](#api-reference)
- [Enum Reference](#enum-reference)
- [Development Conventions](#development-conventions)
- [Scripts](#scripts)

---

## Overview

OptiSAS provides the following core business modules:

| Module                                     | Description                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| **Opportunity & Pipeline Tracking**        | Manage and visualise the sales opportunity pipeline (Kanban + list view) |
| **Proposal & Pricing Request Management**  | Handle proposal workflows with structured turnaround monitoring          |
| **Sales Activity Assignment & Follow-up**  | Assign tasks to business development managers and track completion       |
| **Renewal & Contract Deadline Monitoring** | Proactively track contract renewals to prevent missed deadlines          |
| **Reporting Dashboards**                   | Consolidated sales performance and BD activity visibility                |

---

## Tech Stack

| Layer             | Technology                                     |
| ----------------- | ---------------------------------------------- |
| Framework         | Next.js 16 (App Router)                        |
| UI Library        | React 19                                       |
| Language          | TypeScript 5                                   |
| Component Library | Ant Design v6                                  |
| Styling           | antd-style (CSS-in-JS with design tokens)      |
| HTTP Client       | Axios                                          |
| State Management  | React Context + `useReducer` + `redux-actions` |
| Charts            | Chart.js + react-chartjs-2                     |
| Compiler          | React Compiler (`reactCompiler: true`)         |

---

## Features

- **Authentication** JWT-based login/register with multi-tenancy support (create org, join org, or use demo tenant)
- **Clients & Contacts** Full CRUD with search, filtering, and contactclient linking
- **Opportunities** Kanban pipeline board with stage transitions, stage history, and assignment
- **Activities** Log calls, meetings, emails, and tasks against any entity; overdue and upcoming views
- **Notes** Freeform notes attachable to any entity
- **Documents** File upload (up to 50 MB) with category tagging and download
- **Pricing Requests** Create from an opportunity, assign to a team member, mark complete
- **Proposals** Line-item proposals with submit approve/reject workflow
- **Contracts** Full lifecycle management (Draft Active Renewed/Cancelled) with expiry alerts
- **Dashboard** KPI cards, pipeline metrics, activity summary, and expiring contracts
- **Reports** Filterable opportunity reports and sales-by-period charts (Admin/SalesManager only)
- **Role-Based Access Control** UI and API actions gated by user role

---

## Project Structure

```
optisas/
 app/
    (auth)/                   # Login & Register pages
       login/
       register/
       style/style.ts
    dashboard/
       layout.tsx            # Sidebar navigation + protected layout
       (routes)/
           activities/
           clients/
           contacts/
           contracts/
           documents/
           notes/
           opportunities/
           pricing-requests/
           profile/
           proposals/
           reports/
    layout.tsx                # Root layout (AuthProvider wrapper)
    providers.tsx
 components/
    auth/                     # Auth-specific components
    dashboard/                # Feature components (clients, contacts, etc.)
 constants/                    # Enum constants and option arrays per feature
 hoc/
    withAuth.tsx              # HOC for protecting routes
 providers/                    # Four-file state providers
    authProvider/
    clientProvider/
    contactProvider/
    opportunityProvider/
    activityProvider/
    noteProvider/
    documentProvider/
    pricingRequestProvider/
    proposalProvider/
    contractProvider/
    dashboardProvider/
    reportProvider/
 types/
    api.ts                    # Shared TypeScript interfaces (IPagedResult<T>, etc.)
 utils/
    axiosInstance.tsx         # Axios factory (reads token at call-time)
    dashboard/               # Per-feature utility helpers
 api.json                      # Authoritative OpenAPI 3.0.1 spec
 CLAUDE.md                     # Full API reference & architecture notes
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd optisas
npm install
```

### Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Credentials

| Role      | Email                       | Password    |
| --------- | --------------------------- | ----------- |
| Admin     | `admin@salesautomation.com` | `Admin@123` |
| Sales Rep | `bob@gmail.com`             | `hash123`   |

Default demo tenant ID: `11111111-1111-1111-1111-111111111111`

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_LINK=https://sales-automation-bmdqg9b6a0d3ffem.southafricanorth-01.azurewebsites.net
```

This is required by `utils/axiosInstance.tsx` and `providers/authProvider/index.tsx`. For local backend development, use `http://localhost:5053`.

---

## Architecture

### Routing

The app uses the Next.js App Router with route groups:

| Path                            | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `/`                             | Landing page                                            |
| `/(auth)/login`                 | Login                                                   |
| `/(auth)/register`              | Register (supports create org / join org / demo tenant) |
| `/dashboard`                    | Protected area with collapsible sidebar                 |
| `/dashboard/(routes)/{feature}` | Feature sub-routes                                      |

### State Management

Every feature module follows the **four-file provider pattern** located under `providers/{feature}Provider/`:

| File          | Responsibility                                                                                |
| ------------- | --------------------------------------------------------------------------------------------- |
| `context.tsx` | TypeScript interfaces, initial state, two contexts (`XxxStateContext`, `XxxActionContext`)    |
| `actions.tsx` | `XxxActionEnums` enum + `createAction` factories (Pending/Success/Error per operation)        |
| `reducer.tsx` | `handleActions` from `redux-actions` wired to the enums                                       |
| `index.tsx`   | Provider component; dispatches Pending Success/Error; exports `useXxxState` + `useXxxActions` |

Every async operation follows the **Pending Success Error** dispatch cycle. See `providers/authProvider/` as the canonical reference.

### HTTP Client

`utils/axiosInstance.tsx` exports a **factory function** (not a singleton). Always call `axiosInstance()` at the point of use it reads the Bearer token from `sessionStorage` at call-time and constructs an Axios instance automatically:

```ts
const res = await axiosInstance().get("/api/Opportunities");
```

> **Note:** Login writes the token to `sessionStorage`; register writes to `localStorage`; `getMe` reads from `localStorage`.

### Styling

All styles use `antd-style`'s `createStyles` with Ant Design design tokens. Each page/component has a co-located `style/style.ts`:

```ts
import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  container: css`
    padding: ${token.paddingLG}px;
    background: ${token.colorBgContainer};
  `,
}));
```

Consume with `const { styles } = useStyles();` `className={styles.container}`.
**Never use inline styles or Tailwind.**

### Multi-Tenancy

All data is scoped to the authenticated user's tenant the tenant ID is derived from the JWT and is never passed in request bodies or query strings. Attempting to access another tenant's resource returns **404** (not 403) to prevent existence leakage.

**Registration scenarios:**

| Scenario            | Fields provided     | Result                                  |
| ------------------- | ------------------- | --------------------------------------- |
| Create new org      | `tenantName`        | Caller becomes Admin of new tenant      |
| Join existing org   | `tenantId` + `role` | Joins that tenant; role cannot be Admin |
| Default demo tenant | Neither             | Falls back to default shared tenant     |

---

## User Roles & Permissions

| Role                           | How to obtain                                            | Access level                                                                         |
| ------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Admin**                      | Register with `tenantName`, or assigned by another Admin | Full access delete, approve/reject, assign, user management                          |
| **SalesManager**               | Register with `"role":"SalesManager"` when joining       | Full access including approve/reject proposals, assign opportunities                 |
| **BusinessDevelopmentManager** | Register with `"role":"BusinessDevelopmentManager"`      | Create and manage opportunities, proposals, pricing requests, contracts, activities  |
| **SalesRep**                   | Default when no role specified                           | Read own data, create activities and pricing requests, update assigned opportunities |

Roles are derived from the `roles[]` array on `IUserLoginResponse` in `providers/authProvider/context.tsx`.

---

## API Reference

The authoritative OpenAPI 3.0.1 spec is in [`api.json`](./api.json). The backend base URL is:

```
https://sales-automation-bmdqg9b6a0d3ffem.southafricanorth-01.azurewebsites.net
```

Key endpoint groups:

| Group            | Base Path              | Notable endpoints                                                  |
| ---------------- | ---------------------- | ------------------------------------------------------------------ |
| Auth             | `/api/Auth`            | `POST /login`, `POST /register`, `GET /me`                         |
| Clients          | `/api/Clients`         | CRUD + `GET /{id}/stats`                                           |
| Contacts         | `/api/Contacts`        | CRUD + `GET /by-client/{clientId}`, `PUT /{id}/set-primary`        |
| Opportunities    | `/api/Opportunities`   | CRUD + pipeline, stage transitions, assignment, `my-opportunities` |
| Proposals        | `/api/Proposals`       | CRUD + line items, submit/approve/reject                           |
| Pricing Requests | `/api/PricingRequests` | CRUD + assign, complete, `pending`, `my-requests`                  |
| Contracts        | `/api/Contracts`       | CRUD + activate, cancel, renewals, `expiring`                      |
| Activities       | `/api/Activities`      | CRUD + complete, cancel, `upcoming`, `overdue`, `my-activities`    |
| Documents        | `/api/Documents`       | Upload (`multipart/form-data`, max 50 MB), download, delete        |
| Notes            | `/api/Notes`           | CRUD                                                               |
| Dashboard        | `/api/Dashboard`       | Overview, pipeline metrics, sales performance, activities summary  |
| Reports          | `/api/Reports`         | Opportunities report, sales-by-period (Admin/SalesManager only)    |

See [`CLAUDE.md`](./CLAUDE.md) for the full endpoint table including all query parameters, request body shapes, and role restrictions.

---

## Enum Reference

All enums are integers. Always send numeric values to the API.

| Enum                     | Values                                                                    |
| ------------------------ | ------------------------------------------------------------------------- |
| **OpportunityStage**     | 1=Lead, 2=Qualified, 3=Proposal, 4=Negotiation, 5=ClosedWon, 6=ClosedLost |
| **OpportunitySource**    | 1=Inbound, 2=Outbound, 3=Referral, 4=Partner, 5=RFP                       |
| **ProposalStatus**       | 1=Draft, 2=Submitted, 3=Rejected, 4=Approved                              |
| **PricingRequestStatus** | 1=Pending, 2=InProgress, 3=Completed                                      |
| **ContractStatus**       | 1=Draft, 2=Active, 3=Expired, 4=Renewed, 5=Cancelled                      |
| **ActivityType**         | 1=Meeting, 2=Call, 3=Email, 4=Task, 5=Presentation, 6=Other               |
| **ActivityStatus**       | 1=Scheduled, 2=Completed, 3=Cancelled                                     |
| **Priority**             | 1=Low, 2=Medium, 3=High, 4=Urgent                                         |
| **ClientType**           | 1=Government, 2=Private, 3=Partner                                        |
| **RelatedToType**        | 1=Client, 2=Opportunity, 3=Proposal, 4=Contract, 5=Activity               |
| **DocumentCategory**     | 1=Contract, 2=Proposal, 3=Presentation, 4=Quote, 5=Report, 6=Other        |

---

## Development Conventions

- **No `useMemo`/`useCallback`** `reactCompiler: true` in `next.config.ts` handles memoization automatically.
- **Path alias `@/*`** resolves to the repo root (`@/providers/...`, `@/utils/...`, `@/components/...`).
- **Forms:** Use `<Form layout="vertical" requiredMark={false}>` with `size="large"` inputs. See `app/(auth)/login/page.tsx` for reference.
- **Typed props:** Always define a named `interface` for component props using `React.FC<Props>`.
- **Enums are integers** never send string enum names to the API.
- **Paged responses** use `IPagedResult<T>` from `types/api.ts`.
- **URL casing:** The server is case-insensitive; the codebase uses PascalCase by convention (e.g. `/api/Opportunities`).
- **New feature modules:** Create a provider under `providers/` following the four-file pattern, add the route under `app/dashboard/(routes)/{feature}/page.tsx`, and register it in the sidebar in `app/dashboard/layout.tsx`.

---

## Scripts

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```
