import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller47 } from '@controllers/Controller47';
import { Service47 } from '@services/Service47';
import { Model47 } from '@models/Model47';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller47);
const service = container.resolve(Service47);
const model = new Model47();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
