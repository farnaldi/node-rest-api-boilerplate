import { API_PORT } from './config/env';
import initApp from './app';
import connectDatabase from './database/connect';

try {
    connectDatabase();
} catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Something went wrong connecting database:${e.message}`);
}

const app = initApp();

const port = API_PORT;

app.listen(port, err => {
    if (err) {
        // eslint-disable-next-line no-console
        return console.error(err);
    }
    // eslint-disable-next-line no-console
    return console.log(`server is listening on ${port}`);
});
