import { UserModel } from "../Models/user.model.js";
import jwt from 'jsonwebtoken'
import fs from "fs"
import path from "path";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { sign } = jwt
const accessTokenSecret = 'Signinappsecret';


const AuthenticateUser = async (req, res) => {
  const data = req.body.email
  try {
    var token = ""
    const get = await UserModel.findOne({ email: data })
    if (get !== null) {
      var token = sign({ data: { user_id: get.userId, Email: get.email, Name: get.name, Picture: get.picture } }, accessTokenSecret);
      const user_data = { data: get, token }
      res.status(200).json(user_data)
    } else {
      res.status(200).json(get)
    }
  } catch (err) {
    res.status(400).json({ message: "Internal Error" })
  }
}
const StoreUser = async (req, res) => {
  const data = req.body
  const name = req.body.name
  if (name.length > 2) {
    var val = name.substring(0, 3).toLowerCase()
  } else {
    var val = name
  }
  function createVal(val) {
    let id = val
    for (let i = 0; i < 5; i++) {
      id += (Math.floor(Math.random() * 9));
      if (id.length === 6) {
        return id
      }
    }
  }
  var userId = ''
  let tembId = createVal(val)
  var checkId = true
  while (checkId) {
    var check = await UserModel.findOne({ userId: tembId })
    if (check === null) {
      checkId = false
      userId = tembId
    } else {
       tembId = createVal(val)
    }
  }
  try {
    const user_data = { ...data, userId }
    const store = await new UserModel(user_data).save()
    const get = store
    const token = sign({ data: { user_id: get.userId, Email: get.email, Name: get.name, Picture: get.picture } }, accessTokenSecret);
    const stored_data = { data: get, token }
    res.status(200).json(stored_data)
  } catch (err) {
    res.status(400).json({ message: "Internal Error" })
  }
}
const StoreFile = async (req, res) => {
  const data = req.body
  const file = req.files?.my_file;
  var dir = `./Upload/${data.userId}`;
  const extension = path.extname(file?.name)
  const name = data?.filename + extension
  //Folder creating 
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  //Storing files to the local
  var paths = dir + '/' + name;
  file.mv(paths, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    try {
      const findArray = await UserModel.findOne({ userId: data.userId })
      const arr = findArray?.files
      arr.push([data.filename,name])
      const updateArray = await UserModel.updateOne({ userId: data.userId },
        {
          $set: {
            files: arr
          }
        }
      )
      const updatedArray = await UserModel.findOne({ userId: data.userId })
      const filteredData =
      {
        name: updatedArray.name,
        userId: updatedArray.userId,
        files: updatedArray.files
      }
      res.status(200).json(filteredData)
    } catch (err) {
      res.status(400).json({ message: "Internal Error" })
    }
  });
}
const GetFiles = async (req, res) => {
  const userId = req.body.userId
  try {
    const data = await UserModel.findOne({ userId: userId })
    const filteredData =
    {
      name: data?.name,
      userId: data?.userId,
      files: data?.files
    }
    res.status(200).json(filteredData)
  } catch (err) {
    res.status(400).json({ message: "Internal Error" })
  }
}
const DownloadFiles = async (req, res) => {
  const data = req.body
  try {
    const filePath = path.join(__dirname, `../Upload/${data.userId}/${data.file}`);
    res.download(filePath, "jack");
  } catch (err) {
    res.status(400).json("Internal Error")
  }
}
export { AuthenticateUser, StoreUser, StoreFile, GetFiles, DownloadFiles }