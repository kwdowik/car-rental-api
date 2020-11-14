  
import makeListCars from './list-cars'
import { carsDb } from '../data-access'

const listCars = makeListCars({ carsDb })

export { listCars }
