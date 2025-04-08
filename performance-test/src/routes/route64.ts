import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller64 } from '@controllers/Controller64';
import { Service64 } from '@services/Service64';
import { Model64 } from '@models/Model64';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller64);
const service = container.resolve(Service64);
const model = new Model64();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
