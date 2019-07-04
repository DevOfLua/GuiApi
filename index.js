var express = require('express')
var app = express()
var fs = require('fs')
var filepath = "./data.json"
var port = process.env.PORT || 8000;
app.use(express.static(__dirname + '/'));

app.all("/", function(req,res) {
  if (req.method == "POST") {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on("end",() => {

      try {
          body = JSON.parse(body);
      } catch (e) {
          console.error(e);
      }
      
      if (!(body.Password === "my_love")) {
        return
      }

      var content = {}
      content.Status = true
      content.Message = body.Message
      fs.writeFile(filepath, JSON.stringify(content), function (err) {
        if (err) return console.log(err);
      });
        setTimeout(function() {
          content.Status = false
          content.Message = null
        fs.writeFile(filepath, JSON.stringify(content), function (err) {
          if (err) return console.log(err);
        });
      }, 5000);
    })
  }
  if (req.method == "GET") {
    res.sendFile(__dirname + `/data.json`)
  }
})
app.listen(port,function() {
  console.log("ok")
})