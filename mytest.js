var myData = angular.module('myPage', []);
myData.controller('showData', function($scope, $http) {
    $scope.getallitems = function() { //function creation
        $http
            ({
                method: 'GET',
                url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Pradeep/_api/web/lists/getByTitle('Emp')/items?$select=ID,name,department,designation,salary",
                header: {
                    "Accept": "application/json;odata=verbose"
                }
            }).then(function(getdata) // data comes in getdata variable
                {
                    console.log(getdata);
                    $scope.Mydata = getdata.data;
                    $scope.employee = $scope.Mydata.value;

                },
                function(error) {
                    console.log(error);
                });
    }
    $scope.getallitems();


    $scope.removeData = function(ID) {
        $.ajax({


            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Pradeep/_api/web/lists/getByTitle('Emp')/items(" + ID + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE",
            },
            success: function(data) {
                $scope.getallitems();
            },
            error: function(data) {
                alert("data not display");
            }
        });
    }



   
    $scope.addEmployee = function() {
        var item = {
            "__metadata": { "type": 'SP.Data.EmpListItem' },
            //"empid": $scope.Empid,  // ng-model data assign in internal column
            "name": $scope.Name,
            "department": $scope.Department,
            "designation": $scope.Designation,
            "salary": $scope.Salary
        };

        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Pradeep/_api/web/lists/getByTitle('Emp')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item), // object convert in (JSON)string  
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function(data, status, headers, config) {
                $scope.getallitems(); //again call get method to show new list	
                alert("successfull added");
            },
            error: function(error) {
                console.log(error);
            }
        });
    }


    $scope.openPopup = function() {
        $('#addpopup').show();
    }

    $scope.cancelPopup = function() {
        $('#addpopup').hide();
    }


    $scope.editData = function(ext) {
        $scope.ID = ext.ID,
            $scope.Name = ext.name,
            $scope.Department = ext.department,
            $scope.Designation = ext.designation,
            $scope.Salary = ext.salary
    }


    $scope.updateData = function(val) {
        var item = {
            "__metadata": { "type": 'SP.Data.EmpListItem' },
            "name": $scope.Name,
            "department": $scope.Department,
            "designation": $scope.Designation,
            "salary": $scope.Salary
        };

        $.ajax({
            url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Pradeep/_api/web/lists/getByTitle('Emp')/items(" + $scope.ID + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "PATCH"
            },
            success: function(data) {
                $scope.getallitems();
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    $scope.mySort = function(property, order) {
        $scope.reverse = order;
        $scope.orderBy = property;
    };
});