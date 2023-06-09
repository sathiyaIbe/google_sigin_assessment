import { Router } from "express";
import { authenticateJWT } from "../Service/Auth.js";
import { AuthenticateUser, StoreUser, StoreFile, GetFiles ,DownloadFiles} from "../Controller/user.controller.js";
var router = Router();
router.post('/authuser', AuthenticateUser)
router.post('/saveuser', StoreUser)
router.put("/addfile",authenticateJWT, StoreFile)
router.get('/getuser',authenticateJWT, GetFiles)
router.post("/downloadfiles",authenticateJWT,DownloadFiles)
export default router