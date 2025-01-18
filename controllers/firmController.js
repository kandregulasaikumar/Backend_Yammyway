/// firm ante restaurant name ani meaning vasthundi ....


const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')

// image functin 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
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
//end to image//

const addFirm = async (req, res,) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId)
        
        if(!vendor){
            res.status(404).json({massage:"vendor not found"})
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })
          const savedFirm = await firm.save()

         vendor.firm.push(savedFirm) // ee line ednuku manam firm tho data ni firm table save authundi kani vendor table kuda save avvali kabbati edi use chesi firm array lo save avuthundi ee method tho
    
         await vendor.save() // save cheyyadam kosam

           return res.status(200).json({massage:"firm added successfully"})
    } catch (error) {
          console.log(error)
          res.status(500).json("internal serve error")
    }
}

const deleteFirm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFirm = await Firm.findByIdAndDelete(id);
        if (!deletedFirm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error" });
    }
};








module.exports={addFirm:[upload.single('image'),addFirm],deleteFirm}