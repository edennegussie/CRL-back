const express = require('express');
const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('./generated/prisma')

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Resources routes
app.get('/resources', async (req, res) => {
  try {
    const { location, category } = req.query;
    
    // Build where clause for filtering
    const whereClause = {};
    
    if (location) {
      whereClause.location = {
        contains: location,
        mode: 'insensitive' // Case-insensitive search
      };
    }
    
    if (category) {
      whereClause.category = {
        contains: category,
        mode: 'insensitive' // Case-insensitive search
      };
    }
    
    const resources = await prisma.resource.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      success: true,
      data: resources,
      count: resources.length,
      filters: {
        location: location || null,
        category: category || null
      }
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resources',
      message: error.message
    });
  }
});

app.get('/resources/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await prisma.resource.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resource',
      message: error.message
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Resources API: http://localhost:${PORT}/resources`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
