familyCalendar.controller("feedController", [ '$scope', '$interval', 'FeedService', 'WeatherService',
		function($scope, $interval, Feed, Forecast) {
			$scope.feeds = [];
			$scope.feedIndex = 0;
			$scope.currentFeed = '';
			$scope.clock = new Date();
			$scope.forecast = 'Weather Forecast goes here.';
			//Your weather URL from wunderground
			$scope.weatherUrl = 'http://api.wunderground.com/api/APIKEYGOESHERE/forecast/q/IL/Aurora.json';

			$scope.loadFeed = function(e) {
				Feed.parseFeed(e).then(function(res) {
					$scope.feedIndex = 0;
					var f = res.data.responseData.feed.entries;
					var l = $scope.feeds.length;
					for (i = 0; i < f.length; i++) {
						f[i].id = i + l;
						$scope.feeds[$scope.feeds.length] = f[i];
					}
					$scope.showFeed(0);
				});
			}

			$scope.loadForecast = function() {
				Forecast.forecast($scope.weatherUrl).then(function(res) {
					var weather = res.data.forecast.txt_forecast;
					$scope.forecast = "Today: " + weather.forecastday[0].fcttext + " Tomorrow:" + weather.forecastday[1].fcttext;
				});
			}

			$scope.initFeed = function() {
				$scope.loadFeed("http://feeds.feedburner.com/quotationspage/qotd");
				$scope.loadFeed("http://feeds.feedburner.com/quotationspage/mqotd");
				$scope.loadForecast($scope.weatherUrl);
			}

			// Refresh feeds once a day.
			var refreshFeed = $interval(function() {
				$scope.feeds = [];
				$scope.loadFeed("http://feeds.feedburner.com/quotationspage/qotd");
				$scope.loadFeed("http://feeds.feedburner.com/quotationspage/mqotd");
			}, 86400000);

			// Check Weather every 4 hours
			var refreshForecast = $interval(function() {
				$scope.loadForecast($scope.weatherUrl);
			}, 14400000);

			var changeFeed = $interval(function() {
				$scope.feedIndex++;
				if ($scope.feedIndex == $scope.feeds.length) {
					$scope.feedIndex = 0;
				}
				$scope.showFeed($scope.feedIndex);
			}, 15000);

			var clockInterval = $interval(function() {
				$scope.clock = new Date();
			}, 1000);

			$scope.showFeed = function(index) {
				$scope.currentFeed = $scope.feeds[index];
			}

		} ]);
