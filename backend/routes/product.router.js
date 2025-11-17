import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addDigitalProduct, addProduct, deleteProduct, getProductData, getProducts, getRecommendedProducts, searchProducts, updateDigitalProduct, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/add-product").post(
    upload.fields([
        {
            name: "featuredImage",
            maxCount: 1
        },
        {
            name: "image1",
            maxCount: 1
        },
        {
            name: "image2",
            maxCount: 1
        },
        {
            name: "image3",
            maxCount: 1
        },
        {
            name: "image4",
            maxCount: 1
        },
        {
            name: "sizeChartImage",
            maxCount: 1
        }
    ]),
    addProduct)

router.route("/add-digital-product").post(
    upload.fields([
        {
            name: "featuredImage",
            maxCount: 1
        },
        {
            name: "image1",
            maxCount: 1
        },
        {
            name: "image2",
            maxCount: 1
        },
        {
            name: "image3",
            maxCount: 1
        },
        {
            name: "image4",
            maxCount: 1
        },
        {
            name: "digitalFiles[]",
            maxCount: 20
        },
    ]),
    addDigitalProduct)

router.route("/update-digital-product/:id").patch(
    upload.fields([
        {
            name: "featuredImage",
            maxCount: 1
        },
        {
            name: "image1",
            maxCount: 1
        },
        {
            name: "image2",
            maxCount: 1
        },
        {
            name: "image3",
            maxCount: 1
        },
        {
            name: "image4",
            maxCount: 1
        },
        {
            name: "digitalFiles[]",
            maxCount: 5
        },
    ]),
    updateDigitalProduct)

router.route("/data/:id").get(getProductData)

router.route("/get-recommended/:storeId").get(getRecommendedProducts)

router.route("/get-data/:id").get(getProducts)

router.route("/search").get(searchProducts)

router.route("/update-product/:id").patch(upload.fields([
    {
        name: "featuredImage",
        maxCount: 1
    },
    {
        name: "image1",
        maxCount: 1
    },
    {
        name: "image2",
        maxCount: 1
    },
    {
        name: "image3",
        maxCount: 1
    },
    {
        name: "image4",
        maxCount: 1
    },
    {
        name: "sizeChartImage",
        maxCount: 1
    }
]), updateProduct)

router.route("/delete/:id").delete(deleteProduct)

export { router as productRouter }