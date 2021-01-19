$scope.addData = function (val) {
    var item = {
        "__metadata": { "type": 'SP.Data.MyListListItem' },
      "Title":$scope.Title

      // "Email":$scope.MyFirstPage.Email          
    };

   $.ajax({
        url: "https://smalsusinfolabs.sharepoint.com/sites/Training/Harshit/_api/web/lists/getByTitle('MyList')/items("+$scope.ID+")",
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
           $scope.getDate();
        },
       error: function (error) {
           console.log(error);
        }
    });
}

$scope.editData = function(ext) {
    $scope.ID = ext.ID,
        $scope.Title = ext.Title
        
        
}