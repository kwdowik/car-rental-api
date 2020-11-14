import makeGetCars from './get-cars'
import makeFakeCar from '../../__test__/fixtures/car'

describe('get cars controller', () => {
  it('successfully get a cars', async () => {
    const car = makeFakeCar();
    const getCars = makeGetCars({ listCars: () => [car] });
    const request = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: { cars: [car] }
    }

    const actual = await getCars(request);
    expect(actual).toEqual(expected);
  })
  it('reports user errors', async () => {
    const getCars = makeGetCars({
      listCars: () => {
        throw Error('Pow!');
      }
    })
    const fakeCar = makeFakeCar();
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: fakeCar,
    };
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    };

    const actual = await getCars(request);

    expect(actual).toEqual(expected);
  })
})
