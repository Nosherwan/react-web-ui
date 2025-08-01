# MindfulList.com.au

A curated platform for discovering mindfulness apps, articles, and resources. Built with React, TypeScript, Vite, and TailwindCSS, MindfulList.com.au helps users find top-rated apps, read expert blog posts, and improve their wellbeing.

## Overview

MindfulList.com.au is a modern web application that aggregates and reviews mindfulness and personal growth apps, alongside a regularly updated blog. Users can browse, search, and filter apps, read detailed reviews, and explore articles on mental wellness, mindfulness, and productivity.

## Features

- **Curated App Catalogue:** Browse and search a list of mindfulness and wellness apps, with ratings, reviews, download counts, and direct links.
- **Featured App:** Highlights a random top app on the homepage.
- **Blog Section:** Read articles on mindfulness, mental health, and personal growth, with infinite scroll and rich formatting.
- **Authentication:** Register, login, password reset, and secure session management.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **SEO & Social Sharing:** OpenGraph and Twitter meta tags for better sharing and search visibility.
- **Accessibility:** Keyboard navigation, semantic HTML, and ARIA roles.
- **Modern UI:** Built with TailwindCSS and custom components for a clean, user-friendly experience.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS, custom CSS
- **Routing:** React Router v7
- **State Management:** React Context (ShareProvider)
- **Forms & Validation:** React Hook Form, Zod
- **GraphQL:** Custom fetchers for API communication
- **Utilities:** date-fns, lodash.debounce, html2pdf.js
- **Linting:** ESLint with TypeScript and React plugins
- **Build Tools:** Vite, vite-plugin-compression

## Getting Started

### Prerequisites

- Node.js >= 18
- npm (or yarn/pnpm)

### Installation

```sh
git clone https://github.com/yourusername/mindfullist.git
cd mindfullist/react-web-ui
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:4000/graphql
```

Adjust the API endpoint as needed for your backend.

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

To build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Linting

Run ESLint to check code quality:

```sh
npm run lint
```

## Project Structure

```
react-web-ui/
├── public/                # Static assets (SVGs, robots.txt, sitemap.xml)
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable React components (AppCard, BlogPreview, Header, etc.)
│   ├── fetchers/          # GraphQL API fetch logic
│   ├── hooks/             # Custom React hooks (localStorage, useDebounce, etc.)
│   ├── requests/          # GraphQL query/mutation strings
│   ├── routes/            # Page components for routing (mainHome, blogs, blog, login, etc.)
│   ├── styles/            # CSS and Tailwind imports
│   ├── types/             # TypeScript interfaces and types
│   ├── utils/             # Utility functions (auth, generic helpers, token refresh)
│   ├── zod/               # Zod schemas for form validation
│   ├── main.tsx           # App entry point
│   └── vite-env.d.ts      # Vite environment types
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
├── tsconfig*.json         # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── eslint.config.js       # ESLint configuration
```

## Main Routes

- `/` — Home: Featured app and catalogue listing
- `/blogs` — Blog listing with infinite scroll
- `/blog/:slug` — Individual blog post
- `/login` — User login
- `/register` — User registration
- `/create-password` — Password creation (after registration)
- `/forgot-password` — Password reset

## Data Fetching

All data is fetched from a GraphQL API endpoint, with custom fetchers handling authentication, error handling, and token refresh logic.

## Customization & Extensibility

- **Styling:** Easily extend with TailwindCSS utility classes or custom CSS.
- **API:** Point to any compatible GraphQL backend via `.env`.
- **Components:** Modular and reusable, making it simple to add new features or pages.

## Contributing

Pull requests and issues are welcome! Please follow conventional commit messages and ensure code passes linting and builds before submitting.

## License

MIT

---

**MindfulList.com.au** — Helping you find the best tools for mindfulness and wellbeing.