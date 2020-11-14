import faker from 'faker'
import cuid from 'cuid'
import crypto from 'crypto'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

const md5 = (text) => {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

const makeFakeCar = (overrides) => {
  const car = {
    id: Id.makeId(),
    model: faker.vehicle.model(),
    price: faker.random.number({ min: 30, max: 200, precision: 1 }),
    available: faker.random.boolean(),
    category: faker.random.arrayElements(['normal', 'hybrid', 'eletric' ,'premium'])
  }

  car.hash = md5(
    (car.id || '') +
    (car.model || '') +
    (car.price || '')
  )

  return {
    ...car,
    ...overrides
  }
}

export default makeFakeCar;
