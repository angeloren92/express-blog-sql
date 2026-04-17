const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routes/posts')
const checkTime = require('./middlewares/checkTime');
const checkEndpoint = require('./middlewares/checkEndpoint');
const errorHandler = require('./middlewares/errorHandler');

// Avvio del server
app.listen(port, () => {
    console.log(`Server del blog in ascolto su http://localhost:${port}`);
});

// Configurazione per servire file statici dalla cartella public
app.use(express.static('public'));

app.use(express.json());
app.use(checkTime);

// Rotta root
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

app.use('/bacheca', postsRouter);

app.use(checkEndpoint);
app.use(errorHandler);

