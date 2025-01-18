const  express =require('express')

const firmController =require('../controllers/firmController');

const verifyToken =require('../middileware/verifyToken')

const router =express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)

//this is route for get image 
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.header('Content-type','image/jpg')
    res.send(path.join(__dirname,'..','uploads',imageName));
})

router.delete('/delete/:firmId',firmController.deleteFirm);


module.exports=router
