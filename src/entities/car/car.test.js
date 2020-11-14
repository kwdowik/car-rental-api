import makeFakeCar from '../../../__test__/fixtures/car'
import makeCar from './'

describe('car', () => {
  it('must have a model', () => {
    const car = makeFakeCar({ model: null })
    expect(() => makeCar(car)).toThrow('Car must have a model.')
  })
  it('model`s name must be longer than 3 characters', () => {
    const car = makeFakeCar({ model: 'a' })
    expect(() => makeCar(car)).toThrow('Car model`s name must be longer than 1 character.')
  })
  it('must have a price greater than 0', () => {
    const car = makeFakeCar({ price: 0 });
    expect(() => makeCar(car)).toThrow('Car price must be greater than 0.')
  })
  it('can set available property', () => {
    const fakeCar = makeFakeCar({ available: false })
    const car = makeCar(fakeCar)
    car.setAvailable(true)
    expect(car.getAvailable()).toBe(true)
  })
  it('can set price property', () => {
    const fakeCar = makeFakeCar({ price: 10 })
    const car = makeCar(fakeCar)
    car.setPrice(100)
    expect(car.getPrice()).toBe(100)
  })
})
