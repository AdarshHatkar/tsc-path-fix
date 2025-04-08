import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller16 } from '@controllers/Controller16';
import { Service16 } from '@services/Service16';
import { Model16 } from '@models/Model16';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller16);
const service = container.resolve(Service16);
const model = new Model16();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
