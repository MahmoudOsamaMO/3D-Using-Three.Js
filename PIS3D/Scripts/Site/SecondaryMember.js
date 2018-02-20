var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('PrimaryCtrl', function ($scope, $http,$log) {
       
       
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

    $scope.SurfaceFinish = {};
    $http({
        method: "GET",
        url: "/PISUser/GetSurfaceFinish"
    }).then(function mySucces(response) {
        $scope.SurfaceFinish = response.data;
    }, function myError(response) {
        //alert("error");
    });
    $scope.SurfaceTreatment = {};
    $http({
        method: "GET",
        url: "/PISUser/GetSurfaceTreatment"
    }).then(function mySucces(response) {
        $scope.SurfaceTreatment = response.data;
    }, function myError(response) {
        //alert("error");
    });
    $scope.PaintSystem = {};
    $http({
        method: "GET",
        url: "/PISUser/GetPaintSystem"
    }).then(function mySucces(response) {
        $scope.PaintSystem = response.data;
    }, function myError(response) {
        //alert("error");
    });
    $scope.SecondarySurfaceFinish = {};
    $http({
        method: "GET",
        url: "/PISUser/GetSecondarySurfaceFinish"
    }).then(function mySucces(response) {
        $scope.SecondarySurfaceFinish = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.SecondarySurfaceTreatment = ["NONE", "STANDARD", "SWEEP BLAST"];

    ////------------*--------------*********Coats  ****--------------------------------*************---
    $scope.By_WhoCoat = ["ZS AT SHOP", "ZS AT SITE", "NONE", "NOT BY ZS"];
    $scope.Manufacturer = ["SIGMA", "SIPES", "JOTUN", "ASIAN", "BERGER", "AKZONOBEL", "NEROLAC", "NONE", "HEMPEL", "AMERON", "INTERNATIONAL", "SIPCO", "RED SEA"];

    $scope.Coathistory = [];
    // Delete data
    $scope.removeCoat = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Coathistory.length === 10)
            $scope.Coathistory.shift();
        // Add deleted record to historical records
        $scope.Coathistory.push($scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat[index]);
        // Remove from main records (using index)
        $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoCoat = function () {
        $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat.push($scope.Coathistory[$scope.Coathistory.length - 1]);
        $scope.Coathistory.pop();
    };
    $scope.Coatword = "Add";
    $scope.CoatIndex = 0;
    // Reset new data model
    $scope.ResetCoat = function () {
        $scope.Coatword = "Add";
        var id = 1;
        if ($scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat)
            id = $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat.length + 1;
        $scope.newCoat = {
            ID: id,
            By_Who: "ZS AT SHOP",
            Color: "",
            Description: "",
            Manufacturer: "SIGMA",
            PaintCode: "",
            Thickness: 0
        };
    };
    //Add  Bracing 
    $scope.AddCoat = function () {
        if ($scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat)
            $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat.push(angular.copy($scope.newCoat));
        else
            $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat = [angular.copy($scope.newCoat)];
    };
    $scope.CoatUpdate = function (index) {
        $scope.newCoat = angular.copy($scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat[index]);
        $scope.CoatIndex = index;
        $('#CoatModal').modal('show');
        $scope.Coatword = "Update";

        $scope.newCoat = angular.copy($scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat[index]);

    };
    $scope.AddUpdateCoat = function () {
        if ($scope.Coatword == "Add")
            $scope.AddCoat();
        else if ($scope.Coatword == "Update")
            $scope.ModyfyCoat();
    };
    $scope.ModyfyCoat = function () {
        $scope.building.SurfaceTreatment.SecondaryMembers.Coats.Coat[$scope.CoatIndex] = angular.copy($scope.newCoat);
    };

    ////------------*--------------*********Coats ****--------------------------------*************---


    ////------------*--------------*********Remarks ****--------------------------------*************---
    $scope.Remarkhistory = [];
    // Delete data
    $scope.removeRemark = function (index) {
        //// Remove first / oldest element from history if it reaches maximum capacity of 10 records
        //if ($scope.Remarkhistory.length === 10)
        //    $scope.Remarkhistory.shift();
        //// Add deleted record to historical records
        //$scope.Remarkhistory.push($scope.building.GeneralData.Remarks.Remark[index]);
        //// Remove from main records (using index)
        //$scope.building.GeneralData.Remarks.Remark.splice(index, 1);
        $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark)
            id = $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark)
            $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.SurfaceTreatment.SecondaryMembers.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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