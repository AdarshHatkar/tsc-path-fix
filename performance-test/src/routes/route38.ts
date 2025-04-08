import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller38 } from '@controllers/Controller38';
import { Service38 } from '@services/Service38';
import { Model38 } from '@models/Model38';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller38);
const service = container.resolve(Service38);
const model = new Model38();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
