import express from 'express';
import { createProfile, createAssets, getAssets, getAssetsById, getAssetsByIdCreator } from '../controller/user_controller.js';

const router = express.Router();
router.post('/creator/register', createProfile);
router.post('/creator/assets', createAssets);
router.get('/creator/assets', getAssets);
router.get('/creator/assets/:id', getAssetsById);
router.get('/creator/assets-creator/:idCreator', getAssetsByIdCreator)
export default router;