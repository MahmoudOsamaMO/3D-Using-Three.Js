var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('PowerVentilatorsCtrl', function ($scope, $http,$log) {
       
       
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


    $scope.AccName = "Power Ventilators";
    $scope.AssignTos = ["NSW", "FSW", "LEW", "REW", "Roof"];
    $scope.LocationFroms = ["BOTTOM LEFT", "BOTTOM RIGHT", "CENTER", "TOP LEFT", "TOP RIGHT"];

    $scope.Acchistory = [];
    // Delete data
    $scope.removeAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Acchistory.length === 10)
            $scope.Acchistory.shift();
        // Add deleted record to historical records
        $scope.Acchistory.push($scope.building.Openings.PowerVentilators.PowerVentilator[index]);
        // Remove from main records (using index)
        $scope.building.Openings.PowerVentilators.PowerVentilator.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoAcc = function () {
        $scope.building.Openings.PowerVentilators.PowerVentilator.push($scope.Acchistory[$scope.Acchistory.length - 1]);
        $scope.Acchistory.pop();
    };
    $scope.Accword = "Add";
    $scope.accIndex = 0;

    $scope.myVar = true;
    // Reset new data model
    $scope.ResetAcc = function () {
        $scope.Accword = "Add";
        var id = 1;
        if ($scope.building.Openings.PowerVentilators.PowerVentilator)
            id = $scope.building.Openings.PowerVentilators.PowerVentilator.length + 1;
        $scope.newobj = {
            AssignTo: "NSW",
            FramedOpening: false,
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
        if ($scope.building.Openings.PowerVentilators.PowerVentilator)
            $scope.building.Openings.PowerVentilators.PowerVentilator.push(angular.copy($scope.newobj));
        else
            $scope.building.Openings.PowerVentilators.PowerVentilator = [angular.copy($scope.newobj)];
    };
    $scope.AccUpdate = function (index) {
        $scope.newobj = angular.copy($scope.building.Openings.PowerVentilators.PowerVentilator[index]);
        $scope.accIndex = index;
        $('#AccModal').modal('show');
        $scope.Accword = "Update";
        if ($scope.newobj.Type)
            $scope.showadv = true;
         $scope.PowerSupply =angular.copy( $scope.newobj.PowerSupply);
    };
    $scope.AddUpdateAcc = function () {
        if ($scope.Accword == "Add")
            $scope.AddAcc();
        else if ($scope.Accword == "Update")
            $scope.ModyfyAcc();
    };
    $scope.ModyfyAcc = function () {
        $scope.building.Openings.PowerVentilators.PowerVentilator[$scope.accIndex] = angular.copy($scope.newobj);
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
        if (!$scope.newobj.Type) {
            $scope.newobj.Type = "COLT";
            $scope.newobj.Location = "RIDGE";
            $scope.newobj.Base = "FIBREGLASS";
            $scope.newobj.FramedOpening = false;
            $scope.newobj.PowerSupply = "NONE";
            $scope.PowerSupply = "NONE";

        }

    };

    $scope.Types = ["NONE", "COLT"];
    $scope.Locations = ["RIDGE", "SLOPE", "NONE"];
    $scope.Bases = ["FIBREGLASS", "ALUM WITH ROOF CURB", "NONE"];
    $scope.PowerSupplys = ["220V 1PH 50HZ", "220V 1PH 60HZ", "NONE"];


    $scope.initSup = function () {
        if (!$scope.newobj.PowerSupply) {
            $scope.newobj.PowerSupply = { Voltage: '220V', Phase: '1PH', Hertz: '50HZ' };
            $scope.PowerSupply = '220V 1PH 50HZ';
        }
        else {
            $scope.PowerSupply = $scope.newobj.PowerSupply.Voltage + " " + $scope.newobj.PowerSupply.Phase + " " + $scope.newobj.PowerSupply.Hertz;
        }
    };

    $scope.PowerSupplyChange = function (x) {
        try {
            $scope.splited = x.split(" ");
            $scope.newobj.PowerSupply = { Voltage:"", Phase:"", Hertz:""};
            $scope.newobj.PowerSupply.Voltage = $scope.splited[0];
            $scope.newobj.PowerSupply.Phase = $scope.splited[1];
            $scope.newobj.PowerSupply.Hertz = $scope.splited[2];
        }
        catch (ex) { $scope.newobj.PowerSupply = x; }
    }


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
        $scope.building.Openings.PowerVentilators.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.Openings.PowerVentilators.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.Openings.PowerVentilators.Remarks.Remark)
            id = $scope.building.Openings.PowerVentilators.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.Openings.PowerVentilators.Remarks.Remark)
            $scope.building.Openings.PowerVentilators.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.Openings.PowerVentilators.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.Openings.PowerVentilators.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.Openings.PowerVentilators.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.Openings.PowerVentilators.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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