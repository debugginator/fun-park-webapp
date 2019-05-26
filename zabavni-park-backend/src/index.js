import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

// Routes

app.use('/zabavni-park', routes.zabavniPark);
app.use('/atrakcija', routes.atrakcija);
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createFunParkWithAttractions();
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createFunParkWithAttractions = async () => {
  await models.ZabavniPark.create(
    {
      naziv: 'PivaLand',
      atrakcijas: [
        {
          naziv: "BeerPong",
          opis: "Beer Pong je relativno jednostavna igra koja ne zahtijeva puno",
          ocjenaTezine: 3,
        },
        {
          naziv: "Čep",
          opis: "Igrači u krug pivskim čepom gađaju čaše u sredini stola i ispijaju pogođeno.",
          ocjenaTezine: 5,
        },
        {
          naziv: "Gađanje pivskim balonima",
          opis: "Grupno gađanje vodenim balonima napunjenim pivom",
          ocjenaTezine: 2,
        },
        {
          naziv: "Chug",
          opis: "Tko zadnji prestane ispijati pivu, gubi",
          ocjenaTezine: 9,
        },
      ]
    },
    {
      include: [models.Atrakcija]
    }
  );

  return true;
};

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
