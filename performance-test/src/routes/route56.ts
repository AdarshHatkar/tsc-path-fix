import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller56 } from '@controllers/Controller56';
import { Service56 } from '@services/Service56';
import { Model56 } from '@models/Model56';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller56);
const service = container.resolve(Service56);
const model = new Model56();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
