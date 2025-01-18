const Firm = require('../models/Firm');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, .png files are allowed!'));
        }
    },
});

// Add Product Controller
const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const firmId = req.params.firmId;

        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(400).json({ error: "Firm not found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller: bestseller,
            description,
            image,
            firm: firm._id,
        });

        const savedProduct = await product.save();

        // Associate product with firm
        firm.products.push(savedProduct);
        await firm.save();

        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId; 
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(400).json({ error: "No firm found" });
        }
// this is for to get firm name 
        const restaurantName =firm.firmName;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({restaurantName,products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteProductById=async (req,res) => {
 try {
    const {id} =req.params;
    const deleteProduct= await Product.findByIdAndDelete(id);
    if(!deleteProduct){
       return res.send("id not found");
    }
    res.status(200).json({message: "Deleted successfully"});
 } catch (error) {
    console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
 }
}




module.exports = {
    addProduct: [upload.single('image'), addProduct],getProductByFirm,deleteProductById
};
