var MyPage = angular.module('newRead', ['ui.bootstrap']);
MyPage.controller('MyNew', ["$scope", "$http", "$rootScope", "$uibModal", function ($scope, $http, $rootScope, $uibModal) {

    $scope.getDate = function () {
        $http({
            method: 'GET',
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items?$select=ID,Title",
            header: {
                "Accept": "application/json;odata=verbose"
            }
        }).then(function (getdata) {
            // $scope.date.Date = new Date($scope.date.Date).format('dd/MM/yyyy');
            console.log(getdata);
            $scope.MyPage = getdata.data;
            $scope.i = $scope.MyPage.value;

        },
            function (error) {
                console.log(error);
            });

    }
    $scope.getDate();

    $scope.removeData = function (ID) {
        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + ID + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE",
            },
            success: function (getdata) {
                $scope.getDate();
            },
            error: function (getdata) {
                alert("data not display");
            }
        });
    }



    /********************************Centerlize Add popup ********************************** */
    $scope.addOpen = function (item) {
        $rootScope.modalInstance = $uibModal.open({
            templateUrl: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/Documents/PopA.html",
            controller: "popupB",
            size: '',
        });

        $rootScope.modalInstance.result = item;
        $rootScope.modalInstance.parentScope = $scope;

    };



    $scope.updateItem = function (val) {
        var item = {
            "__metadata": { "type": 'SP.Data.MyListListItem' },
            "ID": $scope.ID,
            "Title": $scope.Title

            // "Email":$scope.MyFirstPage.Email          
        };

        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + $scope.ID + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers:
            {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "PATCH"
            },
            success: function (data) {
                $scope.getallitems();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }




    /********************************Centerlize Edit popup ********************************** */
    $scope.open = function (item) {
        $rootScope.modalInstance = $uibModal.open({
            templateUrl: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/Documents/Pop.html",
            controller: "popup",
            size: '',
        });

        $rootScope.modalInstance.result = item;
        $rootScope.modalInstance.parentScope = $scope;

    };

    /*********************************edit POPUP call back********************************/

    $scope.EditItemCallBack = function (updatedata) {
        angular.forEach($scope.MyPage.value, function (item, index) //forEach Loop
        {
            if (item.ID == updatedata.ID) {
                $scope.MyPage.value[index] = updatedata;
            }
        });
    }
    /************************************Call back add code******************************** */

    $scope.AddItemCallBack = function (adddata) {
        //angular.forEach($scope.MyPage.value, function (item, index) //forEach Loop


        $scope.MyPage.value.push(adddata.value[0]);
        console.log($scope.MyPage);


    }



}]);