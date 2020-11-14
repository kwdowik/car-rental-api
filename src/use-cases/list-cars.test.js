import makeListCars from './list-cars'
import makeCarsDb from '../data-access/cars-db'
import makeFakeCar from '../../__test__/fixtures/car'
import makeDb, { closeDb, clearDb } from '../../__test__/fixtures/db'

describe('list cars', () => {
  let carsDb
  beforeEach(async () => {
    await makeDb();
    await clearDb();
    carsDb = makeCarsDb({ makeDb });
  })

  afterAll(async () => {
    await closeDb();
  })

  it('find all scores from the database', async () => {
    const score1 = makeFakeCar();
    const score2 = makeFakeCar();
    await carsDb.insert(score1)
    await carsDb.insert(score2)

    const listCars = makeListCars({ carsDb });
    const cars = await listCars();

    expect(cars.length).toBe(2)
    expect(cars).toEqual([score1, score2])
  })
})
