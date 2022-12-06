const express = require("express");

const pageController = require("../controllers/pageController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/about", pageController.getAboutPage);
router.get("/product", pageController.getProductPage);
router.get("/service", pageController.getServicePage);
router.get("/price", pageController.getPricePage);
router.get("/team", pageController.getTeamPage);
router.get("/testimonial", pageController.getTestimonialPage);
router.get("/blog", pageController.getBlogPage);
router.get("/detail", pageController.getDetailPage);

module.exports = router;
