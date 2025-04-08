import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller115 } from '@controllers/Controller115';
import { Service115 } from '@services/Service115';
import { Model115 } from '@models/Model115';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller115);
const service = container.resolve(Service115);
const model = new Model115();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
