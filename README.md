# EduConnect - Modern Education Platform

A beautiful, modern education platform built with React, Tailwind CSS v4, and professional Lucide icons.

## 🚀 Features

- **Modern Design**: Premium UI with deep navy blue, warm orange, and light blue color palette
- **Responsive**: Fully responsive design that works on all devices
- **Professional Icons**: Using Lucide React for crisp, professional icons
- **Tailwind CSS v4**: Latest Tailwind with native CSS layers for optimal styling
- **Multiple Pages**: Landing, Courses, Features, About, and Contact pages
- **Smooth Animations**: Engaging hover effects and transitions throughout

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Professional icon library

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy Blue (#011F5B)
- **Accent**: Warm Orange (#FF6B35)
- **Background**: Light Blue (#E8F4F8)
- **Text**: Dark Gray (#212529)

### Typography
- **Headings**: Lexend (Google Fonts)
- **Body**: Source Sans 3 (Google Fonts)

## 📁 Project Structure

```
EduConnect/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📄 Pages

1. **Landing Page** (`/`) - Hero section, features, testimonials, and footer
2. **Courses Page** (`/courses`) - Browse and filter courses with search functionality
3. **Features Page** (`/features`) - Detailed feature showcase
4. **About Page** (`/about`) - Company mission, vision, values, and team
5. **Contact Page** (`/contact`) - Contact form, map, and FAQ section

## 🎯 Key Components

- **Navbar**: Fixed navigation with mobile menu
- **Hero**: Eye-catching hero section with floating cards
- **Features**: Grid of feature cards with icons
- **Testimonials**: Student reviews with ratings
- **Footer**: Multi-column footer with newsletter signup

## 📱 Responsive Design

All pages and components are fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Custom Styling

The project uses Tailwind CSS v4 with custom design tokens defined in `src/index.css`. All colors, fonts, and spacing are defined as CSS variables for easy customization.

## 📝 License

This project is created for educational purposes.

---

Built with ❤️ using React and Tailwind CSS