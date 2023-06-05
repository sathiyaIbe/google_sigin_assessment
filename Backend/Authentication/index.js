import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import router from './Routes/api.routes.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { json, urlencoded } = bodyParser;
const app = express();
app.use(cors()); //we can integerate using url
app.use(json()); //needed for accessing the req as a json only allow to use inside it
app.use(fileUpload())
app.use(urlencoded({ extended: false }));
console.log(__dirname)
app.use('/files', express.static(__dirname+ '/Upload'))
app.use('/images', express.static(__dirname + '/upload/images'));
app.get('/authentication', (req,res)=>res.send("Hello"))
 app.use('/authentication/api', router)
app.listen(5051, () => {
    console.log(`Server is Listening on 5051`)
})
