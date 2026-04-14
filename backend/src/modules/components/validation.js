const { z } = require('zod');

const componentSchema = z.object({
  name: z.string().min(2),
  brand: z.string().min(1),
  category: z.enum(['CPU', 'MOTHERBOARD', 'RAM', 'GPU', 'PSU', 'STORAGE', 'CASE']),
  specs: z.record(z.any()), // Basic validation, specifics depend on category
});

const updateComponentSchema = componentSchema.partial();

module.exports = {
  componentSchema,
  updateComponentSchema,
};
