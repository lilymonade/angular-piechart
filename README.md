## ngPieChart

`ngPieChart` is an `Angular.js` lightweight plugin to render simple, animated and retina optimized pie charts.

* highly customizable
* very easy to implement
* resolution independent (retina optimized)
* uses `requestAnimationFrame` for smooth animations on modern devices
* works in all modern browsers, even in IE7+ with [excanvas](https://code.google.com/p/explorercanvas/wiki/Instructions)

## Features

* [Get started](#get-started)
    * [Installation](#installation)
    * [Angular.js](#angularjs)
* [Customize](#customize)
* [Events](#events)
* [Browser Support](#browser-support)
* [License](#license)

## Get started

### Installation

Use [bower](http://www.bower.io) to install the component:

```
$ bower install --save angular-piechart
```

### Angular.js

To work, the plugin needs to be executed in an `Angular.js` application.

You need to include `css` and `javascript` files in your project.

```javascript
<html>
    <head>
        ...
        <script src="/path/to/bower/components/angular-piechart/dist/styles/angular-piechart.min.css"></script>
    </head>
    <body>
        ...
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
        <script src="/path/to/bower/components/angular-piechart/dist/scripts/angular-piechart.min.js"></script>
    </body>
</html>
```

When files are imported, you must include plugin in your application:

```javascript
angular.module('myApp', ['ngPieChart']);
```

Now, the directive is accessible in all HTML files of your application:

```javascript
<ngpiechart progression="35" total="100">
    <div>Content to display</div>
</ngpiechart>
```

Content to display will be center in the middle of the pie chart. You can add as much content as you want to a limit of the size of the pie chart.

## Customize

| Directive attribute    | Default       | Description
|:----------------------:|:-------------:|:--------------
| **bar-color**              | #ef1e25 | The color of the curcular bar. You can either pass a valid css color string, or a function that takes the current percentage as a value and returns a valid css color string.

## License
Copyright (c) 2014 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/angular-piechart/blob/master/LICENSE.md).
