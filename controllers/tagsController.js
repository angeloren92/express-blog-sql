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
    const post = posts.find(element => element.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'not found' })
    }
};

// Rotta bacheca store  
const store = (req, res) => {
    const { titolo, contenuto, immagine, tags } = req.body;
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
        id: newId,
        titolo,
        contenuto,
        immagine,
        tags
    };

    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
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
// const destroy = (req, res) => {
//     const index = posts.findIndex(element => element.id === parseInt(req.params.id))
//     if (index !== -1) {
//         posts.splice(index, 1)
//         console.log(posts)
//         res.status(204).send()
//     } else {
//         res.status(404).json({ message: 'not found' })
//     }
// };

module.exports = { index, show, store, modify, update, destroy };