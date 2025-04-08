import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller83 } from '@controllers/Controller83';
import { Service83 } from '@services/Service83';
import { Model83 } from '@models/Model83';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller83);
const service = container.resolve(Service83);
const model = new Model83();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
