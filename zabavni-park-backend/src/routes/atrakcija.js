import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const atrakcije = await req.context.models.Atrakcija.findAll();
  return res.send(atrakcije);
});

router.get('/:id', async (req, res) => {
  const park = await req.context.models.Atrakcija.findByPk(
    req.params.id,
  );
  return res.send(park);
});

router.post('/', async (req, res) => {
  const park = await req.context.models.Atrakcija.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(park);
});

router.delete('/:id', async (req, res) => {
  const result = await req.context.models.Atrakcija.destroy({
    where: { id: req.params.id },
  });

  return res.send(true);
});

export default router;
