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

You can also use [bower](http://www.bower.io) to install the component:

```
$ bower install --save angular-piechart
```

### Angular.js

To work, the plugin needs to be execute in an `Angular.js` application.

```javascript
<html>
    <head>
        ...

        <script src="/path/to/bower/components/angular-piechart/dist/styles/angular-piechart.min.js"></script>
    </head>
    <body>
        ...

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
        <script src="/path/to/bower/components/angular-piechart/dist/scripts/angular-piechart.min.js"></script>
    </body>
</html>
```

## License
Copyright (c) 2014 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/angular-piechart/blob/master/LICENSE.md).
