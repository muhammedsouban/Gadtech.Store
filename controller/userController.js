const User = require('../models/userModel');
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const coupon = require('../models/couponModel')
const Order = require('../models/orderModel')
const banner = require('../models/bannerMOdel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const randomstring = require('randomstring')
const { ObjectId } = require("mongodb");
const session = require('express-session');
const moment = require('moment')
const paypal = require('paypal-rest-sdk')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
}

//for send mail 
const sendverifyMail = async (name, email,User) => {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: 'muhammedsoubanbi@gmail.com',
                pass: 'abbthwilehhefrmh'
            }
        })
        const mailOptions = {
            from: 'muhammedsoubanbi@gmail.com',
            to: email,
            subject: 'for verification mail',
            html: '<p>Hii' + name + ',please click here to <a href= "http://localhost:3000/verify?id= ' + User +'"> verify </a> your email.</p>'
        }
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                
                console.log("Email has been sent : -", info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
const loadRegister = async (req, res) => {
    try {

        res.render('registration');

    } catch (error) {
        res.render('404')
        console.log(error.message);
    }
}

const insertUser = async (req, res) => {

    try {
        const secretPassword = await securePassword(req.body.password)
        const checkUser = await User.findOne({ email: req.body.email })
        if (checkUser == null) {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: secretPassword
            })
            const userData = await user.save();

            if (userData) {

                sendverifyMail(req.body.name, req.body.email, userData._id);

                res.render('registration', { message: "Your registartion Completed." })

            } else {
                res.render('registartion', { error: "Your registration failed." })
            }
        }
        else {
            res.render('registration', { error: 'Email already taken' })
        }
    } catch (error) {
        console.log(error.message);

    }
}

const verifymail = async (req, res) => {
    try {
        const updateInfo = await User.updateOne({_id:req.query.id},
            { $set: {
                    is_verified: true
                }})
            console.log(updateInfo);
        res.redirect('/login')
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin = async (req, res) => {
    try {

        res.render('Login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ email: email, block: false });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_verified === 0) {
                    res.render('login', { message: "Please verify your mail" });
                } else {
                    req.session.user = userData._id;
                    res.redirect('/home');
                }
            } else {
                res.render('login', { message: "Email or Password incorrect" });
            }
        }
        else {
            res.render('login', { message: "Email or Password incorrect" });
        }
    } catch (error) {
        console.log(error.message);
    }

}

let orderItems = []
//reset link 
const resetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'muhammedsoubanbi@gmail.com',
                pass: 'abbthwilehhefrmh'
            }
        });

        const mailOptions = {
            from: 'muhammedsoubanbi@gmail.com',
            to: email,
            subject: 'For Reset password',
            html: '<p>Hii ' + name + ' please click here to <a href="http://localhost:3000/forgetpassword?token=' + token + '"> Reset </a> your password.</p>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email has been sent:-", info.response);

            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
const forgetLoad = async (req, res) => {

    try {
        res.render('forget-password');
    } catch (error) {
        console.log(error.message);
    }
}

const forgetVerify = async (req, res) => {

    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });

        if (userData) {
            if (userData.is_verified === 0) {
                res.render('forget-password', { message: "Please verify your mail id" })
            } else {
                const randomString = randomstring.generate();
                const updatedData = await User.updateOne({ email: email }, { $set: { token: randomString } });
                resetPasswordMail(userData.name, userData.email, randomString);
                res.render('forget-password', { message: "reset password link has been sent to your registered mail id " })
            }
        } else {
            res.render('forget-password', { message: "User email is incorrect" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const forgetPassword = async (req, res) => {
    try {
        const user = req.session.user
        const token = req.query.token;
        const tokenData = await User.findOne({ token: token });

        if (tokenData) {
            res.render('verifyOTP', { email: tokenData.email });
        } else {
            res.render('404', { message: "Invalid token" });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const resetPassword = async (req, res) => {

    try {
        const password = req.body.password;
        const email = req.body.email;

        const secure_Password = await securePassword(password);
        const updatedData = await User.updateOne({ email: email }, { $set: { password: secure_Password, token: '' } });
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }

}

const loadHome = async (req, res) => {
    try {
        // let count = 0
        // const cartData = await User.find({ _id: req.session.user })
        // if (cartData) {
        //     count = cartData[0].Cart.length
        // }
        const BannerData = await banner.find().lean()
        const category = await Category.find({ d_status: 0 }).lean()
        const product = await Product.aggregate([
            { $match: { is_deleted: false } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "categoryName",
                    as: "Category"
                }
            },
        ])

        res.render('home', {
            product,
            category,
            BannerData,
            //  count,
            User: req.session.user
        })

    } catch (error) {
        console.log(error.message);
    }
}

const shopByCategory = async (req, res) => {
    try {
        const product = await Product.find({ category: req.params.name }).lean()
        const category = await Category.find({d_status:0}).lean()
        console.log(product);
        res.render('shop', { product, category,categ: req.params.name })
    } catch (error) {
        console.log(error.message);
    }
}
const LoadShop = async (req, res) => {
    try {
        const product = await Product.find().lean()
        const category = await Category.find({d_status:0}).lean()
        res.render('shop', { product, category })
    } catch (error) {
        console.log(error.message);
    }
}

const productView = async (req, res) => {
    try {

        const productData = await Product.findById(req.params.id).lean()

        res.render('product-view',
            {
                productData,
                User: req.session.user
            })
    } catch (error) {
        console.log(error.message);
    }
}

const profile = async (req, res) => {
    try {
        const userData = await User.find({ _id: req.session.user }).lean()
        res.render('profile', {
            user: userData,
            Address: userData[0].Address,
            User: req.session.user
        })
    } catch (error) {
        console.log(error.message);
    }

}

const UpdateProfile = async (req, res) => {
    try {
        const { name, email, mobile } = req.body
        const userData = await User.updateOne({ _id: req.session.user }, {
            $set: {
                name: name,
                email: email,
                mobile: mobile
            }
        })

        res.redirect('/profile')
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteAddress = async (req, res) => {
    try {

        const userData = await User.findByIdAndUpdate({ _id: ObjectId(req.session.user) }, {

            $pull: {
                Address: { _id: ObjectId(req.params.id) }
            }

        })
        res.redirect('/profile')

    } catch (error) {
        console.log(error.message);
    }
}


const LoadAddAddress = async (req, res) => {
    try {
        res.render('add-address', { User: req.session.user })
    } catch (error) {
        console.log(error.message);
    }
}
const AddAddress = async (req, res) => {

    try {
        const Address = await User.findByIdAndUpdate({ _id: req.session.user },

            {
                $addToSet: {
                    Address: req.body
                }

            })

        res.redirect('/profile')
    } catch (error) {
        console.log(error.message);
    }
}

const EditAddress = async (req, res) => {
    try {
        const AddressData = await User.find({ _id: req.session.user }).lean()
        res.render('edit-address', {
            Address: AddressData[0].Address
        })

    } catch (error) {
        console.log(error.message);

    }
}

const AddToCart = async (req, res) => {
    try {
        const Cart = await User.updateOne({ _id: req.session.user }, {
            $addToSet: {
                Cart: ObjectId(req.params.id)
            }
        })

        res.redirect('/cart')
    } catch (error) {
        console.log(error.message);
    }
}

const LoadCart = async (req, res) => {
    try {

        const cartData = await User.aggregate([
            {
                $match: { _id: ObjectId(req.session.user) },
            },
            {
                $lookup: {
                    from: 'products',
                    let: { cart: '$Cart' },
                    pipeline: [{ $match: { $expr: { $in: ['$_id', '$$cart'] } } }],
                    as: 'CartItems'
                }
            }])
        const CartItems = cartData[0].CartItems
        let subtotal = 0;
        CartItems.forEach((item) => {
            subtotal = subtotal + Number(item.price);
        });
        res.render('cart', {
            cartData: CartItems,
            subtotal: subtotal,
            User: req.session.user
        })
    } catch (error) {
        console.log(error.message);
    }
}

const RemoveItemCart = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: ObjectId(req.session.user) }, {
            $pull: { Cart: ObjectId(req.params.id) }
        })
        res.json('Success')
    } catch (error) {
        res.json("Something went wrong")
        console.log(error.message);
    }
}

const Loadcheckout = async (req, res) => {
    try {
        orderItems = []
        const checkout = await User.find({ _id: req.session.user }).lean()
        const cartData = await User.aggregate([
            {
                $match: { _id: ObjectId(req.session.user) },
            },
            {
                $lookup: {
                    from: 'products',
                    let: { products: '$Cart' },
                    pipeline: [{ $match: { $expr: { $in: ['$_id', '$$products'] } } }],
                    as: 'CartItems'
                }
            }
        ])

        let subtotal = 0;
        const CartItems = cartData[0].CartItems
        CartItems.map((item, i) => {
            item.quantity = req.body.quantity[i];
            subtotal = subtotal + item.price * req.body.quantity[i];
        });
        orderItems = CartItems

        res.render('checkout',
            {
                CartItems,
                Product: CartItems.length >= 1 ? CartItems[0] : '',
                Cart: checkout[0].Cart,
                Address: checkout[0].Address,
                subtotal,
                User: req.session.user,
                checkout: checkout[0]
            })
    } catch (error) {
        console.log(error.message);
    }
}

const orderPlacement = async (req, res) => {
    try {

        const userId = req.body.userId;
        const selectedMethod = req.body.selectedMethod;
        const selectedAdress = req.body.selectedAdress;
        const total = req.body.total

        if (req.body.selectedMethod == 1) {
            res.json({
                method: "paypal",
                total: total,
                userId: userId,
                address: selectedAdress,

            });
        } else {
            const checkout = await checkoutFunc(
                userId,
                selectedMethod,
                selectedAdress,
                total
            );
            if (checkout == "success")
                res.json("success");
            else res.json("error");
        }
    } catch (error) {
        console.log(error);
    }
};

//Paypal Integration
const paypalCheckout = async (req, res) => {
    const user = await req.session.user;
    const userId = req.params.userId;
    const address = req.params.address;

    res.render("paypal-integration", {
        totalAmount: req.params.total,
        userId: userId,
        address: address,
    });
};

//Paypal Checkout
const paypalSummary = async (req, res) => {
    try {
        const selectedMethod = 1;
        const userId = req.body.userId;
        const selectedAdress = req.body.address;
        // console.log(selectedAdress);
        const checkout = await checkoutFunc(userId, selectedMethod, selectedAdress);
        if (checkout == "success") res.json("success");
        else res.json("error");
    } catch (error) {
        console.log(error);
    }
};

//Checkout function
const checkoutFunc = async (userId, selectedMethod, selectedAdress, total) => {
    const userCartDetails = await User.find({ _id: userId });
    const cart = userCartDetails[0].Cart;
    //Order Id
    const result = Math.random().toString(36).substring(2, 7);
    const id = Math.floor(100000 + Math.random() * 900000);
    const orderId = result + id;
    const datetime = new Date().toISOString();
    let method = "";

    const createCart = cart.map(async (item, i) => {
        return (
            {
                productId: item._id
            }
        )
    });
    const UserData = await User.find({ _id: userId }).lean()
    const productDetails = orderItems.map((item) => {
        return {
            _id: item._id,
            quantity: item.quantity
        }
    });
    if (selectedMethod == 1) {
        method = "paypal";
    } else if (selectedMethod == 3) {
        method = "Cash on delivery";
    }

    const data = {
        userId: userId,
        Products: productDetails,
        orderId: orderId,
        date: datetime,
        status: "Pending",
        payment_method: method,
        total: total,
        addressId: selectedAdress,
    };

    try {
        const response = await Order.insertMany(data);

        orderItems.forEach(async (item, i) => {
            const decrementCount = await Product.updateOne(
                { _id: item._id },
                { $inc: { quantity: -item.quantity } }
            );
        });
        orderItems = []

    } catch (error) {
        console.log(error);

    }

    const clearAll = await User.updateOne(
        { _id: userId },
        { $set: { Cart: [] } }
    );

    return "success";
};

//Orders
const LoadOrders = async (req, res) => {
    // const Products =await Order.aggregate([{
    //     $lookup:{
    //         from:'products',
    //         localField:'Products._id',
    //         foreignField:'_id',
    //         as:'ProductData'
    // }
    // }])
    const userData = await Order.aggregate([
        {
            $match: { userId: ObjectId(req.session.user) },
        }
    ]).sort({_id:-1})
    const orderData = await Promise.all(userData.map(async (item) => {
        
        const Address = await User.findOne({ _id: ObjectId(req.session.user) }, {
            Address: {
                $elemMatch: { _id: item.addressId }
            },
            _id: 0
        }).lean()

        return {
            orderId: item.orderId,
            date: item.date,
            payment_method: item.payment_method,
            status: item.status,
            Address: Address.Address,
            _id: item._id,
            total:item.total,
        }
    }))
console.log(orderData);
    res.render("order", {
        orderData,
        User: req.session.user
    });
};


//Cancel Order
const cancelOrder = async (req, res) => {
    const cancelOrder = await Order.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { status: "Cancelled" } }
    );
    if (cancelOrder) {
        cancelOrder.Products.forEach(async (item) => {
            const incrementStockCount = await Product.updateOne(
                { _id: item._id },
                { $inc: { quantity: item.quantity } }
            );
        })


        res.json("success");
    } else
        res.json("error");
};
//Order Details
const orderDetails = async (req, res) => {
    try {
        const orderData = await Order.aggregate([{ $match: { orderId: req.params.id } },
        {
            $lookup: {
                from: 'products',
                localField: 'Products._id',
                foreignField: '_id',
                as: 'NewOrders'
            }
        }
        ])
        // const address = await User.find(
        //     { "Address._id": order[0].addressId },
        //     { _id: 0, address: { $elemMatch: { id: order[0].addressId } } }
        // ).lean();
        console.log(orderData);
        res.render("orderDetails", {
            orderDetails: orderData,
        });
    } catch (error) {
        console.log(error);
    }
};

const searchProducts = async (req, res) => {
    try {
      const search = req.body.Search;
      const product = await Product.aggregate([
        {
          $match: {
            is_deleted: false,
            productname: { $regex: `${search}.*`, $options: "i" },
          },
        },
      ]);
  
      const category = await Category.find({ d_status: 0 }).lean();
      res.render("shop", {
        category,
        product,
        search
      });
    } catch (error) {
      console.log(error);
    }
  };

const invoice = async (req, res) => {
    try {
        res.render('invoice')
    } catch (error) {
        res.render('404')
    }
}

const redeemCoupon = async (req, res) => {
    const user = await User.findOne({ _id: req.session.user }, { _id: 1 });
    const Coupon = await coupon.findOne({ couponcode: req.body.coupon });
    const validate = await coupon.updateOne(
        { couponcode: req.body.coupon, expirydate: { $gte: new Date() } },
        {
            $push: {
                user: { userId: req.session.user },
            },
        }
    );
    if (validate.modifiedCount)
        res.json({ success: "success", amount: Coupon.offer });
    else res.json({ error: "Invalid Coupon" });
};

const userLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }

}

const Sample = async (req,res)=>{
    try {
        res.render('sample')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    loadLogin,
    insertUser,
    verifymail,
    verifyLogin,
    forgetPassword,
    forgetVerify,
    forgetLoad,
    resetPassword,
    loadHome,
    userLogout,
    productView,
    profile,
    UpdateProfile,
    LoadAddAddress,
    AddAddress,
    DeleteAddress,
    EditAddress,
    AddToCart,
    RemoveItemCart,
    LoadCart,
    Loadcheckout,
    LoadOrders,
    paypalCheckout,
    paypalSummary,
    orderPlacement,
    cancelOrder,
    orderDetails,
    invoice,
    redeemCoupon,
    LoadShop,
    shopByCategory,
    searchProducts,
    Sample
}