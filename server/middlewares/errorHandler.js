const errorHandler = (err, req, res, next) => {
  console.log(err)

  let errors = []
  let statusCode = 500

  switch (err.name) {
    case 'JsonWebTokenError':
    case 'AuthenticationFailed':
      errors.push('Authentication failed')
      statusCode = 401
      break
    case 'ValidationError':
      console.log(err.errors)
      for (const property in err.errors) {
        errors.push(err.errors[property].properties.message)
      }
      statusCode = 400
      break
    default:
      errors.push(err.msg || 'Internal server error')
      statusCode = err.statusCode || 500
      break
  }

  res.status(statusCode).json({ errors })
}

module.exports = errorHandler
