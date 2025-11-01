import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stores } from "../models/store.model.js";
import nodeMailer from "nodemailer"
import { users } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { orders } from "../models/order.model.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const createStore = asyncHandler(async (req, res) => {
    const { name, storename, owner, subdomain } = req.body;

    const existingStore = await stores.findOne({ storename })

    if (existingStore) {
        return res.status(400)
            .json(
                new ApiError(400, "Store name is already taken")
            )
    }

    const userStoreAlreadyExist = await stores.findOne({ owner: owner })

    if (userStoreAlreadyExist) {
        return res.status(400)
            .json(
                new ApiResponse(400, "", "User already have a store. One user can have only one store")
            )
    }

    const user = await users.findById(owner)

    const storeCreated = await stores.create({
        storename,
        owner,
        email: user.email,
        name,
        subdomain: subdomain.toLowerCase(),
        metaTitle: name,
        logo: "",
        favicon: "",
        banner: ""
    })

    user.store = storeCreated._id
    await user.save()

    return res.status(200)
        .json(
            new ApiResponse(200, storeCreated, "Store created successfully")
        )
})

const businessdetails = asyncHandler(async (req, res) => {
    const { storename, businessName, category, address, mobileNo } = req.body;
    const store = await stores.findOneAndUpdate({ storename }, {
        businessName,
        businessCategory: category,
        address,
        phoneNo: mobileNo,
    })

    if (!store) {
        return res.status(400)
            .json(
                new ApiResponse(400, "", "Something went wrong while adding business details")
            )
    }

    return res.status(200)
        .json(
            new ApiResponse(200, "", "Business Details Submitted")
        )
})

const getCurrentStoreData = asyncHandler(async (req, res) => {
    const { subdomain } = req.body;
    const storeExist = await stores.findOne({
        $or: [
            { subdomain: subdomain },
            { customDomain: subdomain }
        ]
    })

    if (!storeExist) {
        return res.status(400)
            .json(
                new ApiResponse(400, "", "Store not Found")
            )
    }

    const store = await stores.findOne({
        $or: [
            { subdomain: subdomain },
            { customDomain: subdomain }
        ]
    }).select("-customers -address -businessName -businessCategory -phoneNo -updatedAt -orders -coupon -revenue -password -storename -razorpay -razorpayKeyId -razorpayKeySecret")

    return res.status(200)
        .json(
            new ApiResponse(200, { store }, "Store Found")
        )

})

const updateStoreName = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, metaTitle, metaDescription, color1, color2, hideCategory } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                name,
                metaTitle,
                metaDescription,
                themeColorOne: color1,
                themeColorTwo: color2,
                hideCategory
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Store data updated successfully")
        )
})

const addCustomDomain = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { customDomain } = req.body;

    const store = await stores.findByIdAndUpdate(id, {
        customDomain
    })

    if (store) {
        const emailProvider = nodeMailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.OTP_EMAIL_ID,
                pass: process.env.OTP_EMAIL_PASS
            },
            tls: { rejectUnauthorized: false }
        })

        const receiver = {
            from: `Growo <${process.env.OTP_EMAIL_ID}>`,
            to: process.env.ADMIN_EMAIL_ID,
            subject: "New Custom Domain Registration Request on Growo",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Domain Request</title>
    </head>
    <body>
            Store Name: <b>${store.storename}</b><br>
            Custom Domain: <b>${store.customDomain}</b>
            </body>
            </html>
            `,
        }

        emailProvider.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                console.log("Something went wrong while sending email to admin")
            } else {
                console.log("Email sent successfully to admin")
            }
        })
    }

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Domain Added Successfully")
        )
})

const updateSocial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { bio, email, instagram, facebook, twitter, youtube, whatsapp } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                bio,
                email,
                instagram,
                facebook,
                twitter,
                youtube,
                whatsapp
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Store data updated successfully")
        )
})

const updateWhatsAppNumber = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { whatsapp } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                whatsapp
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, store, "WhatsApp Number Saved successfully")
        )
})

const updateWhatsAppPayStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        whatsappPayStatus,
        whatsappPayInstructions
    } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                whatsappPay: {
                    status: whatsappPayStatus,
                    instructions: whatsappPayInstructions
                }
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Changes Saved Successfully")
        )
})

const updatePolicies = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const formData = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                policy: formData
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Store data updated successfully")
        )
})

const updateAboutPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { aboutContent } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: {
                aboutContent
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Store About Page updated")
        )
})

const changeStoreStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const store = await stores.findByIdAndUpdate(id,
        {
            $set: { status: status }
        },
        {
            new: true
        }).select("-password")

    if (store.status === true) {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Store activated successfully")
            )
    } else {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Store deactivated successfully")
            )
    }
})

const deleteStore = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const store = await stores.findByIdAndDelete(id).select("-password")

    const user = await users.findByIdAndUpdate(store.owner, {
        $unset: {
            store
        }
    })

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Your store is deleted")
        )
})

const storeData = asyncHandler(async (req, res) => {
    const { subdomain } = req.params;
    const store = await stores.findOne({
        $or: [
            { subdomain: subdomain },
            { customDomain: subdomain }
        ]
    }).select("-customers -address -businessName -businessCategory -phoneNo -updatedAt -orders -coupon -revenue -password -storename -razorpayKeyId -razorpayKeySecret").populate("products categories")

    return res.status(200)
        .json(
            new ApiResponse(200, store, "Store data fetched successfully")
        )
})

const changeCodStatus = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const { status } = req.body;

    const store = await stores.findByIdAndUpdate(storeId,
        {
            $set: { cod: status }
        },
        {
            new: true
        })

    if (store.cod) {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Payment method Activated")
            )
    } else {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Payment method deactivated"))
    }

})

const changeRazorpayStatus = asyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const { status } = req.body;

    const store = await stores.findByIdAndUpdate(storeId,
        {
            $set: { razorpay: status }
        },
        {
            new: true
        })

    if (store.cashfree) {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Payment method Activated")
            )
    } else {
        return res.status(200)
            .json(
                new ApiResponse(200, store, "Payment method deactivated"))
    }

})

const uploadStoreImage = asyncHandler(async (req, res) => {
    const files = req.files;
    const uploadedUrls = {};

    const store = await stores.findById(req.body.storeId);

    // Upload single files
    for (let key of ['logo', 'favicon', 'desktopBanner', 'mobileBanner']) {
        if (files[key]) {
            const result = await uploadOnCloudinary(files[key][0].path);
            uploadedUrls[key] = result;
        }
    }

    // Upload multiple slider images
    const sliderImages = [];
    if (files.sliderImages) {
        for (let file of files.sliderImages) {
            const result = await uploadOnCloudinary(file.path);
            sliderImages.push(result);
        }
    }

    const uploadImages = await stores.findOneAndUpdate({ _id: req.body.storeId }, {
        logo: uploadedUrls.logo ? uploadedUrls.logo : store.logo,
        favicon: uploadedUrls.favicon ? uploadedUrls.favicon : store.favicon,
        sliderImages: sliderImages ? sliderImages : store.sliderImages,
        desktopBanner: uploadedUrls.desktopBanner ? uploadedUrls.desktopBanner : store.desktopBanner,
        mobileBanner: uploadedUrls.mobileBanner ? uploadedUrls.mobileBanner : store.mobileBanner
    }, { new: true })

    if (!uploadImages) {
        return res.status(400)
            .json({
                statusCode: 400,
                message: "Something went wrong",
            })
    }

    return res.status(200)
        .json({
            statusCode: 200,
            message: "Images uploaded successfully",
        })

})

const getCustomerData = asyncHandler(async (req, res) => {
    const { storeId } = req.params;

    const storeExist = await stores.findById(storeId).populate("customers")

    if (!storeExist) {
        return res.status(400)
            .json(
                new ApiResponse(400, "", "Store not exist")
            )
    }

    return res.status(200)
        .json(
            new ApiResponse(200, storeExist, "Store data fetched along with Customer data")
        )

})

const setDeliveryCharges = asyncHandler(async (req, res) => {
    const { tiers, userId } = req.body;
    console.log(tiers)
    const saveDeliveryTiers = await stores.findOneAndUpdate({ owner: userId }, {
        deliveryChargesTiers: tiers
    }, { new: true })

    if (!saveDeliveryTiers) {
        return res.status(400)
            .json(
                new ApiResponse(400, "", "Something went wrong")
            )
    }

    return res.status(200)
        .json(
            new ApiResponse(200, saveDeliveryTiers, "Saved Delivery Charges")
        )
})

const getDeliveryCharges = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const store = await stores.findOne({ owner: userId });
    if (!store) {
        return res.status(404).json({
            statusCode: 404,
            message: "Store not found"
        });
    }
    return res.status(200).json({
        statusCode: 200,
        data: store.deliveryChargesTiers,
        message: "Delivery charges fetched successfully"
    });
});

const getNumbersOfThirtyDays = asyncHandler(async (req, res) => {
    const { storeId } = req.params;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const noOfOrders = await orders.countDocuments({
            store: storeId,
            createdAt: { $gte: thirtyDaysAgo }
        });

        const totalRevenue = await orders.aggregate([
            {
                $match: {
                    store: new ObjectId(storeId),
                    status: "delivered",
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    lastThirtyDays: { $sum: "$totalPrice" }
                }
            }
        ]);

        return res.status(200).json({
            statusCode: 200,
            data: {
                noOfOrders,
                totalRevenueOfLastThirtyDays: totalRevenue[0]?.lastThirtyDays || 0
            },
            message: "Data Fetched"
        })
    } catch (error) {
        console.log(error)
    }
})

export {
    createStore,
    businessdetails,
    getCurrentStoreData,
    addCustomDomain,
    updateStoreName,
    updateSocial,
    updateWhatsAppNumber,
    updateWhatsAppPayStatus,
    updatePolicies,
    updateAboutPage,
    setDeliveryCharges,
    getDeliveryCharges,
    changeStoreStatus,
    deleteStore,
    storeData,
    changeCodStatus,
    changeRazorpayStatus,
    uploadStoreImage,
    getCustomerData,
    getNumbersOfThirtyDays
}