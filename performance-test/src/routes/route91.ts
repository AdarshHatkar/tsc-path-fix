import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller91 } from '@controllers/Controller91';
import { Service91 } from '@services/Service91';
import { Model91 } from '@models/Model91';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller91);
const service = container.resolve(Service91);
const model = new Model91();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
