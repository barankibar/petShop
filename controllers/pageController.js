const getAboutPage = (req, res) => {
  res.render("about");
};

const getServicePage = (req, res) => {
  res.render("service");
};

const getProductPage = (req, res) => {
  res.render("product");
};

const getBlogPage = (req, res) => {
  res.render("blog");
};

const getPricePage = (req, res) => {
  res.render("price");
};

const getTeamPage = (req, res) => {
  res.render("team");
};

const getTestimonialPage = (req, res) => {
  res.render("testimonial");
};

const getDetailPage = (req, res) => {
  res.render("detail");
};

module.exports = {
  getAboutPage,
  getProductPage,
  getServicePage,
  getBlogPage,
  getPricePage,
  getTeamPage,
  getTestimonialPage,
  getDetailPage,
};
