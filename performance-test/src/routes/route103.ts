import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller103 } from '@controllers/Controller103';
import { Service103 } from '@services/Service103';
import { Model103 } from '@models/Model103';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller103);
const service = container.resolve(Service103);
const model = new Model103();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
