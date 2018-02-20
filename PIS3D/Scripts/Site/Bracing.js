var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('BracingCtrl', function ($scope, $http,$log) {

    //Test Text editor 
    //$scope.newRemark.Remark = '<h1>Hello world!</h1>';
    $scope.editorConfig = {
        fontAwesome: true
    };
    $scope.api = {
        scope: $scope
    };
    $scope.$watch('newRemark.Remark', function (newValue) {
        $log.info(newValue);
    });
    //End Test Text editor 

    $('#panel').keyup(function () {
        //$(this).val() // get the current value of the input field.
        document.getElementById("panel").className = "panel panel-primary";
    });
    $('#panel').mousedown(function () {
        //$(this).val() // get the current value of the input field.
        document.getElementById("panel").className = "panel panel-primary";
    });

    $scope.building = {};

    //Get BuildgArea From seesion 
    $http({
        method: "GET",
        url: "/Home/Getjson"
    }).then(function mySucces(response) {
        console.log(response.data);
        buildingvar = response.data;
        $scope.building = buildingvar;
    }, function myError(response) {
        //alert("error");
    });

    //Save  BuildgArea to seesion 
    $scope.SaveData = function () {
        var myJSONText = JSON.stringify($scope.building, null, 2);
        document.getElementById("panel").className = "panel panel-success";
        $http({
            method: "POST",
            //url: "@Url.Action("Setjson")",
            url: "/Home/Setjson",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ jsonStr: myJSONText })
        }).then(function mySucces(response) {
            console.log($scope.building);
        }, function myError(response) {
            //alert("error");
        });
    };

    $scope.BracingType = {};
    $http({
        method: "GET",
        url: "/PISUser/GetBracingType"
    }).then(function mySucces(response) {
        $scope.BracingType = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.Locations = ["At GL", "Offset"];
    $scope.FromWalls = ["NSW", "LEW"];
    

    $scope.isNumber = function (n) {
        var type = typeof n;
        if (type == "string" || type == "number")
            return 1;
        else
            return 0;
    };
    

    $scope.Bracinghistory = [];
    // Delete data
    $scope.removeBracing = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Bracinghistory.length === 10)
            $scope.Bracinghistory.shift();
        // Add deleted record to historical records
        $scope.Bracinghistory.push($scope.building.Bracings.InteriorBracings.Bracing[index]);
        // Remove from main records (using index)
        $scope.building.Bracings.InteriorBracings.Bracing.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoBracing = function () {
        $scope.building.Bracings.InteriorBracings.Bracing.push($scope.Bracinghistory[$scope.Bracinghistory.length - 1]);
        $scope.Bracinghistory.pop();
    };

    // Reset new data model
    $scope.ResetBracing = function () {
        $scope.newobj = {
            NewType : "DIAGONAL",
            NewHeight : 0,
            NewLocation : "At GL",
            NewATGL : 1,
            NewOffset :10,
            NewFrom : "NSW"
        };
        $scope.BracProcess = 0;
        $scope.BracProcessword = "Add";

    };
    //Add  Bracing 
    $scope.AddBracing = function () {

        if ($scope.newobj.NewLocation == "At GL")
        {
            $scope.newBrac = {
                Type: $scope.newobj.NewType,
                PortalPartialHeight: $scope.newobj.NewHeight,
                Location : {Item : $scope.newobj.NewATGL}
            };
            if (!$scope.newobj.NewATGL)
                return;
            if (!$scope.newobj.NewHeight)
                $scope.newobj.NewHeight=0;
            if ($scope.building.Bracings.InteriorBracings.Bracing)
                $scope.building.Bracings.InteriorBracings.Bracing.push({
                    Type: $scope.newobj.NewType,
                    PortalPartialHeight: $scope.newobj.NewHeight,
                    Location: { Item: $scope.newobj.NewATGL }
                });
            else
                $scope.building.Bracings.InteriorBracings = {
                    Bracing: [{
                        Type: $scope.newobj.NewType,
                        PortalPartialHeight: $scope.newobj.NewHeight,
                        Location: { Item: $scope.newobj.NewATGL }
                    }]
                }
        }
        else if ($scope.newobj.NewLocation == "Offset")
        {
            $scope.newBrac = {
                Type: $scope.newobj.NewType,
                PortalPartialHeight: $scope.newobj.NewHeight,
                Location: { Item: { From: $scope.newobj.NewFrom, Offset: $scope.newobj.NewOffset } },
            };
            if (!$scope.newobj.NewOffset && $scope.newobj.NewOffset != 0)
                return;
            if (!$scope.newobj.NewHeight)
                $scope.newobj.NewHeight = 0;

            if ($scope.building.Bracings.InteriorBracings.Bracing)
                $scope.building.Bracings.InteriorBracings.Bracing.push({
                    Type: $scope.newobj.NewType,
                    PortalPartialHeight: $scope.newobj.NewHeight,
                    Location: { Item: { From: $scope.newobj.NewFrom, Offset: $scope.newobj.NewOffset } },
                });
            else
                $scope.building.Bracings.InteriorBracings = {
                    Bracing: [{
                        Type: $scope.newobj.NewType,
                        PortalPartialHeight: $scope.newobj.NewHeight,
                        Location: { Item: { From: $scope.newobj.NewFrom, Offset: $scope.newobj.NewOffset } },
                    }]
                }
        }

    };
    $scope.BracIndex = 0;
    $scope.object = {};

    $scope.BracingUpdate = function (index) {
        $scope.object = $scope.building.Bracings.InteriorBracings.Bracing[index];
        $scope.BracIndex = index;
        $scope.newobj = {
            NewType: "DIAGONAL",
            NewHeight: 0,
            NewLocation: "At GL",
            NewATGL: 1,
            NewOffset: 10,
            NewFrom: "NSW"
        };
        if ($scope.object.Location.Item.Offset || $scope.object.Location.Item.Offset==0)
        {
            $scope.newobj.NewLocation = "Offset";
            $scope.newobj.NewHeight = $scope.object.PortalPartialHeight;
            $scope.newobj.NewOffset = $scope.object.Location.Item.Offset;
            $scope.newobj.NewFrom = $scope.object.Location.Item.From;
            $scope.newobj.NewType = $scope.object.Type;
            $scope.newobj.NewATGL = 0;

        }
        else
        {
            $scope.newobj.NewLocation = "At GL";
            $scope.newobj.NewHeight = $scope.object.PortalPartialHeight;
            $scope.newobj.NewType = $scope.object.Type;
            $scope.newobj.NewATGL = $scope.object.Location.Item;
            $scope.newobj.NewOffset = 0;
            $scope.newobj.NewFrom = "NSW";
        }

        $('#BracingModal').modal('show');
        $scope.BracProcess = 1;
        $scope.BracProcessword = "Update";

    };

    // Confirm Editing
    $scope.ModyfyBracing = function () {
        if (!$scope.newobj.NewHeight)
            $scope.newobj.NewHeight = 0;

        if ($scope.newobj.NewLocation == "At GL")
        {
            if (!$scope.newobj.NewATGL)
                return;
            $scope.building.Bracings.InteriorBracings.Bracing[$scope.BracIndex] ={
                    Type: $scope.newobj.NewType,
                    PortalPartialHeight: $scope.newobj.NewHeight,
                    Location: { Item: $scope.newobj.NewATGL }
                };

        }
        else if ($scope.newobj.NewLocation == "Offset")
        {
            if (!$scope.newobj.NewOffset && $scope.newobj.NewOffset!=0)
                return;
            $scope.building.Bracings.InteriorBracings.Bracing[$scope.BracIndex]={
                    Type: $scope.newobj.NewType,
                    PortalPartialHeight: $scope.newobj.NewHeight,
                    Location: { Item: { From: $scope.newobj.NewFrom, Offset: $scope.newobj.NewOffset } },
                };
        }
    };

    $scope.RestHeight = function () {
        $scope.newobj.NewHeight =0 ;
    };
    $scope.RestGLOffset = function () {
        $scope.newobj.NewOffset = 0;
        $scope.newobj.NewATGL = 0;
    };
    $scope.BracProcess = 0; // 0 Add  1 Update 
    $scope.AddUpdateBrac = function () {
        if ($scope.BracProcess == 0)
            $scope.AddBracing();
        else if ($scope.BracProcess ==1)
            $scope.ModyfyBracing();
    };


    ////------------*--------------*********Remarks ****--------------------------------*************---
    $scope.Remarkhistory = [];
    // Delete data
    $scope.removeRemark = function (index) {
        //// Remove first / oldest element from history if it reaches maximum capacity of 10 records
        //if ($scope.Remarkhistory.length === 10)
        //    $scope.Remarkhistory.shift();
        //// Add deleted record to historical records
        //$scope.Remarkhistory.push($scope.building.Bracings.Remarks.Remark[index]);
        //// Remove from main records (using index)
        //$scope.building.Bracings.Remarks.Remark.splice(index, 1);
        $scope.building.Bracings.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.Bracings.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.Bracings.Remarks.Remark)
            id = $scope.building.Bracings.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.Bracings.Remarks.Remark)
            $scope.building.Bracings.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.Bracings.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.Bracings.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.Bracings.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.Bracings.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
    };
    $scope.ShowDeleRemark = function (state) {
        if (state == "true")
            return true;
        if (state == "false" && $scope.Deletedchecked == false)
            return false;
        if (state == "false" && $scope.Deletedchecked == true)
            return true;
    };
    ////------------*--------------*********Remarks ****--------------------------------*************---


});