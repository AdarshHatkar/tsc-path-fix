import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller46 } from '@controllers/Controller46';
import { Service46 } from '@services/Service46';
import { Model46 } from '@models/Model46';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller46);
const service = container.resolve(Service46);
const model = new Model46();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
