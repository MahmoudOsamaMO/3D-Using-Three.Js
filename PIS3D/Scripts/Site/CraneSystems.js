var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('CraneSystemsCtrl', function ($scope, $http,$log) {
       
       
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



    $scope.AccName = "Crane System";
    $scope.AssignTos = ["NSW", "FSW", "LEW", "REW", "Roof"];
    $scope.LocationFroms = ["BOTTOM LEFT", "BOTTOM RIGHT", "CENTER", "TOP LEFT", "TOP RIGHT"];

    $scope.Acchistory = [];
    // Delete data
    $scope.removeAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Acchistory.length === 10)
            $scope.Acchistory.shift();
        // Add deleted record to historical records
        $scope.Acchistory.push($scope.building.CraneSystems.CraneSystems[index]);
        // Remove from main records (using index)
        $scope.building.CraneSystems.CraneSystems.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoAcc = function () {
        $scope.building.CraneSystems.CraneSystems.push($scope.Acchistory[$scope.Acchistory.length - 1]);
        $scope.Acchistory.pop();
    };
    $scope.Accword = "Add";
    $scope.accIndex = 0;

    $scope.myVar = true;
    // Reset new data model
    $scope.ResetAcc = function () {
        $('#home').tab('show');
        $scope.Accword = "Add";
        var id = 1;
        if ($scope.building.CraneSystems.CraneSystems)
            id = $scope.building.CraneSystems.CraneSystems.length + 1;
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
            CraneZS_Scope: "APPLY LOADS ONLY",
            CraneManufacturer: "MORRIS",
            CraneSystemAndRailsBy: "ZAMIL STEEL",
            CranePowerSupply: "NONE",
            Type: "TR",
            Span: { "Width": 0, "FromGL": WidthFromGL, "ToGL": WidthFromGL },
            Run: { "Length": 0, "FromGL": LengthFromGL, "ToGL": LengthFromGL },
            HookHeightH3: 0,
            TopOfCraneBeamH1: 0, 
            MinClr: { "VertH2": 0, "HorizW2": 0 }, 
            LiftCapacity: { "Crane": 5, "Hoist": 0 },
            WheelBase: 0,
            Weight: { "Bridge": 0, "Trolley": 0 },
            Speed: { "Hoist": 0, "Trolley": 0, "Bridge": 0 },
            Operation: "PENDANT"
        }
        $scope.showadv = false;
    };
    //Add  Bracing 
    $scope.AddAcc = function () {
        if ($scope.building.CraneSystems.CraneSystems)
            $scope.building.CraneSystems.CraneSystems.push(angular.copy($scope.newobj));
        else
            $scope.building.CraneSystems.CraneSystems = [angular.copy($scope.newobj)];
    };
    $scope.AccUpdate = function (index) {
        $scope.newobj = angular.copy($scope.building.CraneSystems.CraneSystems[index]);
        $scope.accIndex = index;
        $('#AccModal').modal('show');
        $scope.Accword = "Update";
        if ($scope.newobj.Purpose)
            $scope.showadv = true;
    };
    $scope.AddUpdateAcc = function () {
        if ($scope.Accword == "Add")
            $scope.AddAcc();
        else if ($scope.Accword == "Update")
            $scope.ModyfyAcc();
    };
    $scope.ModyfyAcc = function () {
        $scope.building.CraneSystems.CraneSystems[$scope.accIndex] = angular.copy($scope.newobj);
    };

    $scope.CraneZS_Scopes = ["APPLY LOADS ONLY", "BRACKETS, RUNWAY BEAMS & STOPPERS BY ZS", "BRACKETS ONLY", "NONE"];
    $scope.CraneManufacturer = ["MORRIS", "CRANEMANN", "KONE", "SAUDI CRANES", "DEMAG", "OTHER","NONE"];
    $scope.CraneSystemAndRailsBy = ["ZAMIL STEEL", "OTHERS", "NONE"];
    $scope.CranePowerSupply = ["NONE", "380V 3PH 50HZ", "220V 1PH 50HZ", "380V 3PH 60HZ", "220V 1PH 60HZ"];
    $scope.Operation=["PENDANT","CAB","NONE"];
    $scope.Type = ["TR", "UH", "MR", "SG", "JB", "NONE"];



    ////------------*--------------*********Remarks ****--------------------------------*************---
    $scope.Remarkhistory = [];
    // Delete data
    $scope.removeRemark = function (index) {
        //// Remove first / oldest element from history if it reaches maximum capacity of 10 records
        //if ($scope.Remarkhistory.length === 10)
        //    $scope.Remarkhistory.shift();
        //// Add deleted record to historical records
        //$scope.Remarkhistory.push($scope.building.CraneSystems.Remarks.Remark[index]);
        //// Remove from main records (using index)
        //$scope.building.CraneSystems.Remarks.Remark.splice(index, 1);
        $scope.building.CraneSystems.Remarks.Remark[index].State = "false";
        
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.CraneSystems.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.CraneSystems.Remarks.Remark)
            id = $scope.building.CraneSystems.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.CraneSystems.Remarks.Remark)
            $scope.building.CraneSystems.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.CraneSystems.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.CraneSystems.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.CraneSystems.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.CraneSystems.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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