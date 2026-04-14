const { z } = require('zod');

const createBuildSchema = z.object({
  name: z.string().min(1),
  componentIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)),
});

const updateBuildSchema = createBuildSchema.partial();

module.exports = {
  createBuildSchema,
  updateBuildSchema,
};
