import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller104 } from '@controllers/Controller104';
import { Service104 } from '@services/Service104';
import { Model104 } from '@models/Model104';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller104);
const service = container.resolve(Service104);
const model = new Model104();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
