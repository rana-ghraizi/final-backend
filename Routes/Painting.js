import express from "express";
const router = express.Router();

import Upload from '../middleware/Upload.js'
import {
    getAllPaintings,
    createPainting,
    getPaintngById,
    updatePainting,
    deletePainting,
  } from "../Controllers/Painting.js";

router.get('/', getAllPaintings);
router.get('/:id', getPaintngById);
router.post('/:id', Upload.single('image'),createPainting)
router.put('/:id', Upload.single('image'), updatePainting);
router.delete('/:id', deletePainting);


export default router;
