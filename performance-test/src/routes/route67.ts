import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller67 } from '@controllers/Controller67';
import { Service67 } from '@services/Service67';
import { Model67 } from '@models/Model67';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller67);
const service = container.resolve(Service67);
const model = new Model67();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
