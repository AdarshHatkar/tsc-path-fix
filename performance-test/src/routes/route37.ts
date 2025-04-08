import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller37 } from '@controllers/Controller37';
import { Service37 } from '@services/Service37';
import { Model37 } from '@models/Model37';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller37);
const service = container.resolve(Service37);
const model = new Model37();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
