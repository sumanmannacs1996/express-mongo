const errorHandaler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        ...(process.env.NODE_ENV === 'development') && {stack : err.stack}
    })
}

module.exports = {errorHandaler}