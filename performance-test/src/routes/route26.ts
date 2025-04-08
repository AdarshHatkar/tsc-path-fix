import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller26 } from '@controllers/Controller26';
import { Service26 } from '@services/Service26';
import { Model26 } from '@models/Model26';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller26);
const service = container.resolve(Service26);
const model = new Model26();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
