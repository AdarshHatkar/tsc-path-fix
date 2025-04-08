import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller119 } from '@controllers/Controller119';
import { Service119 } from '@services/Service119';
import { Model119 } from '@models/Model119';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller119);
const service = container.resolve(Service119);
const model = new Model119();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
