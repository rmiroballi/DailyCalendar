familyCalendar
		.controller(
				'calendarController',
				function($scope, $interval, $filter) {
					$scope.mainCal = {};

					// Refresh every hour.
					var refreshCalendars = $interval(function() {
						$scope.refreshCal();
					}, 3600000);

					$scope.refreshCal = function() {
						var day = new Date();
						var today = $filter('date')(day, 'yyyyMMdd');
						var dayNum = day.getDay() + 1;
						var frame = angular.element(document.querySelector('#weekCal'));
						// Put your calendar link here.
						var daySrc = ''
							//Replace the wkst variable (week start) with below
								+ dayNum
								//And the rest of the link here
								+ '';
						frame.attr('src', daySrc);
						$scope.mainCal.refresh = true;

					}

				});
