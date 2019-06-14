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
app.use('/stand', routes.stand);
app.use('/djelatnik', routes.djelatnik);
app.use('/reset', routes.reset);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createDatabase().catch(err => console.log("Error creating database: " + err));
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createDatabase = async () => {
  await models.ZabavniPark.create(
    {
      naziv: 'PivaLand',
      pozadinskaSlika: "https://cdn.beeradvocate.com/assets/uploads/2015/10/56Unfiltered-820x564.jpg",
      opis: "Ovaj zabavni park je napravljen specifično za sve ljubitelje pive i one koji se tako osijećaju",
      atrakcijas: [
        {
          naziv: "BeerPong",
          opis: "Beer Pong je relativno jednostavna igra koja ne zahtijeva puno znanja, ali zahtjeva preciznost.",
          ocjenaTezine: 3,
          avatarURL: "https://cdn.prezzybox.com/Images/39755.jpg",
          stand: {
            naziv: "Kraftice",
            cjenik: '{"Zuja": "10kn", "Pan": "8kn", "Paulaner": "14kn"}',
          },
          djelatniks: [
            {
              brRadneKnjizice: "00031312",
              brTekucegRacuna: "324231122",
              osoba: {
                ime: "Nikola",
                prezime: "Logic"
              }
            },
            {
              brRadneKnjizice: "0331312",
              brTekucegRacuna: "342231122",
              osoba: {
                ime: "Petar",
                prezime: "Peric"
              }
            },
            {
              brRadneKnjizice: "00654312",
              brTekucegRacuna: "6543532",
              osoba: {
                ime: "Luka",
                prezime: "Jurić"
              }
            },
            {
              brRadneKnjizice: "2772720",
              brTekucegRacuna: "433453232",
              osoba: {
                ime: "Pivo",
                prezime: "Pivić"
              }
            },
          ]
        },
        {
          naziv: "Čep",
          opis: "Igrači u krug pivskim čepom gađaju čaše u sredini stola i ispijaju pogođeno.",
          ocjenaTezine: 5,
          avatarURL: "https://i.ebayimg.com/images/g/Y8EAAOSwK~RaQz8D/s-l300.jpg",
          stand: {
            naziv: "Pivnica medvedgrad",
            cjenik: '{"Zuja": "10kn", "Pan": "8kn", "Paulaner": "14kn"}'
          },
          djelatniks: [
            {
              brRadneKnjizice: "5134513",
              brTekucegRacuna: "32123543",
              osoba: {
                ime: "Ivan",
                prezime: "Kapec"
              }
            },
            {
              brRadneKnjizice: "5223135",
              brTekucegRacuna: "123451352",
              osoba: {
                ime: "Ivan",
                prezime: "Pac"
              }
            }
          ]
        },
        {
          naziv: "Gađanje pivskim balonima",
          opis: "Grupno gađanje vodenim balonima napunjenim pivom",
          ocjenaTezine: 2,
          avatarURL: "https://www.djecji-rodendani.com/content/uploads/2012/08/2690071691_4af6b19521.jpg",
          stand: {
            naziv: "Paulanerizacija",
            cjenik: '{"Zuja": "10kn", "Pan": "8kn", "Paulaner": "14kn"}'
          },
          djelatniks: [
            {
              brRadneKnjizice: "23272327",
              brTekucegRacuna: "234234522",
              osoba: {
                ime: "Blaž",
                prezime: "Bagić"
              }
            },
            {
              brRadneKnjizice: "5243424",
              brTekucegRacuna: "6454746",
              osoba: {
                ime: "Ana",
                prezime: "Bertić"
              }
            },
          ]
        },
        {
          naziv: "Chug",
          opis: "Tko zadnji prestane ispijati pivu, gubi",
          ocjenaTezine: 9,
          avatarURL: "http://unsobered.com/wp-content/uploads/2017/11/steve-austin-vadapt-955-high-0-218045-1280x0.jpg",
          stand: {
            naziv: "Žuja ne žulja",
            cjenik: '{"Zuja": "10kn", "Pan": "8kn", "Paulaner": "14kn", "Amber": "100kn"}'
          },
          djelatniks: [
            {
              brRadneKnjizice: "36246423",
              brTekucegRacuna: "456243",
              osoba: {
                ime: "Tin",
                prezime: "Ceraj"
              }
            },
            {
              brRadneKnjizice: "135",
              brTekucegRacuna: "123513451",
              osoba: {
                ime: "Andrej",
                prezime: "Ceraj"
              }
            },
          ]
        },
      ],
    }, {
      include: [{
        model: models.Atrakcija,
        include: [
          { model: models.Stand },
          {
            model: models.Djelatnik,
            include: [{ model: models.Osoba }]
          }
        ]
      }]
    }
  );

  return true;
};

export default createDatabase;
