import express = require('express');
import { createConnection } from 'typeorm';
import { User } from './entities/User';

const app = express();

createConnection({
    type: 'mysql',
    database: 'localdb',
    username: 'root',
    password: 'mysql',
    logging: true,
    synchronize: true,
    entities: [User],
});

// app.listen(3000, () => {
//     console.log('Server is running');
// });
