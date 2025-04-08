import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller68 } from '@controllers/Controller68';
import { Service68 } from '@services/Service68';
import { Model68 } from '@models/Model68';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller68);
const service = container.resolve(Service68);
const model = new Model68();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
