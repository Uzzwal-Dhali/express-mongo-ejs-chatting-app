import createError from 'http-errors'

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Oops! The content is not available!"))
}

// Default error handler
function errorHandler(err, req, res, next) {
  res.render('error', {
    title: "404! Error page"
  })
}

export { notFoundHandler, errorHandler }
