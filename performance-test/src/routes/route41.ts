import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller41 } from '@controllers/Controller41';
import { Service41 } from '@services/Service41';
import { Model41 } from '@models/Model41';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller41);
const service = container.resolve(Service41);
const model = new Model41();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
