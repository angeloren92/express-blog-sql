const { posts } = require('../data/dataPosts')
const connection = require('../data/db');

// Rotta bacheca index
const index = (req, res) => {
    const query = 'SELECT * FROM posts';
    connection.query(query, (err, results) => {
        if (err) {
            console.error(`Errore durante l'esecuzione della query:`, err);
            return res.status(500).json({ error: 'Errore del server' });
        }
        res.json(results);
    });
}

// Rotta bacheca show
const show = (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT posts.*, tags.label FROM posts JOIN post_tag ON posts.id = post_tag.post_id JOIN tags ON post_tag.tag_id = tags.id WHERE posts.id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error(`Errore durante l'esecuzione della query:`, err);
            return res.status(500).json({ error: 'Errore del server' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Post non trovato' });
        }
        res.json(results[0]);
    });
}

// Rotta bacheca store  

const store = (req, res) => {
    const { title, content, image } = req.body;
    const sql = 'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)';
    connection.query(sql, [title, content, image], (err, results) => {
        if (err) {
            console.error(`Errore durante l'esecuzione della query:`, err);
            return res.status(err.errno === 1062 ? 409 : 500).json(err.errno === 1062 ? { error: 'Titolo già esistente' } : { error: 'Errore del server' });
        }       
            res.status(201).json({ title, content, image });
    });
};

// Rotta bacheca update
const update = (req, res) => {
    const { titolo, contenuto, immagine, tags } = req.body;
    const id = parseInt(req.params.id);
    const post = posts.find(element => element.id === id);

    if (!post) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    }

    post.titolo = titolo;
    post.contenuto = contenuto;
    post.immagine = immagine;
    post.tags = tags;

    console.log(posts);
    res.json(post);
}

// Rotta bacheca modify
const modify = (req, res) => {
    res.send('modifica parziale ' + req.params.id);
};


// Rotta bacheca destroy
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error(`Errore durante l'esecuzione della query:`, err);
            return res.status(500).json({ error: 'Errore del server' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Post non trovato' });
        }
        res.status(204).send();
    });
}

module.exports = { index, show, store, modify, update, destroy };