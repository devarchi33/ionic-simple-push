/**
 * Created by donghoon on 15. 8. 19..
 */
angular.module('starter.controllers.dashController', [])

    .controller('DashCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicUser, $ionicPush, $ionicCoreSettings, $http) {
        //$ionicPlatform.ready(function () {
        // Handles incoming device tokens
        $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
            alert("Successfully registered token " + data.token);
            console.log('Ionic Push: Got token ', data.token, data.platform);
            $scope.token = data.token;
        });

        $scope.app_id = $ionicCoreSettings.get('app_id');
        $scope.api_key = $ionicCoreSettings.get('api_key');

        $scope.identifyUser = function () {
            console.log('Ionic User: Identifying with Ionic User service');

            var user = $ionicUser.get();
            if (!user.user_id) {
                user.user_id = $ionicUser.generateGUID();
            }
            ;

            angular.extend(user, {
                name: 'Ionitron',
                bio: 'WHOO'
            });

            $ionicUser.identify(user).then(function () {
                $scope.identified = true;
                alert('Identified user : ' + user.name + ' \n ID ' + user.user_id);
            });
        };

        $scope.pushRegister = function () {
            console.log('Ionic Push: Registering user');

            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function (notification) {
                    // Handle new push notifications here
                    // console.log(notification);
                    $scope.token = notification;
                    alert('Noti : ' + notification.message);
                    return true;
                }
            });
        };

        $http.get('/api/feed').then(function(data) {
            console.log('data ' , data)
        });

        //});
    });
