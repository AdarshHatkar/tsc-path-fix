import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller74 } from '@controllers/Controller74';
import { Service74 } from '@services/Service74';
import { Model74 } from '@models/Model74';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller74);
const service = container.resolve(Service74);
const model = new Model74();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
