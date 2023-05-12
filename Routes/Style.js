import express from "express";
const router = express.Router();

import {
    getAllStyles,
    getStyleById,
    createStyle,
    editStyle,
    deleteStyle
  } from "../Controllers/Style.js";

router.get('/', getAllStyles);
router.get('/:id', getStyleById);
router.post('/', createStyle);
router.put('/:id', editStyle);
router.delete('/:id', deleteStyle);


export default router;
