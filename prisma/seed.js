const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();

async function main() {
  const resources = [
    {
        "id": 1,
        "name": "National Domestic Violence Hotline",
        "category": "domestic-violence",
        "location": "National",
        "phone": "1-800-799-7233",
        "website": "https://www.thehotline.org",
        "available24h": true,
        "description": "24/7 confidential support"
      },
      {
        "id": 2,
        "name": "Crisis Text Line",
        "category": "mental-health",
        "location": "National",
        "phone": "Text HOME to 741741",
        "website": "https://www.crisistextline.org",
        "available24h": true,
        "description": "24/7 crisis support via text"
      },
      {
        "id": 3,
        "name": "Local Women's Shelter - NYC",
        "category": "domestic-violence",
        "location": "New York",
        "phone": "212-555-0123",
        "website": "https://example-shelter.org",
        "available24h": false,
        "description": "Safe housing and support services"
      }
  ];

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { id: resource.id },
      update: {},
      create: resource,
    });
  }

  console.log("Seed data inserted!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
