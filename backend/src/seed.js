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

    // 2. Seed Components (10 per category)
    const components = [
      // --- CPUs (10) ---
      { name: 'Intel Core i9-13900K', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 150, ram_type: 'DDR5' } },
      { name: 'Intel Core i7-13700K', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 125, ram_type: 'DDR5' } },
      { name: 'Intel Core i5-13600K', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 125, ram_type: 'DDR4' } },
      { name: 'Intel Core i5-12400F', brand: 'Intel', category: 'CPU', specs: { socket: 'LGA1700', tdp_watts: 65, ram_type: 'DDR4' } },
      { name: 'AMD Ryzen 9 7950X3D', brand: 'AMD', category: 'CPU', specs: { socket: 'AM5', tdp_watts: 120, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', category: 'CPU', specs: { socket: 'AM5', tdp_watts: 120, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 5 7600X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM5', tdp_watts: 105, ram_type: 'DDR5' } },
      { name: 'AMD Ryzen 9 5950X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM4', tdp_watts: 105, ram_type: 'DDR4' } },
      { name: 'AMD Ryzen 7 5800X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM4', tdp_watts: 105, ram_type: 'DDR4' } },
      { name: 'AMD Ryzen 5 5600X', brand: 'AMD', category: 'CPU', specs: { socket: 'AM4', tdp_watts: 65, ram_type: 'DDR4' } },

      // --- MOTHERBOARDS (10) ---
      { name: 'ASUS ROG MAXIMUS Z790', brand: 'ASUS', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 192 } },
      { name: 'MSI MAG Z790 Tomahawk', brand: 'MSI', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 192 } },
      { name: 'Gigabyte Z690 AORUS ELITE', brand: 'Gigabyte', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'ATX', ram_type: 'DDR4', max_ram_gb: 128 } },
      { name: 'ASRock B660M Pro RS', brand: 'ASRock', category: 'MOTHERBOARD', specs: { socket: 'LGA1700', form_factor: 'mATX', ram_type: 'DDR4', max_ram_gb: 128 } },
      { name: 'ASUS ROG STRIX X670E-E', brand: 'ASUS', category: 'MOTHERBOARD', specs: { socket: 'AM5', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 128 } },
      { name: 'Gigabyte B650 AORUS ELITE', brand: 'Gigabyte', category: 'MOTHERBOARD', specs: { socket: 'AM5', form_factor: 'ATX', ram_type: 'DDR5', max_ram_gb: 128 } },
      { name: 'MSI PRO B650M-A WiFi', brand: 'MSI', category: 'MOTHERBOARD', specs: { socket: 'AM5', form_factor: 'mATX', ram_type: 'DDR5', max_ram_gb: 128 } },
      { name: 'ASUS TUF GAMING B550-PLUS', brand: 'ASUS', category: 'MOTHERBOARD', specs: { socket: 'AM4', form_factor: 'ATX', ram_type: 'DDR4', max_ram_gb: 128 } },
      { name: 'MSI B450 TOMAHAWK MAX', brand: 'MSI', category: 'MOTHERBOARD', specs: { socket: 'AM4', form_factor: 'ATX', ram_type: 'DDR4', max_ram_gb: 64 } },
      { name: 'Gigabyte A520M S2H', brand: 'Gigabyte', category: 'MOTHERBOARD', specs: { socket: 'AM4', form_factor: 'mATX', ram_type: 'DDR4', max_ram_gb: 64 } },

      // --- GPUs (10) ---
      { name: 'NVIDIA RTX 4090 Founders', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 450, length_mm: 304 } },
      { name: 'ASUS ROG Strix RTX 4090', brand: 'ASUS', category: 'GPU', specs: { tdp_watts: 450, length_mm: 358 } },
      { name: 'NVIDIA RTX 4080 Super', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 320, length_mm: 304 } },
      { name: 'NVIDIA RTX 4070 Ti', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 285, length_mm: 285 } },
      { name: 'NVIDIA RTX 3060 Ti', brand: 'NVIDIA', category: 'GPU', specs: { tdp_watts: 200, length_mm: 242 } },
      { name: 'AMD Radeon RX 7900 XTX', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 355, length_mm: 287 } },
      { name: 'AMD Radeon RX 7900 XT', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 315, length_mm: 276 } },
      { name: 'AMD Radeon RX 6800 XT', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 300, length_mm: 267 } },
      { name: 'AMD Radeon RX 6700 XT', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 230, length_mm: 267 } },
      { name: 'AMD Radeon RX 6600', brand: 'AMD', category: 'GPU', specs: { tdp_watts: 132, length_mm: 190 } },

      // --- RAM (10) ---
      { name: 'G.Skill Trident Z5 32GB', brand: 'G.Skill', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 6000, capacity_gb: 32 } },
      { name: 'Corsair Vengeance 32GB', brand: 'Corsair', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 5600, capacity_gb: 32 } },
      { name: 'Kingston FURY Beast 16GB', brand: 'Kingston', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 5200, capacity_gb: 16 } },
      { name: 'TeamGroup T-Force 32GB', brand: 'TeamGroup', category: 'RAM', specs: { type: 'DDR5', speed_mhz: 6400, capacity_gb: 32 } },
      { name: 'G.Skill Trident Z Neo 32GB', brand: 'G.Skill', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 3600, capacity_gb: 32 } },
      { name: 'Corsair Vengeance LPX 16GB', brand: 'Corsair', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 3200, capacity_gb: 16 } },
      { name: 'Crucial Ballistix 16GB', brand: 'Crucial', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 3200, capacity_gb: 16 } },
      { name: 'TeamGroup T-Force Vulcan 16GB', brand: 'TeamGroup', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 3000, capacity_gb: 16 } },
      { name: 'Patriot Viper Steel 16GB', brand: 'Patriot', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 4000, capacity_gb: 16 } },
      { name: 'HyperX Fury 8GB', brand: 'HyperX', category: 'RAM', specs: { type: 'DDR4', speed_mhz: 2666, capacity_gb: 8 } },

      // --- PSUs (10) ---
      { name: 'Corsair AX1600i', brand: 'Corsair', category: 'PSU', specs: { wattage: 1600, form_factor: 'ATX' } },
      { name: 'EVGA SuperNOVA 1000 G7', brand: 'EVGA', category: 'PSU', specs: { wattage: 1000, form_factor: 'ATX' } },
      { name: 'Seasonic FOCUS GX-850', brand: 'Seasonic', category: 'PSU', specs: { wattage: 850, form_factor: 'ATX' } },
      { name: 'Corsair RM750x', brand: 'Corsair', category: 'PSU', specs: { wattage: 750, form_factor: 'ATX' } },
      { name: 'EVGA 600 W1', brand: 'EVGA', category: 'PSU', specs: { wattage: 600, form_factor: 'ATX' } },
      { name: 'Cooler Master V850 SFX', brand: 'Cooler Master', category: 'PSU', specs: { wattage: 850, form_factor: 'SFX' } },
      { name: 'Corsair SF750', brand: 'Corsair', category: 'PSU', specs: { wattage: 750, form_factor: 'SFX' } },
      { name: 'Thermaltake Toughpower 1200W', brand: 'Thermaltake', category: 'PSU', specs: { wattage: 1200, form_factor: 'ATX' } },
      { name: 'Seasonic PRIME 1300W', brand: 'Seasonic', category: 'PSU', specs: { wattage: 1300, form_factor: 'ATX' } },
      { name: 'SilverStone ST45SF', brand: 'SilverStone', category: 'PSU', specs: { wattage: 450, form_factor: 'SFX' } },

      // --- CASES (10) ---
      { name: 'Lian Li O11 Dynamic EVO', brand: 'Lian Li', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX', 'E-ATX'], max_gpu_length_mm: 422 } },
      { name: 'Fractal Design North', brand: 'Fractal Design', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 355 } },
      { name: 'NZXT H9 Flow', brand: 'NZXT', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 435 } },
      { name: 'Corsair 4000D Airflow', brand: 'Corsair', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 360 } },
      { name: 'Phanteks Eclipse G360A', brand: 'Phanteks', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 400 } },
      { name: 'Cooler Master NR200P', brand: 'Cooler Master', category: 'CASE', specs: { supported_form_factors: ['ITX'], max_gpu_length_mm: 330 } },
      { name: 'SSUPD Meshlicious', brand: 'SSUPD', category: 'CASE', specs: { supported_form_factors: ['ITX'], max_gpu_length_mm: 336 } },
      { name: 'HYTE Y60', brand: 'HYTE', category: 'CASE', specs: { supported_form_factors: ['ATX', 'mATX'], max_gpu_length_mm: 375 } },
      { name: 'Be Quiet! Silent Base 802', brand: 'Be Quiet!', category: 'CASE', specs: { supported_form_factors: ['ATX', 'E-ATX'], max_gpu_length_mm: 432 } },
      { name: 'Thermaltake Tower 500', brand: 'Thermaltake', category: 'CASE', specs: { supported_form_factors: ['ATX', 'E-ATX'], max_gpu_length_mm: 355 } },

      // --- STORAGE (10) ---
      { name: 'Samsung 990 Pro 2TB', brand: 'Samsung', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'WD Black SN850X 1TB', brand: 'WD', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'Crucial P5 Plus 1TB', brand: 'Crucial', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'Samsung 970 Evo Plus 1TB', brand: 'Samsung', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'SK Hynix Platinum P41 2TB', brand: 'SK Hynix', category: 'STORAGE', specs: { interface: 'NVMe', form_factor: 'M.2' } },
      { name: 'Samsung 870 EVO 1TB', brand: 'Samsung', category: 'STORAGE', specs: { interface: 'SATA', form_factor: '2.5"' } },
      { name: 'Crucial MX500 2TB', brand: 'Crucial', category: 'STORAGE', specs: { interface: 'SATA', form_factor: '2.5"' } },
      { name: 'WD Blue SA510 1TB', brand: 'WD', category: 'STORAGE', specs: { interface: 'SATA', form_factor: '2.5"' } },
      { name: 'Seagate Barracuda 2TB', brand: 'Seagate', category: 'STORAGE', specs: { interface: 'SATA', form_factor: '3.5"' } },
      { name: 'WD Red Pro 4TB', brand: 'WD', category: 'STORAGE', specs: { interface: 'SATA', form_factor: '3.5"' } }
    ];

    await Component.create(components);
    logger.info('70 components seeded successfully.');

    logger.info('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding error: %O', error);
    process.exit(1);
  }
};

seedData();
