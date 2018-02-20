
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


        $('#panel').keyup(function () {
            //$(this).val() // get the current value of the input field.
            document.getElementById("panel").className = "panel panel-primary";
        });
        $('#panel').mousedown(function () {
            //$(this).val() // get the current value of the input field.
            document.getElementById("panel").className = "panel panel-primary";
        });
                
        $scope.building = {};
        $scope.WidthReference = [
            "OUT TO OUT OF STEEL LINE (O/O OF EAVE STRUTS)",
            "OUT TO OUT OF COLUMN FLANGES",
            "CENTERLINE TO CENTERLINE OF COLUMN BASES",
            "INSIDE TO INSIDE OF COLUMN INNER FLANGES AT KNEES",
            "OUT TO OUT OF BLOCK WALLS",
            "OTHER (See Remarks)",
        ];
        $scope.LengthReference = [
            "OUT TO OUT OF STEEL LINE (O/O ENDWALL GIRTS)",
            "OUT TO OUT OF COLUMN FLANGES",
            "CENTERLINE TO CENTERLINE OF COLUMN BASES",
            "INSIDE TO INSIDE OF ENDWALL COLUMN INNER FLANGES AT KNEES",
            "OTHER (See Remarks)"
        ];
        $scope.HeightReference = [
            "EAVE HEIGHT",
            "CLEAR HEIGHT", "RIDGE HEIGHT", "OTHER (See Remarks)"
        ];
        $scope.FrameType = ["CLEAR SPAN", "MULTI SPAN", "LEAN TO", "MULTI GABLE",
            "ROOF SYSTEM", "FLAT ROOF", "SINGLE SLOPE", "CAR CANOPY: FALCON",
            "CAR CANOPY: BUTTERFLY", "CAR CANOPY: CARACAL", "CAR CANOPY: CHEETAH",
            "CAR CANOPY: GAZELLE", "OTHER (See Remarks)"
        ];

        //Get BuildgArea From seesion 
        $http({
            method: "GET",
            url: "/Home/Getjson"
        }).then(function mySucces(response) {
            console.log(response.data);
            $scope.building = response.data;
            $scope.ID = $scope.building.GeneralData.ID;
        }, function myError(response) {
            alert("error");
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
                alert("error");
            });
        }


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
                alert("error");
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
                alert("error");
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




        // ********************************** Geometry ************************************************
        //****BAYS 
        $scope.Bayhistory = [];
        // Delete data
        $scope.removeBay = function (index) {
            // Remove first / oldest element from history if it reaches maximum capacity of 10 records
            if ($scope.Bayhistory.length === 10)
                $scope.Bayhistory.shift();
            // Add deleted record to historical records
            $scope.Bayhistory.push($scope.building.GeneralData.Bays.Bay[index]);

            // Remove from main records (using index)
            $scope.building.GeneralData.Bays.Bay.splice(index, 1);
        };
        // Undo action (delete)
        $scope.UndoBay = function () {
            // Check if there is same object or not 
            if ($scope.CheckObj($scope.Bayhistory[$scope.Bayhistory.length - 1], $scope.building.GeneralData.Bays.Bay))
                return;
            // Add last / most recent historical record to the main records
            $scope.Bayhistory[$scope.Bayhistory.length - 1].ID = parseInt($scope.building.GeneralData.Bays.Bay[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
            $scope.building.GeneralData.Bays.Bay.push($scope.Bayhistory[$scope.Bayhistory.length - 1]);

            // Remove last / most recent historical record
            $scope.Bayhistory.pop();
        };

        // Reset new data model
        $scope.ResetBay = function () {
            $scope.BayNewID = parseInt($scope.building.GeneralData.Bays.Bay[$scope.building.GeneralData.Bays.Bay.length - 1].ID) + 1;
            $scope.BayNewWidth = 8;
            $scope.BayNewBracingAvailable = true;
        }
        //$scope.ResetBay();

        // Add new data
        $scope.AddBay = function () {
            // Do nothing if no state is entered (blank)
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

            // See $Scope.Reset...
            $scope.ResetBay();
        }
        // Check Obj is on list or not 
        $scope.CheckObj = function containsObject(obj, list) {
            var x;
            for (x in list) {
                if (list.hasOwnProperty(x) && list[x] === obj) 
                   {return true;}
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
        $scope.modify = function (x) {
            for (var i = 0, length = $scope.building.GeneralData.Bays.Bay.length; i < length; i++) {
                $scope.editingData[$scope.building.GeneralData.Bays.Bay[i].ID] = false;
            }
            $scope.editingData[x.ID] = true;
        };
        $scope.update = function (x) {
            $scope.editingData[x.ID] = false;
        };
        // ***End Bays 


        // ********************************** End Geometry ************************************************


    });