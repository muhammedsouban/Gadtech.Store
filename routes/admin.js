const express = require("express");
const admin = express();
const multers = require('../config/multer')
const auth = require("../middleware/adminAuth")
const adminController = require("../controller/adminController")

admin.set('views', './views/admin')
admin.use(express.static('public'));

admin.get('/', auth.isLogout, adminController.loadLogin);
admin.post('/', adminController.verifyLogin);
admin.get('/home', auth.isLogin, adminController.loadDashboard);
admin.get('/logout', auth.isLogin, adminController.logout);
admin.get('/products', auth.isLogin, adminController.products)
admin.get('/add-products', auth.isLogin, adminController.Addproductsload);
admin.post('/add-products', auth.isLogin, multers.upload.array('image', 4), adminController.Addproduct)
admin.get('/edit-products/:id', auth.isLogin, adminController.editProduct);
admin.get('/delete-product/:id', auth.isLogin, adminController.deleteProduct);
admin.get('/category-list', auth.isLogin, adminController.categoryList)
admin.get('/add-category', auth.isLogin, adminController.LoadaddCategory)
admin.get('/edit-category/:id', auth.isLogin, adminController.EditCategory)
admin.post('/update-category', auth.isLogin, multers.categoryupload.single('image'), adminController.updateCategory);
admin.post('/update-product', auth.isLogin, multers.upload.array('image', 4), adminController.updateProduct)
admin.get('/delete-category/:id', auth.isLogin, adminController.deleteCategory);
admin.post('/add-categ', auth.isLogin, multers.categoryupload.single('image'), adminController.addCategory);
admin.get('/all-users', auth.isLogin, adminController.LoadAllUsers)
admin.get('/Block-User/:id', auth.isLogin, adminController.BlockUser);
admin.get('/unblock-User/:id', auth.isLogin, adminController.UnblockUser);
admin.get('/orders', auth.isLogin, adminController.Orderlist)
admin.get('/coupon', auth.isLogin, adminController.couponList)
admin.put('/order-status/:id', auth.isLogin, adminController.orderStatus)
admin.get('/viewOrder/:id',auth.isLogin,adminController.viewOrder)
admin.get('/add-coupon', auth.isLogin, adminController.LoadAddCoupon)
admin.post('/add-coupon', auth.isLogin, adminController.AddCoupon)
admin.get('/activate-coupon/:id', auth.isLogin, adminController.activateCoupon);
admin.get('/deactivate-coupon/:id', auth.isLogin, adminController.deactivateCoupon);
admin.get('/banner', auth.isLogin, adminController.LoadBanner)
admin.get('/add-banner', auth.isLogin, adminController.LoadAddBanner)
admin.post('/add-Banner', auth.isLogin, multers.bannerupload.single('image'), adminController.addBanner);
// adminRoute.get('/top-sales/report',logCheck.isAdmin,adminController.topSalesReport)
admin.get('/salesReport', auth.isLogin, adminController.salesReport)

//Revenue report
admin.get('/revenue/report', adminController.revenueReport)

// admin.get('*', function (req, res) {
//     res.redirect('/admin');
// });

module.exports = admin