# Track Management Dashboard

Live Demo: https://table-management-app-tanstack.vercel.app/
API: https://table-management-app-tanstack.onrender.com

A high-performance React + TypeScript table management application for handling large datasets with advanced data operations.

## Features

### Core Features

* Server-side pagination
* Server-side sorting
* Search with debouncing
* Filtering (artist, genre, popularity range)
* Inline row editing (PATCH updates)
* Bulk row selection
* Bulk CSV export (selected rows)
* Export current filtered dataset
* Column visibility toggle
* Persistent column preferences using localStorage
* Loading, error, and empty states

### Performance Optimizations

* Virtualized row rendering using `react-window`
* Debounced search input
* Memoized column definitions using `useMemo`
* Server-side pagination to avoid loading full dataset

## Tech Stack

* React 19
* TypeScript
* TanStack Table
* Axios
* react-window
* JSON Server

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd table-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend

```bash
npm run dev
```

### 4. Start JSON Server

```bash
npx json-server db.json --port 3000
```

## Environment Variables

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Project Structure

```text
src/
├── components/
│   ├── Table.tsx
│   └── Pagination.tsx
├── hooks/
│   ├── useRecords.ts
│   └── useDebounce.ts
├── types/
│   └── record.ts
├── App.tsx
└── App.css
```

## Architecture Decisions

### Why server-side pagination?

To avoid loading all records into the browser and improve scalability.

### Why virtualization?

Even paginated datasets can become heavy. Virtualization renders only visible rows for better performance.

### Why inline editing?

Provides quick data updates without navigating away.

### Why localStorage for column visibility?

Improves user experience by persisting preferences.

## Tradeoffs

* Virtualized rows use flex layout instead of semantic table rows for performance.
* Column width management is manual for alignment consistency.

## Future Improvements

* Dark mode
* Advanced multi-column sorting
* Better form validation
* Drag-and-drop column reordering
* Row grouping
* Better accessibility support
