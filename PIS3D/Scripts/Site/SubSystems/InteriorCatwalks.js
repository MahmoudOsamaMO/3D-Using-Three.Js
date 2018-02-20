var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('InteriorCatwalksCtrl', function ($scope, $http,$log) {
       
       
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




    $scope.AccName = "Interior Catwalks";
    $scope.ByWho = ["ZS", "OTHER", "NONE"];
    $scope.Type = ["GALV. GRATING", "CHECK. PLATE", "NONE"];
    $scope.EaveCond = {};
    $http({
        method: "GET",
        url: "/PISUser/GetEaveConditionEnum"
    }).then(function mySucces(response) {
        $scope.EaveCond = response.data;
    }, function myError(response) {
        alert("error");
    });
    //Get Downspouts Cond
    $scope.DownspoutsCond = {};
    $http({
        method: "GET",
        url: "/PISUser/GetDownspouts"
    }).then(function mySucces(response) {
        $scope.DownspoutsCond = response.data;
    }, function myError(response) {
        alert("error");
    });

    $scope.Acchistory = [];
    // Delete data
    $scope.removeAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Acchistory.length === 10)
            $scope.Acchistory.shift();
        // Add deleted record to historical records
        $scope.Acchistory.push($scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks[index]);
        // Remove from main records (using index)
        $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoAcc = function () {
        $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks.push($scope.Acchistory[$scope.Acchistory.length - 1]);
        $scope.Acchistory.pop();
    };
    $scope.Accword = "Add";
    $scope.accIndex = 0;

    $scope.myVar = true;
    // Reset new data model
    $scope.ResetAcc = function () {
        $scope.Accword = "Add";
        var id = 1;
        if ($scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks)
            id = $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks.length + 1;
        var widthAxes = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes;
        var WidthFromGL = '';
        if (widthAxes)
            WidthFromGL = widthAxes.split(',')[0];
        var LengthAxes = $scope.building.GeneralData.Location.AlongBuildingLength.Axes;
        var LengthFromGL = '';
        if (LengthAxes)
            LengthFromGL = LengthAxes.split(',')[0];
        $scope.newobj = {
            ID: id,
            "Width": { "Width": 1, "FromGL": WidthFromGL, "ToGL": WidthFromGL },
            "Length": { "Length": 1, "FromGL": LengthFromGL, "ToGL": LengthFromGL },
            "Area": 1,
            "BottomHeightFromFFL": 1,
            "Flooring": { "By": "ZS", "Type": "CHECK. PLATE", "Thickness": 1 }, 
            "Load": { "UniformLoad": 1, "ConcentratedLoad": 1 }, 
            "HandrailLength": 1
        };
    };
    //Add  Bracing 
    $scope.AddAcc = function () {
        if ($scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks)
            $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks.push(angular.copy($scope.newobj));
        else
            $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks = [angular.copy($scope.newobj)];
    };
    $scope.AccUpdate = function (index) {
        $scope.newobj = angular.copy($scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks[index]);
        $scope.accIndex = index;
        $('#AccModal').modal('show');
        $scope.Accword = "Update";

        $scope.newobj = angular.copy($scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks[index]);

    };
    $scope.AddUpdateAcc = function () {
        if ($scope.Accword == "Add")
            $scope.AddAcc();
        else if ($scope.Accword == "Update")
            $scope.ModyfyAcc();
    };
    $scope.ModyfyAcc = function () {
        $scope.building.Subsystems.InteriorCatwalks.InteriorCatwalks[$scope.accIndex] = angular.copy($scope.newobj);
    };

    $scope.BayOrSpan = "BAY";

    $scope.Spans = ["1"];

    $scope.NoSpans = function () {
        $scope.countLEW = 0;
        $scope.countREW = 0;
        for (var k = 0; k < $scope.building.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules.length ; k++) {
            for (var i = 0; i < $scope.building.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules.length ; i++) {
                $scope.countLEW += $scope.building.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width.length;
            }
        }
        for (var k = 0; k < $scope.building.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules.length ; k++) {
            for (var i = 0; i < $scope.building.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules.length ; i++) {
                $scope.countREW += $scope.building.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width.length;
            }
        }
        $scope.Spans = ["1"];
        if ($scope.newobj.AssignTo == "LEW")
            for (var l = 2; l <= $scope.countLEW ; l++) {
                $scope.Spans.push(l.toString())
            }
        else if ($scope.newobj.AssignTo == "REW")
            for (var l = 2; l <= $scope.countREW ; l++) {
                $scope.Spans.push(l.toString())
            }

    };


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
        $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.Subsystems.InteriorCatwalks.Remarks.Remark)
            id = $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.Subsystems.InteriorCatwalks.Remarks.Remark)
            $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.Subsystems.InteriorCatwalks.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.Subsystems.InteriorCatwalks.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.Subsystems.InteriorCatwalks.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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