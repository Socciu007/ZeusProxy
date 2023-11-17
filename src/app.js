const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const packagePrices = require("./resources/package-prices.json");
const questions = require("./resources/faq.json");
const connectDB = require("./configdb");
const routes = require("./BlogCRUD");
const port = 8080;

//Connect MongoDB
connectDB();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

// app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

// app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "/assets")));
// app.use('/mycdn', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.set("view engine", "ejs");

// Dummy users
// var users = [
//   { name: 'tobi', email: 'tobi@learnboost.com' },
//   { name: 'loki', email: 'loki@learnboost.com' },
//   { name: 'jane', email: 'jane@learnboost.com' }
// ];

// app.get('/', function(req, res){
//   res.render('users', {
//     users: users,
//     title: "EJS example",
//     header: "Some users"
//   });
// });

app.get("/", async (req, res) => {
  // let packages = packagePrices;
  // const response = await axios.get("https://api.zeusproxy.com/rates/home");
  // if (response && response.data && response.data.success) {
  // console.log(response);
  //   packages = response.data.result;
  // }
  res.render(path.join(__dirname, "views/index.ejs"), {
    packagePrices,
    questions,
  });
});
app.get("/term-of-services", (req, res) => {
  res.render(path.join(__dirname, "views/term-of-services.ejs"));
});
app.get("/privacy-policy", (req, res) => {
  res.render(path.join(__dirname, "views/privacy-policy.ejs"));
});
app.get("/refund-policy", (req, res) => {
  res.render(path.join(__dirname, "views/refund-policy.ejs"));
});
// app.get("/blog", (req, res) => {
//   res.render(path.join(__dirname, "views/blogs.ejs"));
// });
app.get("/post", (req, res) => {
  res.render(path.join(__dirname, "views/post.ejs"));
});

routes(app);
// app.use("/blog", BlogCRUD);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
