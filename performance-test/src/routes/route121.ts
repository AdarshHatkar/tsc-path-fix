import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller121 } from '@controllers/Controller121';
import { Service121 } from '@services/Service121';
import { Model121 } from '@models/Model121';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller121);
const service = container.resolve(Service121);
const model = new Model121();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
