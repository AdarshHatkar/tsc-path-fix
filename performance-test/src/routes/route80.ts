import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller80 } from '@controllers/Controller80';
import { Service80 } from '@services/Service80';
import { Model80 } from '@models/Model80';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller80);
const service = container.resolve(Service80);
const model = new Model80();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
