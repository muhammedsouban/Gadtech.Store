const Admin = require("../models/adminModel")
const user = require("../models/userModel");
const order = require('../models/orderModel')
const coupon = require('../models/couponModel')
const banner = require('../models/bannerMOdel')
const bcrypt = require('bcrypt');
const Product = require("../models/productModel")
const Category = require("../models/categoryModel");
const { ObjectId } = require("mongodb");
const admin = require("../routes/admin");


const loadLogin = async (req, res) => {
    try {
        res.render('login');

    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const AdminData = await Admin.find({ email: req.body.email })
        if (AdminData) {
            if (req.body.password == AdminData[0].password) {
                req.session.admin = AdminData[0].email
                res.redirect('/admin/home')
            } else {
                res.render('login')
            }
        } else {
            res.render('login')
        }

    } catch (error) {
        console.log(error.message);
    }
}
const revenueReport = async (req, res) => {
    try {
        const monthWiseRevenue = await order.aggregate([
            { $match: { status: "Delivered" } },
            {
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 },
                    total: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const categoryRevenue = await order.aggregate([
            { $unwind: "$Products" },
            {
                $lookup: {
                    from: "products",
                    localField: "Products._id",
                    foreignField: "_id",
                    as: "productCategory",
                },
            },
            {
                $group: {
                    _id: "$productCategory.category",
                    total: { $sum: "$total" },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "categoryName",
                    as: "categories",
                },
            },
            { $project: { _id: 1, total: 1 } },
            { $sort: { _id: -1 } },
        ]);
        const data = categoryRevenue.map((item) => {
            return {
                name: item._id[0],
                total: item.total
            }
        })
        res.json({
            monthWiseRevenue: monthWiseRevenue,
            categoryRevenue: data,

        });
    } catch (error) {
        console.log(error);
    }
};

const salesReport = async (req, res) => {
    try {
        const orderData = await order.find().lean()
        res.render('sales-report', { orderData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async (req, res) => {
    try {
        const adminData = await Admin.findOne({ email: req.session.admin });
        const userData = await user.find({ block: false }).count()
        const productData = await Product.find({ is_deleted: false }).count()
        const orderData = await order.find().count()
        const revenue = await order.aggregate([{ $match: { status: 'Delivered' } },
        {
            $group: {
                _id: '',
                "total": { $sum: '$total' }
            }
        }, {
            $project: {
                _id: 0,
                "TotalAmount": '$total'
            }
        }]);
        const a = revenue.length >= 1 ? revenue[0].TotalAmount : 0
        res.render("home", { adminData, userData, productData, orderData, revenue: a });
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');

    } catch (error) {
        console.log(error.message);
    }
}


// Add new user

const Addproductsload = async (req, res) => {
    try {
        const CategoryData = await Category.find({ d_status: 0 }).lean()
        res.render("add-products", { CategoryData, adminData: req.session.admin })
    }
    catch (error) { console.log(error.messasge) }
}

//add product

const Addproduct = async (req, res) => {
    try {
        const { productname, category, brand, quantity, description, price, status } = req.body
        const images = req.files.map((file) => {
            return file.filename;
        })
        const product = new Product({
            productname: productname,
            category: category,
            brand: brand,
            quantity: quantity,
            description: description,
            price: price,
            image: images,
            status: status
        });
        const productData = await product.save();
        if (productData) {
            res.redirect('/admin/products');
        }
        else { res.render('add-products', { message: 'Something went Wrong !!' }); }
    }

    catch (error) { console.log(error.message) }
}

const products = async (req, res) => {
    try {
        const productData = await Product.find({ is_deleted: false }).lean()
        res.render('products', { productData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}
//edit user 

const editProduct = async (req, res) => {
    try {
        const productData = await Product.find({ _id: ObjectId(req.params.id) }).lean()
        const categoryData = await Category.find().lean()
        res.render('edit-products', { productData, categoryData, adminData: req.session.admin })
    }
    catch (error) { console.log(error.message) }
}

const updateProduct = async (req, res) => {
    try {
        const { productname, category, brand, quantity, description, price, status } = req.body
        const images = req.files.map((file) => {
            return file.filename;
        })
        if (images.length >= 1) {
            const productData = await Product.updateOne({ _id: ObjectId(req.body.id) }, {
                $set: {
                    productname: productname,
                    category: category,
                    brand: brand,
                    quantity: quantity,
                    description: description,
                    price: price,
                    image: images,
                    status: status
                }
            })
        } else {
            const productData = await Product.updateOne({ _id: ObjectId(req.body.id) }, {
                $set: {
                    productname: productname,
                    category: category,
                    brand: brand,
                    quantity: quantity,
                    description: description,
                    price: price,
                    status: status
                }
            })
        }
        res.redirect('/admin/products')
    } catch (error) {
        console.log(error.message);
    }
}

//delete Product
const deleteProduct = async (req, res) => {
    try {
        const productData = await Product.updateOne({ _id: ObjectId(req.params.id) }, { is_deleted: true });
        res.redirect('/admin/products')
    }
    catch (error) { console.log(error.message) }
}

//Categorylist
const categoryList = async (req, res) => {
    try {
        const categoryData = await Category.find({ d_status: 0 }).lean()
        res.render('categorylist', { categoryData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}

const addCategory = async (req, res) => {
    try {
        const checkCategory = await Category.findOne({ categoryName: req.body.categoryName, d_status: 0 })
        if (checkCategory == null) {
            const { categoryName, categoryOffer } = req.body
            const category = new Category({
                categoryName: categoryName,
                image: req.file.filename,
                categoryOffer: categoryOffer
            });
            const categoryData = await category.save();
            if (categoryData) {
                res.redirect('/admin/categorylist');
            }
            else { res.render('add-category', { error: 'Something went Wrong !!' }); }
        } else {
            res.render('add-category', { error: 'Category Already Exist', adminData: req.session.admin })
        }
    }
    catch (error) { console.log(error.message) }
}

const LoadaddCategory = async (req, res) => {
    try {
        res.render('add-category', { adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}

const EditCategory = async (req, res) => {
    try {
        const categoryData = await Category.find({ _id: ObjectId(req.params.id) }).lean()
        res.render("Edit-Category", { categoryData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { categoryName, categoryOffer } = req.body
        if (req.file) {
            const CategoryData = await Category.updateOne({ _id: ObjectId(req.body.id) }, {
                $set: {
                    categoryName: categoryName,
                    image: req.file.filename,
                    categoryOffer: categoryOffer
                }
            })
        } else {
            const CategoryData = await Category.updateOne({ _id: ObjectId(req.body.id) }, {
                $set: {
                    categoryName: categoryName,
                    categoryOffer: categoryOffer
                }
            })
        }
        res.redirect('/admin/category-list')
    } catch (error) {
        console.log(error.message);
    }
}
const deleteCategory = async (req, res) => {
    try {
        const categoryData = await Category.updateOne({ _id: ObjectId(req.params.id) }, { d_status: 1 });
        res.redirect('/admin/category-list');
    }
    catch (error) {
        console.log(error.message)
    }
}

const LoadAllUsers = async (req, res) => {
    try {
        const userData = await user.find().lean()
        res.render('allusers', { userData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message)
    }
}

const BlockUser = async (req, res) => {
    try {
        const data = await user.findOne({ _id: ObjectId(req.params.id) })

        const userData = await user.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {
                block: true
            }
        });
        res.redirect('/admin/all-users')
    }
    catch (error) { console.log(error.message) }
}

const UnblockUser = async (req, res) => {
    try {
        const userData = await user.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {
                block: false
            }
        });
        res.redirect('/admin/all-users')
    }
    catch (error) { console.log(error.message) }
}

const Orderlist = async (req, res) => {
    try {
        const orderData = await order.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'Products._id',
                    foreignField: '_id',
                    as: 'NewOrders'
                }
            }, { $sort: { _id: -1 } }
        ])
        res.render('orderlist', {
            adminData: req.session.admin,
            orderData
        })
    } catch (error) {
        console.log(error.message);
    }
}

const viewOrder = async (req, res) => {
    const orderData = await order.aggregate([{ $match: { orderId: req.params.id } },
    {
        $lookup: {
            from: 'products',
            localField: 'Products._id',
            foreignField: '_id',
            as: 'NewOrders'
        }
    }
    ])
    res.render('vieworder', { orderData, adminData: req.session.admin })
}

const orderStatus = async (req, res) => {
    try {
        const updateStatus = await order.updateOne({ _id: req.params.id },
            {
                $set:
                    { status: req.body.status }
            }
        );
        if (updateStatus) {
            res.json("success");
        }
    } catch (error) {
        console.log(error);
    }
};

const couponList = async (req, res) => {
    try {
        const couponData = await coupon.find().lean()
        res.render('coupon', { couponData, adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}

const LoadAddCoupon = async (req, res) => {
    try {
        res.render('add-coupon', { adminData: req.session.admin })
    } catch (error) {
        console.log(error.message);
    }
}
const AddCoupon = async (req, res) => {
    try {
        const checkcoupon = await coupon.findOne({ couponcode: req.body.couponcode, is_valid: true })
        if (checkcoupon == null) {
            const { couponcode, expirydate, offer } = req.body
            const Coupon = new coupon({

                couponcode: couponcode,
                offer: offer,
                expirydate: expirydate

            });

            const couponData = await Coupon.save();

            if (couponData) {
                res.redirect('/admin/coupon');
            }
            else { res.render('add-coupon', { error: 'Something went Wrong !!', adminData: req.session.admin }); }

        } else {
            res.render('add-coupon', { error: 'Coupon Already Exist', adminData: req.session.admin })
        }
    }
    catch (error) { console.log(error.message) }
}

const deactivateCoupon = async (req, res) => {
    try {
        const couponData = await coupon.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {
                is_valid: false
            }
        });
        res.redirect('/admin/coupon')
    }
    catch (error) { console.log(error.message) }
}

const activateCoupon = async (req, res) => {
    try {
        const couponData = await coupon.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {
                is_valid: true
            }
        });
        res.redirect('/admin/coupon')
    }
    catch (error) { console.log(error.message) }
}

const LoadBanner = async (req, res) => {
    try {
        const BannerData = await banner.find().lean()
        res.render('banner', { BannerData, adminData: req.session.admin })
    } catch (error) {

    }
}
const LoadAddBanner = async (req, res) => {
    try {
        res.render('add-banner')
    } catch (error) {
        console.log(error.message);
    }
}

const addBanner = async (req, res) => {
    try {
        const { Title, subtitle } = req.body
        const Banner = new banner({
            Title: Title,
            image: req.file.filename,
            subtitle: subtitle
        });
        const BannerData = await Banner.save();
        if (BannerData) {
            res.redirect('/admin/banner');
        }
        else { res.render('add-banner', { error: 'Something went Wrong !!' }); }
    }
    catch (error) { console.log(error.message) }
}


module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    products,
    logout,
    Addproductsload,
    Addproduct,
    editProduct,
    updateProduct,
    deleteProduct,
    categoryList,
    addCategory,
    EditCategory,
    updateCategory,
    deleteCategory,
    LoadAllUsers,
    BlockUser,
    UnblockUser,
    LoadaddCategory,
    Orderlist,
    orderStatus,
    couponList,
    LoadAddCoupon,
    AddCoupon,
    activateCoupon,
    deactivateCoupon,
    LoadBanner,
    LoadAddBanner,
    addBanner,
    revenueReport,
    salesReport,
    viewOrder
}