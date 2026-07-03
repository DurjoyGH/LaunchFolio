# LaunchFolio

LaunchFolio is an AI-powered portfolio generator built as a modern **Next.js Fullstack Application**. It analyzes user skills, experience, and design preferences using Google's Gemini AI to dynamically generate and deploy stunning personal portfolio websites.

## 🚀 Features

- **AI-Powered Generation**: Leverages the Gemini AI model to plan out optimal UI components, write professional copy, and establish a unique design language (themes, fonts, colors) based on the user's input.
- **True Fullstack Next.js Architecture**: No separate Express backend. All API routes, background processing, database connections, and authentication are strictly handled by Next.js App Router API Routes (`/src/app/api/...`).
- **Dynamic Component Rendering**: The backend generates a JSON "blueprint" representing the portfolio. The frontend React components dynamically render this blueprint into a beautiful website without relying on hardcoded HTML strings.
- **Secure Authentication**: JWT-based authentication using HTTP-only cookies.
- **Media Management**: Direct image and resume uploads to Cloudinary using native web `FormData`.
- **Database Caching**: Optimized Mongoose connections to prevent hot-reload memory leaks during local development.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
- **AI Integration**: [OpenRouter API](https://openrouter.ai/) (Gemini / DeepSeek)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Storage**: [Cloudinary](https://cloudinary.com/) (Images & Raw Files)
- **Emails**: Nodemailer

## 📐 Architecture & Data Flow

LaunchFolio operates on a clean separation of concerns, keeping all design logic on the frontend and all AI/Data logic on the Next.js API routes.

1. **User Input Flow**: The user fills out a multi-step form (managed by Zustand `generate.store.ts`) detailing their professional experience, hobbies, skills, and design preferences.
2. **API Trigger**: The frontend submits the structured data to `POST /api/portfolio`.
3. **AI Planning**:
   - The API route invokes `planPortfolio()`, which prompts the AI to select a layout blueprint (e.g., `NavbarGlass`, `HeroGradient`) from the `COMPONENT_REGISTRY`.
   - The API route then invokes `generateContent()` to write professional copy tailored to the selected blueprint.
4. **Database Persistence**: The generated `blueprint` and `content` are saved directly to MongoDB.
5. **Headless Deployment**: The portfolio status is set to `deployed` instantly.
6. **Dynamic Rendering**: When a visitor navigates to `/p/[id]`, the `PortfolioRenderer` component fetches the JSON blueprint and dynamically maps the chosen string variants to their actual React Component implementations.

## 💻 Local Setup & Development

### 1. Environment Variables

Create a `.env` file in the root directory (where this README is located) and add the following variables:

```env
# Database
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/launchfolio

# Next.js URLs
NEXT_PUBLIC_API_URL=/api
FRONTEND_URL=http://localhost:3000

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# AI Configuration (OpenRouter)
AI_API_KEY=your_openrouter_api_key
AI_MODEL=deepseek-v4-flash

# Cloudinary (Media Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (Emails)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 2. Installation

Install the necessary dependencies:

```bash
npm install
```

### 3. Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

## 📂 Project Structure

```
src/
├── api/                  # Frontend API client wrappers (Zustand -> API Routes)
├── app/                  # Next.js App Router Pages
│   ├── api/              # Fullstack Backend API Routes (/api/auth, /api/portfolio)
│   ├── auth/             # Login and Registration pages
│   ├── dashboard/        # User dashboard
│   ├── generate/         # Multi-step AI generation form
│   └── p/[id]/           # Dynamic public portfolio renderer
├── components/           # Reusable UI Components
│   ├── generate/         # Step components for the portfolio generation wizard
│   ├── layout/           # App navigation and layout structures
│   ├── portfolio-template/ # Dynamic portfolio blueprint components (Hero, About, etc.)
│   └── ui/               # Base UI elements (Buttons, Inputs, etc.)
├── lib/                  # Shared Backend/Frontend Utilities
│   ├── ai/               # AI generation logic (Gemini client, Prompt Builder)
│   ├── models/           # Mongoose schemas (User, Portfolio, Contact)
│   ├── auth.ts           # JWT authentication helpers
│   ├── cloudinary.ts     # Media upload configuration
│   ├── db.ts             # Cached Mongoose connection handler
│   └── email.ts          # Nodemailer setup and HTML templates
└── stores/               # Zustand state management
```
