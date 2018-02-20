
//document.getElementById("submit").onclick = function () {
//    document.getElementById("panel").className = "panel panel-success";

//};
//var building;

var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('validateCtrl', function ($scope, $http,$log) {

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




    $scope.Loading = true;

    $('#panel').keyup(function () {
        //$(this).val() // get the current value of the input field.
        document.getElementById("panel").className = "panel panel-primary";
    });
    $('#panel').mousedown(function () {
        //$(this).val() // get the current value of the input field.
        document.getElementById("panel").className = "panel panel-primary";
    });
    $scope.building = {};
    $scope.WidthReference = {};
    $http({
        method: "GET",
        url: "/PISUser/GetWidthReference"
    }).then(function mySucces(response) {
        $scope.WidthReference = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.LengthReference = {};
    $http({
        method: "GET",
        url: "/PISUser/GetLengthReference"
    }).then(function mySucces(response) {
        $scope.LengthReference = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.HeightReference = {};
    $http({
        method: "GET",
        url: "/PISUser/GetHeightReference"
    }).then(function mySucces(response) {
        $scope.HeightReference = response.data;
    }, function myError(response) {
        //alert("error");
    });

    $scope.FrameType = {};
    $http({
        method: "GET",
        url: "/PISUser/GetFrameType"
    }).then(function mySucces(response) {
        $scope.FrameType = response.data;
    }, function myError(response) {
        //alert("error");
    });

    var buildingvar = {};
    //Get BuildgArea From seesion 
    $http({
        method: "GET",
        url: "/Home/Getjson"
    }).then(function mySucces(response) {
        console.log(response.data);
        buildingvar = response.data;
        $scope.building = buildingvar;
        $scope.Loading = false;
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


    $scope.GetBaysProfile = function () {
        var bayprofile = "";
        var frameprofile = "";
        var bayprofile2 = "";
        var frameprofile2 = "";
        try {
            var bays = $scope.building.GeneralData.Bays.Bay;
            for (var u = 0 ; u < bays.length ; u++) {
                bayprofile += "1@" + bays[u].Width + ",";
            }
            if (bayprofile.length > 0) {
                bayprofile = bayprofile.substring(0, bayprofile.length - 1);
                bayprofile = bayprofile.trim();
                for (var i = 0; i < bayprofile.split(',').length; i++) {
                    var part = bayprofile.split(',')[i].trim();
                    var count = 1;
                    for (var j = i + 1; j < bayprofile.split(',').length; j++) {
                        if (bayprofile.split(',')[j].trim() == part) {
                            count++;
                            i++;
                        }
                        else {
                            break;
                        }
                    }
                    bayprofile2 += count + "@" + part.substr(part.indexOf("@", 1) + 1, part.length) + ",";
                }
                bayprofile2 = bayprofile2.substring(0, bayprofile2.length - 1);
            }
            $scope.building.GeneralData.BaysProfile = bayprofile2;
            return bayprofile2;
        }
        catch (e) { }
    };



    ////// **************************** Loaction **********************************************
    //Fill Data AlongBuildingWidth **********************************
    $scope.FillData = function () {
        $http({
            method: "POST",
            url: "/Home/GetAxes",
            contentType: "application/json; charset=utf-8",
            data: { s: $scope.building.GeneralData.Location.AlongBuildingWidth.FromGL, e: $scope.building.GeneralData.Location.AlongBuildingWidth.ToGL }
        }).then(function mySucces(response) {
            if (response.data) {
                $scope.building.GeneralData.Location.AlongBuildingWidth.Axes = response.data;
            }
        }, function myError(response) {
            //alert("error");
        });
    };
    /// Edit Fill AlongBuildingWidth
    $scope.array = {};
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) { return; }
        if ($scope.array.indexOf($scope.addMe) == -1) {
            $scope.array.push($scope.addMe);
        } else {
            $scope.errortext = "The item is already in your Axes list.";
        }
    };
    $scope.removeItem = function (x) {
        //$scope.array = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes.split(',');
        $scope.errortext = "";
        $scope.array.splice(x, 1);
    };
    //btn confirm add axes
    $scope.ConfirmData = function () {
        $scope.building.GeneralData.Location.AlongBuildingWidth.Axes = $scope.array.toString();
    };
    //Begin Editing
    $scope.EditAxes = function () {
        $scope.array = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes.split(',');
    };

    //Fill Data AlongBuildingLength ******************************
    $scope.FillData2 = function () {
        $http({
            method: "POST",
            url: "/Home/GetAxes",
            contentType: "application/json; charset=utf-8",
            data: { s: $scope.building.GeneralData.Location.AlongBuildingLength.FromGL, e: $scope.building.GeneralData.Location.AlongBuildingLength.ToGL }
        }).then(function mySucces(response) {
            if (response.data) {
                $scope.building.GeneralData.Location.AlongBuildingLength.Axes = response.data;
            }
        }, function myError(response) {
            //alert("error");
        });
    };
    /// Edit Fill AlongBuildingLength
    $scope.array2 = {};
    $scope.addItem2 = function () {
        $scope.errortext = "";
        if (!$scope.addMe2) { return; }
        if ($scope.array2.indexOf($scope.addMe2) == -1) {
            $scope.array2.push($scope.addMe2);
        } else {
            $scope.errortext = "The item is already in your Axes list.";
        }
    };
    $scope.removeItem2 = function (x) {
        //$scope.array = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes.split(',');
        $scope.errortext = "";
        $scope.array2.splice(x, 1);
    };

    //btn confirm add axes
    $scope.ConfirmData2 = function () {
        $scope.building.GeneralData.Location.AlongBuildingLength.Axes = $scope.array2.toString();
    };
    //Begin Editing
    $scope.EditAxes2 = function () {
        $scope.array2 = $scope.building.GeneralData.Location.AlongBuildingLength.Axes.split(',');
    };
    // ******************************************* End Location ************************************



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
        $scope.building.GeneralData.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.GeneralData.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.GeneralData.Remarks.Remark)
            id = $scope.building.GeneralData.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.GeneralData.Remarks.Remark)
            $scope.building.GeneralData.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.GeneralData.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.GeneralData.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.GeneralData.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.GeneralData.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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


// ********************************** Geometry ************************************************
app.controller('GeometryCtrl', function ($scope, $http) {
    //****BAYS 
    $scope.Bayhistory = [];
    $scope.Framehistory = [];
    // Delete data
    $scope.removeBay = function (index) {
        if (index == 0) {
            alert("Can't Delete This")
            return;
        }
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Bayhistory.length === 10)
            $scope.Bayhistory.shift();
        // Add deleted record to historical records
        $scope.Bayhistory.push($scope.building.GeneralData.Bays.Bay[index]);
        // Remove from main records (using index)
        $scope.building.GeneralData.Bays.Bay.splice(index, 1);

        if ($scope.Framehistory.length === 10)
            $scope.Framehistory.shift();
        // Add deleted record to historical records
        $scope.Framehistory.push($scope.building.GeneralData.Frames.FrameProfile[index + 1]);
        // Remove from main records (using index)
        $scope.building.GeneralData.Frames.FrameProfile.splice(index + 1, 1);

        $scope.building.GeneralData.Length = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
            $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
        };
    };
    // Undo action (delete)
    $scope.UndoBay = function () {
        // Check if there is same object or not 
        if ($scope.CheckObj($scope.Bayhistory[$scope.Bayhistory.length - 1], $scope.building.GeneralData.Bays.Bay))
            return;
        // Add last / most recent historical record to the main records
        $scope.Bayhistory[$scope.Bayhistory.length - 1].ID = parseFloat($scope.building.GeneralData.Bays.Bay[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
        $scope.building.GeneralData.Bays.Bay.push($scope.Bayhistory[$scope.Bayhistory.length - 1]);
        // Remove last / most recent historical record
        $scope.Bayhistory.pop();

        $scope.Framehistory[$scope.Framehistory.length - 1].ID = parseFloat($scope.building.GeneralData.Frames.FrameProfile[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
        $scope.building.GeneralData.Frames.FrameProfile.push($scope.Framehistory[$scope.Framehistory.length - 1]);
        // Remove last / most recent historical record
        $scope.Framehistory.pop();

        $scope.building.GeneralData.Length = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
            $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
        };
    };
    // Reset new data model
    $scope.ResetBay = function () {
        $scope.BayNewID = parseFloat($scope.building.GeneralData.Bays.Bay[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
        $scope.BayNewWidth = 8;
        $scope.BayNewBracingAvailable = true;
        $scope.Bayquantity = 1;
        //$scope.BayRepeater.hide().html(data).fadeIn('fast');
        //$('.FrameRepeater').hide().html(data).fadeIn('fast');

    }
    //$scope.ResetBay();

    // Add new data
    $scope.AddBay = function () {
        // Do nothing if no state is entered (blank)
        if ($scope.Bayquantity == 1) {
            if (!$scope.BayNewWidth)
                return;
            $scope.newobj = {
                Width: $scope.BayNewWidth,
                ID: $scope.BayNewID,
                BracingAvailable: $scope.BayNewBracingAvailable,
            };
            if ($scope.CheckObj($scope.newobj, $scope.building.GeneralData.Bays.Bay))
                return;
            // Add to main records
            $scope.building.GeneralData.Bays.Bay.push({
                Width: $scope.BayNewWidth,
                ID: $scope.BayNewID,
                BracingAvailable: $scope.BayNewBracingAvailable,
            });
            $scope.building.GeneralData.Length = 0;
            for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
                $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
            };

            $scope.frame = { ID: $scope.BayNewID + 1, ProfileNo: "1" };
            $scope.building.GeneralData.Frames.FrameProfile.push($scope.frame);
            $scope.FrameOrder = 'ID';

            // See $Scope.Reset...
            //$scope.ResetBay();
            //$scope.BayOrder = "ID";
        }
        else if ($scope.Bayquantity > 1) {
            for (var n = 0 ; n < $scope.Bayquantity; n++) {
                $scope.newobj = {
                    Width: $scope.BayNewWidth,
                    ID: $scope.BayNewID,
                    BracingAvailable: $scope.BayNewBracingAvailable,
                };
                if ($scope.CheckObj($scope.newobj, $scope.building.GeneralData.Bays.Bay))
                    return;
                // Add to main records
                $scope.building.GeneralData.Bays.Bay.push({
                    Width: $scope.BayNewWidth,
                    ID: $scope.BayNewID,
                    BracingAvailable: $scope.BayNewBracingAvailable,
                });
                $scope.building.GeneralData.Length = 0;
                for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
                    $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
                };
                $scope.frame = { ID: $scope.BayNewID + 1, ProfileNo: "1" };
                $scope.building.GeneralData.Frames.FrameProfile.push($scope.frame);
                $scope.FrameOrder = 'ID';
                $scope.BayNewID = parseFloat($scope.building.GeneralData.Bays.Bay[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
                //$scope.ResetBay();
            }
        }
    };

    // Check Obj is on list or not 
    $scope.CheckObj = function containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj)
            { return true; }
        }
        return false;
    }
    //Edit Bay 
    $scope.EditBay = function (index) {
        $scope.building.GeneralData.Bays.Bay[index];
        $scope.building.GeneralData.Bays.Bay.push({
            Width: $scope.BayNewWidth,
            ID: $scope.BayNewID,
            BracingAvailable: $scope.BayNewBracingAvailable,
        });
    }

    $scope.editingData = {};
    $scope.BAYmodify = function (x) {
        for (var i = 0, length = $scope.building.GeneralData.Bays.Bay.length; i < length; i++) {
            $scope.editingData[$scope.building.GeneralData.Bays.Bay[i].ID] = false;
        }
        $scope.editingData[x.ID] = true;
        $scope.building.GeneralData.Length = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
            $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
        };
    };
    $scope.updateBay = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            for (var i = 0, length = $scope.building.GeneralData.Bays.Bay.length; i < length; i++) {
                $scope.editingData[$scope.building.GeneralData.Bays.Bay[i].ID] = false;
            }
        }
        $scope.building.GeneralData.Length = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Bays.Bay.length ; i++) {
            $scope.building.GeneralData.Length += parseFloat($scope.building.GeneralData.Bays.Bay[i].Width);
        };
    };


    // ***************Frames 
    $scope.editingFrameData = {};
    $scope.updateFrame = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            for (var i = 0, length = $scope.building.GeneralData.Frames.FrameProfile.length; i < length; i++) {
                $scope.editingFrameData[$scope.building.GeneralData.Frames.FrameProfile[i].ID] = false;
            }
        }
    };
    $scope.Framemodify = function (x) {
        for (var i = 0, length = $scope.building.GeneralData.Frames.FrameProfile.length; i < length; i++) {
            $scope.editingFrameData[$scope.building.GeneralData.Frames.FrameProfile[i].ID] = false;
        }
        $scope.editingFrameData[x.ID] = true;
    };
    $scope.FrameOrder = "ID";
    //************End Frames 

    // ************************************End Bays ********************************************************


    //***************************************Gables *******************************************************
    $scope.Gablehistory = [];
    // Delete data
    $scope.removeGable = function (index) {
        if (index == 0) {
            alert("Can't Delete This")
            return;
        }
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Gablehistory.length === 10)
            $scope.Gablehistory.shift();
        // Add deleted record to historical records
        $scope.Gablehistory.push($scope.building.GeneralData.Gables.Gable[index]);

        // Remove from main records (using index)
        $scope.building.GeneralData.Gables.Gable.splice(index, 1);
        $scope.building.GeneralData.Width = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Gables.Gable.length ; i++) {
            $scope.building.GeneralData.Width += $scope.building.GeneralData.Gables.Gable[i].Width;
        };
    };
    // Undo action (delete)
    $scope.UndoGable = function () {
        // Check if there is same object or not 
        if ($scope.CheckObj($scope.Gablehistory[$scope.Gablehistory.length - 1], $scope.building.GeneralData.Gables.Gable))
            return;
        // Add last / most recent historical record to the main records
        $scope.Gablehistory[$scope.Gablehistory.length - 1].ID = parseFloat($scope.building.GeneralData.Gables.Gable[$scope.building.GeneralData.Gables.Gable.length - 1].ID) + 1;
        $scope.building.GeneralData.Gables.Gable.push($scope.Gablehistory[$scope.Gablehistory.length - 1]);

        $scope.building.GeneralData.Width = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Gables.Gable.length ; i++) {
            $scope.building.GeneralData.Width += $scope.building.GeneralData.Gables.Gable[i].Width;
        };
        // Remove last / most recent historical record
        $scope.Gablehistory.pop();
    };
    // Reset new data model
    $scope.ResetGable = function () {
        $scope.GableNewID = parseFloat($scope.building.GeneralData.Gables.Gable[$scope.building.GeneralData.Gables.Gable.length - 1].ID) + 1;
        $scope.GableNewWidth = 20;
        $scope.GableNewLeftColBase = 0;
        $scope.GableNewLeftHeight = 6;
        $scope.GableNewLeftSlope = 1;
        $scope.GableNewRidgeDistance = 10;
        $scope.GableNewRightColBase = 0;
        $scope.GableNewRightHeight = 6;
        $scope.GableNewFarSideDownspouts = "NONE";
        $scope.GableNewFarSide = "NO EAVE";
        $scope.GableNewNearSideDownspouts = "NONE";
        $scope.GableNewNearSide = "NO EAVE";
        $scope.GableRepeater.hide().html(data).fadeIn('fast');
    }
    //$scope.ResetGable();

    // Add new data
    $scope.AddGable = function () {
        // Do nothing if no state is entered (blank)
        if (!$scope.GableNewWidth)
            return;
        $scope.newobj = {
            Width: $scope.GableNewWidth,
            ID: $scope.GableNewID,
            BracingAvailable: $scope.GableNewBracingAvailable,
        };
        if ($scope.CheckObj($scope.newobj, $scope.building.GeneralData.Gables.Gable))
            return;
        // Add to main records
        $scope.EaveconNear = {
            FarSide: { Downspouts: $scope.GableNewFarSideDownspouts, EaveConditionEnum: $scope.GableNewFarSide },
            NearSide: { Downspouts: $scope.GableNewNearSideDownspouts, EaveConditionEnum: $scope.GableNewNearSide }
        };
        $scope.building.GeneralData.Gables.Gable.push({
            Width: $scope.GableNewWidth,
            ID: $scope.GableNewID,
            LeftColBase: $scope.GableNewLeftColBase,
            LeftHeight: $scope.GableNewLeftHeight,
            LeftSlope: $scope.GableNewLeftSlope,
            RidgeDistance: $scope.GableNewRidgeDistance,
            RightColBase: $scope.GableNewRightColBase,
            RightHeight: $scope.GableNewRightHeight,
            RightSlope: -1 * $scope.GableNewLeftSlope,
            EaveCondition: $scope.EaveconNear
        });
        // Add Gable On Profile 
        for (var i = 0 ; i < $scope.building.GeneralData.Profiles.Profile.length; i++) {
            $scope.building.GeneralData.Profiles.Profile[i].GablesWidthModules.GableWidthModules.push({
                "GableNo": [$scope.GableNewID],
                "WidthModules": [{ "Width": [$scope.GableNewWidth] }]
            });
        }
        //
        //**Add Gable to LEW and REW 
        $scope.building.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules.push({
            "GableNo": [$scope.GableNewID],
            "WidthModules": [{ "Width": [$scope.GableNewWidth] }]
        });
        $scope.building.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules.push({
            "GableNo": [$scope.GableNewID],
            "WidthModules": [{ "Width": [$scope.GableNewWidth] }]
        });
        //End LEW REW
        $scope.building.GeneralData.Width = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Gables.Gable.length ; i++) {
            $scope.building.GeneralData.Width += $scope.building.GeneralData.Gables.Gable[i].Width;
        };
        // See $Scope.Reset...
        $scope.ResetGable();
        $scope.GableOrder = "ID"
    }
    // Check Obj is on list or not 
    $scope.CheckObj = function containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj)
            { return true; }
        }
        return false;
    }
    //Edit Gable 
    $scope.EditGable = function (index) {
        $scope.building.GeneralData.Gables.Gable[index];
        $scope.building.GeneralData.Gables.Gable.push({

        });
    }

    $scope.editingGableData = {};
    $scope.Gablemodify = function (x) {
        for (var i = 0, length = $scope.building.GeneralData.Gables.Gable.length; i < length; i++) {
            $scope.editingGableData[$scope.building.GeneralData.Gables.Gable[i].ID] = false;
        }
        $scope.editingGableData[x.ID] = true;

        $scope.building.GeneralData.Width = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Gables.Gable.length ; i++) {
            $scope.building.GeneralData.Width += $scope.building.GeneralData.Gables.Gable[i].Width;
        };
    };
    $scope.updateGable = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            for (var i = 0, length = $scope.building.GeneralData.Gables.Gable.length; i < length; i++) {
                $scope.editingGableData[$scope.building.GeneralData.Gables.Gable[i].ID] = false;
            }
        }
        $scope.building.GeneralData.Width = 0;
        for (var i = 0 ; i < $scope.building.GeneralData.Gables.Gable.length ; i++) {
            $scope.building.GeneralData.Width += $scope.building.GeneralData.Gables.Gable[i].Width;
        };
    };

    //Get Eave Condition
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
    // *****************************************End Gables ********************************************


    // ***************************************** Profiles ********************************************

    /// Edit Fill AlongBuildingLength
    $scope.ProfileArr = {};
    $scope.addProfileArr = function () {
        $scope.errortext = "";
        if (!$scope.addMeProfile) { return; }
        for (var n = 0; n < $scope.QuantityProfile ; n++) {

            $scope.ProfileArr.push($scope.addMeProfile);
        }
    };
    $scope.removeProfile = function (x) {
        //$scope.array = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes.split(',');
        $scope.errortext = "";
        $scope.ProfileArr.splice(x, 1);
    };

    //btn confirm add axes
    $scope.ConfirmProfile = function (value) {
        var sum = $scope.building.GeneralData.Gables.Gable[$scope.gN - 1].Width;
        var total = 0;
        for (count = 0; count < value.length; count++) {
            total += parseFloat(value[count]);
        }
        if (total === sum) {
            $scope.building.GeneralData.Profiles.Profile[$scope.PID - 1].GablesWidthModules.GableWidthModules[$scope.gN - 1].WidthModules[0].Width = $scope.ProfileArr;
        }
        else {
            $scope.errortext = "Dosen't Match with Gable Width  ";
        }
    };
    $scope.PID = 0;
    $scope.gN = 1;
    //Begin Editing
    $scope.EditWidth = function (value, ID, gn) {
        $scope.ProfileArr = angular.copy(value);
        $scope.addMeProfile = '';
        $scope.errortext = "";
        $scope.PID = ID;
        $scope.gN = gn;
        $scope.QuantityProfile = 1;
    };
    $scope.ProfileArrSum = function (value) {
        var total = 0;
        for (count = 0; count < value.length; count++) {
            total += parseFloat(value[count]);
        }
        return total;
    };
    $scope.GableWidthProfile = function () {
        try {
            return $scope.building.GeneralData.Gables.Gable[$scope.gN - 1].Width;
        }
        catch (e) { }
    }
    $scope.Profilehistory = [];
    $scope.RemoveProfile = function (index) {
        if (index == 0) {
            alert("Can't Delete This")
            return;
        }
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.Profilehistory.length === 10)
            $scope.Profilehistory.shift();
        // Add deleted record to historical records
        $scope.Profilehistory.push($scope.building.GeneralData.Profiles.Profile[index]);
        // Remove from main records (using index)
        $scope.building.GeneralData.Profiles.Profile.splice(index, 1);
    }

    $scope.UndoProfile = function () {
        // Check if there is same object or not 
        if ($scope.CheckObj($scope.Profilehistory[$scope.Profilehistory.length - 1], $scope.building.GeneralData.Profiles.Profile))
            return;
        // Add last / most recent historical record to the main records
        $scope.Profilehistory[$scope.Profilehistory.length - 1].ID = parseFloat($scope.building.GeneralData.Profiles.Profile[$scope.building.GeneralData.Profiles.Profile.length - 1].ID) + 1;
        $scope.building.GeneralData.Profiles.Profile.push($scope.Profilehistory[$scope.Profilehistory.length - 1]);
        $scope.Profilehistory.pop();
    }

    $scope.AddProfile = function () {
        var jsonArr = [];
        for (var i = 0; i < $scope.building.GeneralData.Gables.Gable.length; i++) {
            jsonArr.push({
                "GableNo": [$scope.building.GeneralData.Gables.Gable[i].ID],
                "WidthModules": [{ "Width": [$scope.building.GeneralData.Gables.Gable[i].Width] }]
            });
        };
        $scope.NewGablesWidthModules = {
            GableWidthModules: jsonArr
        }
        $scope.newProfile = {
            ID: parseFloat($scope.building.GeneralData.Profiles.Profile[$scope.building.GeneralData.Profiles.Profile.length - 1].ID) + 1,
            GablesWidthModules: $scope.NewGablesWidthModules,
        };
        $scope.building.GeneralData.Profiles.Profile.push($scope.newProfile);
    }
    // *****************************************End Profiles ********************************************

});
// ********************************** End Geometry ************************************************



// ********************************** EndWalls ************************************************
app.controller('EndWallsCtrl', function ($scope, $http) {
    //Get EndWalls Type
    $scope.EndWallsType = {};
    $http({
        method: "GET",
        url: "/PISUser/GetEndWallsType"
    }).then(function mySucces(response) {
        $scope.EndWallsType = response.data;
    }, function myError(response) {
        alert("error");
    });

    $scope.gNEW = 1;
    $scope.WallType = "";
    $scope.EWArr = {};

    $scope.addEW = function () {
        $scope.errortext = "";
        if (!$scope.addMeEW) { return; }
        for (var n = 0; n < $scope.QuantityEW ; n++) {
            $scope.EWArr.push($scope.addMeEW);
        }
    };
    $scope.removeEW = function (x) {
        //$scope.array = $scope.building.GeneralData.Location.AlongBuildingWidth.Axes.split(',');
        $scope.errortextEW = "";
        $scope.EWArr.splice(x, 1);
    };
    $scope.EditWidthEW = function (value, gn, wall) {
        $scope.EWArr = angular.copy(value);
        $scope.addMeEW = '';
        $scope.errortextEW = "";
        $scope.gNEW = gn;
        $scope.WallType = wall;
        $scope.QuantityEW = 1;
    };
    $scope.EWArrSum = function (value) {
        var total = 0;
        for (count = 0; count < value.length; count++) {
            total += parseFloat(value[count]);
        }
        return total;
    };
    $scope.GableWidthEw = function () {
        try {
            return $scope.building.GeneralData.Gables.Gable[$scope.gNEW - 1].Width;
        }
        catch (e) { }
    };

    $scope.ConfirmEW = function (value) {
        var sum = $scope.building.GeneralData.Gables.Gable[$scope.gNEW - 1].Width;
        var total = 0;
        for (count = 0; count < value.length; count++) {
            total += parseFloat(value[count]);
        }
        if (total === sum) {
            if ($scope.WallType == "LEW")
                $scope.building.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[$scope.gNEW - 1].WidthModules[0].Width = $scope.EWArr;
            else if ($scope.WallType == "REW")
                $scope.building.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[$scope.gNEW - 1].WidthModules[0].Width = $scope.EWArr;

        }
        else {
            $scope.errortextEW = "Dosen't Match with Gable Width  ";
        }
    };

    $scope.SameAs = function (wall) {
        if (wall == "LEW")
            $scope.building.GeneralData.EndWalls.REW.Profile = angular.copy($scope.building.GeneralData.EndWalls.LEW.Profile);
        else if (wall == "REW")
            $scope.building.GeneralData.EndWalls.LEW.Profile = angular.copy($scope.building.GeneralData.EndWalls.REW.Profile);

    };

});
// ********************************** End EndWalls ************************************************


// ********************************** Remarks ************************************************
app.controller('RemarksCtrl', ['$scope', function ($scope, $http) {
    $scope.content = 'llll';
    $scope.htmlContent = "";
    $scope.ChangehtmlContent = function () {
        try {
            var xmlDoc = $scope.building.GeneralData.Remarks.Remark[0].Remark;
            var x = xmlDoc.getElementsByTagName('Paragraph')[0].childNodes[0].nodeValue;
            $scope.htmlContent = x;
        }
        catch (e) { }
    };

    $scope.SaveHTMl = function () {
        try {
            var x;
            x = $scope.htmlContent;
        }
        catch (e) { }
    };
}]);