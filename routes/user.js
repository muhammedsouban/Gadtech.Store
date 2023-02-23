const express = require('express')
const user = express();
const path = require("path");
const hbs = require('express-handlebars');
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

user.use(express.static(path.join(__dirname, 'public')));
user.set('views', path.join(__dirname, 'views'));

user.set('views', './views/users')
user.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layouts',
  usersDir: __dirname + './views/users/'
  
}
))

user.get('/register',auth.isLogout,userController.loadRegister);
user.post('/register',userController.insertUser);
user.get('/',userController.loadHome);
user.get('/login',auth.isLogout,userController.loadLogin);
user.post('/login',auth.isLogout,userController.verifyLogin);
user.get('/home',auth.isLogin,userController.loadHome);
user.get('/shop',userController.LoadShop)
user.get('/shop/:name',userController.shopByCategory);  
user.get('/product/:id',userController.productView)
user.get('/profile',auth.isLogin,userController.profile);
user.get('/add-address',auth.isLogin,userController.LoadAddAddress)
user.get('/Edit-Address',auth.isLogin,userController.EditAddress)
user.post('/Update-profile',auth.isLogin,userController.UpdateProfile)
user.get('/Delete-Address/:id',auth.isLogin,userController.DeleteAddress)
user.post('/Add-address',auth.isLogin,userController.AddAddress)
user.get('/forget',auth.isLogout ,userController.forgetLoad);
user.post('/forget',userController.forgetVerify);
user.get('/forgetpassword',auth.isLogout ,userController.forgetPassword);
user.post('/forgetpassword',userController.resetPassword);
user.get('/cart',auth.isLogin,userController.LoadCart)
user.delete('/cart-delete/:id',auth.isLogin,userController.RemoveItemCart)
user.post('/proceed-checkout',auth.isLogin,userController.Loadcheckout)
user.put('/redeem-coupon',auth.isLogin,userController.redeemCoupon)
user.get('/paypal-checkout/:userId/:total/:address',auth.isLogin ,userController.paypalCheckout)
user.post('/paypal/place/order',auth.isLogin ,userController.paypalSummary)
user.post('/place/order',auth.isLogin ,userController.orderPlacement)
user.get('/orders' ,auth.isLogin,userController.LoadOrders)
user.delete('/cancel-order/:id',auth.isLogin ,userController.cancelOrder)
user.get('/orders-details/:id' ,auth.isLogin,userController.orderDetails)
user.get('/invoice',auth.isLogin,userController.invoice)
user.get('/logout',auth.isLogin,userController.userLogout);
user.get('/verify',auth.isLogin,userController.verifymail)
user.get('/add-to-cart/:id',auth.isLogin,userController.AddToCart)
user.post('/product/search',userController.searchProducts)
user.get('/sample',userController.Sample)

// user.get('*', function (req, res) {
//   res.render('404');
// });

module.exports = user;