const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productsController");

router.get("/products", productsController.handleGetProducts);
router.get("/products/:id", productsController.handleGetProduct);
router.post("/products", productsController.handlePostProducts);
router.put("/products/:id", productsController.handleEditProducts);
router.delete("/products/:id", productsController.handleDeleteProducts);
router.post("/products/:id", productsController.handleReviewProduct);
router.put("/products/:id/add-to-cart", productsController.addToCartCount);
router.put("/products/:id/buyProduct", productsController.buyCount);
router.post("/purchase", productsController.purchaseProducts);

module.exports = router;
