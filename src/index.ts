import express = require('express');
import { BaseEntity, createConnection, getMetadataArgsStorage } from 'typeorm';
import { User } from './entities/User';

const app = express();

createConnection({
    type: 'mysql',
    database: 'localdb',
    username: 'root',
    password: 'mysql',
    logging: false,
    synchronize: true,
    entities: [User],
});

app.get('/', (req, res) => {
    User.find().then((lists) => {
        getTypes().then((type) => {
            res.json({ types: type, data: lists });
        });
    });
});

app.post('/', (req, res) => {
    User.insert({
        name: 'User First',
        size: 1337,
    });
});

setTimeout(() => {
    User.find().then((data) => {
        if (data.length == 0) {
            return;
        }
        let keys = Object.keys(data[0]);
        getMetadataArgsStorage().columns.forEach((column) => {
            keys.forEach((element) => {
                if (column.propertyName == element) {
                    // console.log(`${element} was saved as ${column.options.type}`);
                }
            });
        });
    });
}, 100);

app.listen(3000, () => {
    console.log('Server is running');
});

class defTest {
    name: string = 'a';
    type: number = 1;
}

async function getTypes(): Promise<{ [key: string]: string }> {
    let data = await User.find();
    const names: { [key: string]: string } = {};
    if (data.length == 0) {
        return names;
    }

    let keys = Object.keys(data[0]);
    getMetadataArgsStorage().columns.forEach((column) => {
        keys.forEach((element) => {
            if (column.propertyName == element) {
                names[element] = String(column.options.type);
                // console.log(`${element} was saved as ${column.options.type}`);
            }
        });
    });
    return names;
}
