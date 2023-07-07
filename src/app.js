import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { configureSocket } from './socket.js';
import { connectToDatabase } from './database.js';


const app = express();

import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);


const server = app.listen(8080, () => console.log('Servidor Express escuchando en el puerto 8080'));

export const io = configureSocket(server);

connectToDatabase();
