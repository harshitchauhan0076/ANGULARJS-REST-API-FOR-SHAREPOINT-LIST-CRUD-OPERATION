MyPage.controller('popupB', ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    if ($rootScope.modalInstance.result != undefined) {
        var item = $rootScope.modalInstance.result.ID;
        $scope.itemid = item;
    }
    // $scope.getDate = function (){
    //     $http({
    //         method:"Get",         
    //         url:"https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items(" + item + ")",
    //         header: {
    //          "Accept": "application/json;odata=verbose"
    //      }
    //     }).then(function (getdata){
    //         console.log(getdata);
    //         $scope.getAdd();
    //         $scope.MyPage=getdata.data;
    //         $scope.i= $scope.MyPage.value;
    //     },
    //     function (error) {
    //      console.log(error);
    //  });
    // }
    // $scope.getDate();


    // $scope.closepopup = function () {
    //     $rootScope.modalInstance.close('a');

    // }



    $scope.addData = function () {
        var item = {
            //?$select=ListItemEntityTypeFullName
            "__metadata": { "type": 'SP.Data.MyListListItem' },
            "Title": $scope.MyPage.Title

        };

        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items?$select=ID,Title",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (item) {
                // $scope.getDate(item);
                $rootScope.modalInstance.close('a');
                alert("Added");
                $scope.getAdd(item);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    $scope.openPopup = function () {
        $('#addpopup').show();
    }

    $scope.cancelPopup = function () {
        $('#addpopup').hide();
    }
    $scope.getAdd = function (item) {
        $http({
            method: 'GET',
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items?$select=ID,Title&$orderby=ID desc&$filter=Id eq '" + item.d.Id + "'",
            header: {
                "Accept": "application/json;odata=verbose"
            }
        })
            .then(function (data) {

                var item = data.data;

                if ($rootScope.modalInstance.parentScope != undefined)
                    $rootScope.modalInstance.parentScope.AddItemCallBack(item);
                else
                    SharewebCommonFactoryService.refreshParentPage();

            })
    }

}]);