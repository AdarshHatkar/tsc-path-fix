import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller23 } from '@controllers/Controller23';
import { Service23 } from '@services/Service23';
import { Model23 } from '@models/Model23';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller23);
const service = container.resolve(Service23);
const model = new Model23();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
