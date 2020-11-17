import faker from 'faker';
import cuid from 'cuid'

const seedCarsDb = async ({ carsDb, amount }) => {
  const cars = await carsDb.findAll();
  if (cars.length !== 0) {
    return
  }
  for (let i = 0; i <= amount; i++) {
    const car = {
      id: cuid(),
      model: faker.vehicle.model(),
      price: faker.random.number({ min: 30, max: 200, precision: 1 }),
      available: faker.random.boolean(),
      category: faker.random.arrayElements(['normal', 'hybrid', 'eletric' ,'premium'])
    }
    carsDb.insert(car)
  }
}

const seedDb = async ({ carsDb, amount }) => {
  await seedCarsDb({ carsDb, amount })
}

export default seedDb;
