import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller72 } from '@controllers/Controller72';
import { Service72 } from '@services/Service72';
import { Model72 } from '@models/Model72';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller72);
const service = container.resolve(Service72);
const model = new Model72();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
