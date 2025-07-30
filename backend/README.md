# 🏗️ Backend - Masjid ul Haram Waste Management API

Enterprise-grade Fastify TypeScript backend for the **Masjid ul Haram** waste management system, providing robust API services for real-time monitoring and management of waste operations at Islam's holiest site.

## 🌟 Overview

This high-performance backend serves as the core API for waste management operations at **Masjid ul Haram** (the Grand Mosque) in Mecca, Saudi Arabia. Built with enterprise-grade architecture, it handles millions of data points and provides real-time monitoring capabilities for the complex waste management requirements during Hajj and Umrah seasons.

## 🚀 Key Features

### **🏛️ Enterprise Architecture**

- **Clean Architecture**: Layered architecture with clear separation of concerns
- **SOLID Principles**: Following software engineering best practices
- **Microservice Ready**: Designed for scalability and service decomposition
- **Event-Driven**: Async processing for high-throughput operations

### **🔒 Security & Authentication**

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, Manager, Operator, Viewer roles
- **API Rate Limiting**: Protection against abuse and DoS attacks
- **Input Validation**: Comprehensive request/response validation
- **Security Headers**: Helmet.js for secure HTTP headers

### **📊 Real-Time Capabilities**

- **WebSocket Support**: Real-time updates for critical operations
- **Event Broadcasting**: Live notifications for system events
- **Prayer Time Integration**: Operation scheduling respecting prayer times
- **Hajj Season Scaling**: Dynamic scaling during peak pilgrimage periods

### **🗄️ Data Management**

- **PostgreSQL**: Robust relational database for critical data
- **Prisma ORM**: Type-safe database operations
- **Redis Caching**: High-performance caching layer
- **Data Validation**: Zod schema validation for data integrity

### **📈 Monitoring & Observability**

- **Structured Logging**: Pino logger with JSON output
- **Health Checks**: Comprehensive health monitoring
- **Performance Metrics**: Request/response time tracking
- **Error Tracking**: Centralized error handling and reporting

### **🧪 Testing & Quality**

- **Jest Testing**: Comprehensive test suite
- **Type Safety**: Full TypeScript implementation
- **Code Coverage**: High test coverage requirements
- **API Documentation**: Auto-generated Swagger/OpenAPI docs

## 🛠 Technology Stack

### **Core Framework**

- **Node.js 18+**: Modern JavaScript runtime
- **Fastify 4.x**: High-performance web framework
- **TypeScript 5.x**: Static typing and modern JavaScript features

### **Database & Storage**

- **PostgreSQL 14+**: Primary database for persistent data
- **Prisma ORM**: Type-safe database client and migrations
- **Redis 6+**: Caching and session storage

### **Authentication & Security**

- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Helmet**: Security headers middleware
- **CORS**: Cross-origin resource sharing

### **Validation & Documentation**

- **Zod**: TypeScript-first schema validation
- **Swagger/OpenAPI**: API documentation generation
- **Fastify Schema**: Request/response validation

### **Testing & Development**

- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **ESLint**: Code linting
- **Prettier**: Code formatting

### **Deployment & Monitoring**

- **Docker**: Containerization
- **Pino**: Structured logging
- **PM2**: Process management (optional)

## 🏗️ Architecture Overview

```
backend/
├── src/
│   ├── config/                   # Configuration Management
│   │   ├── database.ts          # Database configuration
│   │   ├── environment.ts       # Environment variables
│   │   └── logging.ts           # Logging configuration
│   ├── controllers/             # Request Handlers
│   │   ├── locations.controller.ts    # Location management
│   │   ├── trucks.controller.ts       # Fleet management
│   │   ├── waste-bins.controller.ts   # Bin management
│   │   ├── waste-types.controller.ts  # Waste analytics
│   │   └── simulation.controller.ts   # Simulation features
│   ├── services/                # Business Logic Layer
│   │   ├── data.service.ts      # Data processing service
│   │   ├── auth.service.ts      # Authentication service
│   │   ├── notification.service.ts # Notification service
│   │   └── analytics.service.ts # Analytics service
│   ├── routes/                  # API Routes
│   │   ├── index.ts             # Route aggregation
│   │   ├── locations.ts         # Location routes
│   │   ├── trucks.ts            # Truck routes
│   │   ├── waste-bins.ts        # Bin routes
│   │   ├── waste-types.ts       # Waste type routes
│   │   └── simulation.ts        # Simulation routes
│   ├── middleware/              # Custom Middleware
│   │   ├── auth.middleware.ts   # Authentication middleware
│   │   ├── validation.middleware.ts # Validation middleware
│   │   ├── rate-limit.middleware.ts # Rate limiting
│   │   └── error.middleware.ts  # Error handling
│   ├── models/                  # Data Models
│   │   ├── user.model.ts        # User model
│   │   ├── truck.model.ts       # Truck model
│   │   ├── bin.model.ts         # Bin model
│   │   └── location.model.ts    # Location model
│   ├── schemas/                 # Validation Schemas
│   │   ├── auth.schema.ts       # Authentication schemas
│   │   ├── truck.schema.ts      # Truck validation
│   │   ├── bin.schema.ts        # Bin validation
│   │   └── common.schema.ts     # Common schemas
│   ├── utils/                   # Utility Functions
│   │   ├── logger.ts            # Logging utilities
│   │   ├── crypto.ts            # Cryptography helpers
│   │   ├── datetime.ts          # Date/time utilities
│   │   └── islamic-calendar.ts  # Islamic calendar integration
│   ├── plugins/                 # Fastify Plugins
│   │   ├── database.plugin.ts   # Database plugin
│   │   ├── auth.plugin.ts       # Authentication plugin
│   │   ├── swagger.plugin.ts    # API documentation
│   │   └── websocket.plugin.ts  # WebSocket plugin
│   ├── types/                   # Type Definitions
│   │   ├── index.ts             # Common types
│   │   ├── api.types.ts         # API response types
│   │   └── database.types.ts    # Database types
│   ├── database/                # Database Related
│   │   ├── migrations/          # Database migrations
│   │   ├── seeds/               # Seed data
│   │   └── index.ts             # Database connection
│   ├── __tests__/               # Test Files
│   │   ├── unit/                # Unit tests
│   │   ├── integration/         # Integration tests
│   │   └── helpers/             # Test utilities
│   ├── app.ts                   # Fastify app configuration
│   └── index.ts                 # Application entry point
├── prisma/                      # Prisma Configuration
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
├── Dockerfile                   # Production Docker image
├── Dockerfile.dev               # Development Docker image
├── jest.config.json             # Jest configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚦 Getting Started

### **Prerequisites**

- **Node.js 18+**: Modern JavaScript runtime
- **PostgreSQL 14+**: Database server
- **Redis 6+**: Caching server
- **Docker**: For containerized development (optional)
- **pnpm**: Package manager (preferred)

### **Environment Setup**

1. **Clone and navigate to backend**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**:

   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Run migrations
   pnpm db:migrate

   # Seed database
   pnpm db:seed
   ```

5. **Start development server**:
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:8000`

### **Quick Docker Setup**

```bash
# Development with Docker Compose
docker-compose -f ../docker-compose.dev.yml up backend

# Or manual Docker build
docker build -f Dockerfile.dev -t waste-dashboard-backend:dev .
docker run -p 8000:8000 waste-dashboard-backend:dev
```

## 🔧 Configuration

### **Environment Variables**

```env
# Server Configuration
NODE_ENV=development
PORT=8000
HOST=0.0.0.0

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/waste_dashboard
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12

# API Security
API_RATE_LIMIT_WINDOW=900000  # 15 minutes
API_RATE_LIMIT_MAX=100        # requests per window
CORS_ORIGIN=http://localhost:3000

# External Services
WEATHER_API_KEY=your-weather-api-key
ISLAMIC_CALENDAR_API_KEY=your-islamic-calendar-api-key
NOTIFICATION_API_KEY=your-notification-service-key

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Features
ENABLE_SWAGGER=true
ENABLE_WEBSOCKETS=true
ENABLE_RATE_LIMITING=true
ENABLE_CORS=true
```

### **Database Configuration**

The application uses PostgreSQL with Prisma ORM. Key configuration files:

- **`prisma/schema.prisma`**: Database schema definition
- **`src/config/database.ts`**: Database connection configuration
- **`src/database/migrations/`**: Database migrations

## 📚 API Documentation

### **Swagger UI**

When running the server, access comprehensive API documentation at:

- **Swagger UI**: `http://localhost:8000/docs`
- **OpenAPI JSON**: `http://localhost:8000/docs/json`
- **Health Check**: `http://localhost:8000/health`

### **Core API Endpoints**

#### **Authentication**

```
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration
POST   /api/auth/refresh        # Token refresh
POST   /api/auth/logout         # User logout
GET    /api/auth/profile        # User profile
```

#### **Waste Bins**

```
GET    /api/waste-bins          # Get all waste bins
GET    /api/waste-bins/:id      # Get specific bin
POST   /api/waste-bins          # Create new bin
PUT    /api/waste-bins/:id      # Update bin
DELETE /api/waste-bins/:id      # Delete bin
GET    /api/waste-bins/:id/history  # Get bin history
```

#### **Fleet Management**

```
GET    /api/trucks              # Get all trucks
GET    /api/trucks/:id          # Get specific truck
POST   /api/trucks              # Create new truck
PUT    /api/trucks/:id          # Update truck
DELETE /api/trucks/:id          # Delete truck
GET    /api/trucks/:id/routes   # Get truck routes
```

#### **Locations**

```
GET    /api/locations           # Get all locations
GET    /api/locations/:id       # Get specific location
POST   /api/locations           # Create new location
PUT    /api/locations/:id       # Update location
DELETE /api/locations/:id       # Delete location
```

#### **Waste Types & Analytics**

```
GET    /api/waste-types         # Get waste type analytics
GET    /api/waste-types/:id     # Get specific waste type
GET    /api/analytics/dashboard # Dashboard statistics
GET    /api/analytics/reports   # Generate reports
```

#### **Simulation & Testing**

```
POST   /api/simulation/start    # Start simulation
POST   /api/simulation/stop     # Stop simulation
GET    /api/simulation/status   # Get simulation status
```

## 🔐 Authentication & Authorization

### **JWT Token Structure**

```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  permissions: string[];
  iat: number;
  exp: number;
}
```

### **Role-Based Access Control**

#### **Admin Role**

- Full system access
- User management
- System configuration
- All CRUD operations

#### **Manager Role**

- Operational oversight
- Report generation
- Fleet management
- Bin management

#### **Operator Role**

- Field operations
- Truck updates
- Bin status updates
- Route management

#### **Viewer Role**

- Read-only access
- Dashboard viewing
- Report viewing
- No modification permissions

### **Usage Example**

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'operator@mosque.sa',
    password: 'securepassword',
  }),
});

const { token } = await response.json();

// Use token for protected routes
const trucks = await fetch('/api/trucks', {
  headers: { Authorization: `Bearer ${token}` },
});
```

## 🧪 Testing

### **Test Structure**

```
src/__tests__/
├── unit/                    # Unit tests
│   ├── controllers/         # Controller tests
│   ├── services/            # Service tests
│   ├── utils/               # Utility tests
│   └── middleware/          # Middleware tests
├── integration/             # Integration tests
│   ├── api/                 # API endpoint tests
│   ├── database/            # Database tests
│   └── auth/                # Authentication tests
└── helpers/                 # Test utilities
    ├── setup.ts             # Test setup
    ├── fixtures.ts          # Test data
    └── mocks.ts             # Mock implementations
```

### **Running Tests**

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test controllers/trucks.controller.test.ts

# Run integration tests
pnpm test:integration

# Run unit tests only
pnpm test:unit
```

### **Test Coverage Requirements**

- **Minimum Coverage**: 80%
- **Controllers**: 90%
- **Services**: 85%
- **Utilities**: 95%

### **Testing Examples**

```typescript
// Unit test example
describe('TrucksController', () => {
  it('should return all trucks', async () => {
    const mockTrucks = [{ id: '1', name: 'Truck 1' }];
    jest.spyOn(trucksService, 'getAllTrucks').mockResolvedValue(mockTrucks);

    const response = await request(app).get('/api/trucks').expect(200);

    expect(response.body).toEqual(mockTrucks);
  });
});

// Integration test example
describe('Trucks API', () => {
  it('should create a new truck', async () => {
    const newTruck = {
      name: 'New Truck',
      capacity: 1000,
      location: { lat: 21.4225, lng: 39.8262 },
    };

    const response = await request(app)
      .post('/api/trucks')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newTruck)
      .expect(201);

    expect(response.body.name).toBe(newTruck.name);
  });
});
```

## 📊 Available Scripts

### **Development Scripts**

```bash
pnpm dev              # Start development server with hot reload
pnpm build            # Build TypeScript to JavaScript
pnpm start            # Start production server
pnpm preview          # Preview production build locally
```

### **Database Scripts**

```bash
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:migrate:dev   # Run migrations in development
pnpm db:reset         # Reset database
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio
pnpm db:deploy        # Deploy migrations to production
```

### **Code Quality Scripts**

```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking
pnpm validate         # Run all validation (lint + type-check + test)
```

### **Testing Scripts**

```bash
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate test coverage report
pnpm test:unit        # Run unit tests only
pnpm test:integration # Run integration tests only
pnpm test:e2e         # Run end-to-end tests
```

## 🚀 Deployment

### **Production Environment**

#### **Docker Deployment**

```bash
# Build production image
docker build -t waste-dashboard-backend:prod .

# Run with environment variables
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:pass@db:5432/waste_dashboard \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-production-secret \
  waste-dashboard-backend:prod
```

#### **Docker Compose**

```bash
# Production deployment
docker-compose up -d

# View logs
docker-compose logs -f backend

# Scale backend
docker-compose up -d --scale backend=3
```

### **Environment-Specific Configurations**

#### **Development**

- Hot reloading enabled
- Debug logging
- Swagger UI enabled
- CORS enabled for localhost

#### **Staging**

- Production-like environment
- Reduced logging
- Performance monitoring
- Load testing

#### **Production**

- Optimized builds
- Error tracking
- Health monitoring
- High availability setup

### **Health Checks**

```typescript
// Health check endpoint
GET /health

// Response
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "production",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "external_apis": "healthy"
  }
}
```

## 📈 Performance & Monitoring

### **Performance Optimizations**

#### **Database Optimizations**

- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Indexed queries and optimized joins
- **Caching**: Redis caching for frequently accessed data
- **Pagination**: Efficient data pagination

#### **API Optimizations**

- **Response Compression**: Gzip compression
- **Rate Limiting**: Prevent API abuse
- **Caching Headers**: Proper HTTP caching
- **Async Processing**: Non-blocking operations

### **Monitoring & Observability**

#### **Logging**

```typescript
// Structured logging with Pino
logger.info(
  {
    userId: '123',
    action: 'truck_updated',
    truckId: '456',
    timestamp: new Date().toISOString(),
  },
  'Truck updated successfully'
);
```

#### **Metrics Collection**

- Request/response times
- Error rates and types
- Database query performance
- Memory and CPU usage
- Active connections

#### **Alerting**

- High error rates
- Slow response times
- Database connection issues
- Memory leaks
- Disk space warnings

## 🔒 Security

### **Security Measures**

#### **Authentication Security**

- **JWT**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Token Expiration**: Short-lived tokens with refresh
- **Session Management**: Secure session handling

#### **API Security**

- **Rate Limiting**: Prevent abuse and DoS attacks
- **Input Validation**: Comprehensive request validation
- **Output Sanitization**: Prevent XSS attacks
- **CORS Configuration**: Secure cross-origin requests

#### **Data Security**

- **Database Encryption**: Encrypted sensitive data
- **Connection Security**: SSL/TLS for all connections
- **Environment Variables**: Secure configuration management
- **Audit Logging**: Comprehensive audit trails

### **Security Best Practices**

```typescript
// Input validation example
const createTruckSchema = z.object({
  name: z.string().min(1).max(100),
  capacity: z.number().positive(),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
});

// Rate limiting example
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
};
```

## 🌍 Islamic Context Features

### **Prayer Time Integration**

- **Salah Schedule**: Operation scheduling around prayer times
- **Hajj Season Scaling**: Dynamic scaling during pilgrimage periods
- **Cultural Sensitivity**: Respectful operation timing

### **Islamic Calendar Integration**

- **Hijri Calendar**: Support for Islamic calendar dates
- **Religious Events**: Special handling for religious occasions
- **Ramadan Considerations**: Adjusted operations during fasting month

### **Multilingual Support**

- **Arabic Support**: Full Arabic language support
- **RTL Considerations**: Right-to-left text handling
- **Cultural Adaptation**: Culturally appropriate responses

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Follow coding standards**: ESLint + Prettier
4. **Write tests**: Unit and integration tests
5. **Update documentation**: API docs and README
6. **Run validation**: `pnpm validate`
7. **Commit with conventional commits**: `feat: add new feature`
8. **Submit pull request**

### **Code Review Process**

1. **Automated Checks**: CI/CD pipeline validation
2. **Code Review**: Peer review for quality
3. **Testing**: Comprehensive test coverage
4. **Documentation**: Updated documentation
5. **Performance**: Performance impact assessment

### **Coding Standards**

```typescript
// TypeScript configuration
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true
  }
}

// ESLint configuration
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:node/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

### **Islamic Inspiration**

- **Cleanliness in Islam**: Following the principle that cleanliness is half of faith
- **Service to Pilgrims**: Dedicated service to millions of pilgrims
- **Environmental Stewardship**: Responsible resource management
- **Community Service**: Serving the global Muslim community

### **Technical Acknowledgments**

- **Fastify Team**: High-performance web framework
- **Prisma Team**: Modern database toolkit
- **Node.js Community**: Runtime environment and ecosystem
- **Open Source Contributors**: Community-driven development

---

**🕌 Built with devotion for the service of Masjid ul Haram and the pilgrims who visit Islam's holiest site**

_"And whoever saves a life, it is as if he has saved the whole of mankind." - Quran 5:32_
