import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller32 } from '@controllers/Controller32';
import { Service32 } from '@services/Service32';
import { Model32 } from '@models/Model32';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller32);
const service = container.resolve(Service32);
const model = new Model32();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
