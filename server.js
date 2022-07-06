const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

//Database Connection
const db = require('./config/db_config');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();
const itemRoutes = require('./routes/items.route.js');
const userRoutes = require('./routes/users.route.js');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
app.use('/items', itemRoutes);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
