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
    // me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

// Routes

app.use('/zabavni-park', routes.zabavniPark);
app.use('/atrakcija', routes.atrakcija);
app.use('/session', routes.session);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createFunParkWithAttractions();
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
          avatarURL: "https://cdn.prezzybox.com/Images/39755.jpg"
        },
        {
          naziv: "Čep",
          opis: "Igrači u krug pivskim čepom gađaju čaše u sredini stola i ispijaju pogođeno.",
          ocjenaTezine: 5,
          avatarURL: "https://i.ebayimg.com/images/g/Y8EAAOSwK~RaQz8D/s-l300.jpg"
        },
        {
          naziv: "Gađanje pivskim balonima",
          opis: "Grupno gađanje vodenim balonima napunjenim pivom",
          ocjenaTezine: 2,
          avatarURL: "https://www.djecji-rodendani.com/content/uploads/2012/08/2690071691_4af6b19521.jpg"
        },
        {
          naziv: "Chug",
          opis: "Tko zadnji prestane ispijati pivu, gubi",
          ocjenaTezine: 9,
          avatarURL: "http://unsobered.com/wp-content/uploads/2017/11/steve-austin-vadapt-955-high-0-218045-1280x0.jpg"
        },
      ]
    },
    {
      include: [models.Atrakcija]
    }
  );

  return true;
};

