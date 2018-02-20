var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('LoadCtrl', function ($scope, $http,$log) {
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


    $scope.WindExposure = {};
    $http({
        method: "GET",
        url: "/PISUser/GetWindExposure"
    }).then(function mySucces(response) {
        $scope.WindExposure = response.data;
    }, function myError(response) {
        //alert("error");
    });


    $scope.WindSpeedEnum = {};
    $http({
        method: "GET",
        url: "/PISUser/GetWindSpeedEnum"
    }).then(function mySucces(response) {
        $scope.WindSpeedEnum = response.data;
    }, function myError(response) {
        //alert("error");
    });


    $scope.DesignCodes = {};
    $http({
        method: "GET",
        url: "/PISUser/GetDesignCodes"
    }).then(function mySucces(response) {
        $scope.DesignCodes = response.data;
    }, function myError(response) {
        //alert("error");
    });


    $scope.ApplyLoadsPer = {};
    $http({
        method: "GET",
        url: "/PISUser/GetApplyLoadsPer"
    }).then(function mySucces(response) {
        $scope.ApplyLoadsPer = response.data;
    }, function myError(response) {
        //alert("error");
    });


    $scope.ColdFormedDesignCodes = {};
    $http({
        method: "GET",
        url: "/PISUser/GetColdFormedDesignCodes"
    }).then(function mySucces(response) {
        $scope.ColdFormedDesignCodes = response.data;
    }, function myError(response) {
        //alert("error");
    });


    $scope.Seismic = {};
    $http({
        method: "GET",
        url: "/PISUser/GetSeismic"
    }).then(function mySucces(response) {
        $scope.Seismic = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.myVarfun = function () {
        try {
            var wind = $scope.building.DesignCode.Wind;
            if ($scope.building.DesignCode.Wind.WindSpeed) {
                $scope.myVar = true;
                $scope.building.DesignCode.Wind = wind;
            }
            else {
                $scope.myVar = false;
                $scope.building.DesignCode.Wind = wind;
            }
        }
        catch (e) { }
    };

    $scope.logSpeed = function () {
        try {
            var wind = $scope.building.DesignCode.Wind;
            if ($scope.building.DesignCode.Wind.WindSpeed) {
                $scope.myVar = true;
                $scope.building.DesignCode.Wind = wind;
            }
            else {
                $scope.myVar = false;
                $scope.building.DesignCode.Wind = wind;
            }
        }
        catch (e) { }
        var expose = $scope.building.DesignCode.Wind.WindExposure;
        $scope.building.DesignCode.Wind = {
            WindExposure: expose,
            WindSpeed: 137,
            WindSpeedEnum: "3 SECOND GUST SPEED"
        }
    };

    $scope.logPressure = function () {
            try {
            var wind = $scope.building.DesignCode.Wind;
            if ($scope.building.DesignCode.Wind.WindSpeed) {
                $scope.myVar = true;
                $scope.building.DesignCode.Wind = wind;
            }
            else {
                $scope.myVar = false;
                $scope.building.DesignCode.Wind = wind;
            }
        }
        catch (e) { }
        var expose = $scope.building.DesignCode.Wind.WindExposure;
        $scope.building.DesignCode.Wind = {
            WindExposure: expose,
            WindPressure: 0.70,
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
        //$scope.Remarkhistory.push($scope.building.DesignCode.Remarks.Remark[index]);
        //// Remove from main records (using index)
        //$scope.building.DesignCode.Remarks.Remark.splice(index, 1);
        $scope.building.DesignCode.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.DesignCode.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.DesignCode.Remarks.Remark)
            id = $scope.building.DesignCode.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.DesignCode.Remarks.Remark)
            $scope.building.DesignCode.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.DesignCode.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.DesignCode.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.DesignCode.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.DesignCode.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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