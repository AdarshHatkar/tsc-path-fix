import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller58 } from '@controllers/Controller58';
import { Service58 } from '@services/Service58';
import { Model58 } from '@models/Model58';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller58);
const service = container.resolve(Service58);
const model = new Model58();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
