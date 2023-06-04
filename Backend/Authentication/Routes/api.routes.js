

import { Router } from "express";
import { AuthenticateUser } from "../Controller/user.controller.js";


var router = Router();


router.post('/authuser', AuthenticateUser)

export default router