import { Router } from 'express';
import { container } from 'tsyringe';
import { Controller17 } from '@controllers/Controller17';
import { Service17 } from '@services/Service17';
import { Model17 } from '@models/Model17';
import { PrismaClient } from '@prisma/client.js';
import { schema } from '@prisma/schema.js';

const router = Router();
const controller = container.resolve(Controller17);
const service = container.resolve(Service17);
const model = new Model17();
const prisma = new PrismaClient();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
