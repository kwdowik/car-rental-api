const buildMakeCar = ({ Id, md5 }) => {
  return ({
    id = Id.makeId(),
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    model,
    price,
    available,
    category
  } = {}) => {
    if (!Id.isValidId(id)) {
      throw new Error('Car must have a valid id.')
    }
    if (!model) {
      throw new Error('Car must have a model.')
    }
    if (model.length < 2) {
      throw new Error('Car model`s name must be longer than 1 character.')
    }
    if (price <= 0) {
      throw new Error('Car price must be greater than 0.')
    }
    let hash

    return Object.freeze({
      getId: () => id,
      getHash: () => hash || (hash = makeHash()),
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getModel: () => model,
      getPrice: () => price,
      getAvailable: () => available,
      getCategory: () => category,
      setAvailable: (val) => {
        available = val;
      },
      setPrice: (val) => {
        price = val;
      }
    })

    function makeHash () {
      return md5(
        (user || '') +
          (teamId || '') +
          (categoryId || '')
      )
    }
  }
}

export default buildMakeCar;
