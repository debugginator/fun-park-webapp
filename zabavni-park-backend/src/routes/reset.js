import { Router } from 'express';

import { sequelize } from '../models';
import createDatabase from '../index';

const router = Router();

router.get('/', async (req, res) => {
  await sequelize.sync({
    force: true
  });
  await createDatabase();
  return res.send({reset: "true"});
});

export default router;