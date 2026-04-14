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
      // --- CPUs ---
      { name: 'Intel Core i5-13600K', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 125, ram_type: 'DDR5' } },
      { name: 'Intel Core i9-13900K', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 150, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 7 7700X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM5', tdp_watts: 105, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 9 7950X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM5', tdp_watts: 170, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 5 5600X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM4', tdp_watts: 65, ram_type: 'DDR4' } },

      // --- MOTHERBOARDS ---
      { name: 'MSI MAG Z790 Tomahawk WiFi', brand: 'MSI', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 192 } },
      { name: 'ASUS ROG Strix B650-A', brand: 'ASUS', category: 'MOTHERBOARD', specs: { socket: 'AM5', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 128 } },
      { name: 'Gigabyte B550 AORUS ELITE', brand: 'Gigabyte', category: 'MOTHERBOARD', specs: { socket: 'AM4', form_factor: 'ATX', ram_type: 'DDR4', max_ram_gb: 128 } },
      { name: 'ASRock B660M Pro RS', brand: 'ASRock', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'mATX', ram_type: 'DDR4', max_ram_gb: 128 } },

      // --- GPUs ---
      { name: 'NVIDIA RTX 4090', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 450, length_mm: 336 } },
      { name: 'NVIDIA RTX 4070 Ti', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 285, length_mm: 285 } },
      { name: 'AMD Radeon RX 7900 XTX', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 355, length_mm: 287 } },
      { name: 'AMD Radeon RX 6700 XT', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 230, length_mm: 267 } },

      // --- RAM ---
      { name: 'Corsair Vengeance DDR5 32GB', brand: 'Corsair', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 6000, capacity_gb: 32 } },
      { name: 'G.Skill Trident Z5 32GB', brand: 'G.Skill', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 6400, capacity_gb: 32 } },
      { name: 'Kingston FURY Beast 16GB', brand: 'Kingston', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 3200, capacity_gb: 16 } },

      // --- PSUs ---
      { name: 'Corsair RM850x', brand: 'Corsair', category: 'PSU', specs: { wattage: 850, form_factor: 'ATX' } },
      { name: 'Seasonic FOCUS 1000W', brand: 'Seasonic', category: 'PSU', specs: { wattage: 1000, form_factor: 'ATX' } },
      { name: 'EVGA SuperNOVA 650 GT', brand: 'EVGA', category: 'PSU', specs: { wattage: 650, form_factor: 'ATX' } },

      // --- CASES ---
      { name: 'Fractal Design North', brand: 'Fractal Design', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 355 } },
      { name: 'NZXT H5 Flow', brand: 'NZXT', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 365 } },
      { name: 'Lian Li O11 Dynamic', brand: 'Lian Li', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 420 } },

      // --- STORAGE ---
      { name: 'Samsung 990 Pro 2TB', brand: 'Samsung', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'WD Black SN850X 1TB', brand: 'WD', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } }
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
