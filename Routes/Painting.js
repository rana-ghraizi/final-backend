import express from "express";
const router = express.Router();

import Upload from '../middleware/Upload.js'
import {
    getAllPaintings,
    createPainting,
    getPaintngById,
    getAllPaintingsByCategory,
    getAllPaintingsByStyle,
    getAllPaintingsByUserId,
    updatePainting,
    deletePainting,
  } from "../Controllers/Painting.js";

router.get('/', getAllPaintings);
router.get('/:id', getPaintngById);
router.get('/category/:categoryId', getAllPaintingsByCategory);
router.get('/style/:styleId', getAllPaintingsByStyle);
router.get('/user/:userId', getAllPaintingsByUserId);
router.post('/:id', Upload.single('image'),createPainting)
router.put('/:id', Upload.single('image'), updatePainting);
router.delete('/:id', deletePainting);


export default router;
