import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller45 } from '@controllers/Controller45';
import { Service45 } from '@services/Service45';
import { Model45 } from '@models/Model45';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller45);
const service = container.resolve(Service45);
const model = new Model45();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
