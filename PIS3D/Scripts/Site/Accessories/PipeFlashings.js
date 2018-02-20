var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('PipeFlashingsCtrl', function ($scope, $http,$log) {


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



    $scope.AccName = "Pipe Flashing";

    $scope.Acchistory = [];
    // Delete data
    $scope.removeAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Acchistory.length === 10)
            $scope.Acchistory.shift();
        // Add deleted record to historical records
        $scope.Acchistory.push($scope.building.Openings.PipeFlashings.PipeFlashing[index]);
        // Remove from main records (using index)
        $scope.building.Openings.PipeFlashings.PipeFlashing.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoAcc = function () {
        $scope.building.Openings.PipeFlashings.PipeFlashing.push($scope.Acchistory[$scope.Acchistory.length - 1]);
        $scope.Acchistory.pop();
    };
    $scope.Accword = "Add";
    $scope.accIndex = 0;

    $scope.myVar = true;
    // Reset new data model
    $scope.ResetAcc = function () {
        $scope.Accword = "Add";
        var id = 1;
        if ($scope.building.Openings.PipeFlashings.PipeFlashing)
            id = $scope.building.Openings.PipeFlashings.PipeFlashing.length + 1;
        $scope.newobj = {
            OutsideDiameter: "4-100",
            ID: id,
            Remarks: { Remark: [{ ID: 1, Remark: "" }] }
        };

    };
    //Add  Bracing 
    $scope.AddAcc = function () {
        if ($scope.building.Openings.PipeFlashings.PipeFlashing)
            $scope.building.Openings.PipeFlashings.PipeFlashing.push($scope.newobj);
        else
            $scope.building.Openings.PipeFlashings.PipeFlashing = [$scope.newobj];
    };
    $scope.AccUpdate = function (index) {
        $scope.newobj = angular.copy($scope.building.Openings.PipeFlashings.PipeFlashing[index]);
        $scope.accIndex = index;
        $('#AccModal').modal('show');
        $scope.Accword = "Update";
    };
    $scope.AddUpdateAcc = function () {
        if ($scope.Accword == "Add")
            $scope.AddAcc();
        else if ($scope.Accword == "Update")
            $scope.ModyfyAcc();
    };
    $scope.ModyfyAcc = function () {
        $scope.building.Openings.PipeFlashings.PipeFlashing[$scope.accIndex] = angular.copy($scope.newobj);
    };




    //Advanced 
    $scope.AdvancedFunc = function () {

    };

    $scope.OutsideDiameters = ["NONE", "4-100", "101-175"];


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
        $scope.building.Openings.PipeFlashings.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.Openings.PipeFlashings.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.Openings.PipeFlashings.Remarks.Remark)
            id = $scope.building.Openings.PipeFlashings.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.Openings.PipeFlashings.Remarks.Remark)
            $scope.building.Openings.PipeFlashings.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.Openings.PipeFlashings.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.Openings.PipeFlashings.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.Openings.PipeFlashings.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.Openings.PipeFlashings.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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

//$(function () {
//    $('#tbl1').on('contextmenu', 'tr', function (e) {
//        e.preventDefault();
//        alert(this.id);
//    });
//});

$(document).ready(function () {
    $('#tbl1').contextmenu(function () {
        //$('.btnEdit').hide();
        var id = $(this).attr('id');
        $('#' + id + ' .btnEdit').toggle();
        return false;
    });
    $(document).click(function () {
        $('.btnEdit').hide();
    });
});