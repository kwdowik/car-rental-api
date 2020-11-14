import buildMakeCar from './car'
import Id from '../id'
import crypto from 'crypto'

const md5 = (text) => {
  return crypto
  .createHash('md5')
  .update(text, 'utf-8')
  .digest('hex')
}

const makeCar = buildMakeCar({ Id, md5 })

export default makeCar;
