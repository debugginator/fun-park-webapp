import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const djelatnici = await req.context.models.Djelatnik.findAll();
  return res.send(djelatnici);
});

router.get('/:id', async (req, res) => {
  const djelatnik = await req.context.models.Djelatnik.findByPk(
    req.params.id,
  );
  return res.send(djelatnik);
});

router.post('/edit/:id', async (req, res) => {
  const djelatnik = await req.context.models.Djelatnik.update(req.body, {
    where: { id: req.params.id }
  });

  return res.send(djelatnik);
});

router.post('/create', async (req, res) => {
  const djelatnik = await req.context.models.Djelatnik.create(req.body);

  return res.send(djelatnik);
});

router.delete('/:id', async (req, res) => {
  const result = await req.context.models.Djelatnik.destroy({
    where: { id: req.params.id },
  });

  return res.send(true);
});

export default router;
