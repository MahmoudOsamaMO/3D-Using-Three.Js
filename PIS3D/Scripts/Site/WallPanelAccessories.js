var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('WallPanelAccessoriesCtrl', function ($scope, $http,$log) {
       
       
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
    $scope.WallPanelRelatedAccessories = ["NONE", "SPECIAL", "STANDARD", "OTHER"];
    $scope.BaseMetals = ["ALUMINIUM", "NONE", "STEEL"];
    $scope.Colors =
    [
        { color: "LightGray", tag: "ZA", name: "ZA" },
        { color: "#F0F0B9", tag: "FW", name: "Frost White-[NCS-S2005-G70Y]" },
        { color: "White", tag: "TBE", name: "TBE" },
        { color: "#BF9060", tag: "AB", name: "Arabian Beige-[NCS-S3020-Y30R]" },
        { color: "#9FAF7F", tag: "CG", name: "Cactus Green-[NCS-S3020-G40Y]" },
        { color: "#4A729B", tag: "RB", name: "Royal Blue-[RAL-5012]" },
        { color: "#CC0032", tag: "FR", name: "Flame Red-[RAL-3000]" },
        { color: "#317D02", tag: "LG", name: "Leaf Green-[RAL-6002]" },
        { color: "#FDE302", tag: "DY", name: "Daisy Yellow-[RAL-1021]" },
        { color: "#50707F", tag: "SB", name: "Shasta Blue-[NCS-S5020-B10G]" },
        { color: "#A09E9E", tag: "SM", name: "Sliver Metallic-[RAL-9006]" },
        { color: "#82ACBB", tag: "GBM", name: "Grey Blue Metallic" },
        { color: "#094788", tag: "GB", name: "Galaxy Blue-[RAL 5009]" },
        { color: "White", tag: "RAL", name: "RAL" }
    ];
    $scope.Components = ["GABLE TRIM", "NONE", "GUTTER/CURVED EAVE", "DOWNSPOUTS", "CORNER TRIM", "DRIP TRIM", "ACCESSORY TRIM"];
    $scope.PaintFinishs = ["NONE", "ZSP", "ZPF", "XSE", "OTHER", "ENV"];
    $scope.Thicknesss = [0.50, 0.60, 0.70];

    $scope.changecolor = function () {
        var obj = $scope.Colors.find(findcolor)
        $scope.selectedcolor = obj.color;
    };
    function findcolor(color) {
        return color.name === $scope.newobj.Color;
    };

    function findcolorit(color) {
        return color.name === $scope.nameit ;
    };

    $scope.WallAccAddupdate = "Add";
    $scope.SpecialWall = true;
    $scope.ChangeWallAcc = function () {
        if ($scope.building.WallPanelAccessories.WallPanelRelatedAccessories == "SPECIAL") {
            $scope.SpecialWall = true;
        }
        else {
            $scope.SpecialWall = false;
        }
    };
    $scope.AddUpdateWallAcc = function () {
        if ($scope.WallAccAddupdate == "Add")
            $scope.AddWallAcc();
        else if ($scope.WallAccAddupdate == "Update")
            $scope.ModyfyWallAcc();
    };
    $scope.WallAccIndex = 0;
    $scope.ResetWallAcc = function () {
        var id = 1;
        if ($scope.building.WallPanelAccessories.WallAccessories.WallAccessory)
            id = $scope.building.WallPanelAccessories.WallAccessories.WallAccessory.length + 1;
        $scope.newobj = {
            BaseMetal: "ALUMINIUM",
            Color: "Flame Red-[RAL-3000]",
            Component: "GABLE TRIM",
            ID: id,
            PaintFinish: "ENV",
            Remarks: { Remark: [{ ID: 1, Remark: "" }] },
            Thickness: 0.60
        };
        $scope.WallAccAddupdate = "Add";
        $scope.changecolor();
    };

    $scope.WallAcchistory = [];
    // Delete data
    $scope.removeWallAcc = function (index) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if ($scope.WallAcchistory.length === 10)
            $scope.WallAcchistory.shift();
        // Add deleted record to historical records
        $scope.WallAcchistory.push($scope.building.WallPanelAccessories.WallAccessories.WallAccessory[index]);
        // Remove from main records (using index)
        $scope.building.WallPanelAccessories.WallAccessories.WallAccessory.splice(index, 1);
    };
    // Undo action (delete)
    $scope.UndoWallAcc = function () {
        $scope.building.WallPanelAccessories.WallAccessories.WallAccessory.push($scope.WallAcchistory[$scope.WallAcchistory.length - 1]);
        $scope.WallAcchistory.pop();
    };

    $scope.UpdateWall = function (index) {
        $scope.newobj = angular.copy($scope.building.WallPanelAccessories.WallAccessories.WallAccessory[index]);
        $scope.WallAccIndex = index;
        $('#WallAccModal').modal('show');
        $scope.WallAccAddupdate = "Update";
        $scope.changecolor();
    };

    $scope.AddWallAcc = function () {
        if ($scope.building.WallPanelAccessories.WallAccessories.WallAccessory)
            $scope.building.WallPanelAccessories.WallAccessories.WallAccessory.push($scope.newobj);
        else
            $scope.building.WallPanelAccessories.WallAccessories.WallAccessory = [$scope.newobj];
    };

    $scope.ModyfyWallAcc = function () {
        $scope.building.WallPanelAccessories.WallAccessories.WallAccessory[$scope.WallAccIndex] = angular.copy($scope.newobj);
    };
    $scope.nameit = "";
    $scope.colorit = function (name) {
        try{
            $scope.nameit = name;
            var obj = $scope.Colors.find(findcolorit)
            return  obj.color;
        }
        catch(ex){return null;}
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
        $scope.building.WallPanelAccessories.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.WallPanelAccessories.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.WallPanelAccessories.Remarks.Remark)
            id = $scope.building.WallPanelAccessories.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.WallPanelAccessories.Remarks.Remark)
            $scope.building.WallPanelAccessories.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.WallPanelAccessories.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.WallPanelAccessories.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.WallPanelAccessories.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.WallPanelAccessories.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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