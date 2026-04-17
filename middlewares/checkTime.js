function checkTime(req, res, next) {
    const now = new Date();
    const hour = now.getHours();

    console.log(`[checkTime] richiesta ricevuta alle ${now.toLocaleTimeString()} del ${now.toLocaleDateString()}`);

    // Controllo se la richiesta arriva in orario di lavoro (09:00 - 18:00)
    if (hour >= 9 && hour < 18) {
        return next();
    }

    return res.status(403).json({
        error: 'Servizio disponibile solo dalle 09:00 alle 18:00'
    });
}

module.exports = checkTime