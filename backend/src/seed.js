require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./modules/auth/model');
const Component = require('./modules/components/model');
const logger = require('./utils/logger');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Component.deleteMany({});
    logger.info('Cleared existing data.');

    // 1. Create Users
    const adminPasswordHash = await bcrypt.hash('Admin@123', 12);
    const userPasswordHash = await bcrypt.hash('User@123', 12);

    await User.create([
      { name: 'Admin User', email: 'admin@buildcheck.dev', passwordHash: adminPasswordHash, role: 'ADMIN' },
      { name: 'Regular User', email: 'user@buildcheck.dev', passwordHash: userPasswordHash, role: 'USER' },
    ]);
    logger.info('Users seeded.');

    // 2. Seed Components
    const components = [
      // Incompatible Pair 1
      {
        name: 'AMD Ryzen 7 7700X',
        brand: 'AMD',
        category: 'CPU',
        specs: { socket: 'AM5', tdp_watts: 105, ram_type: 'DDR5' }
      },
      {
        name: 'ASUS ROG Strix B550-F',
        brand: 'ASUS',
        category: 'MOTHERBOARD',
        specs: { socket: 'AM4', form_factor: 'ATX', ram_type: 'DDR4', max_ram_gb: 128, pcie_slots: 2 }
      },
      // Compatible Build Components
      {
        name: 'Intel Core i5-13600K',
        brand: 'Intel',
        category: 'CPU',
        specs: { socket: 'LGA1700', tdp_watts: 125, ram_type: 'DDR5' }
      },
      {
        name: 'MSI MAG Z790 Tomahawk WiFi',
        brand: 'MSI',
        category: 'MOTHERBOARD',
        specs: { socket: 'LGA1700', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 192, pcie_slots: 3 }
      },
      {
        name: 'Corsair Vengeance DDR5 32GB',
        brand: 'Corsair',
        category: 'RAM',
        specs: { type: 'DDR5', speed_mhz: 5600, capacity_gb: 32 }
      },
      {
        name: 'NVIDIA RTX 4070',
        brand: 'NVIDIA',
        category: 'GPU',
        specs: { tdp_watts: 200, length_mm: 336, pcie_version: '4.0' }
      },
      {
        name: 'Corsair RM750',
        brand: 'Corsair',
        category: 'PSU',
        specs: { wattage: 750, form_factor: 'ATX' }
      },
      {
        name: 'Fractal Design North',
        brand: 'Fractal Design',
        category: 'CASE',
        specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 355 }
      },
      {
        name: 'Samsung 990 Pro NVMe 1TB',
        brand: 'Samsung',
        category: 'STORAGE',
        specs: { interface: 'NVMe PCIe 4.0', form_factor: 'M.2 2280' }
      },
      // Second Incompatible (PSU Test)
      {
        name: 'NVIDIA RTX 4090',
        brand: 'NVIDIA',
        category: 'GPU',
        specs: { tdp_watts: 450, length_mm: 366, pcie_version: '4.0' }
      }
    ];

    await Component.create(components);
    logger.info('Components seeded.');

    logger.info('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding error: %O', error);
    process.exit(1);
  }
};

seedData();
