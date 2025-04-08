import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller25 } from '@controllers/Controller25';
import { Service25 } from '@services/Service25';
import { Model25 } from '@models/Model25';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller25);
const service = container.resolve(Service25);
const model = new Model25();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
