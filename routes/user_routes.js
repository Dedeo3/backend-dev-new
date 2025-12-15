import express from 'express';
import { createProfile,login, createAssets, getProfile, getAssets, getAssetsById, getAssetsByIdCreator, updateProfile } from '../controller/user_controller.js';

const router = express.Router();
router.post('/creator/register', createProfile);
router.get('/creator/register/:id', getProfile);
router.post('/creator/login', login);
router.post('/creator/assets', createAssets);
router.get('/creator/assets', getAssets);
router.get('/creator/assets/:id', getAssetsById);
router.get('/creator/assets-creator/:idCreator', getAssetsByIdCreator)
router.put('/creator/register/:id', updateProfile);

export default router;