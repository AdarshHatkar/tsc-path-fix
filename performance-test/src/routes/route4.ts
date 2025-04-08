import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller4 } from '@controllers/Controller4';
import { Service4 } from '@services/Service4';
import { Model4 } from '@models/Model4';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller4);
const service = container.resolve(Service4);
const model = new Model4();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
