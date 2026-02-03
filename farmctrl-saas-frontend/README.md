
# FARMCTRL Frontend Dashboard

The visual control center for the FARMCTRL SaaS platform. Built with Next.js, Tailwind CSS, and Framer Motion.

## ✨ Key Features
- **Emerald Glass UI**: A premium, agriculture-inspired design system with dark/light mode.
- **Role-Based Workflows**: Adaptive sidebars and dashboards for Owners, GMs, Supervisors, and Labour.
- **Multi-Tenant Ready**: Seamlessly switches context based on the user's farm allocation.
- **Bilingual Interface**: Supporting English/Urdu labeling for field staff accessibility.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Backend running at `http://localhost:4000`

### Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Custom CSS Modules (Glassmorphism)
- **State Management**: React Context (Auth/Session)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API Client**: Axios

## 📂 Directory Structure
- `src/app`: Routes and Pages (Login, Dashboard, Modules)
- `src/components`: Reusable UI components (StatCard, Sidebar, etc.)
- `src/context`: Authentication and Global State
- `src/lib`: API clients, Types, and Constants
