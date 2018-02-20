function CreateSubSystems(BA) {

    $.each(BA.Subsystems, function (key, value) {
        GetSubSystem(key, value);
    });
};

function GetSubSystem(key, value) {
    //var str = key;
    //str = str.substring(0, str.length - 1);
    var SubName = key;
    var SubObj = ObjByString(value, SubName);

    if (SubObj) {
        DrawSub(SubObj, SubName);
    }
};

function DrawSub(SubObj, SubName) {
    try {
        for (var O = 0; O < SubObj.length; O++) {
            CurObj = SubObj[O];
            var SubAssignTo = CurObj.AssignTo;
            var SubStartBay = CurObj.StartBay;
            var SubEndBay = CurObj.EndBay;
            var SubWidth = 0;
            var SubHeight = 0;
            var SubClearHeight = 0;
            var SubSlope = 1;

            var Start = 0;
            var End = 0;
            var basePoint;
            var Direction;
            var SubLength = 0;
            var inside = false;

            if (SubName == "Canopies") {
                SubWidth = parseFloat(CurObj.Width) * scale; // mm to m 
                SubClearHeight = parseFloat(CurObj.ClearHeight) * scale; // mm to m 
                SubSlope = parseFloat(CurObj.CanopyRoofSlope) / 10;
                inside = CurObj.Inside;
                if (inside == true) {
                    SubSlope = SubSlope * -1;
                    SubHeight = SubClearHeight;
                }
                else {
                    SubSlope = SubSlope;
                    SubHeight = SubClearHeight + SubSlope * SubWidth;
                }

            }
            else {
                SubWidth = parseFloat(CurObj.Width) * scale;
                SubClearHeight = parseFloat(CurObj.ClearHeight) * scale;
            }


            if (SubAssignTo == "NSW" || SubAssignTo == "FSW") {
                basePoint = new THREE.Vector3(0, 0, 0);
                for (var b = 0 ; bays.Bay[b].ID < SubStartBay ; b++) {
                    Start += bays.Bay[b].Width * scale;
                }
                for (var b = 0 ; b <= SubEndBay - 1 ; b++) {
                    End += bays.Bay[b].Width * scale;
                }
                SubLength = Start - End
                SubLength = Math.abs(SubLength);
                basePoint.x = Start + SubLength / 2;
                basePoint.z = -SubWidth / 2;
                basePoint.y = SubHeight;
                Direction = 0;
                if (SubAssignTo == "FSW") {
                    Direction = 1;
                    basePoint.z = basePoint.z + SubWidth+ BAWidth;
                    //basePoint.z = basePoint.z + 2;
                }
            }
            else if (SubAssignTo == "LEW" || SubAssignTo == "REW") {
                basePoint = new THREE.Vector3(0, 0, 0);
                if (SubAssignTo == "REW") {
                    var sum = 0;
                    var rewindx = REWWidthModule[SubStartBay - 1] * scale;
                    for (var i = 0; i < SubStartBay; i++) {
                        sum += parseFloat(REWWidthModule[i]) * scale;
                    }
                    Start = sum - rewindx;
                    basePoint.x = BALength + basePoint.x + 2.5;
                }
                else if (SubAssignTo == "LEW") {
                    var sum = 0;
                    var lewindx = LEWWidthModule[SubStartBay - 1] * scale;
                    for (var i = 0; i < SubStartBay; i++) {
                        sum += parseFloat(LEWWidthModule[i]) * scale;
                    }
                    Start = sum - lewindx;
                    basePoint.x = basePoint.x - 3;
                }
                basePoint.z = Start + basePoint.z;
                Direction = 1;
            }

            if (SubAssignTo == "REW") {
                basePoint.x = BALength + basePoint.x + 2.5;
            }
            else if (SubAssignTo == "LEW") {
                basePoint.x = basePoint.x - 2.5;
            }
            var Sub3DObj = DrawSub3DObj(true, SubWidth, SubLength, basePoint, Direction, SubSlope);
            scene.add(Sub3DObj);
        }
    }
    catch (ex) {
        //alert(ex);
    }

    //var geometry = new THREE.BoxGeometry(100, 100, 100);
    //var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //var cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);
}


function DrawSub3DObj(isDoubleSided, width, Length, basePoint, Direction, SubSlope) {
    try {
        var SubMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF, specular: 0xFFFFFF
        });

        //var geometry = new THREE.PlaneGeometry(width, height)
        var geometry = new THREE.BoxGeometry(width, 5, Length);

        for (var i = 0; i < geometry.faces.length - 1; i++) {
            var color = Math.random() * 0xffffff
            geometry.faces[i].color.setHex(color);
            geometry.faces[i + 1].color.setHex(color);
            i++;
        }

        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.z = basePoint.x - BALength / 2;
        mesh.position.x = basePoint.z - shiftLeft ;
        mesh.position.y = basePoint.y;

        mesh.rotation.z = SubSlope * Math.PI / 4;
        if (Direction == 0) {
            //mesh.rotation.y = -Math.PI / 2;

        }
        else if (Direction == 1) {
            mesh.rotation.y = - Math.PI  ;
        }
        mesh.receiveShadow = true;
        return mesh;
    }
    catch (ex) {
        return null;
    }
};


function GetColorsFromDesc(Desc) {
    if (Desc) {
        if (Desc.indexOf("OUTER") !== -1) {
            var arr = Desc.split(';');
            //var tagcolor = arr[0].slice(-2);
            var tagcolor = arr[0].split('-');
            var tag = tagcolor[tagcolor.length - 1];
            var result = $.grep(Colors, function (e) { return e.tag == tag; });
            return result[0].color;
        }
        else {
            var tagcolor = Desc.split('-');
            var tag = tagcolor[tagcolor.length - 1];
            var result = $.grep(Colors, function (e) { return e.tag == tag; });
            return result[0].color;
        }
    }
    else
        return null;
};

