'use strict';
/**
 * <ngpiechart bar-color="#2C3E50"
 *             track-color="red"
 *             scale-color="#dfe0e0"
 *             scale-length="3"
 *             line-cap="butt"
 *             line-width="10"
 *             size="200"
 *             rotate="0"
 *             progression="progression"
 *             total="total"
 *             animate="true"
 *             animate-duration="1000"
 *             on-start="onStart"
 *             on-step="onStep"
 *             on-stop="onStop">
 *       <div>{{line1}}</div>
 *       <div>{{line2}}</div>
 * </ngpiechart>
 */

ngPieChart.directive('ngpiechart', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    require: '?ngModel',
    scope:{
      progression: '=',
      total: '=',
      onStart: '=',
      onStep: '=',
      onStop: '='
    },
    transclude: true,
    link: function (scope, element, attrs)
    {
      // define authorized line cap
      var authorizedLineCap = ['butt', 'round', 'square'];

      // initialize total to 100
      var total = 100;

      // check total value to set to good value
      if ( typeof(parseFloat(scope.total)) === 'number' && !isNaN(parseFloat(scope.total)) )
      {
        total = parseFloat(scope.total);
      }

      /**
       * default easy pie chart options
       * @type {Object}
       */
      var defaultOptions = {
        barColor: '#ef1e25',
        trackColor: '#f2f2f2',
        scaleColor: '#dfe0e0',
        scaleLength: 5,
        lineCap: 'butt',
        lineWidth: 5,
        size: 200,
        rotate: 0,
        animate: {
          duration: 1000,
          enabled: true
        }
      };

      /**
       * options set by attributes
       * @type {Object}
       */
      var options = {};

      /**
       * Observe all attributes to set data in options object
       */
      attrs.$observe('barColor', function(value)
      {
        if ( typeof(value) === 'string' && value.trim() !== '' )
        {
          options.barColor = value.trim();
        }
      });

      attrs.$observe('trackColor', function(value)
      {
        if (typeof(value) === 'string' && value.trim() === 'false')
        {
          options.trackColor = false;
        }
        else if ( typeof(value) === 'string' && value.trim() !== '' && value.trim() !== 'true' )
        {
          options.trackColor = value.trim();
        }
      });

      attrs.$observe('scaleColor', function(value)
      {
        if (typeof(value) === 'string' && value.trim() === 'false')
        {
          options.scaleColor = false;
        }
        else if ( typeof(value) === 'string' && value.trim() !== '' && value.trim() !== 'true' )
        {
          options.scaleColor = value.trim();
        }
      });

      attrs.$observe('scaleLength', function(value)
      {
        if ( typeof(parseInt(value.trim())) === 'number' && !isNaN(parseInt(value.trim())) )
        {
          options.scaleLength = parseInt(value.trim());
        }
      });

      attrs.$observe('lineCap', function(value)
      {
        if ( typeof(value) === 'string' && authorizedLineCap.indexOf(value.trim()) >= 0 )
        {
          options.lineCap = value.trim();
        }
      });

      attrs.$observe('lineWidth', function(value)
      {
        if ( typeof(parseInt(value.trim())) === 'number' && !isNaN(parseInt(value.trim())) )
        {
          options.lineWidth = parseInt(value.trim());
        }
      });

      attrs.$observe('size', function(value)
      {
        if ( typeof(parseInt(value.trim())) === 'number' && !isNaN(parseInt(value.trim())) )
        {
          options.size = parseInt(value.trim());
        }
      });

      attrs.$observe('rotate', function(value)
      {
        if ( typeof(parseInt(value.trim())) === 'number' && !isNaN(parseInt(value.trim())) )
        {
          options.rotate = parseInt(value.trim());
        }
      });

      attrs.$observe('animate', function(value)
      {
        if ( value.trim() === 'true' ||  value.trim() === 'false')
        {
          options.animate = {
            enabled: (value.trim() === 'true'),
            duration: defaultOptions.animate.duration
          };

          if (options.animate.enabled)
          {
            attrs.$observe('animateDuration', function(value)
            {
              if ( typeof(parseInt(value.trim())) === 'number' && !isNaN(parseInt(value.trim())) )
              {
                options.animate.duration = parseInt(value.trim());
              }
            });
          }
        }
      });

      // watch options change
      $timeout(function(){
        scope.$watch(function()
          {
            return options;
          },
          function(newVal)
          {
            // merge options
            angular.extend(defaultOptions, newVal);

            // add css
            element.addClass('ngPieChart')
                   .css('width', defaultOptions.size + 'px' )
                   .css('height', defaultOptions.size + 'px' );

            // get first children
            var firstChild = element.find('div.chart-content');

            // check if exists
            if (firstChild[0])
            {
              // add css
              firstChild.css('width', (defaultOptions.size - ( 2 * defaultOptions.lineWidth )) + 'px' )
                .css('height', (defaultOptions.size - ( 2 * defaultOptions.lineWidth )) + 'px' )
                .css('top', defaultOptions.lineWidth + 'px' )
                .css('left', defaultOptions.lineWidth + 'px' );
            }

            // add events
            if (defaultOptions.animate.enabled)
            {
              // on start event
              if( typeof(scope.onStart) === 'function')
              {
                defaultOptions.onStart = scope.onStart;
              }

              // on step event
              if( typeof(scope.onStep) === 'function')
              {
                defaultOptions.onStep = scope.onStep;
              }

              // on stop event
              if( typeof(scope.onStop) === 'function')
              {
                defaultOptions.onStop = scope.onStop;
              }
            }

            // create pie chart
            var pieChart = new NgPieChart(element[0], defaultOptions);

            // watch progression value
            scope.$watch('progression',
              function()
              {
                // initialize progression to 0
                var progression = 0;

                // check scope to set good progression value
                if ( typeof(parseFloat(scope.progression)) === 'number' && !isNaN(parseFloat(scope.progression)) )
                {
                  progression = parseFloat(scope.progression) <= total ? parseFloat(scope.progression) : total;
                }

                // get percentage of progression
                var percent = ( progression / total ) * 100;

                pieChart.update(percent);
              }
            );
          },
          true
        );
      });
    },
    template:
          '<div class="chart-content">' +
            '<div class="chart-data" ng-transclude>' +
            '</div>' +
          '</div>'
  };
}]);
