import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller43 } from '@controllers/Controller43';
import { Service43 } from '@services/Service43';
import { Model43 } from '@models/Model43';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller43);
const service = container.resolve(Service43);
const model = new Model43();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
