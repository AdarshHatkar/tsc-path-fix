import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller48 } from '@controllers/Controller48';
import { Service48 } from '@services/Service48';
import { Model48 } from '@models/Model48';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller48);
const service = container.resolve(Service48);
const model = new Model48();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
