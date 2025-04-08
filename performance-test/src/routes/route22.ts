import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller22 } from '@controllers/Controller22';
import { Service22 } from '@services/Service22';
import { Model22 } from '@models/Model22';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller22);
const service = container.resolve(Service22);
const model = new Model22();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
