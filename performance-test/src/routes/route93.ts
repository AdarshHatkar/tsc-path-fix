import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller93 } from '@controllers/Controller93';
import { Service93 } from '@services/Service93';
import { Model93 } from '@models/Model93';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller93);
const service = container.resolve(Service93);
const model = new Model93();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
