MyPage.controller('popup', ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    if ($rootScope.modalInstance.result != undefined) {
        var item = $rootScope.modalInstance.result.ID;
        $scope.itemid = item;
    }
    $scope.getDate = function () {
        $http({
            method: "Get",
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + item + ")",
            header: {
                "Accept": "application/json;odata=verbose"
            }
        }).then(function (getdata) {
            console.log(getdata);
            $scope.MyPage = getdata.data;
            $scope.i = $scope.MyPage.value;
        },
            function (error) {
                console.log(error);
            });
    }
    $scope.getDate();


    $scope.closepopup = function () {
        $rootScope.modalInstance.close('a');

    }



    $scope.updateItem = function (val) {
        var item = {
            "__metadata": { "type": 'SP.Data.MyListListItem' },
            // "ID":$scope.ID,
            "Title": $scope.MyPage.Title


        };
        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + $scope.itemid + ")",
            type: 'POST',
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),  // object convert in (JSON)string  
            headers:
            {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "PATCH"
            },
            success: function (getdata) {
                console.log(getdata);
                //$scope.getDate();
                $scope.getupdateitem(); //again call get method to show new list	
                //aler("successfull added");
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    $scope.getupdateitem = function () {
        $http({
            method: 'GET',
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + $scope.itemid + ")",
            header: {
                "Accept": "application/json;odata=verbose"
            }
        })
            .then(function (data) {

                var item = data.data;
                $rootScope.modalInstance.close('a');
                if ($rootScope.modalInstance.parentScope != undefined)
                    $rootScope.modalInstance.parentScope.EditItemCallBack(item);
                else
                    SharewebCommonFactoryService.refreshParentPage();

            })
    }

}]);