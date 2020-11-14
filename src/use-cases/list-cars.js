const makeListCars = ({ carsDb }) => {
  return async () => {
    const cars = await carsDb.findAll();
    return cars;
  }
}

export default makeListCars;
