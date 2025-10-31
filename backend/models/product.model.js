import mongoose from "mongoose";
import { type } from "os";

const ProductSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores"
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["physical", "digital", "service"],
        required: true
    },
    images: {
        featuredImage: { type: String },
        image1: { type: String },
        image2: { type: String },
        image3: { type: String },
        image4: { type: String }
    },
    shortDescription: {
        type: String
    },
    description: {
        type: String
    },
    originalPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number
    },
    variants: [{
        type: Object
    }],
    recommended:{
        type: Boolean,
        default: true,
        required: true
    },
    sizeChartImage: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    tags: {
        type: Array
    },
    stockQty: {
        type: Number,
        default: 0
    },
    stockStatus: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    returnDetails: {
        type: String
    },
    deliveryDetails: {
        type: String
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    affiliateProduct: {
        type: Boolean,
        default: false,
        required: true
    },
    affiliatePlatformName: {
        type: String
    },
    affiliateLink: {
        type: String
    },
    digital: {
        deliveryMethod: {
            type: String,
            enum: ["upload", "external"]
        },
        externalLink: {
            type: String
        },
        digitalFiles: {
            type: Array
        },
        downloadAccess: {
            type: String,
            enum: ["unlimited", "limited"]
        },
        downloadLimit: {
            type: Number
        }
    }
})

export const products = mongoose.model("products", ProductSchema)