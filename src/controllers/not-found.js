const notFound = async () =>  {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: { error: 'Not found.' },
    statusCode: 404
  }
}

export default notFound;
