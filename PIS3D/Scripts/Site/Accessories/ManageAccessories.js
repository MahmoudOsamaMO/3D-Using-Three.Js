var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('LoadCtrl', function ($scope, $http, $log) {


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
    $scope.AssignTos = ["NSW", "FSW", "LEW", "REW", "ROOF"];

    $scope.WallAcc = function () {
        $scope.AccOfSepcificWall = [];
        $.each($scope.building.Openings, function (key, value) {
            GetOpening(key, value);
        });
        console.log($scope.AccOfSepcificWall);
        if ($scope.AssignTo == "NSW")
            $scope.Destination = "FSW";
        if ($scope.AssignTo == "FSW")
            $scope.Destination = "NSW";
        if ($scope.AssignTo == "LEW")
            $scope.Destination = "REW";
        if ($scope.AssignTo == "REW")
            $scope.Destination = "LEW";
        if ($scope.AssignTo == "ROOF")
            $scope.Destination = "ROOF";
        $('input[type=checkbox]').prop('checked', false); //get tr elements of checked inputs
        $scope.Copied = "";
        $scope.SelectedCopied = "";
        $scope.CopiedChecked = "";

    }

    $scope.CopyWall = function () {
        if ($scope.AssignTo != "ROOF") {
            for (var i = 0 ; i < $scope.AccOfSepcificWall.length; i++) {
                if ($scope.AccOfSepcificWall[i].AccName == "FiberglassRoofCurb") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.FiberglassRoofCurbs.FiberglassRoofCurb.length + 1;
                    $scope.building.Openings.FiberglassRoofCurbs.FiberglassRoofCurb.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "FramedOpening") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.FramedOpenings.FramedOpening.length + 1;
                    $scope.building.Openings.FramedOpenings.FramedOpening.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "GravityRidgeVentillator") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.GravityRidgeVentillators.GravityRidgeVentillator.length + 1;
                    $scope.building.Openings.GravityRidgeVentillators.GravityRidgeVentillator.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "Louver") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.Louvers.Louver.length + 1;
                    $scope.building.Openings.Louvers.Louver.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "OpenWall") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.OpenWalls.OpenWall.length + 1;
                    $scope.building.Openings.OpenWalls.OpenWall.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "SB") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.OtherSBO.SBO.length + 1;
                    $scope.building.Openings.OtherSBO.SBO.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "PersonnelDoor") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.PersonnelDoors.PersonnelDoor.length + 1;
                    $scope.building.Openings.PersonnelDoors.PersonnelDoor.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "PipeFlashing") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.PipeFlashings.PipeFlashing.length + 1;
                    $scope.building.Openings.PipeFlashings.PipeFlashing.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "PowerVentilator") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.PowerVentilators.PowerVentilator.length + 1;
                    $scope.building.Openings.PowerVentilators.PowerVentilator.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "RollupDoor") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.RollupDoors.RollupDoor.length + 1;
                    $scope.building.Openings.RollupDoors.RollupDoor.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "SlidingDoor") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.SlidingDoors.SlidingDoor.length + 1;
                    $scope.building.Openings.SlidingDoors.SlidingDoor.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "TranslucentPanel") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.TranslucentPanels.TranslucentPanel.length + 1;
                    $scope.building.Openings.TranslucentPanels.TranslucentPanel.push(acc);
                }
                if ($scope.AccOfSepcificWall[i].AccName == "Window") {
                    var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                    acc.AssignTo = $scope.Destination;
                    acc.ID = $scope.building.Openings.Windows.Window.length + 1;
                    $scope.building.Openings.Windows.Window.push(acc);
                }
            }
        }
        $scope.Copied = "Copied";
    };

    $scope.CopyCheckedBox = function () {
        var trs = $("input:checked").closest("tr"); //get tr elements of checked inputs
        var indexes = $.map(trs, function (tr) { return $(tr).index(); }); //make an array containing the indexes of these tr elements
        for (var index = 0 ; index < indexes.length ; index++)
        {
            var i = indexes[index];
            if ($scope.AssignTo != "ROOF") {
                    if ($scope.AccOfSepcificWall[i].AccName == "FiberglassRoofCurb") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.FiberglassRoofCurbs.FiberglassRoofCurb.length + 1;
                        $scope.building.Openings.FiberglassRoofCurbs.FiberglassRoofCurb.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "FramedOpening") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.FramedOpenings.FramedOpening.length + 1;
                        $scope.building.Openings.FramedOpenings.FramedOpening.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "GravityRidgeVentillator") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.GravityRidgeVentillators.GravityRidgeVentillator.length + 1;
                        $scope.building.Openings.GravityRidgeVentillators.GravityRidgeVentillator.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "Louver") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.Louvers.Louver.length + 1;
                        $scope.building.Openings.Louvers.Louver.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "OpenWall") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.OpenWalls.OpenWall.length + 1;
                        $scope.building.Openings.OpenWalls.OpenWall.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "SB") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.OtherSBO.SBO.length + 1;
                        $scope.building.Openings.OtherSBO.SBO.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "PersonnelDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.PersonnelDoors.PersonnelDoor.length + 1;
                        $scope.building.Openings.PersonnelDoors.PersonnelDoor.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "PipeFlashing") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.PipeFlashings.PipeFlashing.length + 1;
                        $scope.building.Openings.PipeFlashings.PipeFlashing.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "PowerVentilator") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.PowerVentilators.PowerVentilator.length + 1;
                        $scope.building.Openings.PowerVentilators.PowerVentilator.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "RollupDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.RollupDoors.RollupDoor.length + 1;
                        $scope.building.Openings.RollupDoors.RollupDoor.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "SlidingDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.SlidingDoors.SlidingDoor.length + 1;
                        $scope.building.Openings.SlidingDoors.SlidingDoor.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "TranslucentPanel") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.TranslucentPanels.TranslucentPanel.length + 1;
                        $scope.building.Openings.TranslucentPanels.TranslucentPanel.push(acc);
                    }
                    if ($scope.AccOfSepcificWall[i].AccName == "Window") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.Windows.Window.length + 1;
                        $scope.building.Openings.Windows.Window.push(acc);
                    }
            }

        }
        $scope.CopiedChecked = "Copied";
        //console.log(indexes);
    };

    function GetOpening(key, value) {
        var str = key;
        str = str.substring(0, str.length - 1);
        var AccName = str;
        var AccObj = ObjByString(value, AccName);

        if (AccObj) {
            for (var O = 0; O < AccObj.length; O++) {
                if (AccObj[O].AssignTo == $scope.AssignTo)
                    $scope.AccOfSepcificWall.push({ AccName: AccName, AccObj: AccObj[O] });
            }
        }
    };

    function ObjByString(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
    //$scope.AssignTo = "NSW";

    $scope.CopySelected = function () {
        if ($scope.AssignTo != "ROOF") {
            for (var i = 0 ; i < $scope.AccOfSepcificWall.length; i++) {
                if ($scope.Framed)
                    if ($scope.AccOfSepcificWall[i].AccName == "FramedOpening") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.FramedOpenings.FramedOpening.length + 1;
                        $scope.building.Openings.FramedOpenings.FramedOpening.push(acc);
                    }
                if ($scope.OpenWalls)
                    if ($scope.AccOfSepcificWall[i].AccName == "OpenWall") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.OpenWalls.OpenWall.length + 1;
                        $scope.building.Openings.OpenWalls.OpenWall.push(acc);
                    }
                if ($scope.Personal)
                    if ($scope.AccOfSepcificWall[i].AccName == "PersonnelDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.PersonnelDoors.PersonnelDoor.length + 1;
                        $scope.building.Openings.PersonnelDoors.PersonnelDoor.push(acc);
                    }
                if ($scope.RollUp)
                    if ($scope.AccOfSepcificWall[i].AccName == "RollupDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.RollupDoors.RollupDoor.length + 1;
                        $scope.building.Openings.RollupDoors.RollupDoor.push(acc);
                    }
                if ($scope.Sliding)
                    if ($scope.AccOfSepcificWall[i].AccName == "SlidingDoor") {
                        var acc = angular.copy($scope.AccOfSepcificWall[i].AccObj)
                        acc.AssignTo = $scope.Destination;
                        acc.ID = $scope.building.Openings.SlidingDoors.SlidingDoor.length + 1;
                        $scope.building.Openings.SlidingDoors.SlidingDoor.push(acc);
                    }
            }
        }


        $scope.SelectedCopied = "Selected Copied";
    }

});

