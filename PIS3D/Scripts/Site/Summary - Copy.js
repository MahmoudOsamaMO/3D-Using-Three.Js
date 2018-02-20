
//document.getElementById("submit").onclick = function () {
//    document.getElementById("panel").className = "panel panel-success";

//};
//var building;
//var buildingvar = {};

function Employee(name, position, salary, office) {
    this.name = name;
    this.position = position;
    this.salary = salary;
    this._office = office;

    this.office = function () {
        return this._office;
    }
};

var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('SummaryCtrl', function ($scope, $http,$log) {
       
       
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


    $scope.building = {};
    //var buildingvar = {};
    $scope.Newxml = {};
    //Get BuildgArea From seesion 
    $http({
        method: "GET",
        url: "/Home/Getjson"
    }).then(function mySucces(response) {
        console.log(response.data);
        buildingvar = response.data;
        $scope.building = buildingvar;
        //$scope.family == buildingvar;
        //$scope.myTree == buildingvar;
        //$scope.building = $scope.json2xml($scope.building, $scope.Newxml);
        //console.log($scope.Newxml);
        //    $('#myDiv table').each(function () {
        //        //alert(this.id);
        //        var table = this;
        //        this.attributes.datasrc=$scope.building;
        //});

    }, function myError(response) {
        alert("error");
    });
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

    $scope.json2xml = function (o, tab) {
        var toXml = function (v, name, ind) {
            var xml = "";
            if (v instanceof Array) {
                for (var i = 0, n = v.length; i < n; i++)
                    xml += ind + toXml(v[i], name, ind + "\t") + "\n";
            }
            else if (typeof (v) == "object") {
                var hasChild = false;
                xml += ind + "<" + name;
                for (var m in v) {
                    if (m.charAt(0) == "@")
                        xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                    else
                        hasChild = true;
                }
                xml += hasChild ? ">" : "/>";
                if (hasChild) {
                    for (var m in v) {
                        if (m == "#text")
                            xml += v[m];
                        else if (m == "#cdata")
                            xml += "<![CDATA[" + v[m] + "]]>";
                        else if (m.charAt(0) != "@")
                            xml += toXml(v[m], m, ind + "\t");
                    }
                    xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
                }
            }
            else {
                xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
            }
            return xml;
        }, xml = "";
        for (var m in o)
            xml += toXml(o[m], m, "");
        return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
    };
});

app.directive("tree", function ($compile) {
    return {
        restrict: "E",
        transclude: true,
        scope: { family: '=' },
        template:
            '<ul>' +
                '<li ng-transclude></li>' +
                '<p>{{ family.name }}</p>' +
                '<li ng-repeat="child in family.children">' +
                    '<tree family="child"></tree>' +
                '</li>' +
            '</ul>',
        compile: function (tElement, tAttr, transclude) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function (scope, iElement, iAttr) {
                if (!compiledContents) {
                    compiledContents = $compile(contents, transclude);
                }
                compiledContents(scope, function (clone, scope) {
                    iElement.append(clone);
                });
            };
        }
    };
});
