import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller69 } from '@controllers/Controller69';
import { Service69 } from '@services/Service69';
import { Model69 } from '@models/Model69';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller69);
const service = container.resolve(Service69);
const model = new Model69();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
