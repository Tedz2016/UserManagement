(function(){
    angular.module('myApp', ['ngRoute','angularUtils.directives.dirPagination'])
        //3 views routing
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/user_list', {
                    templateUrl : 'templates/user_list.html',
                    controller : 'userCtrl'
                })
                .when('/edit_user/:param', {
                    templateUrl : 'templates/edit_user.html',
                    controller:'EdituserController'
                })
                .when('/new_user', {
                    templateUrl :'templates/new_user.html',
                    controller : 'NewuserController'
                })
                .otherwise({
                    redirectTo :  'user_list'
                });
        }])
    //user data factory
    .factory('userFactory', ['$http',function($http) {
        return {
            getUsers : function() {
                return $http.get('/users');
            },
            deleteUser : function(id) {
                return $http.delete('/users/'+id.toString());
            },
            updateUser : function(userdata) {
                return $http.put('/users/'+userdata.id.toString(),userdata);
            },
            addUser : function(userdata) {
                return $http.post('/users',userdata);
            }
        };
    }])
    //User list controller
    .controller('userCtrl', function($scope,userFactory) {
        //Initialize users data
        function getMyUser() {
            userFactory.getUsers()
                .then(function(res) {
                    $scope.users = res.data;
                    console.log($scope.users);
                    //initialize pagination
                    //$scope.groupToPages();
                    //$scope.initPageNums();
                });
        }
        getMyUser();

        $scope.deleteUser = function(id) {
            //var index = $scope.users.indexOf(item);
            //$scope.users.splice(index,1);
            //$scope.pagedItems[$scope.currentPage].splice(index % $scope.itemsPerPage,1);
            userFactory.deleteUser(id)
                .then(function(res){
                    console.log(res);
                    getMyUser();
                });

        };
        $scope.orderByMe = function(x) {
            $scope.myOrderBy = x;
        };
        /*
        //Pagination
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.pageNum = 0;
        $scope.pageNums = [];
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.users.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.users[i] ];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.users[i]);
                }
                $scope.pageNum = $scope.pagedItems.length;
            }
        };
        $scope.initPageNums = function() {
            for(var i = 0; i < $scope.pageNum; i++) $scope.pageNums.push(i);
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function(n) {
            $scope.currentPage = n;
        };*/

    })
    //Edit User View Controller
    .controller('EdituserController', function($scope,$location,$routeParams,userFactory) {
        $scope.id = $routeParams.param;
        var index = 0;
        function getMyUser() {
            userFactory.getUsers()
                .then(function(res) {
                    $scope.users = res.data;
                    console.log($scope.users);
                    //find user obj by id

                    for(index; index < $scope.users.length; index++) {
                        if($scope.id == $scope.users[index].id) break;
                    }

                    $scope.fName = $scope.users[index].fName;
                    $scope.lName = $scope.users[index].lName;
                    $scope.passw1 = $scope.users[index].passw1;
                    $scope.passw2 = $scope.users[index].passw2;
                    $scope.title = $scope.users[index].title;
                    $scope.sex = $scope.users[index].sex;
                    $scope.age = $scope.users[index].age;
                });
        }
        getMyUser();



        $scope.updateUser = function() {
            $scope.users[index].fName = $scope.fName;
            $scope.users[index].lName = $scope.lName;
            $scope.users[index].passw1 = $scope.passw1;
            $scope.users[index].passw2 = $scope.passw2;
            $scope.users[index].title = $scope.title;
            $scope.users[index].sex = $scope.sex;
            $scope.users[index].age = $scope.age;
            var userdataObj =  $scope.users[index];
            userFactory.updateUser(userdataObj)
                .then(function(res){
                    console.log(res);
                    getMyUser();
                });
            $location.path("#/user_list");
        };

    })
    //New User View Controller
    .controller('NewuserController', function($scope,$location,userFactory) {
        $scope.fName = '';
        $scope.lName = '';
        $scope.passw1 = '';
        $scope.passw2 = '';
        $scope.title = '';
        $scope.sex = '';
        $scope.age = '';
        $scope.error = false;
        $scope.incomplete = false;
        function getMyUser() {
            userFactory.getUsers()
                .then(function(res) {
                    $scope.users = res.data;
                    console.log($scope.users);
                });
        }
        getMyUser();
        var userId = 1;
        if($scope.users.length > 0) userId = $scope.users[$scope.users.length - 1].id + 1;
        $scope.addUser = function() {
           // $scope.users.push({ id:userId,fName:$scope.fName, lName: $scope.lName,
             //   title:$scope.title, sex : $scope.sex, age:$scope.age});
            userFactory.addUser({ id:userId,fName:$scope.fName, lName: $scope.lName,
                   title:$scope.title, sex : $scope.sex, age:$scope.age});
            $location.path("#/user_list");
        };
        $scope.$watch('passw1',function() {$scope.test();});
        $scope.$watch('passw2',function() {$scope.test();});
        $scope.$watch('fName', function() {$scope.test();});
        $scope.$watch('lName', function() {$scope.test();});
        $scope.$watch('title', function() {$scope.test();});
        $scope.$watch('sex', function() {$scope.test();});
        $scope.$watch('age', function() {$scope.test();});
        $scope.test = function() {
            if ($scope.passw1 !== $scope.passw2) {
                $scope.error = true;
            } else {
                $scope.error = false;
            }
            $scope.incomplete = false;
            if  (!$scope.fName.length ||
                !$scope.lName.length ||
                !$scope.passw1.length || !$scope.passw2.length
                ||!$scope.title.length||!$scope.sex.length||!$scope.age.length) {
                $scope.incomplete = true;
            }
        };
    });
})();
