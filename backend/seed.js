const mongoose = require('mongoose');
const User = require('./models/User');
const Resource = require('./models/Resource');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodcloset');
    console.log('MongoDB connected for seeding...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Resource.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@foodcloset.org',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      isActive: true
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Create sample resources
    const resources = [
      {
        name: "Downtown Bremerton Food Box",
        type: "food-box",
        address: "123 Pacific Avenue, Bremerton, WA 98310",
        phone: "(360) 555-0101",
        website: "https://example.com",
        coordinates: {
          latitude: 47.5730,
          longitude: -122.6231
        },
        hours: "Monday - Friday: 9 AM - 5 PM",
        description: "Free grocery boxes available to Kitsap County residents in need.",
        notes: "First come, first served. No registration required.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      },
      {
        name: "Silverdale Community Meals",
        type: "meal-site",
        address: "456 Bay Street, Silverdale, WA 98315",
        phone: "(360) 555-0202",
        coordinates: {
          latitude: 47.6550,
          longitude: -122.6600
        },
        hours: "Daily: 12 PM - 2 PM",
        description: "Hot meals served daily for anyone in the community.",
        notes: "Dietary restrictions accommodated when possible. Takeout available.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      },
      {
        name: "Port Orchard Soup Kitchen",
        type: "soup-kitchen",
        address: "789 Bay Street, Port Orchard, WA 98366",
        phone: "(360) 555-0303",
        coordinates: {
          latitude: 47.5330,
          longitude: -122.6180
        },
        hours: "Tuesday, Thursday, Saturday: 6 PM - 8 PM",
        description: "Evening soup and bread served to the community.",
        notes: "Warm seating area available. Coffee and tea provided.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      },
      {
        name: "Kitsap County Library Food Pantry",
        type: "food-box",
        address: "1301 Sylvan Way, Bremerton, WA 98310",
        phone: "(360) 405-9120",
        coordinates: {
          latitude: 47.5950,
          longitude: -122.6300
        },
        hours: "Monday - Friday: 10 AM - 4 PM",
        description: "Emergency food assistance for Kitsap County residents.",
        notes: "Must show proof of residency. Limited quantities available.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      },
      {
        name: "Central Kitsap Food Bank",
        type: "food-box",
        address: "3537 Anderson Hill Rd, Silverdale, WA 98383",
        phone: "(360) 692-9818",
        website: "https://ckfoodbank.org/",
        coordinates: {
          latitude: 47.6442,
          longitude: -122.6878
        },
        hours: "Monday - Friday: 9 AM - 4 PM",
        description: "Provides grocery-style food assistance to Central Kitsap families.",
        notes: "Clients can shop in a welcoming environment; call ahead for current procedures.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      },
      {
        name: "Silverdale Community Church Meals",
        type: "meal-site",
        address: "9982 Silverdale Way NW, Silverdale, WA 98383",
        phone: "(360) 692-9813",
        website: "https://silverdalechurch.org/",
        coordinates: {
          latitude: 47.6710,
          longitude: -122.6860
        },
        hours: "Sunday: 10:30 AM - 12 PM",
        description: "Community meals served after Sunday service.",
        notes: "All are welcome; donations appreciated.",
        createdBy: adminUser._id,
        verified: true,
        verifiedBy: adminUser._id,
        isActive: true
      }
    ];

    const createdResources = await Resource.insertMany(resources);
    console.log(`✅ Created ${createdResources.length} sample resources`);

    // Create a regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
      phone: '(360) 555-1234',
      isActive: true
    });

    console.log('✅ Regular user created:', regularUser.email);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n📋 Regular User Credentials:');
    console.log(`Email: ${regularUser.email}`);
    console.log('Password: password123');

  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

// Run seeder
connectDB().then(() => {
  seedData();
});