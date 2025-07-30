# 🗂️ Frontend - Masjid ul Haram Waste Management Dashboard

Modern, responsive React/Next.js frontend application for the **Masjid ul Haram** waste management system, providing real-time monitoring and management capabilities for Islam's holiest site.

## 🌟 Overview

This Next.js application serves as the primary interface for waste management operations at **Masjid ul Haram** (the Grand Mosque) in Mecca, Saudi Arabia. Built with modern web technologies and Islamic design principles, it provides comprehensive monitoring and management capabilities for millions of daily pilgrims.

## 🛠 Technology Stack

### **Core Framework**

- **Next.js 15**: App Router with React Server Components
- **TypeScript 5**: Full type safety and modern JavaScript features
- **React 19**: Latest React with concurrent features

### **Styling & Design**

- **Tailwind CSS**: Utility-first CSS framework with RTL support
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Beautiful, customizable icons
- **next-themes**: Dark/light theme support with system preference
- **CVA**: Class variance authority for component variants

### **State Management**

- **Zustand**: Lightweight state management
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation

### **Data Visualization**

- **Recharts**: Composable charting library
- **Leaflet**: Interactive maps with React Leaflet
- **Custom Charts**: Waste analytics and performance metrics

### **Internationalization**

- **next-intl**: Full i18n with Arabic RTL and English LTR support
- **Cultural Adaptation**: Islamic calendar integration and cultural considerations

### **Additional Features**

- **Socket.io Client**: Real-time WebSocket connections
- **jsPDF**: PDF generation for reports
- **date-fns**: Date manipulation and formatting
- **CMDK**: Command palette for power users

## 🕌 Key Features

### **🏠 Dashboard Overview**

- **Real-time Statistics**: Live counters for bins, trucks, and operations across all mosque areas
- **Islamic-Inspired Design**: Color schemes and UI elements respecting Islamic aesthetics
- **Carbon Filter Countdown**: Real-time monitoring of activated carbon filter replacement schedule
- **Connection Status**: Live WebSocket connection monitoring with prayer time considerations
- **Multi-language Support**: Full Arabic RTL and English LTR support

### **🗑️ Waste Bin Management**

- **Sacred Area Filtering**: Specialized filters for Tawaf area, Safa & Marwa, Gates, and Maqam Ibrahim
- **Fill Level Monitoring**: Real-time fill level tracking with color-coded Islamic-inspired indicators
- **Collection History**: Complete historical data for each bin across different seasons
- **Maintenance Tracking**: Health status and maintenance scheduling for continuous operation
- **Hajj Season Analytics**: Specialized metrics for pilgrimage periods with millions of visitors
- **Export Capabilities**: CSV export with Arabic text support and comprehensive reporting

### **🚛 Fleet Management**

- **Mosque Route Optimization**: Route planning optimized for mosque traffic patterns and prayer times
- **Prayer Time Coordination**: Operation scheduling that respects prayer times and congregational activities
- **Real-time Tracking**: Live location monitoring throughout the mosque complex
- **Performance Analytics**: Distance traveled, collections completed, efficiency metrics
- **Driver Management**: Driver assignments with consideration for sacred space protocols

### **📍 Location Intelligence**

- **Sacred Space Mapping**: Interactive mapping specifically designed for Masjid ul Haram layout
- **Worship Area Monitoring**: Specialized tracking for critical worship areas
- **Pilgrim Flow Analysis**: Heat maps showing waste generation patterns during different worship activities
- **Zone Management**: Location-based filtering aligned with mosque architectural zones
- **Critical Alerts**: Immediate notifications for bins requiring attention in high-priority areas

### **🔢 Waste Calculator**

- **Islamic Waste Guidelines**: Calculations aligned with Islamic principles of cleanliness and sustainability
- **Treatment Method Analysis**: Compare different waste treatment approaches suitable for sacred environments
- **Environmental Impact**: Carbon footprint reduction calculations for the holy city
- **Energy Output Calculation**: Potential energy generation from waste processing
- **Sustainability Metrics**: Environmental impact assessments for responsible stewardship

### **📊 Analytics & Reporting**

- **Hajj Season Analytics**: Specialized reporting for pilgrimage periods
- **Waste Type Analysis**: Detailed breakdown by categories with Arabic descriptions
- **Performance Metrics**: KPIs for operational efficiency during peak and off-peak periods
- **Trend Analysis**: Weekly, monthly, and seasonal trend visualization
- **Management Reports**: Executive summaries for mosque administration

## 🏗️ Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Islamic design tokens
│   ├── layout.tsx               # Root layout with RTL/LTR support
│   ├── page.tsx                 # Main dashboard page
│   └── simulation/              # Simulation and testing features
│       └── page.tsx
├── components/                   # React Components
│   ├── ui/                      # Radix UI Components (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── header.tsx           # Main header with navigation
│   │   ├── layout.tsx           # Dashboard layout
│   │   ├── tabs.tsx             # Tab navigation
│   │   └── modals.tsx           # Modal management
│   ├── map/                     # Map components
│   │   ├── leaflet-map.tsx      # Main map component
│   │   ├── leaflet-bin-marker.tsx  # Bin markers
│   │   ├── leaflet-truck-marker.tsx # Truck markers
│   │   ├── interactive-map-dynamic.tsx
│   │   ├── map-controls.tsx
│   │   ├── color-map-key.tsx
│   │   └── quick-filters.tsx
│   ├── icons/                   # Custom icons
│   │   └── trash-bin-icons.tsx
│   ├── bin-card.tsx             # Waste bin display card
│   ├── truck-card.tsx           # Truck information card
│   ├── location-card.tsx        # Location display card
│   ├── waste-chart.tsx          # Waste analytics charts
│   ├── carbon-filter-countdown.tsx # Carbon filter monitoring
│   ├── simulation-control.tsx   # Simulation controls
│   └── theme-provider.tsx       # Theme management
├── features/                    # Feature-based organization
│   ├── waste-bins/             # Bin management feature
│   ├── trucks/                 # Fleet management feature
│   ├── locations/              # Location management feature
│   ├── waste-types/            # Waste analytics feature
│   └── index.ts                # Feature exports
├── hooks/                      # Custom React hooks
│   ├── use-dashboard-state.ts  # Dashboard state management
│   ├── use-carbon-filter-countdown.ts # Carbon filter countdown
│   ├── use-simulation-data.ts  # Simulation data hook
│   ├── use-client-time.ts      # Client-side time handling
│   ├── use-mobile.tsx          # Mobile detection
│   └── use-toast.ts            # Toast notifications
├── lib/                        # Utilities and services
│   ├── api.ts                  # API client with type safety
│   ├── utils.ts                # General utilities with cn() helper
│   └── map-utils.ts            # Map utilities and helpers
├── i18n/                       # Internationalization
│   ├── messages/               # Translation files
│   │   ├── en.json             # English translations
│   │   └── ar.json             # Arabic translations
│   ├── routing.ts              # i18n routing configuration
│   └── request.ts              # Server-side i18n
├── types/                      # TypeScript definitions
│   ├── index.ts                # Main type definitions
│   └── truck.ts                # Truck-specific types
├── data/                       # Static data and mocks
│   └── dummy-data.ts           # Development data
├── public/                     # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── ...
├── Dockerfile                  # Production Docker image
├── Dockerfile.dev              # Development Docker image
├── components.json             # Radix UI configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Development

### **Prerequisites**

- Node.js 18+
- pnpm (preferred) or npm
- Docker (for containerized development)

### **Quick Start**

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access the application
open http://localhost:3000
```

### **Available Scripts**

```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 🐳 Docker Development

### **Development Container**

```bash
# Build development image
docker build -f Dockerfile.dev -t waste-dashboard-frontend:dev .

# Run development container
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  waste-dashboard-frontend:dev
```

### **Production Container**

```bash
# Build production image
docker build -f Dockerfile -t waste-dashboard-frontend:prod .

# Run production container
docker run -p 3000:3000 waste-dashboard-frontend:prod
```

### **Docker Compose**

```bash
# Development
docker-compose -f ../docker-compose.dev.yml up frontend

# Production
docker-compose up frontend
```

## 🌐 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Map Configuration (Mecca coordinates)
NEXT_PUBLIC_MAP_DEFAULT_CENTER_LAT=21.4225
NEXT_PUBLIC_MAP_DEFAULT_CENTER_LNG=39.8262
NEXT_PUBLIC_MAP_DEFAULT_ZOOM=15

# Feature Flags
NEXT_PUBLIC_ENABLE_SIMULATION=true
NEXT_PUBLIC_ENABLE_CALCULATOR=true
NEXT_PUBLIC_ENABLE_HAJJ_MODE=true

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

## 🔌 API Integration

### **API Client**

Centralized API client in `lib/api.ts` with:

- Type-safe request/response handling
- Automatic error handling and retry logic
- Loading states and caching
- WebSocket integration for real-time updates

### **Data Fetching Patterns**

```typescript
// Server Components (RSC)
import { getWasteBins } from "@/lib/api";

export default async function BinsPage() {
  const bins = await getWasteBins();
  return <BinsList bins={bins} />;
}

// Client Components
import { useWasteBins } from "@/hooks/use-waste-bins";

export function BinsList() {
  const { data: bins, isLoading, error } = useWasteBins();
  // Component implementation
}
```

## 🎨 Design System

### **Color Palette**

- **Primary**: Islamic green tones
- **Secondary**: Gold accents for emphasis
- **Neutral**: Sophisticated grays
- **Semantic**: Status-based colors (success, warning, error)

### **Typography**

- **Headings**: Inter with Arabic fallbacks
- **Body**: System fonts with Arabic support
- **Monospace**: Code and numbers

### **Components**

- **Consistent**: All components follow design system
- **Accessible**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first approach
- **Themed**: Full dark/light theme support

## 📊 Components Overview

### **Dashboard Components**

- **`dashboard-stats.tsx`**: Real-time statistics with Islamic design
- **`location-map.tsx`**: Interactive map with mosque-specific features
- **`truck-card.tsx`**: Truck information with prayer time considerations
- **`bin-card.tsx`**: Waste bin status with fill level indicators
- **`carbon-filter-countdown.tsx`**: Real-time filter replacement countdown

### **Map Components**

- **`leaflet-map.tsx`**: Main map with Mecca-centered view
- **`leaflet-bin-marker.tsx`**: Customizable bin markers with Islamic icons
- **`leaflet-truck-marker.tsx`**: Truck markers with route visualization
- **`map-controls.tsx`**: Map interaction controls
- **`color-map-key.tsx`**: Map legend and key

### **UI Components**

40+ Radix UI components including:

- **Forms**: Input, Select, Checkbox, Radio, Switch
- **Navigation**: Tabs, Breadcrumb, Pagination
- **Feedback**: Toast, Alert, Progress
- **Overlay**: Dialog, Popover, Tooltip
- **Layout**: Card, Separator, Scroll Area

## 🌍 Internationalization

### **Languages**

- **English**: Primary language (LTR)
- **Arabic**: Full RTL support with cultural adaptations

### **Features**

- **Dynamic Switching**: Instant language/direction changes
- **Number Formatting**: Locale-aware number formatting
- **Date Formatting**: Islamic calendar integration
- **Pluralization**: Intelligent plural forms
- **Cultural Adaptation**: Islamic design principles

### **Adding Translations**

```typescript
// Add to messages/en.json
{
  "dashboard": {
    "title": "Waste Management Dashboard",
    "bins": "Waste Bins",
    "trucks": "Trucks"
  }
}

// Add to messages/ar.json
{
  "dashboard": {
    "title": "لوحة إدارة النفايات",
    "bins": "حاويات النفايات",
    "trucks": "الشاحنات"
  }
}
```

## 🧪 Testing

### **Testing Strategy**

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end workflow testing
- **Visual Tests**: Storybook visual regression testing

### **Planned Testing Implementation**

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Visual tests
pnpm test:visual

# Coverage
pnpm test:coverage
```

## 🚀 Deployment

### **Vercel Deployment**

- Automatic deployments on push
- Preview deployments for PRs
- Environment variable management
- Built-in analytics and monitoring

### **Docker Deployment**

- Multi-stage builds for optimization
- Health checks and monitoring
- Environment-specific configurations
- Horizontal scaling ready

### **Performance Optimizations**

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Dynamic imports and lazy loading
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Aggressive caching strategies
- **CDN**: Static asset delivery via CDN

## 📈 Performance Metrics

### **Core Web Vitals**

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Optimization Techniques**

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Bundle optimization

## 🔒 Security

### **Client-Side Security**

- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Built-in Next.js protection
- **Secure Headers**: Security headers configuration
- **Input Validation**: Client-side validation with Zod
- **Environment Variables**: Secure handling of sensitive data

## 🤝 Contributing

### **Development Workflow**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes following coding standards
4. Run tests and linting: `pnpm test && pnpm lint`
5. Commit with conventional commits
6. Push and create pull request

### **Code Standards**

- **TypeScript**: Strict type checking
- **ESLint**: Configured for Next.js and React
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**🕌 Built with devotion for the service of Masjid ul Haram and the pilgrims who visit Islam's holiest site**
