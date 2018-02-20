var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('LouversCtrl', function ($scope, $http,$log) {
       
       
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


    $scope.AccName = "Louvers";
    $scope.AssignTos = ["NSW", "FSW", "LEW", "REW"];
    $scope.LocationFroms = ["BOTTOM LEFT", "BOTTOM RIGHT", "CENTER", "TOP LEFT", "TOP RIGHT"];

    $scope.Acchistory = [];
    // Delete data
    $scope.removeAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Acchistory.length === 10)
            $scope.Acchistory.shift();
        // Add deleted record to historical records
        $scope.Acchistory.push($scope.building.Openings.Louvers.Louver[index]);
        // Remove from main records (using index)
        $scope.building.Openings.Louvers.Louver.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoAcc = function () {
        $scope.building.Openings.Louvers.Louver.push($scope.Acchistory[$scope.Acchistory.length - 1]);
        $scope.Acchistory.pop();
    };
    $scope.Accword = "Add";
    $scope.accIndex = 0;

    $scope.myVar = true;
    // Reset new data model
    $scope.ResetAcc = function () {
        $scope.Accword = "Add";
        var id = 1;
        if ($scope.building.Openings.Louvers.Louver)
            id = $scope.building.Openings.Louvers.Louver.length + 1;
        $scope.newobj = {
            AssignTo: "NSW",
            MountingType: "",
            Height: 0,
            ID: id,
            LocationFrom: "BOTTOM LEFT",
            LocationX: 0,
            LocationY: 0,
            On: "1",
            Type: "",
            ReferenceTo: "Bay",
            Remarks: { Remark: [{ ID: 1, Remark: "" }] },
            Width: 0
        };
        $scope.showadv = false;

    };
    //Add  Bracing 
    $scope.AddAcc = function () {
        if ($scope.building.Openings.Louvers.Louver)
            $scope.building.Openings.Louvers.Louver.push(angular.copy($scope.newobj));
        else
            $scope.building.Openings.Louvers.Louver = [angular.copy($scope.newobj)];
    };
    $scope.AccUpdate = function (index) {
        $scope.newobj = angular.copy($scope.building.Openings.Louvers.Louver[index]);
        $scope.accIndex = index;
        $('#AccModal').modal('show');
        $scope.Accword = "Update";
        if ($scope.newobj.Type || $scope.newobj.MountingType)
            $scope.showadv = true;
    };
    $scope.AddUpdateAcc = function () {
        if ($scope.Accword == "Add")
            $scope.AddAcc();
        else if ($scope.Accword == "Update")
            $scope.ModyfyAcc();
    };
    $scope.ModyfyAcc = function () {
        $scope.building.Openings.Louvers.Louver[$scope.accIndex] = angular.copy($scope.newobj);
    };

    $scope.changeRef = function () {
        if ($scope.myVar == true) {
            $scope.newobj.ReferenceTo = $scope.BayOrSpan;
            $scope.newobj.On = "1";

        }
        else if ($scope.myVar == false) {
            $scope.newobj.ReferenceTo = "Surface";
            $scope.newobj.On = "";
        }

    };

    $scope.BayOrSpan = "BAY";

    $scope.AssignVhange = function () {
        if ($scope.newobj.AssignTo == "NSW" || $scope.newobj.AssignTo == "FSW" || $scope.newobj.AssignTo == "Roof") {
            $scope.BayOrSpan = "BAY";
        }
        else {
            $scope.BayOrSpan = "Span";
        }
        $scope.newobj.ReferenceTo = $scope.BayOrSpan;
        $scope.NoSpans();
        $scope.changeRef();
        $scope.AdvancedFunc();
    };
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
    //Advanced 
    $scope.AdvancedFunc = function () {

    };
    $scope.Types = ["FIXED", "ADJUSTABLE", "NONE"];
    $scope.MountingTypes = ["SINGLE", "CONTINUOUS", "NONE"];


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
        $scope.building.Openings.Louvers.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.Openings.Louvers.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.Openings.Louvers.Remarks.Remark)
            id = $scope.building.Openings.Louvers.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.Openings.Louvers.Remarks.Remark)
            $scope.building.Openings.Louvers.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.Openings.Louvers.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.Openings.Louvers.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.Openings.Louvers.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.Openings.Louvers.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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