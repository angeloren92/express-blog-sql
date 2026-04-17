function errorHandler(err, req, res, next) {
    console.error('[errorHandler] Errore interno del server:', err);

    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Si è verificato un errore sul server. Riprova più tardi.'
    });
}

module.exports = errorHandler;
