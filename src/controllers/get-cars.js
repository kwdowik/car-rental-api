const makeGetCars = ({ listCars }) => {
  return async (_httpRequest) => {
    try {
      const cars = await listCars();
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: { cars }
      }
    } catch(e) {
      console.log(e)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: { 
          error: e.message
         }
      }
    }
  }
}

export default makeGetCars;
