const express = require('express');
const passport = require('passport');
const multer = require('multer');
const { registerUser, loginUser, getUsers} = require('../controllers/AuthController');
const { addBanner, getBanners, updateBanner, deleteBanner } = require('../controllers/BannerController');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/ProductController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.trim())
    }
})

const upload = multer({ storage })

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/get-users', passport.authenticate('jwt',{session: false}), getUsers)

router.post('/add-banner', passport.authenticate('jwt',{session: false}), addBanner)

router.get('/get-banners', getBanners)

router.put('/update-banner/:bannerId', passport.authenticate('jwt',{session: false}) , updateBanner)

router.delete('/delete-banner/:bannerId', passport.authenticate('jwt',{session: false}), deleteBanner)

router.post('/add-product', passport.authenticate('jwt',{session: false}), addProduct)

router.get('/get-products', getProducts)

router.put('/update-product/:productId', passport.authenticate('jwt',{session: false}), updateProduct)

router.delete('/delete-product/:productId', passport.authenticate('jwt',{session: false}), deleteProduct)

router.post('/upload',upload.single('banner'),(req,res) => {
    console.log(req.file)
    return res.status(201).json({
        statusCode: 201,
        message: 'File uploaded successfully',
        data: `${process.env.BASE_URL}/files/${req.file.filename}`
    })
})

module.exports = router;
