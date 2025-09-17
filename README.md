# Crime Resource Locator (CRL) Backend

A Node.js Express API backend for the Crime Resource Locator application, providing access to crime-related support resources and services.

## 🚀 Features

- **RESTful API** built with Express.js
- **Database Integration** using Prisma ORM with PostgreSQL
- **CORS Support** for cross-origin requests
- **Resource Filtering** by location and category

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** database
- **Git** (for cloning the repository)

## AI USAGE
- used Cursor AI for pair programming and ChatGPT for coding assistance and bug resolution.

## 🛠️ Installation for local development

1. **Clone the repository**
   ```bash
   git clone https://github.com/edennegussie/CRL-back.git
   cd CRL-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Database
   DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<db>"
   
   # Server
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with initial data
   npm run db:seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with Nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## 📊 Database Schema

### Resource Model
```prisma
model Resource {
  id            Int      @id @default(autoincrement())
  name          String
  category      String
  location      String
  phone         String?
  website       String?
  available24h  Boolean  @default(false)
  description   String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Get All Resources
```http
GET /resources
```

**Query Parameters:**
- `location` (optional): Filter by location (case-insensitive partial match)
- `category` (optional): Filter by category (case-insensitive partial match)

**Examples:**
```http
GET /resources
GET /resources?location=National
GET /resources?category=domestic-violence
GET /resources?location=California&category=mental-health
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "National Domestic Violence Hotline",
      "category": "domestic-violence",
      "location": "National",
      "phone": "1-800-799-7233",
      "website": "https://www.thehotline.org",
      "available24h": true,
      "description": "24/7 confidential support",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1,
  "filters": {
    "location": null,
    "category": null
  }
}
```


## 🗄️ Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## 🏗️ Project Structure

```
crl-back/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seeding script
├── generated/
│   └── prisma/           # Generated Prisma client
├── index.js              # Main application file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (create this)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server in development mode with hot reload |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with initial data |

## 🌐 CORS Configuration

The API is configured to accept cross-origin requests from any origin. For production, you may want to restrict this to specific domains.

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server or database errors

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

## 🔒 Security Considerations

- Environment variables are used for sensitive configuration
- Database credentials should be kept secure
- Consider implementing authentication for production use
- Validate and sanitize all input data

## 🚀 Deployment

### Environment Variables for Production
```bash
DATABASE_URL="postgresql://username:password@your-db-host:5432/crl_database?schema=public"
PORT=3000
NODE_ENV=production
```

### Docker Deployment (Optional)
You can containerize this application using Docker. Create a `Dockerfile` and use the provided scripts.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation above
- Review the Prisma documentation for database-related questions

## 🔄 Version History

- **v1.0.0** - Initial release with basic CRUD operations and filtering
- Basic resource management
- Location and category filtering
- 24/7 availability tracking

---

**Crime Resource Locator Backend** - Providing access to critical support resources when they're needed most.
