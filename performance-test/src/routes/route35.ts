import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller35 } from '@controllers/Controller35';
import { Service35 } from '@services/Service35';
import { Model35 } from '@models/Model35';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller35);
const service = container.resolve(Service35);
const model = new Model35();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
