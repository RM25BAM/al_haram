import fastify from 'fastify';
import cors from '@fastify/cors';
import { Server as SocketIOServer } from 'socket.io';
import { registerRoutes } from './routes/index';
import { DataService } from './services/data.service';

const server = fastify({
  // logger: {
  //   level: 'info',
  //   transport: {
  //     target: 'pino-pretty',
  //     options: {
  //       colorize: true,
  //       translateTime: 'HH:MM:ss Z',
  //       ignore: 'pid,hostname',
  //     },
  //   },
  // },
});

// Register CORS
server.register(cors, {
  origin: ['*'],
  credentials: true,
});

// Register routes
server.register(registerRoutes);

// Health check
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = Number(process.env['PORT']) || 8000;
    const host = process.env['HOST'] || '0.0.0.0';

    await server.listen({ port, host });
    
    // Initialize Socket.IO server
    const io = new SocketIOServer(server.server, {
      cors: {
        origin: ['*'],
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ['Content-Type'],
      },
      transports: ['websocket', 'polling'],
    });

    const dataService = new DataService();
    
    // Log truck assignment summary for debugging
    const assignmentSummary = dataService.getTruckAssignmentSummary();
    server.log.info('Truck Assignment Summary:', assignmentSummary);

    io.on('connection', (socket) => {
      server.log.info(`✅ Client connected: ${socket.id}`);

      const emitDashboardData = () => {
        try {
          const bins = dataService.getWasteBins();
          const trucks = dataService.getTrucks();
          const wasteTypes = dataService.getWasteTypes();
          socket.emit('bin-data-update', bins);
          socket.emit('truck-data-update', trucks);
          socket.emit('waste-types-update', wasteTypes);
          
          server.log.info(`📊 Dashboard data sent to client: ${socket.id}`);
        } catch (error) {
          server.log.error('Error emitting dashboard data:', error);
        }
      };

      // Send initial data immediately
      emitDashboardData();

      // Set up interval to send data every 5 seconds
      const interval = setInterval(() => {
        // Simulate data changes
        dataService.simulateCollectionCycle();
        emitDashboardData();
      }, 5000);

      // Handle specific socket events
      socket.on('request-dashboard-data', () => {
        server.log.info(`📡 Dashboard data requested by client: ${socket.id}`);
        emitDashboardData();
      });

      //**** below is to manually simulate by calling socket ****/
      socket.on('simulate-bin-update', (data) => {
        server.log.info(`🔄 Bin simulation update from client: ${socket.id}`, data);
        dataService.simulateCollectionCycle();
        io.emit('bin-data-update', dataService.getWasteBins());
      });

      socket.on('simulate-truck-update', (data) => {
        server.log.info(`🚛 Truck simulation update from client: ${socket.id}`, data);
        dataService.simulateCollectionCycle();
        io.emit('truck-data-update', dataService.getTrucks());
      });
      //**** above is to manually simulate by calling socket ****/

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        clearInterval(interval);
        server.log.info(`❌ Client disconnected: ${socket.id}, reason: ${reason}`);
      });

      // Handle connection errors
      socket.on('error', (error) => {
        server.log.error('Socket error:', error);
      });
    });

    server.log.info(`🚀 Server running at http://${host}:${port}`);
    server.log.info(`🏥 Health check: http://${host}:${port}/health`);
    server.log.info(`🔌 Socket.IO server initialized`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
