import { listCars } from '../use-cases'
import makeGetCars from './get-cars'
import notFound from './not-found'

const getCars = makeGetCars({ listCars })

export { notFound, getCars }
