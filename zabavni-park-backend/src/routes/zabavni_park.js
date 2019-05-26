import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const parkovi = await req.context.models.ZabavniPark.findAll();
  return res.send(parkovi);
});

router.get('/:parkId', async (req, res) => {
  const park = await req.context.models.ZabavniPark.findByPk(
    req.params.parkId,
  );
  return res.send(park);
});

router.post('/', async (req, res) => {
  const park = await req.context.models.ZabavniPark.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(park);
});

router.delete('/:parkId', async (req, res) => {
  const result = await req.context.models.ZabavniPark.destroy({
    where: { id: req.params.parkId },
  });

  return res.send(true);
});

export default router;
