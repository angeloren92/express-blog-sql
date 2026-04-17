const { posts } = require('../data/dataPosts');

function isDuplicate(req, res, next) {
    const { title } = req.body;
    const id = parseInt(req.params.id);

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'titolo obbligatorio' });
    }

    if (title.length < 3) {
        return res.status(400).json({ message: 'titolo deve contenere almeno 3 caratteri' });
    }

    const duplicate = posts.some(post => post.title === title && post.id !== id);
    if (duplicate) {
        return res.status(400).json({ message: 'titolo già presente' });
    }

    next();
}

module.exports = isDuplicate;
