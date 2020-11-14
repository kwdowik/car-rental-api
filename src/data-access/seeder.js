import makeFakeCar from '../../__test__/fixtures/car';

const seedCarsDb = async ({ carsDb, amount }) => {
  const cars = await carsDb.findAll();
  if (cars.length !== 0) {
    return
  }
  for (let i = 0; i <= amount; i++) {
    const car = makeFakeCar();
    carsDb.insert(car)
  }
}

const seedDb = async ({ carsDb, amount }) => {
  await seedCarsDb({ carsDb, amount })
}

export default seedDb;
