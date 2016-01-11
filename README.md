# Statica
This small tool can read any static file and make it dynamic.specially made to make html static files into dynamic.

##Usage

##### require statica module

```javascript
var statica = require('statica');
```

##### use statica .use method to read file

```javascript
var data = statica.use('filename.html');
data.then(function (data)) {
  console.log(data);
}
```

##### use statica .use to change content dynamically and return the changed data

```javascript
var data = statica.use('filename.html', { "title" : "My title", "text" : "this is the text" });
data.then(function (data)) {
  console.log(data);
}
```

### OR

```javascript
var data = statica.use('filename.html', { "title" : "My title", "text" : "this is the text" }, function (data) {
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
