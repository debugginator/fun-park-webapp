import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const atrakcije = await req.context.models.Atrakcija.findAll();
  return res.send(atrakcije);
});

router.get('/:id', async (req, res) => {
  const atrakcija = await req.context.models.Atrakcija.findByPk(
    req.params.id,
  );
  return res.send(atrakcija);
});

router.post('/edit/:id', async (req, res) => {
  const atrakcija = await req.context.models.Atrakcija.update(req.body, {
    where: { id: req.params.id }
  });

  return res.send(atrakcija);
});

router.post('/create', async (req, res) => {
  const atrakcija = await req.context.models.Atrakcija.create(req.body);

  return res.send(atrakcija);
});

router.delete('/:id', async (req, res) => {
  const result = await req.context.models.Atrakcija.destroy({
    where: { id: req.params.id },
  });

  return res.send(true);
});

export default router;
