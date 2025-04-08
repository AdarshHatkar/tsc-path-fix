import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller99 } from '@controllers/Controller99';
import { Service99 } from '@services/Service99';
import { Model99 } from '@models/Model99';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller99);
const service = container.resolve(Service99);
const model = new Model99();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
