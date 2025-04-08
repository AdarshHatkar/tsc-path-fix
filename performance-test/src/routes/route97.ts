import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller97 } from '@controllers/Controller97';
import { Service97 } from '@services/Service97';
import { Model97 } from '@models/Model97';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller97);
const service = container.resolve(Service97);
const model = new Model97();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
