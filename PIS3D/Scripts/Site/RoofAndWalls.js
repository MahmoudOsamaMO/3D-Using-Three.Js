var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('RoofAndWallsCtrl', function ($scope, $http,$log) {
       
       
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
    $scope.Loading = true;

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
    };

    $scope.BracingType = {};
    $http({
        method: "GET",
        url: "/PISUser/GetBracingType"
    }).then(function mySucces(response) {
        $scope.BracingType = response.data;
    }, function myError(response) {
        alert("error");
    });

    $scope.ByWho = ["ZS", "OTHER"];
    $scope.ByWho2 = ["ZS", "OTHER", "NONE"];

    // Roof Panel Single Skin
    $scope.Profile = ["S", "Max12", "Max18", "Max24"];

    $scope.ProfilePanelRoof = ["S", "Max12", "Max18", "Max24"];
    $scope.ProfilePanelWall = ["S", "ZW"];

    $scope.ProfileLinerl = ["S", "ZW", "D", "E"];

    $scope.Material = [{ name: "ZA-Steel", tag: "ZA" }, { name: "GA-Steel", tag: "GA" }, { name: "Aluminum", tag: "Al" }];
    $scope.Paint = ["UNP", "ZSP", "XMA", "ZPF"];
    $scope.Thickness = [0.5, 0.6, 0.7];

    // Roof Tempcon
    $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
    $scope.TempconTypePanelWall = ["TCSQ", "TCSO", "TCSM", "TCSN", "TAUQ", "TAUO", "TAUM", "TAUN", "TAPQ", "TAPM", "TAPN", "TAWQ", "TAWM", "TAWN", "TAVQ", "TAVM", "TAVN"];
    $scope.TempconTypePanelRoof = ["TCSQ", "TCSO", "TCSM", "TCSN"];
    $scope.TempconTypeLiner = ["TCSQ", "TCSO", "TCSN"];
    $scope.TempconFoem = ["PUR", "PIR"];
    $scope.TempconThickness = [30, 40, 50, 75, 100];



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

    // Single Skin 
    $scope.newobj = {
        Profile: "S",
        Material: "ZA",
        Paint: "ZSP",
        Thickness: 0.5,
        Color: "FW",
        Description: "S-ZA-ZSP-0.5-FW"
    };
    function findcolor(color) {
        return color.tag === $scope.newobj.Color;
    };
    function findMatrial(matrial) {
        return matrial.tag === $scope.newobj.Material;
    };
    function findDescription(SingleSkin) {
        return SingleSkin.Description === $scope.selectedDescription;
    };
    function findTempconByDesc(Tempcon) {
        return Tempcon.Description === $scope.selectedTempconDesc;
    };


    $scope.changecolor = function () {
        var obj = $scope.Colors.find(findcolor)
        $scope.selectedcolor = obj.color;
        $scope.updateDisc();
    };

    $scope.RestSingle = function (SingleObject) {
        if (SingleObject) {
            if (SingleObject.Description) {
                if (SingleObject.Description.indexOf("OUTER") !== -1) {
                    $scope.newobj = {
                        Profile: "S",
                        Material: "ZA",
                        Paint: "ZSP",
                        Thickness: 0.5,
                        Color: "FW",
                        Description: "S-ZA-ZSP-0.5-FW"
                    };
                }
                else {
                    var selectedDesc;
                    for (i = 0; i < $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length; i++) {
                        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin[i].Description == SingleObject.Description) {
                            selectedDesc = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin[i];
                        }
                    };
                    var res = selectedDesc.Description.split("-");
                    $scope.newobj.Material = res[1];
                    var objMat = $scope.Material.find(findMatrial)
                    $scope.selcMat = objMat.tag;
                    $scope.newobj = {
                        Profile: selectedDesc.ProfileType,
                        Material: $scope.selcMat,
                        Paint: selectedDesc.PaintFinish,
                        Thickness: selectedDesc.Thickness,
                        Color: selectedDesc.Color,
                        Description: selectedDesc.Description
                    };
                }
            }
            else {
                $scope.newobj = {
                    Profile: "S",
                    Material: "ZA",
                    Paint: "ZSP",
                    Thickness: 0.5,
                    Color: "FW",
                    Description: "S-ZA-ZSP-0.5-FW"
                };
            }
        }
        else {
            $scope.newobj = {
                Profile: "S",
                Material: "ZA",
                Paint: "ZSP",
                Thickness: 0.5,
                Color: "FW",
                Description: "S-ZA-ZSP-0.5-FW"
            };
        }
        var obj = $scope.Colors.find(findcolor)
        $scope.selectedcolor = obj.color;
    };

    $scope.updateDisc = function () {
        var obj = $scope.Colors.find(findcolor)
        $scope.colortag = obj.tag;
        $scope.newobj.Description = $scope.newobj.Profile + "-" + $scope.newobj.Material + "-" + $scope.newobj.Paint + "-" + $scope.newobj.Thickness + "-" + $scope.colortag;
    };

    $scope.DescChange = function (Description) {
        //var selectedDesc = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin[index];
        $scope.selectedDescription = Description;
        var selectedDesc = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.find(findDescription);
        var objMat = $scope.Material.find(findMatrial)
        $scope.selcMat = objMat.tag;
        $scope.newobj = {
            Profile: selectedDesc.ProfileType,
            Material: $scope.selcMat,
            Paint: selectedDesc.PaintFinish,
            Thickness: selectedDesc.Thickness,
            Color: selectedDesc.Color,
            Description: selectedDesc.Description
        };
        var obj = $scope.Colors.find(findcolor)
        $scope.selectedcolor = obj.color;
    };

    $scope.AddSingleSkin = function () {
        var ins = 0;
        var single = 0;
        var tem = 0;
        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation)
            ins = $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin)
            single = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length;
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon)
            tem = $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length;
        var IDc = ins + single + tem + 1;

        var Newsingle = {
            BaseMetal: $scope.newobj.Material, //Material
            Color: $scope.newobj.Color,
            Description: $scope.newobj.Description,
            ID: IDc,
            PaintFinish: $scope.newobj.Paint,
            ProfileType: $scope.newobj.Profile,
            Thickness: $scope.newobj.Thickness
        };
        var ishere = false;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin) {
            for (i = 0; i < $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length; i++) {
                if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin[i].Description == Newsingle.Description) {
                    ishere = true;
                    IDc = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin[i].ID;
                }
            }
            if (!ishere)
                $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.push(Newsingle);
        }
        else
            $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin = [Newsingle];


        if ($scope.SingleSkinFlag == 0)
            $scope.building.RoofWallCladding.RoofPanel.Panel.PanelProfile = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 1)
            $scope.building.RoofWallCladding.RoofPanel.Liner.Liner = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 2)
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 3)
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.Liner = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 4)
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 5)
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.Liner = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 6)
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 7)
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.Liner = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 8)
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile = { Description: $scope.newobj.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 9)
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.Liner = { Description: $scope.newobj.Description, Id: IDc };
    };

    // End Single Skin 



    // Tempcon **************************************************
    $scope.RestTempcon = function (TempconObjectRef) {
        var TempconObject = TempconObjectRef;
        var ins = 0;
        var single = 0;
        var tem = 0;
        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation)
            ins = $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin)
            single = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length;
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon)
            tem = $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length;
        var IDc = ins + single + tem + 1;
        if (TempconObject) {
            if (TempconObject.Description) {
                if (TempconObject.Description.indexOf("OUTER") !== -1) {
                    $scope.selectedTempconDesc = TempconObject.Description;
                    var newtemp = angular.copy($scope.building.PanelsAndInsulations.TempconTypes.Tempcon.find(findTempconByDesc));
                    //angular.copy($scope.newTempcon, newtemp);
                    $scope.newTempcon = newtemp;
                }
                else {
                    $scope.newTempcon = {
                        Description: "TCSQ-PUR-50:OUTER S-GA-ZSP-0.5-FW;INNER Q-GA-ZSP-0.5-FW",
                        Foam: "PUR",
                        ID: parseFloat(IDc),
                        InnerPanel: {
                            BaseMetal: "GA-Steel",
                            Color: "FW",
                            Description: "Q-GA-ZSP-0.5-FW",
                            ID: "0",
                            PaintFinish: "ZSP",
                            ProfileType: "Q",
                            Thickness: 0.5
                        },
                        OuterPanel: {
                            BaseMetal: "GA-Steel",
                            Color: "FW",
                            Description: "S-GA-ZSP-0.5-FW",
                            ID: "0",
                            PaintFinish: "ZSP",
                            ProfileType: "S",
                            Thickness: 0.5
                        },
                        SheetingType: "TCSQ",
                        Thickness: 50
                    };
                }
            }
            else {
                $scope.newTempcon = {
                    Description: "TCSQ-PUR-50:OUTER S-GA-ZSP-0.5-FW;INNER Q-GA-ZSP-0.5-FW",
                    Foam: "PUR",
                    ID: parseFloat(IDc),
                    InnerPanel: {
                        BaseMetal: "GA-Steel",
                        Color: "FW",
                        Description: "Q-GA-ZSP-0.5-FW",
                        ID: "0",
                        PaintFinish: "ZSP",
                        ProfileType: "Q",
                        Thickness: 0.5
                    },
                    OuterPanel: {
                        BaseMetal: "GA-Steel",
                        Color: "FW",
                        Description: "S-GA-ZSP-0.5-FW",
                        ID: "0",
                        PaintFinish: "ZSP",
                        ProfileType: "S",
                        Thickness: 0.5
                    },
                    SheetingType: "TCSQ",
                    Thickness: 50
                };
            }
        }
        else {
            $scope.newTempcon = {
                Description: "TCSQ-PUR-50:OUTER S-GA-ZSP-0.5-FW;INNER Q-GA-ZSP-0.5-FW",
                Foam: "PUR",
                ID: parseFloat(IDc),
                InnerPanel: {
                    BaseMetal: "GA-Steel",
                    Color: "FW",
                    Description: "Q-GA-ZSP-0.5-FW",
                    ID: "0",
                    PaintFinish: "ZSP",
                    ProfileType: "Q",
                    Thickness: 0.5
                },
                OuterPanel: {
                    BaseMetal: "GA-Steel",
                    Color: "FW",
                    Description: "S-GA-ZSP-0.5-FW",
                    ID: "0",
                    PaintFinish: "ZSP",
                    ProfileType: "S",
                    Thickness: 0.5
                },
                SheetingType: "TCSQ",
                Thickness: 50
            };
        }
        $scope.newTempconDes = JSON.stringify($scope.newTempcon);
        var obj = $scope.Colors.find(findcolorInner)
        $scope.selectedcolorInner = obj.color;
        var obj = $scope.Colors.find(findcolorOuter)
        $scope.selectedcolorOuter = obj.color;
    };

    function findMatrialInner(matrial) {
        return matrial.name === $scope.newTempcon.InnerPanel.BaseMetal;
    };
    function findMatrialOuter(matrial) {
        return matrial.name === $scope.newTempcon.OuterPanel.BaseMetal;
    };

    function findcolorInner(color) {
        return color.tag === $scope.newTempcon.InnerPanel.Color;
    };
    function findcolorOuter(color) {
        return color.tag === $scope.newTempcon.OuterPanel.Color;
    };


    $scope.changecolorInner = function () {
        var obj = $scope.Colors.find(findcolorInner)
        $scope.selectedcolorInner = obj.color;
        $scope.UpdateTempconDesc();
    };
    $scope.changecolorOuter = function () {
        var obj = $scope.Colors.find(findcolorOuter)
        $scope.selectedcolorOuter = obj.color;
        $scope.UpdateTempconDesc();
    };

    $scope.updateDiscInner = function () {

        var shettype = $scope.newTempcon.SheetingType.split("");
        if (shettype[3] == "O") {
            $scope.newTempcon.InnerPanel = {
                BaseMetal: "GA-Steel",
                Color: "FW",
                Description: "Q-GA-ZSP-0.5-FW",
                ID: "0",
                PaintFinish: "ZSP",
                ProfileType: "Q",
                Thickness: "0.5"
            };

            document.getElementById("Inner").style.visibility = "hidden";
            document.getElementById("InnerPanelF").style.visibility = "visible";
            document.getElementById("InnerPanel").style.visibility = "hidden";
        }
        else {
            //$scope.newTempcon.InnerPanel =
            //    {
            //        BaseMetal: "GA-Steel",
            //        Color: "FW",
            //        Description: "Q-GA-ZSP-0.5-FW",
            //        ID: "0",
            //        PaintFinish: "ZSP",
            //        ProfileType: "Q",
            //        Thickness: "0.5"
            //    };
            var obj = $scope.Colors.find(findcolorInner)
            $scope.colortagInner = obj.tag;
            var objMat = $scope.Material.find(findMatrialInner);
            $scope.newTempcon.InnerPanel.ProfileType = shettype[3];
            document.getElementById("Inner").style.visibility = "visible";
            document.getElementById("InnerPanelF").style.visibility = "hidden";
            document.getElementById("InnerPanel").style.visibility = "visible";
            $scope.newTempcon.InnerPanel.Description = $scope.newTempcon.InnerPanel.ProfileType + "-" + objMat.tag + "-" + $scope.newTempcon.InnerPanel.PaintFinish + "-" + $scope.newTempcon.InnerPanel.Thickness + "-" + $scope.colortagInner;
        };
    };

    $scope.updateDiscOuter = function () {
        var obj = $scope.Colors.find(findcolorOuter);
        $scope.colortagOuter = obj.tag;
        var objMat = $scope.Material.find(findMatrialOuter);
        var shettype = $scope.newTempcon.SheetingType.split("");
        $scope.newTempcon.OuterPanel.ProfileType = shettype[2];
        $scope.newTempcon.OuterPanel.Description = $scope.newTempcon.OuterPanel.ProfileType + "-" + objMat.tag + "-" + $scope.newTempcon.OuterPanel.PaintFinish + "-" + $scope.newTempcon.OuterPanel.Thickness + "-" + $scope.colortagOuter;
    };

    $scope.UpdateTempconDesc = function () {
        $scope.updateDiscInner();
        $scope.updateDiscOuter();
        // "TCSQ-PUR-50:OUTER S-GA-ZSP-0.5-FW;INNER Q-GA-ZSP-0.5-FW"
        var shettype = $scope.newTempcon.SheetingType.split("");
        if (shettype[3] == "O") {
            $scope.newTempcon.Description = $scope.newTempcon.SheetingType + "-" + $scope.newTempcon.Foam + "-" + $scope.newTempcon.Thickness
                + ":OUTER " + $scope.newTempcon.OuterPanel.Description + ";INNER " + "FRL";
        }
        else {
            $scope.newTempcon.Description = $scope.newTempcon.SheetingType + "-" + $scope.newTempcon.Foam + "-" + $scope.newTempcon.Thickness
                + ":OUTER " + $scope.newTempcon.OuterPanel.Description + ";INNER " + $scope.newTempcon.InnerPanel.Description;
        }
    };

    $scope.AddTempcon = function () {
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon) {
            var ishere = false;

            for (i = 0; i < $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length; i++) {
                if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon[i].Description == $scope.newTempcon.Description)
                    ishere = true;
            }
            if (!ishere) {
                var temp = $scope.newTempcon;
                $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.push(temp);
            }
        }
        else {
            var temp = $scope.newTempcon;
            $scope.building.PanelsAndInsulations.TempconTypes.Tempcon = [temp];
        }

        var ins = 0;
        var single = 0;
        var tem = 0;
        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation)
            ins = $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin)
            single = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length;
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon)
            tem = $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length;
        //var IDc = ins + single + tem + 1;
        var IDc = $scope.newTempcon.ID;

        if ($scope.SingleSkinFlag == 0)
            $scope.building.RoofWallCladding.RoofPanel.Panel.PanelProfile = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 1)
            $scope.building.RoofWallCladding.RoofPanel.Liner.Liner = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 2)
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 3)
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.Liner = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 4)
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 5)
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.Liner = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 6)
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 7)
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.Liner = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 8)
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile = { Description: $scope.newTempcon.Description, Id: IDc };
        else if ($scope.SingleSkinFlag == 9)
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.Liner = { Description: $scope.newTempcon.Description, Id: IDc };
    };

    $scope.DescChangeTempcon = function (newTempconDescription) {
        //$scope.newTempcon = angular.copy($scope.newTempconDes);
        $scope.newTempcon = JSON.parse(newTempconDescription);
        //console.log($scope.newTempcon);
        $scope.UpdateTempconDesc();
        var obj = $scope.Colors.find(findcolorInner)
        $scope.selectedcolorInner = obj.color;
        var obj = $scope.Colors.find(findcolorOuter)
        $scope.selectedcolorOuter = obj.color;
    };


    //End Tempcon


    // Insulation *************************************
    $scope.InsDensityFi = [10, 12, 16, 20, 24, 32];
    $scope.InsDensityRWB = [30, 40, 50, 60];
    $scope.InsDensityRWQ = [30, 40, 60, 80, 90];
    $scope.InsDensityRWP = [30, 40, 50, 60, 80, 100];

    $scope.InsFacing = ["WMSK", "WMPVR", "VINYL", "ALUM", "UNFACED"];
    $scope.InsThicknessFI = [50, 75, 100, 125, 150];
    $scope.InsThicknessRWB = [50, 60, 80, 90, 100];
    $scope.InsThicknessRWQ = [50, 70, 90, 100, 120, 130];
    $scope.InsThicknessRWP = [50, 80, 100, 130, 150];
    $scope.InsType = ["Fiberglass", "RockWool-Blanket", "RockWool-Quilted", "RockWool-Panel"];
    $scope.InsTypeArr = [{ name: "Fiberglass", tag: "FG" }, { name: "RockWool-Blanket", tag: "RB" }, { name: "RockWool-Quilted", tag: "RQ" }, { name: "RockWool-Panel", tag: "RP" }];

    function findInsuByDesc(Insu) {
        return Insu.Description === $scope.selectedInsuDesc;
    };

    $scope.UpdateInsulationType = function () {
        if ($scope.newIns.Type == "Fiberglass") {
            $scope.InsThickness = $scope.InsThicknessFI;
            $scope.InsDensity = $scope.InsDensityFi;
            $scope.newIns.Density = 10;
            $scope.newIns.Thickness = 50;
        }
        else if ($scope.newIns.Type == "RockWool-Blanket") {
            $scope.InsThickness = $scope.InsThicknessRWB;
            $scope.InsDensity = $scope.InsDensityRWB;
            $scope.newIns.Density = 30;
            $scope.newIns.Thickness = 50;
        }
        else if ($scope.newIns.Type == "RockWool-Quilted") {
            $scope.InsThickness = $scope.InsThicknessRWQ;
            $scope.InsDensity = $scope.InsDensityRWQ;
            $scope.newIns.Density = 30;
            $scope.newIns.Thickness = 50;
        }
        else if ($scope.newIns.Type == "RockWool-Panel") {
            $scope.InsThickness = $scope.InsThicknessRWP;
            $scope.InsDensity = $scope.InsDensityRWP;
            $scope.newIns.Density = 30;
            $scope.newIns.Thickness = 50;
        }
        $scope.UpdateInsulation();
    };
    $scope.UpdateInsulation = function () {
        var TypeTag = "";
        for (var i = 0 ; i < $scope.InsTypeArr.length; i++) {
            if ($scope.InsTypeArr[i].name == $scope.newIns.Type)
                TypeTag = $scope.InsTypeArr[i].tag;
        };
        if ($scope.newIns.Type == "Fiberglass") {
            $scope.InsThickness = $scope.InsThicknessFI;
            $scope.InsDensity = $scope.InsDensityFi;
        }
        else if ($scope.newIns.Type == "RockWool-Blanket") {
            $scope.InsThickness = $scope.InsThicknessRWB;
            $scope.InsDensity = $scope.InsDensityRWB;
        }
        else if ($scope.newIns.Type == "RockWool-Quilted") {
            $scope.InsThickness = $scope.InsThicknessRWQ;
            $scope.InsDensity = $scope.InsDensityRWQ;
        }
        else if ($scope.newIns.Type == "RockWool-Panel") {
            $scope.InsThickness = $scope.InsThicknessRWP;
            $scope.InsDensity = $scope.InsDensityRWP;
        }
        $scope.newIns.Description = TypeTag + "-" + $scope.newIns.Density + "-" + $scope.newIns.Thickness + "-" + $scope.newIns.Facing;

    };

    $scope.RestInsulation = function (InsulationObject) {
        var ins = 0;
        var single = 0;
        var tem = 0;
        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation)
            ins = $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin)
            single = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length;
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon)
            tem = $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length;
        var IDc = ins + single + tem + 1;

        if (InsulationObject) {
            if (InsulationObject.Description) {
                $scope.selectedInsuDesc = InsulationObject.Description;
                var oject = angular.copy($scope.building.PanelsAndInsulations.InsulationTypes.Insulation.find(findInsuByDesc));
                $scope.newIns = oject;
            }
            else {
                $scope.newIns = {
                    Density: 10,
                    Description: "FG-10-50-WMSK",
                    Facing: "WMSK",
                    ID: IDc,
                    Thickness: 50,
                    Type: "Fiberglass"
                };
            }
        }
        else {
            $scope.newIns = {
                Density: 10,
                Description: "FG-10-50-WMSK",
                Facing: "WMSK",
                ID: IDc,
                Thickness: 50,
                Type: "Fiberglass"
            };
        }
        if ($scope.newIns.Type == "Fiberglass") {
            $scope.InsThickness = $scope.InsThicknessFI;
            $scope.InsDensity = $scope.InsDensityFi;
        }
        else if ($scope.newIns.Type == "RockWool-Blanket") {
            $scope.InsThickness = $scope.InsThicknessRWB;
            $scope.InsDensity = $scope.InsDensityRWB;
        }
        else if ($scope.newIns.Type == "RockWool-Quilted") {
            $scope.InsThickness = $scope.InsThicknessRWQ;
            $scope.InsDensity = $scope.InsDensityRWQ;
        }
        else if ($scope.newIns.Type == "RockWool-Panel") {
            $scope.InsThickness = $scope.InsThicknessRWP;
            $scope.InsDensity = $scope.InsDensityRWP;
        }
        $scope.UpdateInsulation();
        $scope.newInsDes = JSON.stringify($scope.newIns);

    };

    $scope.AddInsulation = function () {
        var ins = 0;
        var single = 0;
        var tem = 0;
        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation)
            ins = $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length;
        if ($scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin)
            single = $scope.building.PanelsAndInsulations.SingleSkinTypes.SingleSkin.length;
        if ($scope.building.PanelsAndInsulations.TempconTypes.Tempcon)
            tem = $scope.building.PanelsAndInsulations.TempconTypes.Tempcon.length;
        var IDc = ins + single + tem + 1;

        if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation) {
            var ishere = false;

            for (i = 0; i < $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.length; i++) {
                if ($scope.building.PanelsAndInsulations.InsulationTypes.Insulation[i].Description == $scope.newIns.Description)
                    ishere = true;
            }
            if (!ishere)
                $scope.building.PanelsAndInsulations.InsulationTypes.Insulation.push($scope.newIns);
        }
        else
            $scope.building.PanelsAndInsulations.InsulationTypes.Insulation = [$scope.newIns];

        if ($scope.InsulationFlag == 0)
            $scope.building.RoofWallCladding.RoofPanel.Insulation.Insulation = { Description: $scope.newIns.Description, Id: IDc };
        else if ($scope.InsulationFlag == 1)
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation.Insulation = { Description: $scope.newIns.Description, Id: IDc };
        else if ($scope.InsulationFlag == 2)
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation.Insulation = { Description: $scope.newIns.Description, Id: IDc };
        else if ($scope.InsulationFlag == 3)
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation.Insulation = { Description: $scope.newIns.Description, Id: IDc };
        else if ($scope.InsulationFlag == 4)
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation.Insulation = { Description: $scope.newIns.Description, Id: IDc };
    };

    $scope.InsDescChange = function (newInsDes) {
        //$scope.newTempcon = angular.copy($scope.newTempconDes);
        $scope.newIns = JSON.parse(newInsDes);
        //console.log($scope.newTempcon);
        $scope.UpdateInsulation();
    };


    // End Insulation 

    //Liner 
    $scope.LineerLocation = ["UNDER RAFTER", "UNDER PURLIN"];
    //End Liner

    $scope.SingleSkinFlag = 0;
    $scope.InsulationFlag = 0;

    //Roof Panel
    $scope.RestSingleRoofPanel = function () {
        $scope.Profile = ["S", "Max12", "Max18", "Max24"];

        $scope.SingleSkinFlag = 0;
        $scope.RestSingle($scope.building.RoofWallCladding.RoofPanel.Panel.PanelProfile);
    };
    $scope.RestTempconRoofPanel = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
        $scope.SingleSkinFlag = 0;
        $scope.RestTempcon($scope.building.RoofWallCladding.RoofPanel.Panel.PanelProfile);
    };

    $scope.RestSingleRoofLiner = function () {

        $scope.Profile = ["S", "ZW", "D", "E"];
        $scope.SingleSkinFlag = 1;
        $scope.RestSingle($scope.building.RoofWallCladding.RoofPanel.Liner.Liner);
    };
    $scope.RestTempconRoofLiner = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSN"];
        $scope.SingleSkinFlag = 1;
        $scope.RestTempcon($scope.building.RoofWallCladding.RoofPanel.Liner.Liner);
    };
    $scope.RestInsulationRoof = function () {
        $scope.InsulationFlag = 0;
        $scope.RestInsulation($scope.building.RoofWallCladding.RoofPanel.Insulation.Insulation);
    };
    $scope.RoofInsulationByWho = function () {
        if ($scope.building.RoofWallCladding.RoofPanel.Insulation.ByWho == "NONE") {
            $scope.building.RoofWallCladding.RoofPanel.Insulation = {
                Area: "0",
                ByWho: "NONE",
                SupplyWireMesh: false
            };
        }
        else if ($scope.building.RoofWallCladding.RoofPanel.Insulation.ByWho == "ZS") {
            $scope.building.RoofWallCladding.RoofPanel.Insulation = { Insulation: [{ Description: "", Id: 0 }], Area: "0", ByWho: "ZS", SupplyWireMesh: false }
        }
        else if ($scope.building.RoofWallCladding.RoofPanel.Insulation.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.RoofPanel.Insulation = { Others: [{ Thickness: 0, Note: "" }], Area: "0", ByWho: "OTHER", SupplyWireMesh: false }
        }
    };
    $scope.RoofLinerByWho = function () {
        if ($scope.building.RoofWallCladding.RoofPanel.Liner.ByWho == "NONE") {
            $scope.building.RoofWallCladding.RoofPanel.Liner = { ByWho: "NONE" };
        }
        else if ($scope.building.RoofWallCladding.RoofPanel.Liner.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.RoofPanel.Liner = { ByWho: "OTHER", Weight: 0 };
        }
        else if ($scope.building.RoofWallCladding.RoofPanel.Liner.ByWho == "ZS") {
            $scope.building.RoofWallCladding.RoofPanel.Liner = { ByWho: "ZS", Liner: null };
        }
    };

    $scope.RoofPanelByWhoChange = function () {
        if ($scope.building.RoofWallCladding.RoofPanel.Panel.ByWho == "ZS") {
            $scope.building.RoofWallCladding.RoofPanel.Panel.PanelProfile = [{ Description: "", Id: 0 }];
        }
        else if ($scope.building.RoofWallCladding.RoofPanel.Panel.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.RoofPanel.Panel.Weight = 0;
        }
    };

    //End Roof Panel 




    //NSW **********************************
    $scope.WallCondition = ["FULLY BLOCKED", "FULLY OPEN", "FULLY SHEETED", "PARTIALLY OPEN", "NONE"];
    $scope.GirtCondition = ["FLUSH", "BY PASS", "NONE"];

    $scope.RestSingleWallPanelNSW = function () {
        $scope.Profile = ["S", "ZW"];
        $scope.SingleSkinFlag = 6;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile);
    };
    $scope.RestTempconWallPanelNSW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN", "TAUQ", "TAUO", "TAUM", "TAUN", "TAPQ", "TAPM", "TAPN", "TAWQ", "TAWM", "TAWN", "TAVQ", "TAVM", "TAVN"];
        $scope.SingleSkinFlag = 6;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile);
    };

    $scope.RestSingleWallLinerNSW = function () {
        $scope.ProfileLinerl = ["S", "ZW", "D", "E"];
        $scope.SingleSkinFlag = 7;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.Liner);
    };
    $scope.RestTempconWallLinerNSW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
        $scope.SingleSkinFlag = 7;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.Liner);
    };

    $scope.RestWallInsulationNSW = function () {
        $scope.InsulationFlag = 3;
        $scope.RestInsulation($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation.Insulation);
    };

    $scope.WallInsulationNSWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation = {
                Area: "0",
                ByWho: "NONE",
                SupplyWireMesh: false
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation = { Insulation: [{ Description: "", Id: 0 }], Area: "0", ByWho: "ZS", SupplyWireMesh: false }
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Insulation = { Others: [{ Thickness: 0, Note: "" }], Area: "0", ByWho: "OTHER", SupplyWireMesh: false }
        }
    };
    $scope.WallLinerNSWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner = { ByWho: "NONE" };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner = { ByWho: "OTHER", Weight: 0 };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Liner = { ByWho: "ZS", Liner: null };
        }
    };

    $scope.NSWByWhoChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile = [{ Description: "", Id: 0 }];
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding.Panel.Weight = 0;
        }
    };

    $scope.NSWWallChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.NSW.Condition == "FULLY BLOCKED") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding = null;
            $scope.DisableGirtNSW = false;

        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Condition == "FULLY OPEN") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding = null;
            $scope.building.RoofWallCladding.WallPanel.NSW.GirtCondition = "NONE";
            $scope.DisableGirtNSW = true;
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Condition == "FULLY SHEETED") {
            $scope.DisableGirtNSW = false;
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Condition == "PARTIALLY OPEN") {
            $scope.DisableGirtNSW = false;
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", Item: null, SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.NSW.Condition == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.NSW.Cladding = null;
            $scope.DisableGirtNSW = false;

            //= {
            //    Cladding: null,
            //    Condition: "NONE",
            //    GirtCondition: "NONE",
            //    GirtConditionSpecified: true
            //};
        }
    };
    //EnD NSW 



    //FSW **********************************
    $scope.WallCondition = ["FULLY BLOCKED", "FULLY OPEN", "FULLY SHEETED", "PARTIALLY OPEN", "NONE"];
    $scope.GirtCondition = ["FLUSH", "BY PASS", "NONE"];

    $scope.RestSingleWallPanelFSW = function () {
        $scope.Profile = ["S", "ZW"];
        $scope.SingleSkinFlag = 2;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile);
    };
    $scope.RestTempconWallPanelFSW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN", "TAUQ", "TAUO", "TAUM", "TAUN", "TAPQ", "TAPM", "TAPN", "TAWQ", "TAWM", "TAWN", "TAVQ", "TAVM", "TAVN"];
        $scope.SingleSkinFlag = 2;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile);
    };

    $scope.RestSingleWallLinerFSW = function () {
        $scope.ProfileLinerl = ["S", "ZW", "D", "E"];
        $scope.SingleSkinFlag = 3;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.Liner);
    };
    $scope.RestTempconWallLinerFSW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
        $scope.SingleSkinFlag = 3;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.Liner);
    };

    $scope.RestWallInsulationFSW = function () {
        $scope.InsulationFlag = 1;
        $scope.RestInsulation($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation.Insulation);
    };

    $scope.WallInsulationFSWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation = {
                Area: "0",
                ByWho: "NONE",
                SupplyWireMesh: false
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation = { Insulation: [{ Description: "", Id: 0 }], Area: "0", ByWho: "ZS", SupplyWireMesh: false }
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Insulation = { Others: [{ Thickness: 0, Note: "" }], Area: "0", ByWho: "OTHER", SupplyWireMesh: false }
        }
    };
    $scope.WallLinerFSWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner = { ByWho: "NONE" };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner = { ByWho: "OTHER", Weight: 0 };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Liner = { ByWho: "ZS", Liner: null };
        }
    };

    $scope.FSWByWhoChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile = [{ Description: "", Id: 0 }];
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding.Panel.Weight = 0;
        }
    };

    $scope.FSWWallChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.FSW.Condition == "FULLY BLOCKED") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding = null;
            $scope.DisableGirtFSW = false;

        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Condition == "FULLY OPEN") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding = null;
            $scope.building.RoofWallCladding.WallPanel.FSW.GirtCondition = "NONE";
            $scope.DisableGirtFSW = true;
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Condition == "FULLY SHEETED") {
            $scope.DisableGirtFSW = false;
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Condition == "PARTIALLY OPEN") {
            $scope.DisableGirtFSW = false;
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", Item: null, SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.FSW.Condition == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.FSW.Cladding = null;
            $scope.DisableGirtFSW = false;
        }
    };
    //EnD FSW 


    //LEW **********************************
    $scope.WallCondition = ["FULLY BLOCKED", "FULLY OPEN", "FULLY SHEETED", "PARTIALLY OPEN", "NONE"];
    $scope.GirtCondition = ["FLUSH", "BY PASS", "NONE"];

    $scope.RestSingleWallPanelLEW = function () {
        $scope.Profile = ["S", "ZW"];
        $scope.SingleSkinFlag = 4;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile);
    };
    $scope.RestTempconWallPanelLEW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN", "TAUQ", "TAUO", "TAUM", "TAUN", "TAPQ", "TAPM", "TAPN", "TAWQ", "TAWM", "TAWN", "TAVQ", "TAVM", "TAVN"];
        $scope.SingleSkinFlag = 4;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile);
    };

    $scope.RestSingleWallLinerLEW = function () {
        $scope.ProfileLinerl = ["S", "ZW", "D", "E"];
        $scope.SingleSkinFlag = 5;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.Liner);
    };
    $scope.RestTempconWallLinerLEW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
        $scope.SingleSkinFlag = 5;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.Liner);
    };

    $scope.RestWallInsulationLEW = function () {
        $scope.InsulationFlag = 2;
        $scope.RestInsulation($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation.Insulation);
    };

    $scope.WallInsulationLEWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation = {
                Area: "0",
                ByWho: "NONE",
                SupplyWireMesh: false
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation = { Insulation: [{ Description: "", Id: 0 }], Area: "0", ByWho: "ZS", SupplyWireMesh: false }
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Insulation = { Others: [{ Thickness: 0, Note: "" }], Area: "0", ByWho: "OTHER", SupplyWireMesh: false }
        }
    };
    $scope.WallLinerLEWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner = { ByWho: "NONE" };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner = { ByWho: "OTHER", Weight: 0 };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Liner = { ByWho: "ZS", Liner: null };
        }
    };

    $scope.LEWByWhoChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile = [{ Description: "", Id: 0 }];
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding.Panel.Weight = 0;
        }
    };

    $scope.LEWWallChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.LEW.Condition == "FULLY BLOCKED") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding = null;
            $scope.DisableGirtLEW = false;

        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Condition == "FULLY OPEN") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding = null;
            $scope.building.RoofWallCladding.WallPanel.LEW.GirtCondition = "NONE";
            $scope.DisableGirtLEW = true;
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Condition == "FULLY SHEETED") {
            $scope.DisableGirtLEW = false;
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Condition == "PARTIALLY OPEN") {
            $scope.DisableGirtLEW = false;
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", Item: null, SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.LEW.Condition == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.LEW.Cladding = null;
            $scope.DisableGirtLEW = false;

            //= {
            //    Cladding: null,
            //    Condition: "NONE",
            //    GirtCondition: "NONE",
            //    GirtConditionSpecified: true
            //};
        }
    };
    //EnD LEW 



    //REW **********************************
    $scope.WallCondition = ["FULLY BLOCKED", "FULLY OPEN", "FULLY SHEETED", "PARTIALLY OPEN", "NONE"];
    $scope.GirtCondition = ["FLUSH", "BY PASS", "NONE"];

    $scope.RestSingleWallPanelREW = function () {
        $scope.Profile = ["S", "ZW"];
        $scope.SingleSkinFlag = 8;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile);
    };
    $scope.RestTempconWallPanelREW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN", "TAUQ", "TAUO", "TAUM", "TAUN", "TAPQ", "TAPM", "TAPN", "TAWQ", "TAWM", "TAWN", "TAVQ", "TAVM", "TAVN"];
        $scope.SingleSkinFlag = 8;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile);
    };

    $scope.RestSingleWallLinerREW = function () {
        $scope.ProfileLinerl = ["S", "ZW", "D", "E"];
        $scope.SingleSkinFlag = 9;
        $scope.RestSingle($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.Liner);
    };
    $scope.RestTempconWallLinerREW = function () {
        $scope.TempconType = ["TCSQ", "TCSO", "TCSM", "TCSN"];
        $scope.SingleSkinFlag = 9;
        $scope.RestTempcon($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.Liner);
    };

    $scope.RestWallInsulationREW = function () {
        $scope.InsulationFlag = 4;
        $scope.RestInsulation($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation.Insulation);
    };

    $scope.WallInsulationREWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation = {
                Area: "0",
                ByWho: "NONE",
                SupplyWireMesh: false
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation = { Insulation: [{ Description: "", Id: 0 }], Area: "0", ByWho: "ZS", SupplyWireMesh: false }
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Insulation = { Others: [{ Thickness: 0, Note: "" }], Area: "0", ByWho: "OTHER", SupplyWireMesh: false }
        }
    };
    $scope.WallLinerREWByWho = function () {
        if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.ByWho == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner = { ByWho: "NONE" };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner = { ByWho: "OTHER", Weight: 0 };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Liner = { ByWho: "ZS", Liner: null };
        }
    };

    $scope.REWByWhoChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.ByWho == "ZS") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile = [{ Description: "", Id: 0 }];
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.ByWho == "OTHER") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding.Panel.Weight = 0;
        }
    };

    $scope.REWWallChange = function () {
        if ($scope.building.RoofWallCladding.WallPanel.REW.Condition == "FULLY BLOCKED") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding = null;
            $scope.DisableGirtREW = false;

        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Condition == "FULLY OPEN") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding = null;
            $scope.building.RoofWallCladding.WallPanel.REW.GirtCondition = "NONE";
            $scope.DisableGirtREW = true;
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Condition == "FULLY SHEETED") {
            $scope.DisableGirtREW = false;
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Condition == "PARTIALLY OPEN") {
            $scope.DisableGirtREW = false;
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding = {
                Insulation: { Area: "0", ByWho: "NONE", Item: null, SupplyWireMesh: false },
                Liner: { ByWho: "NONE" },
                Panel: { ByWho: "OTHER", Weight: 0 }
            };
        }
        else if ($scope.building.RoofWallCladding.WallPanel.REW.Condition == "NONE") {
            $scope.building.RoofWallCladding.WallPanel.REW.Cladding = null;
            $scope.DisableGirtREW = false;

            //= {
            //    Cladding: null,
            //    Condition: "NONE",
            //    GirtCondition: "NONE",
            //    GirtConditionSpecified: true
            //};
        }
    };
    //EnD REW 

    // CoPy Paste 
    $scope.CopyObj = {};
    $scope.CanCopy = true;
    $scope.CopyCladding = function (obj) {
        $scope.CopyObj = obj;
        $scope.CanCopy = false;
    };
    $scope.PasteNSWCladding = function () {
        $scope.building.RoofWallCladding.WallPanel.NSW = $scope.CopyObj;
        $scope.CanCopy = true;

    };
    $scope.PasteFSWCladding = function () {
        $scope.building.RoofWallCladding.WallPanel.FSW = $scope.CopyObj;
        $scope.CanCopy = true;

    };
    $scope.PasteLEWCladding = function () {
        $scope.building.RoofWallCladding.WallPanel.LEW = $scope.CopyObj;
        $scope.CanCopy = true;
    };
    $scope.PasteREWCladding = function () {
        $scope.building.RoofWallCladding.WallPanel.REW = $scope.CopyObj;
        $scope.CanCopy = true;
    };

    $scope.PasteAllCladding = function () {
        //var newcOPY = angular.copy($scope.CopyObj);
        $scope.building.RoofWallCladding.WallPanel.NSW = angular.copy($scope.CopyObj);
        $scope.building.RoofWallCladding.WallPanel.FSW = angular.copy($scope.CopyObj);
        $scope.building.RoofWallCladding.WallPanel.LEW = angular.copy($scope.CopyObj);
        $scope.building.RoofWallCladding.WallPanel.REW = angular.copy($scope.CopyObj);
        $scope.CanCopy = true;
    };
    //EndCoPy Paste 



    // Check Obj is on list or not 
    $scope.CheckObj = function containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj)
            { return true; }
        }
        return false;
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
        $scope.building.RoofWallCladding.Remarks.Remark[index].State = "false";
    };
    // Undo action (delete)
    $scope.UndoRemark = function () {
        $scope.building.RoofWallCladding.Remarks.Remark.push($scope.Remarkhistory[$scope.Remarkhistory.length - 1]);
        $scope.Remarkhistory.pop();
    };
    $scope.Remarkword = "Add";
    $scope.RemarkIndex = 0;
    // Reset new data model
    $scope.ResetRemark = function () {
        $scope.Remarkword = "Add";
        var id = 1;
        if ($scope.building.RoofWallCladding.Remarks.Remark)
            id = $scope.building.RoofWallCladding.Remarks.Remark.length + 1;
        $scope.newRemark = {
            ID: id,
            Remark: "",
            State: "true"
        };
    };
    //Add  Bracing 
    $scope.AddRemark = function () {
        if ($scope.building.RoofWallCladding.Remarks.Remark)
            $scope.building.RoofWallCladding.Remarks.Remark.push(angular.copy($scope.newRemark));
        else
            $scope.building.RoofWallCladding.Remarks.Remark = [angular.copy($scope.newRemark)];
    };
    $scope.RemarkUpdate = function (index) {
        $scope.newRemark = angular.copy($scope.building.RoofWallCladding.Remarks.Remark[index]);
        $scope.RemarkIndex = index;
        $('#RemarkModal').modal('show');
        $scope.Remarkword = "Update";

        $scope.newRemark = angular.copy($scope.building.RoofWallCladding.Remarks.Remark[index]);

    };
    $scope.AddUpdateRemark = function () {
        if ($scope.Remarkword == "Add")
            $scope.AddRemark();
        else if ($scope.Remarkword == "Update")
            $scope.ModyfyRemark();
    };
    $scope.ModyfyRemark = function () {
        $scope.building.RoofWallCladding.Remarks.Remark[$scope.RemarkIndex] = angular.copy($scope.newRemark);
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