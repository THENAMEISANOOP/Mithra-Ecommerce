import {v2 as cloudinary} from "cloudinary";
import ProductModel from "../models/productModel.js";

// Add product controller
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        const imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // debugging logs

        // console.log(name,
        //     description,
        //     price,
        //     category,
        //     subCategory,
        //     sizes,
        //     bestseller);

        // console.log(imageUrl);

       
        const productData= {
            name,
            description,
            price: parseFloat(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            date:Date.now()
        };
        // console.log(productData);

        //  save the product  database
        const product= new ProductModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product added successfully.",
            product
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Error adding product." });
    }
}


// list products controller
export const listProducts = async (req, res) =>{
    try {
        const products = await ProductModel.find({})
        res.json({
            message: "Products listed successfully.",
            products
        }); 
        
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ message: "Error listing products." });
        
    }
}

// removing product controller
export const removeProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({
            message: "Product removed successfully."
        });
        
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ message: "Error removing product." });
        
    }
}

// single product info controller
 export const singleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.json({
            message: "Single product fetched successfully.",
            product
        });
        
    } catch (error) {
        console.error("Error fetching single product:", error);
        res.status(500).json({ message: "Error fetching single product." });
        
    }
 }