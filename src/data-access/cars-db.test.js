import makeDb, { closeDb, clearDb } from '../../__test__/fixtures/db';
import makeCarsDb from './cars-db';
import makeFakeCar from '../../__test__/fixtures/car';

describe('cars db', () => {
  let carsDb;

  beforeEach(async () => {
    await makeDb();
    await clearDb();
    carsDb = makeCarsDb({ makeDb });
  })

  afterAll(async () => {
    await closeDb();
  })

  it('#findAll', async () => {
    const inserts = await Promise.all(
        [makeFakeCar(), makeFakeCar(), makeFakeCar()].map(
          carsDb.insert
        )
      );

    const cars = await carsDb.findAll();

    expect(cars.length).toBe(3);
    inserts.forEach(insert => expect(cars).toContainEqual(insert))
  })

  it('#findById', async () => {
    const inserts = await Promise.all(
        [makeFakeCar(), makeFakeCar(), makeFakeCar()].map(
          carsDb.insert
        )
      );

    const car = await carsDb.findById(inserts[0]);

    expect(car).toEqual(inserts[0]);
  })

  it('#insert', async () => {
    const car = makeFakeCar();
    const result = await carsDb.insert(car);
    expect(result).toEqual(car);
  })

  it('#update', async () => {
    const car = makeFakeCar();
    const updatedCar = {
      ...car,
      price: 0,
    }
    await carsDb.insert(car);

    const result = await carsDb.update(updatedCar);

    expect(result).toEqual(updatedCar);
  })

  it('#remove', async () => {
    const car = makeFakeCar();
    await carsDb.insert(car);

    const result = await carsDb.remove(car);

    expect(result).toBe(1);
  })
})