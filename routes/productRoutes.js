const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);

router.get('/:firmId/products',productController.getProductByFirm);

//this is route for get image 
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.header('Content-type','image/jpg')
    res.send(path.join(__dirname,'..','uploads',imageName));
})

router.delete('/delete/:productId',productController.deleteProductById)


module.exports = router;
