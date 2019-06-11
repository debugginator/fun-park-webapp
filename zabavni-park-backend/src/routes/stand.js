import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const standovi = await req.context.models.Stand.findAll();
  return res.send(standovi);
});

router.get('/:id', async (req, res) => {
  const stand = await req.context.models.Stand.findByPk(
    req.params.id,
  );
  return res.send(stand);
});

router.post('/edit/:id', async (req, res) => {
  const stand = await req.context.models.Stand.update(req.body, {
    where: { id: req.params.id }
  });

  return res.send(stand);
});

router.post('/create', async (req, res) => {
  const stand = await req.context.models.Stand.create(req.body);

  return res.send(stand);
});

router.delete('/:id', async (req, res) => {
  const result = await req.context.models.Stand.destroy({
    where: { id: req.params.id },
  });

  return res.send(true);
});

export default router;
