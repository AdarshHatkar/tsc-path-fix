import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller14 } from '@controllers/Controller14';
import { Service14 } from '@services/Service14';
import { Model14 } from '@models/Model14';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller14);
const service = container.resolve(Service14);
const model = new Model14();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
