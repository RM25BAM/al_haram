# 🕌 Masjid ul Haram Waste Management Dashboard

A comprehensive, real-time waste management system specifically designed for **Masjid ul Haram** (the Grand Mosque) in Mecca, Saudi Arabia. This intelligent dashboard provides advanced monitoring, analytics, and management capabilities for waste collection operations during Hajj and Umrah seasons, ensuring cleanliness and operational efficiency in Islam's holiest site.

## 🌍 Project Purpose & Context

### 🕋 **For Masjid ul Haram**

**Masjid ul Haram** is the holiest mosque in Islam, surrounding the Kaaba in Mecca, Saudi Arabia. During Hajj and Umrah seasons, the mosque accommodates millions of pilgrims, creating unique waste management challenges that require sophisticated solutions.

### 🎯 **Core Mission**

This dashboard system addresses the critical need for:

- **Real-time waste monitoring** across all mosque areas (Mataf, Safa & Marwa, Gates, Maqam Ibrahim)
- **Efficient collection operations** to maintain cleanliness standards befitting the holy site
- **Predictive maintenance** to ensure uninterrupted service during peak pilgrimage periods
- **Environmental sustainability** through optimized waste processing and recycling
- **Multi-language support** for international staff and administrators (Arabic/English)

### 🏛️ **Sacred Space Management**

The system is specifically designed for the unique requirements of Masjid ul Haram:

- **Tawaf Area (Mataf)**: Intensive monitoring around the Kaaba where millions perform circumambulation
- **Safa & Marwa**: Specialized tracking for the Sa'i corridor where pilgrims walk between the two hills
- **Multiple Gates**: Coordinated waste management across all entry/exit points
- **Maqam Ibrahim**: Focused monitoring around the Station of Abraham
- **Expansion Areas**: Coverage of all mosque expansion zones and facilities

### 📊 **Operational Challenges Addressed**

- **High Volume**: Managing waste from millions of daily visitors during Hajj season
- **Continuous Operations**: 24/7 monitoring and collection to maintain sanctity
- **Multilingual Staff**: Interface supporting Arabic and English for diverse workforce
- **Sacred Environment**: Discrete, efficient operations that don't disturb worship
- **Seasonal Variations**: Adaptive system handling dramatic volume changes during pilgrimage seasons

### 🌱 **Sustainability Goals**

- **Waste Reduction**: Minimize environmental impact in the holy city
- **Recycling Programs**: Implement sustainable waste processing methods
- **Energy Recovery**: Calculate potential energy generation from waste processing
- **Carbon Footprint**: Monitor and reduce environmental impact
- **Resource Optimization**: Efficient use of collection vehicles and human resources

## 🌟 Key Features

### 📊 **Dashboard Overview**

- **Real-time Statistics**: Live tracking of waste bins, trucks, and collection metrics across all mosque areas
- **Interactive Maps**: Leaflet-based maps showing precise bin and truck locations within the mosque complex
- **Carbon Filter Countdown**: Real-time monitoring of activated carbon filter replacement schedule for air quality management
- **Multi-language Support**: Full internationalization (Arabic/English) for diverse staff
- **Live Connection Status**: Real-time connection monitoring with WebSocket support
- **Hajj Season Analytics**: Specialized metrics for pilgrimage periods

### 🗑️ **Waste Bin Management**

- **Smart Filtering**: Advanced filters by status, type, fill level, and sacred location zones
- **Fill Level Monitoring**: Real-time fill level tracking with color-coded status indicators
- **Collection History**: Complete historical data for each bin across different seasons
- **Maintenance Tracking**: Health status and maintenance scheduling to prevent service disruptions
- **Grinder Status**: Monitoring of bin grinding operations for organic waste processing
- **Export Capabilities**: CSV export and comprehensive reporting for management review
- **Sacred Area Prioritization**: Critical bin monitoring in high-traffic worship areas

### 🚛 **Fleet Management**

- **Truck Tracking**: Real-time location and status monitoring throughout the mosque complex
- **Route Optimization**: Route planning optimized for mosque traffic patterns and prayer times
- **Driver Management**: Driver assignments with consideration for sacred space protocols
- **Capacity Monitoring**: Load capacity and fuel level tracking for continuous operations
- **Performance Analytics**: Distance traveled, collections completed, efficiency metrics
- **Prayer Time Coordination**: Operation scheduling that respects prayer times and congregational activities

### 📍 **Location Intelligence**

- **Sacred Space Mapping**: Interactive mapping specifically designed for Masjid ul Haram layout
- **Worship Area Monitoring**: Specialized tracking for Tawaf area, Safa & Marwa, and prayer halls
- **Critical Alerts**: Immediate notifications for bins requiring attention in high-priority areas
- **Zone Management**: Location-based filtering aligned with mosque architectural zones
- **Pilgrim Flow Analysis**: Heat maps showing waste generation patterns during different worship activities
- **Gate Coordination**: Synchronized monitoring across all mosque entry and exit points

### 🔢 **Waste Calculator**

- **Islamic Waste Guidelines**: Calculations aligned with Islamic principles of cleanliness and sustainability
- **Treatment Method Analysis**: Compare different waste treatment approaches suitable for sacred environments
- **Environmental Impact**: Carbon footprint reduction calculations for the holy city
- **Financial Analysis**: Cost-benefit analysis for different processing methods
- **Energy Output Calculation**: Potential energy generation from waste processing
- **Sustainability Metrics**: Environmental impact assessments for responsible stewardship

### 📈 **Analytics & Reporting**

- **Hajj Season Analytics**: Specialized reporting for pilgrimage periods with millions of visitors
- **Waste Type Analysis**: Detailed breakdown by categories (organic, plastic, general waste)
- **Performance Metrics**: KPIs for operational efficiency during peak and off-peak periods
- **Trend Analysis**: Weekly, monthly, and seasonal trend visualization
- **Management Reports**: Executive summaries for mosque administration
- **Sustainability Reports**: Environmental impact and conservation metrics

## 🏗️ Architecture

### **Frontend** (Next.js 15)

- **Framework**: Next.js with App Router and TypeScript for robust, scalable interface
- **Styling**: Tailwind CSS with Islamic-inspired design elements and cultural considerations
- **UI Components**: Radix UI primitives ensuring accessibility for diverse users
- **State Management**: React hooks with context patterns for real-time updates
- **Maps**: Leaflet with custom markers and mosque-specific map tiles
- **Charts**: Recharts for data visualization with Arabic number formatting support
- **Forms**: React Hook Form with Islamic calendar integration where applicable
- **Internationalization**: next-intl supporting Arabic RTL and English LTR layouts

### **Backend** (Node.js/Fastify)

- **Framework**: Fastify with TypeScript for high-performance API handling
- **Database**: PostgreSQL with Prisma ORM for reliable data management
- **Authentication**: JWT-based authentication with role-based access for different staff levels
- **API**: RESTful API with Islamic calendar integration and prayer time considerations
- **Real-time**: WebSocket support for live updates during critical operations
- **Validation**: Zod schema validation with Arabic text support
- **Testing**: Comprehensive testing suite for mission-critical operations

### **Infrastructure**

- **Containerization**: Docker and Docker Compose for reliable deployment
- **High Availability**: Redundant systems ensuring continuous operation during Hajj
- **Monitoring**: Integrated logging and error tracking for proactive maintenance
- **Backup Systems**: Automated backups with disaster recovery protocols

### 📊 **Dashboard Overview**

- **Real-time Statistics**: Live tracking of waste bins, trucks, and collection metrics
- **Interactive Maps**: Leaflet-based maps with bin and truck locations
- **Carbon Filter Countdown**: Real-time monitoring of activated carbon filter replacement schedule
- **Multi-language Support**: Full internationalization (Arabic/English)
- **Live Connection Status**: Real-time connection monitoring with WebSocket support

### 🗑️ **Waste Bin Management**

- **Smart Filtering**: Advanced filters by status, type, fill level, and location
- **Fill Level Monitoring**: Real-time fill level tracking with color-coded status indicators
- **Collection History**: Complete historical data for each bin
- **Maintenance Tracking**: Health status and maintenance scheduling
- **Grinder Status**: Monitoring of bin grinding operations
- **Export Capabilities**: CSV export and comprehensive reporting

### 🚛 **Fleet Management**

- **Truck Tracking**: Real-time location and status monitoring
- **Route Optimization**: Route planning and completion tracking
- **Driver Management**: Driver assignments and performance metrics
- **Capacity Monitoring**: Load capacity and fuel level tracking
- **Performance Analytics**: Distance traveled, collections completed, efficiency metrics

### 📍 **Location Intelligence**

- **Interactive Mapping**: Dynamic map with real-time updates
- **Geolocation Services**: Precise coordinates for all assets
- **Critical Alerts**: Immediate notifications for bins requiring attention
- **Zone Management**: Location-based filtering and management
- **Heat Maps**: Visual representation of waste generation patterns

### 🔢 **Waste Calculator**

- **Treatment Method Analysis**: Compare different waste treatment approaches
- **Environmental Impact**: Carbon footprint reduction calculations
- **Financial Analysis**: Cost-benefit analysis for different processing methods
- **Energy Output Calculation**: Potential energy generation from waste
- **Multi-waste Type Support**: Separate calculations for plastic and organic waste

### 📈 **Analytics & Reporting**

- **Waste Type Analytics**: Detailed breakdown by waste categories
- **Performance Metrics**: KPIs for operational efficiency
- **Trend Analysis**: Weekly and monthly trend visualization
- **Custom Reports**: Exportable reports for stakeholders
- **Data Visualization**: Interactive charts and graphs using Recharts

## 🏗️ Architecture

### **Frontend** (Next.js 15)

- **Framework**: Next.js with App Router and TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives for accessibility
- **State Management**: React hooks with context patterns
- **Maps**: Leaflet with React Leaflet integration
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-intl for multi-language support

### **Backend** (Node.js/Fastify)

- **Framework**: Fastify with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **API**: RESTful API with comprehensive endpoints
- **Real-time**: WebSocket support for live updates
- **Validation**: Zod schema validation
- **Testing**: Jest for unit and integration tests

### **Infrastructure**

- **Containerization**: Docker and Docker Compose
- **Development**: Hot reloading for both frontend and backend
- **Production**: Optimized production builds
- **Monitoring**: Integrated logging and error tracking

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose**: For containerized development
- **Node.js 18+**: For local development
- **pnpm**: Package manager
- **Make**: For build automation (optional)

### 🔧 Using Make Commands

```bash
# Show all available commands
make help

# Quick development setup
make quick-start

# Start development environment
make dev

# Start only frontend
make dev-frontend

# Build and start production
make production-start

# Stop all services
make down

# Clean up Docker resources
make clean

# View logs
make logs

# Show service status
make status
```

### 🐳 Docker Commands

#### Development Environment

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

#### Production Environment

```bash
# Build and start production
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop production services
docker-compose down
```

### 💻 Local Development

#### Frontend Development

```bash
cd frontend
pnpm install
pnpm dev
# Access: http://localhost:3000
```

#### Backend Development

```bash
cd backend
pnpm install
pnpm dev
# Access: http://localhost:8000
```

## 📂 Project Structure

```
waste-dashboard/
├── frontend/                     # Next.js Frontend Application
│   ├── app/                     # Next.js App Router
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main dashboard page
│   │   └── simulation/          # Simulation features
│   ├── components/              # React Components
│   │   ├── ui/                  # Radix UI components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── map/                 # Map components
│   │   ├── icons/               # Custom icons
│   │   ├── bin-card.tsx         # Waste bin display
│   │   ├── truck-card.tsx       # Truck display
│   │   ├── waste-calculator.tsx # Waste calculation tool
│   │   └── carbon-filter-countdown.tsx # Filter monitoring
│   ├── features/                # Feature-based organization
│   │   ├── waste-bins/          # Bin management feature
│   │   ├── trucks/              # Fleet management feature
│   │   ├── locations/           # Location management feature
│   │   ├── waste-types/         # Waste analytics feature
│   │   └── calculator/          # Calculation feature
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-dashboard-state.ts
│   │   ├── use-carbon-filter-countdown.ts
│   │   └── use-translations.ts
│   ├── lib/                     # Utilities and services
│   │   ├── api.ts               # API client
│   │   ├── calculator.ts        # Waste calculation service
│   │   ├── utils.ts             # General utilities
│   │   └── map-utils.ts         # Map utilities
│   ├── i18n/                    # Internationalization
│   │   ├── messages/            # Translation files
│   │   ├── routing.ts           # i18n routing
│   │   └── request.ts           # i18n configuration
│   ├── types/                   # TypeScript definitions
│   │   ├── index.ts             # Main types
│   │   └── truck.ts             # Truck-specific types
│   ├── data/                    # Static data and mocks
│   │   └── dummy-data.ts        # Development data
│   ├── Dockerfile               # Production container
│   ├── Dockerfile.dev           # Development container
│   └── package.json             # Dependencies and scripts
├── backend/                     # Node.js Backend Application
│   ├── src/                     # Source code
│   │   ├── index.ts             # Application entry point
│   │   ├── config/              # Configuration management
│   │   ├── controllers/         # API controllers
│   │   │   ├── locations.controller.ts
│   │   │   ├── trucks.controller.ts
│   │   │   ├── waste-bins.controller.ts
│   │   │   └── waste-types.controller.ts
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── database/            # Database configuration
│   │   └── types/               # TypeScript definitions
│   ├── prisma/                  # Database schema and migrations
│   ├── tests/                   # Test files
│   ├── Dockerfile               # Production container
│   ├── Dockerfile.dev           # Development container
│   └── package.json             # Dependencies and scripts
├── docker-compose.yml           # Production compose file
├── docker-compose.dev.yml       # Development compose file
├── Makefile                     # Build automation
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## 🔧 Environment Variables

> **🔒 Security Note**: All credentials shown below are example placeholders only. Actual production values should be stored securely using environment variables or secure secret management systems.

### Frontend Configuration

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
```

### Backend Configuration

```env
# Server Configuration
PORT=8000
NODE_ENV=development
HOST=0.0.0.0

# Database Configuration (Use secure credentials in production)
DATABASE_URL=postgresql://username:password@localhost:5432/waste_dashboard
REDIS_URL=redis://localhost:6379

# Authentication (Generate secure keys for production)
JWT_SECRET=your-secure-jwt-secret-key
JWT_EXPIRES_IN=24h

# External Services (Replace with actual API keys)
WEATHER_API_KEY=your-weather-api-key
MAPS_API_KEY=your-maps-api-key
ISLAMIC_CALENDAR_API_KEY=your-islamic-calendar-api-key
```

### Security Best Practices

- **Environment Variables**: Store all sensitive data in environment variables
- **Secret Management**: Use secure secret management services in production
- **Key Rotation**: Regularly rotate JWT secrets and API keys
- **Access Control**: Implement proper RBAC for different staff levels
- **Audit Logging**: Enable comprehensive audit trails for all operations

## 📊 Dashboard Features

### 🏠 **Main Dashboard**

- **Live Statistics**: Real-time counters for bins, trucks, and operations
- **Status Indicators**: System health and connection status
- **Quick Actions**: Fast access to common operations
- **Recent Activity**: Latest system events and updates

### 🗑️ **Waste Bins Tab**

- **Grid/List View**: Flexible display options
- **Advanced Filtering**: Multi-criteria filtering system
- **Bulk Actions**: Mass operations on selected bins
- **Export Functions**: CSV and PDF export capabilities
- **Real-time Updates**: Live status updates

### 🚛 **Trucks Tab**

- **Fleet Overview**: Complete fleet status at a glance
- **Route Tracking**: Real-time route progress
- **Performance Metrics**: Efficiency and productivity stats
- **Maintenance Alerts**: Scheduled maintenance notifications
- **Driver Management**: Driver assignments and performance

### 📍 **Locations Tab**

- **Interactive Map**: Real-time bin and truck locations
- **Filter Controls**: Location-based filtering
- **Critical Alerts**: Immediate attention notifications
- **Zone Management**: Geographic area organization
- **Heat Maps**: Visual data representation

### 📊 **Waste Types Tab**

- **Analytics Dashboard**: Comprehensive waste type analysis
- **Trend Visualization**: Historical and predictive trends
- **Comparison Tools**: Side-by-side waste type comparison
- **Performance Metrics**: Waste processing efficiency
- **Environmental Impact**: Carbon footprint analysis

### 🧮 **Calculator Tab**

- **Treatment Comparison**: Different waste treatment methods
- **Environmental Impact**: Carbon reduction calculations
- **Financial Analysis**: Cost-benefit analysis
- **Energy Calculations**: Potential energy generation
- **Multi-language Support**: Localized calculations

## 🌐 Internationalization

### Supported Languages

- **English**: Primary language with comprehensive coverage
- **Arabic**: Full RTL support with cultural adaptations

### Translation Features

- **Dynamic Language Switching**: Instant language changes
- **Pluralization**: Intelligent plural form handling
- **Date/Time Formatting**: Locale-aware formatting
- **Number Formatting**: Regional number formats
- **Currency Support**: Multi-currency calculations

### Adding New Languages

1. Create message file in `frontend/i18n/messages/[locale].json`
2. Add locale to `frontend/i18n/routing.ts`
3. Update language switcher in `frontend/components/language-switcher.tsx`
4. Test all features in new language

## 🔌 API Endpoints

### Waste Bins

```
GET    /api/waste-bins           # Get all waste bins
GET    /api/waste-bins/:id       # Get specific bin
PUT    /api/waste-bins/:id       # Update bin
POST   /api/waste-bins           # Create new bin
DELETE /api/waste-bins/:id       # Delete bin
```

### Trucks

```
GET    /api/trucks               # Get all trucks
GET    /api/trucks/:id           # Get specific truck
PUT    /api/trucks/:id           # Update truck
POST   /api/trucks               # Create new truck
DELETE /api/trucks/:id           # Delete truck
```

### Locations

```
GET    /api/locations            # Get all locations
GET    /api/locations/:id        # Get specific location
PUT    /api/locations/:id        # Update location
POST   /api/locations            # Create new location
DELETE /api/locations/:id        # Delete location
```

### Analytics

```
GET    /api/analytics/dashboard  # Dashboard statistics
GET    /api/analytics/waste-types # Waste type analytics
GET    /api/analytics/performance # Performance metrics
GET    /api/analytics/trends     # Trend analysis
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
pnpm test              # Run unit tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Generate coverage report
pnpm test:e2e          # Run end-to-end tests
```

### Backend Testing

```bash
cd backend
pnpm test              # Run unit tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Generate coverage report
pnpm test:e2e          # Run integration tests
```

### Testing Strategy

- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user workflow testing
- **Performance Tests**: Load and stress testing
- **Accessibility Tests**: WCAG compliance testing

## 🚀 Deployment

### Development Deployment

```bash
# Start development environment
make dev

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

### Production Deployment

```bash
# Build and deploy
make production-start

# Or manually
docker-compose up --build -d
```

### Environment-Specific Configurations

- **Development**: Hot reloading, debug logging, test data
- **Staging**: Production-like environment for testing
- **Production**: Optimized builds, error tracking, monitoring

## 📈 Performance Optimizations

### Frontend Optimizations

- **Code Splitting**: Dynamic imports for feature modules
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Webpack bundle analyzer
- **Lazy Loading**: Component and route lazy loading
- **Caching**: Aggressive caching strategies

### Backend Optimizations

- **Database Indexing**: Optimized database queries
- **Caching Layer**: Redis for frequently accessed data
- **Connection Pooling**: Efficient database connections
- **Compression**: Gzip compression for responses
- **Rate Limiting**: API rate limiting protection

### Map Performance

- **Marker Clustering**: Efficient marker management
- **Tile Caching**: Map tile caching strategy
- **Viewport Optimization**: Only load visible markers
- **Debounced Updates**: Efficient real-time updates

## 🔒 Security & Privacy

### Data Protection

- **Privacy First**: No personal pilgrim data is collected or stored
- **Operational Data Only**: System focuses solely on waste management operations
- **Islamic Principles**: Data handling aligned with Islamic privacy and ethical guidelines
- **Local Storage**: Sensitive operational data remains within local infrastructure
- **Audit Trails**: Comprehensive logging for accountability and transparency

### Security Measures

- **Authentication & Authorization**: JWT-based authentication with role-based access
- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Input Validation**: Comprehensive input sanitization and validation
- **API Security**: Rate limiting, CORS protection, and secure headers
- **Container Security**: Secure Docker configurations and regular updates
- **Network Security**: Proper firewall rules and network segmentation

### Compliance

- **Saudi Regulations**: Compliance with Saudi Arabian data protection laws
- **Islamic Guidelines**: Adherence to Islamic principles of privacy and ethics
- **Operational Standards**: Meeting international waste management standards
- **Audit Ready**: Comprehensive documentation and logging for regulatory compliance

## 🛠️ Development Tools

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **TypeScript**: Static type checking
- **Path Mapping**: Clean import statements

### Development Experience

- **Hot Reloading**: Instant development feedback
- **Error Overlay**: Detailed error information
- **Debug Tools**: Redux DevTools integration
- **Live Reloading**: Automatic browser refresh

### Build Tools

- **Webpack**: Module bundling and optimization
- **PostCSS**: CSS processing and optimization
- **Babel**: JavaScript transpilation
- **SWC**: Fast TypeScript/JavaScript compilation

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Run tests**: `make test`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**

### Coding Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting consistency
- **Commit Messages**: Conventional commit format
- **Documentation**: Update README for new features

### Pull Request Process

1. **Update documentation** for any new features
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Update the changelog**
5. **Request review** from maintainers

## 📋 Roadmap

### Phase 1 (Current)

- ✅ Basic dashboard functionality
- ✅ Waste bin management
- ✅ Fleet tracking
- ✅ Interactive maps
- ✅ Multi-language support
- ✅ Calculator features

### Phase 2 (Planned)

- 🔄 Real-time WebSocket integration
- 🔄 Advanced analytics dashboard
- 🔄 Mobile application
- 🔄 Notification system
- 🔄 Report generation
- 🔄 User management system

### Phase 3 (Future)

- 📋 AI-powered route optimization
- 📋 Predictive maintenance
- 📋 IoT sensor integration
- 📋 Advanced reporting
- 📋 API rate limiting
- 📋 Multi-tenant support

## 🐛 Known Issues

### Current Limitations

- **Real-time Updates**: Currently using polling, WebSocket integration in progress
- **Mobile Responsiveness**: Some components need mobile optimization
- **Performance**: Large datasets may impact map performance
- **Offline Support**: No offline functionality currently

### Bug Reports

Please report bugs using the GitHub issue tracker with:

- **Environment details**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)

## 📞 Support

### Documentation

- **API Documentation**: Available at `/api/docs` when running
- **Component Documentation**: Storybook integration planned
- **User Guide**: Comprehensive user manual available

### Community

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community discussions and Q&A
- **Discord**: Real-time community support (link coming soon)

### Professional Support

For enterprise support, custom development, or consultations, please contact the development team.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Islamic Inspiration

- **Cleanliness in Islam**: Inspired by the Islamic principle that "cleanliness is half of faith"
- **Stewardship (Khilafah)**: Fulfilling the responsibility of environmental stewardship
- **Service to Pilgrims**: Dedication to serving millions of pilgrims visiting the holy site
- **Sustainability**: Commitment to responsible resource management in the holy city

### Technical Acknowledgments

- **Next.js Team**: For the robust React framework enabling scalable applications
- **Radix UI**: For accessible UI components supporting diverse user needs
- **Leaflet**: For mapping capabilities essential for spatial awareness
- **Tailwind CSS**: For the utility-first CSS framework with RTL support
- **Saudi Vision 2030**: Alignment with Saudi Arabia's digital transformation goals
- **Community Contributors**: For bug reports, feature suggestions, and continuous improvement

### Special Thanks

- **Mosque Administration**: For guidance on operational requirements and sacred space considerations
- **Hajj & Umrah Operations Teams**: For insights into real-world waste management challenges
- **International Staff**: For multilingual testing and cultural adaptation feedback
- **Open Source Community**: For the foundational tools and libraries that make this project possible

---

## 👥 Contributors

### 🏗️ Core Development Team

- **Lead Developer**: [Mohammed Arif, Nauman Munir, Mohammed Ehsan] - Full-stack development and architecture
- **Backend Developer**: [Mohammed Arif] - API development and database design
- **Frontend Developer**: [Nauman Munir, Mohammed Arif] - UI/UX implementation and React components

### 🌍 Localization Team

- **Arabic Translator**: [Nauman Munir] - Arabic localization and RTL support

### 🗣️ Communication Team

- **Project Coordinator**: [Mohammed Ehsan] - Cross-team communication and project managementcommunication

### 🤝 Community Contributors

We thank all community members who have contributed to this project:

- **Bug Reports**: Community members who identified and reported issues
- **Feature Suggestions**: Users who provided valuable feature ideas
- **Code Contributions**: Developers who submitted pull requests
- **Documentation**: Contributors who improved documentation and guides
- **Testing**: Volunteers who helped test different features and scenarios

### 🙏 Special Recognition

- **Mosque Operations Team**: For providing real-world insights and requirements
- **Hajj & Umrah Coordinators**: For operational expertise and feedback
- **International Staff**: For multilingual testing and cultural adaptation
- **Beta Testers**: Early adopters who provided crucial feedback

### 💡 How to Contribute

We welcome contributions from the community! Please see our [Contributing](#-contributing) section above for detailed guidelines on how to get involved.

---

**🕌 Built with devotion for the service of Masjid ul Haram and the pilgrims who visit Islam's holiest site**

_"And We made from them leaders guiding by Our command when they were patient and were certain of Our signs." - Quran 32:24_

_Last updated: July 2025_
