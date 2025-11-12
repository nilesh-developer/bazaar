import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    storename: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    email: {
        type: String,
    },
    businessName: {
        type: String,
    },
    businessCategory: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: "Welcome to my online shop! Handpicked products, made with love & passion. Powered by Growo — your Insta store in minutes."
    },
    status: {
        type: Boolean,
        default: true
    },
    logo: {
        type: String
    },
    favicon: {
        type: String
    },
    sliderImages: {
        type: Array,
    },
    desktopBanner: {
        type: String
    },
    mobileBanner: {
        type: String
    },
    template: {
        type: String,
        default: "theme1"
    },
    themeColorOne: {
        type: String,
        default: "#000000"
    },
    themeColorTwo: {
        type: String,
        default: "#f7f7f7"
    },
    hideCategory: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    email: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }],
    coupon: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons"
    }],
    cod: {
        type: Boolean,
        default: false
    },
    razorpay: {
        type: Boolean,
        default: false
    },
    razorpayKeyId: {
        type: String,
    },
    razorpayKeySecret: {
        type: String,
    },
    whatsappPay: {
        status: {
            type: Boolean,
            default: false
        },
        instructions: {
            type: String
        }
    },
    subdomain: {
        type: String,
        required: true
    },
    customDomain: {
        type: String
    },
    revenue: {
        type: Number,
        default: 0
    },
    deliveryChargesTiers: [
        {
            min: {
                type: String
            },
            max: {
                type: String
            },
            charge: {
                type: String
            }
        }
    ],
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    policy: {
        businessName: {
            type: String,
            default: ""
        },
        gstNumber: {
            type: String,
            default: ""
        },
        contactEmail: {
            type: String,
            default: ""
        },
        contactPhone: {
            type: String,
            default: ""
        },
        whatsapp: {
            type: String,
            default: ""
        },
        businessHours: {
            type: String,
            default: "Monday to Saturday, 10 AM to 7 PM IST"
        },
        streetAddress: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        pinCode: {
            type: String,
            default: ""
        },
        standardShipping: {
            type: String,
            default: "3-7 business days"
        },
        expressShipping: {
            type: String,
            default: "1-3 business days"
        },
        freeShippingAbove: {
            type: String,
            default: ""
        },
        returnPeriod: {
            type: String,
            default: "30 days"
        },
        refundProcessing: {
            type: String,
            default: "5-7 business days"
        },
        returnShippingBy: {
            type: String,
            default: "Customer"
        },
        cancellationAllowed: {
            type: String,
            default: "Before Shipping"
        },
        enabled: {
            type: Boolean,
            default: true
        },
        useDefaultTemplates: {
            type: Boolean,
            default: true
        },
        showPolicy: {
            type: Boolean,
            default: true
        },
        lastUpdated: {
            type: Date
        }
    },
    aboutContent: {
        type: String
    },
    whatsapp: {
        type: Number
    },
    instagram: {
        type: String
    },
    youtube: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    }
}, { timestamps: true })

export const stores = mongoose.model("stores", StoreSchema)