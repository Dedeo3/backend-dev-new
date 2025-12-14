import { prisma } from "../util/prisma_config.js"

export const createProfile = async (req, res) => {
    const { name, walletAddress } = req.body;

    if (!walletAddress || !name) {
        return res.status(400).json({ error: 'Data walletAddress dan name harus diisi.' });
    }

    try {
        const newUser = await prisma.creator.create({
            data: {
                name: name.toLowerCase(),
                walletAddress: walletAddress,
            },
        });

        // Format response 
        const responseData = {
            id: newUser.id,
            name: newUser.name,
        };

        return res.status(200).json(responseData);

    } catch (error) {
        // Penanganan error Unique Constraint
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Profile sudah terdaftar (Wallet Address, Username,).' });
        }

        console.error('Error saat membuat creator', error);
        return res.status(500).json({ error: 'Terjadi kesalahan server.' });
    }
};


export const createAssets = async (req, res) => {
    try {
        const { creatorId, url, price, description } = req.body;

        // Validasi sederhana
        if (!creatorId || !url || !price || !description) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        // Simpan ke database
        const asset = await prisma.assetMetadata.create({
            data: {
                creatorId:creatorId,
                Url:url,
                price:price,
                description:description,
                unlockableContent: false, // default
            },
        });

        return res.status(201).json({
            message: "success",
            data: asset,
        });
    } catch (error) {
        console.error("Error creating asset:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getAssets = async (req, res) => {
    try {
        const assets = await prisma.assetMetadata.findMany({
            orderBy: { id: "desc" },
        });

        return res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getAssetsById = async (req, res) => {
    const { id } = req.params;
    try {
        const assets = await prisma.assetMetadata.findFirst({
            where: { id: parseInt(req.params.id) },
        });

        return res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const assets = await prisma.creator.findFirst({
            where: { id: parseInt(id) },
        });

        return res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching id:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getAssetsByIdCreator = async (req, res) => {
    const { idCreator } = req.params;
    try {
        const assets = await prisma.assetMetadata.findMany({
            where: { creatorId: parseInt(req.params.idCreator) },
        });

        return res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const login = async (req, res) => {
    const { username, walletAddress } = req.body;


    if (!username || !walletAddress) {
        return res.status(400).json({
            message: "Username and walletAddress are required for login."
        });
    }

    try {
        const user = await prisma.creator.findFirst({
            where: {
                name: username,
                walletAddress: walletAddress,
            },
            select: {
                id: true,
        
            }
        });

        if (user) {

            return res.status(200).json({
            creatorId: user.id,
            });
        } else {
            return res.status(401).json({
                message: "Invalid credentials (Username or Wallet Address not found)."
            });
        }

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal Server Error during login process.",
        });
    }
};
