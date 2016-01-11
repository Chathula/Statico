# Statico
This small tool can read any static file and make it dynamic.specially made to make html static files into dynamic.

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
var data = statico.use('filename.html', { "title" : "My title", "text" : "this is the text" }, function (data) {
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
