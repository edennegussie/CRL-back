# Crime Resource Locator (CRL) Backend

A Node.js Express API backend with PstgresSQL for the Crime Resource Locator application, providing access to crime-related support resources and services.

## 🚀 Features

- **RESTful API** built with Express.js
- **Database Integration** using Prisma ORM with PostgreSQL
- **CORS Support** for cross-origin requests
- **Resource Filtering** by location and category

## AI USAGE
- used Cursor AI for pair programming and ChatGPT for coding assistance and bug resolution.
- it allowed for quick development, as time was of the essence.

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
    npx prisma init
    npx prisma generate
    npx prisma migrate dev --name init 
    npx prisma db seed
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
#### 1. Get All Resources
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
## 🚀 Deployment

### Environment Variables for Production
```bash
DATABASE_URL="postgresql://username:password@your-db-host:5432/crl_database?schema=public"
PORT=3000
NODE_ENV=development
```
---

**Crime Resource Locator Backend** - Providing access to critical support resources when they're needed most.
