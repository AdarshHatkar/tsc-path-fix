import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller109 } from '@controllers/Controller109';
import { Service109 } from '@services/Service109';
import { Model109 } from '@models/Model109';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller109);
const service = container.resolve(Service109);
const model = new Model109();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
