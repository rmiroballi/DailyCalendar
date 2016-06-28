familyCalendar
		.factory(
				'FeedService',
				[
						'$http',
						function($http) {
							return {
								parseFeed : function(url) {
									return $http
											.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q='
													+ encodeURIComponent(url));
								}
							}
						} ]);

familyCalendar.factory('WeatherService', [ '$http', function($http) {
	return {
		forecast : function(url) {
			return $http({
				method : 'GET',
				url : url
			});
		}
	}
} ]);