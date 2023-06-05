import { Router } from "express";
import { AuthenticateUser, StoreUser, StoreFile, GetFiles } from "../Controller/user.controller.js";
var router = Router();
router.post('/authuser', AuthenticateUser)
router.post('/saveuser', StoreUser)
router.post("/addfile", StoreFile)
router.get('/getuser/:id', GetFiles)
export default router