import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import router from './Routes/api.routes.js';
const { json, urlencoded } = bodyParser;
const app = express();
app.use(cors()); //we can integerate using url
app.use(json()); //needed for accessing the req as a json only allow to use inside it
app.use(urlencoded({ extended: false }));

 app.use('/api', router)


app.listen(5051, () => {
    console.log(`Server is Listening on 5051`)
})
