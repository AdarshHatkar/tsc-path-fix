import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller102 } from '@controllers/Controller102';
import { Service102 } from '@services/Service102';
import { Model102 } from '@models/Model102';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller102);
const service = container.resolve(Service102);
const model = new Model102();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
