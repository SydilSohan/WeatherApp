const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path")
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static("public"));


app.get("/", function (req, res){

  res.render("Home");




});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const appKey = "710b5207d83c3d4ee22755f4e10979ca";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appKey +"&q=" + query +"&units="+ unit;

https.get(url, function(response){
  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp;
    const feels_like = weatherData.main.feels_like;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "https://openweathermap.org/img/wn/" + icon +"@4x.png";
    // res.write("<h1> The temperature in " + query +" is " + temp + " degrees celsius. It is a bit  " + desc + "</h1>")
    // res.write("<img src=" + imageURL + "  >");
    res.render("index", {query: query, temp:temp, feels_like:feels_like, desc:desc, imageURL:imageURL});
});
})




});







app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running...");
});
