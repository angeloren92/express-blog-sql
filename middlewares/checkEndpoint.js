function checkEndpoint(req, res, next) {
    // Catch-all middleware per endpoint non trovati
    res.status(404).json({
        error: 'Not Found',
        message: 'Indirizzo non trovato'
    });
}

module.exports = checkEndpoint