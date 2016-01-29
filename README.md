# Statico
This small tool can read any static file and make it dynamic.specially made to make html static files into dynamic.

![alt tag](http://s1.postimg.org/ke2moiwq7/statico.png)

##What's New?
  -- Now "Statico" can automatically link external CSS and Javascript files to the HTML page

  ```javascript
  statico.setup(req, res); // This method gives the access of HTTP Request and Response to Statico Module
  ```

#####Note
```
You must validate req.url correctly. (i have explained a '/' and '/me' route) if you don't, it will break the code
```

##Usage

##### require statico module

```javascript
var statico = require('statico');
```

##### use statico .use method to read file

```javascript
var data = statico.use('filename.html');
data.then(function (data)) {
  console.log(data);
}
```

##### use statico .use to change content dynamically and return the changed data

```javascript
var data = statico.use('filename.html', { "title" : "My title", "text" : "this is the text" });
data.then(function (data)) {
  console.log(data);
}
```

### OR

```javascript
statico.use('filename.html', { "title" : "My title", "text" : "this is the text" }, function (data) {
  console.log(data);
});
```

###### filename.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title : ${title}</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <h1>Text : <span style="color: #333;">${text}</span></h1>

  <a id="click" href="#">Click me</a>
  <a href="me.html">Me</a>

<script type="text/javascript">
  console.log("loged");
</script>
<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
<script type="text/javascript" src="js/file.js"></script>
<script type="text/javascript" src="js/file2.js"></script>
</body>
</html>
```

##### use statico with http web server

```javascript
var http = require("http");
var statico = require('statico');

var file = statico.use("filename.html", { "title" : "My title", "text" : "This is text" });

http.createServer(function (req, res) {
  statico.setup(req, res);
  if (req.url === '/') {
    file.then(function (data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.write(data);
        res.end();
    });
  } else if (req.url === '/me') {
    var d = statico.use('me.html');
      d.then(function (data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.write(data);
        res.end();
      });
  }
}).listen(8000);

```
