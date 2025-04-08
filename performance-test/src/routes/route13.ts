import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller13 } from '@controllers/Controller13';
import { Service13 } from '@services/Service13';
import { Model13 } from '@models/Model13';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller13);
const service = container.resolve(Service13);
const model = new Model13();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
