import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller65 } from '@controllers/Controller65';
import { Service65 } from '@services/Service65';
import { Model65 } from '@models/Model65';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller65);
const service = container.resolve(Service65);
const model = new Model65();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
