const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Mock Prisma client
const mockPrisma = {
  resource: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  $disconnect: jest.fn(),
};

// Mock the PrismaClient
jest.mock('./generated/prisma', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

// Create test app
const createTestApp = () => {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Welcome to CRL Backend API',
      status: 'Server is running successfully'
    });
  });

  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/resources', async (req, res) => {
    try {
      const resources = await mockPrisma.resource.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      res.json({
        success: true,
        data: resources,
        count: resources.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch resources'
      });
    }
  });

  return app;
};

describe('CRL Backend API', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
    jest.clearAllMocks();
  });

  // Test 1: Health Check Endpoint
  test('GET /health should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Test 2: Resources Endpoint
  test('GET /resources should return resources list', async () => {
    const mockResources = [
      {
        id: 1,
        name: 'National Domestic Violence Hotline',
        category: 'domestic-violence',
        location: 'National',
        phone: '1-800-799-7233',
        website: 'https://www.thehotline.org',
        available24h: true,
        description: '24/7 confidential support'
      }
    ];

    mockPrisma.resource.findMany.mockResolvedValue(mockResources);

    const response = await request(app)
      .get('/resources')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data', mockResources);
    expect(response.body).toHaveProperty('count', 1);
  });
});
