import express  from "express";
const router = express.Router();
import {deleteUser, getUserById, login, logout, register, updateUser}  from "../Controllers/Auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user/:id", getUserById);
router.put("/updateuser", updateUser);
router.delete("/deleteuser", deleteUser);





export default router;