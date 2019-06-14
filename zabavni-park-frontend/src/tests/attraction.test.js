import * as attractionService from "../DAL/attractions";
import * as initial from "./initial_json";
import { validateAttraction } from "../validators/validateAttraction";

describe("Read operations:", () => {
  beforeAll(async () => {
    await attractionService.resetDatabase();
  });

  it('should display initial attractions from the database', async function () {
    const initialAttractions = await attractionService.fetchAllAttractions();
    expect(initialAttractions).toEqual(initial.attractions);
  });

  it('should display attraction with id 1 from the database', async function () {
    const id = 1;
    const index = id - 1;
    const attr1 = await attractionService.fetchAttraction(1);
    expect(attr1).toEqual(initial.attractions[index])
  });
});

describe("Create operations:", () => {

  const testAttr = {
    "naziv": "TestAttraction",
    "opis": "Attraction created by react test suite",
    "ocjenaTezine": 4,
    "avatarURL": "https://www.contegix.com/wp-content/uploads/2017/06/test.png",
    "zabavniParkId": 1,
    "kupovinaBarKod": null,
    "ulaznicaId": null,
    "tipUlazniceId": null
  };
  let validateResult = false;

  it('should validate attraction object before inserting', function () {
    validateResult = validateAttraction(testAttr);
    // validateResult = BUG_validateAttraction(testAttr);
    expect(validateResult).toEqual(true);
  });

  it('should create new test attraction', async function () {
    if (validateResult) {
      let response = await attractionService.createAttraction(testAttr);
      testAttr["id"] = response.id;
      expect(response).toEqual(testAttr);
    }
  });

  it('should verify that insert was applied to the database: ', async function () {
    if (validateResult) {
      let res = await attractionService.fetchAttraction(testAttr.id);
      expect(res).toEqual(testAttr);
    }
  })

});