import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller124 } from '@controllers/Controller124';
import { Service124 } from '@services/Service124';
import { Model124 } from '@models/Model124';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller124);
const service = container.resolve(Service124);
const model = new Model124();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
