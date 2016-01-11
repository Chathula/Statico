# Statico
This small tool can read any static file and make it dynamic.specially made to make html static files into dynamic.

![alt tag](http://s1.postimg.org/ke2moiwq7/statico.png)

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
</head>
<body>

  <p>Dynamic text : ${text}</p>

</body>
</html>
```

##### use statico with http web server

```javascript
var http = require('http');
var statico = require('statico');

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type" : "text/html" });
  statico.use('file.html', { "title" : "My title", "text" : "This is text" }, function (data) {
    res.write(data);
    res.end();
  });
}).listen(8000);
```
