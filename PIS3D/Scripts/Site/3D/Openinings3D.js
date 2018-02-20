var AccTexture;
var ShiftAcc = 0
function CreateOpening(BA) {
    //AccTexture = loader.load('../Image/ZamiLogo.png');
    //AccTexture.wrapS = AccTexture.wrapT = THREE.RepeatWrapping;
    //AccTexture.anisotropy = 16;
    var basePoint = new THREE.Vector3(BALength + 2.5, PeakHeghit - .5 * scale, PeakWidth);
    //var Logo = Draw3DObj(AccTexture, true, 1.5 * scale, .5 * scale, basePoint, 1);
    //scene.add(Logo);
    try {
        var loader = new THREE.FontLoader();

        loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {

            var textGeo = new THREE.TextGeometry("ZAMIL STEEL", {

                font: font,

                size: 10,
                height: 10,
                curveSegments: 12,

                bevelThickness: 2,
                bevelSize: 5,
                bevelEnabled: false

            });

            var textMaterial = new THREE.MeshPhongMaterial({ color: 0x013ea0 });

            var mesh = new THREE.Mesh(textGeo, textMaterial);
            //mesh.position.set(100, 100, 100);
            mesh.position.z = basePoint.x - BALength / 2;
        mesh.position.x = basePoint.z - shiftLeft - 30;
        mesh.position.y = basePoint.y ;

            scene.add(mesh);

        });
    } catch (ex) { alert(ex) }



    $.each(BA.Openings, function (key, value) {
        GetOpening(key, value);
    });
};

function GetOpening(key, value) {
    var str = key;
    str = str.substring(0, str.length - 1);
    var AccName = str;
    var AccObj = ObjByString(value, AccName);

    if (AccObj){
        //if ( AccName == "PersonnelDoor")
        DrawAcc(AccObj, AccName);
    }
};


function DrawAcc(AccObj, AccName) {
    try {
        for (var O = 0; O < AccObj.length; O++) {
            CurObj = AccObj[O];
            ShiftAcc=0;
            var AccAssignTo = CurObj.AssignTo;
            var Acclocationx = parseFloat(CurObj.LocationX) * scale;
            var Acclocationy = parseFloat(CurObj.LocationY) * scale;
            if (AccName == "Louver" || AccName == "Window" || AccName == "RollupDoor" || AccName == "SlidingDoor" || AccName == "PersonnelDoor") {
                var AccWidth = parseFloat(CurObj.Width) * scale / 1000; // mm to m 
                var AccHeight = parseFloat(CurObj.Height) * scale / 1000; // mm to m 
                if ( AccAssignTo == "REW")
                    ShiftAcc = 0.8;
                else if (AccAssignTo == "LEW" )
                    ShiftAcc = - 0.8;
                else if (AccAssignTo == "NSW")
                    ShiftAcc = - 0.8; 
                else if (AccAssignTo == "FSW")
                        ShiftAcc = 0.8;
            }
            else {
                var AccWidth = parseFloat(CurObj.Width) * scale;
                var AccHeight = parseFloat(CurObj.Height) * scale;
            }

            var AccReferenceTo = CurObj.ReferenceTo;
            var AccOn = CurObj.On;
            var plusx = 0;
            var basePoint;
            var Direction;

            if (AccAssignTo == "NSW" || AccAssignTo == "FSW") {
                switch (CurObj.LocationFrom) {
                    case "BOTTOM RIGHT":
                        basePoint = new THREE.Vector3(Acclocationx - AccWidth / 2, Acclocationy, 0);
                        break;
                    case "CENTER":
                        basePoint = new THREE.Vector3(Acclocationx, Acclocationy - AccHeight / 2, 0);
                        break;
                    case "TOP LEFT":
                        basePoint = new THREE.Vector3(Acclocationx + AccWidth / 2, Acclocationy - AccHeight, 0);
                        break;
                    case "TOP RIGHT":
                        basePoint = new THREE.Vector3(Acclocationx - AccWidth / 2, Acclocationy - AccHeight, 0);
                        break;
                    default:
                        basePoint = new THREE.Vector3(Acclocationx + AccWidth / 2, Acclocationy, 0);
                        break;
                }
                Direction = 0;
            }
            else if (AccAssignTo == "LEW" || AccAssignTo == "REW") {
                switch (CurObj.LocationFrom) {
                    case "BOTTOM RIGHT":
                        basePoint = new THREE.Vector3(0, Acclocationy, Acclocationx - AccWidth / 2);
                        break;
                    case "CENTER":
                        basePoint = new THREE.Vector3(0, Acclocationy - AccHeight / 2, Acclocationx);
                        break;
                    case "TOP LEFT":
                        basePoint = new THREE.Vector3(0, Acclocationy - AccHeight, Acclocationx + AccWidth / 2);
                        break;
                    case "TOP RIGHT":
                        basePoint = new THREE.Vector3(0, Acclocationy - AccHeight, Acclocationx - AccWidth / 2);
                        break;
                    default:
                        basePoint = new THREE.Vector3(0, Acclocationy, Acclocationx + AccWidth / 2);
                        break;
                }
                Direction = 1;
            }

            if (AccReferenceTo != "SURFACE") {
                if (AccReferenceTo == "BAY") {
                    for (var b = 0 ; bays.Bay[b].ID < AccOn ; b++) {
                        plusx += bays.Bay[b].Width * scale;
                    }
                    basePoint.x = plusx + basePoint.x;
                    if (AccAssignTo == "FSW") {
                        basePoint.z = basePoint.z + BAWidth;
                        basePoint.z = basePoint.z + 2;
                    }
                }
                else //span
                {
                    if (AccAssignTo == "REW") {
                        var sum = 0;
                        var rewindx = REWWidthModule[AccOn - 1] * scale;
                        for (var i = 0; i < AccOn; i++) {
                            sum += parseFloat(REWWidthModule[i]) * scale;
                        }
                        plusx = sum - rewindx;
                        basePoint.x = BALength + basePoint.x + 2.5;
                    }
                    else if (AccAssignTo == "LEW") {
                        var sum = 0;
                        var lewindx = LEWWidthModule[AccOn - 1] * scale;
                        for (var i = 0; i < AccOn; i++) {
                            sum += parseFloat(LEWWidthModule[i]) * scale;
                        }
                        plusx = sum - lewindx;
                        basePoint.x = basePoint.x - 3;
                    }
                    basePoint.z = plusx + basePoint.z;

                }
            }
            else {
                if (AccAssignTo == "FSW") {
                    basePoint.z = basePoint.z + BAWidth;
                    basePoint.z = basePoint.z + 2;
                }
                if (AccAssignTo == "REW") {
                    basePoint.x = BALength + basePoint.x + 2.5;
                }
                else if (AccAssignTo == "LEW") {
                    basePoint.x = basePoint.x - 2.5;
                }
            }
            if (AccName == "OpenWall")
                AccTexture = CreateAccTexture(AccName, CurObj.OpenFor, AccWidth, AccHeight, basePoint, Direction);
            else if (AccName == "RollupDoor")
                AccTexture = CreateAccTexture(AccName, CurObj.Operation, AccWidth, AccHeight, basePoint, Direction);
            else
                AccTexture = CreateAccTexture(AccName, CurObj.Type, AccWidth, AccHeight, basePoint, Direction);

        }
    }
    catch (ex) {
        //alert(ex);
    }
};

function CreateAccTexture(AccName, Type, AccWidth, AccHeight, basePoint, Direction) {
    if (AccName == "PersonnelDoor") {
        switch (Type) {
            case "SINGLE":
                if (AccWidth <= 0) AccWidth = 0.915;
                if (AccHeight <= 0) AccAccHeight = 2.135;
                AccTexture = loader.load('../Image/Resources/SINGLE_PD.jpg');
                break;
            case "DOUBLE":
                if (AccWidth <= 0) AccWidth = 1.829;
                if (AccHeight <= 0) AccHeight = 2.135;
                AccTexture = loader.load('../Image/Resources/DOUBLE_PD.jpg');
                break;
            case "PILOT":
                if (AccWidth <= 0) AccWidth = 1.829;
                if (AccHeight <= 0) AccHeight = 2.135;
                AccTexture = loader.load('../Image/Resources/DOUBLE_PD.jpg');
                break;
            default:
                if (AccWidth <= 0) AccWidth = 0.915;
                if (AccHeight <= 0) AccHeight = 2.135;
                AccTexture = loader.load('../Image/Resources/SINGLE_PD.jpg');
                break;
        }
    }
    else if (AccName == "SlidingDoor") {
        AccTexture = loader.load('../Image/Resources/Single Door.jpeg');
        //switch (Type) {
        //    case "SINGLE LEFT":
        //        break;
        //    case "SINGLE RIGHT":
        //        break;
        //    case "DOUBLE SLIDING":

        //        break;
        //    default:
        //        break;
        //}
    }
    else if (AccName == "Louver") {
        switch (Type) {
            case "Fixed":
                if (AccWidth <= 0) AccWidth = 1.5;
                if (AccHeight <= 0) AccHeight = 1;
                AccTexture = loader.load('../Image/Resources/fixedlouver.jpg');
                break;
            case "Adjustable":
                if (AccWidth <= 0) AccWidth = 0.9;
                if (AccHeight <= 0) AccHeight = 1;
                AccTexture = loader.load('../Image/Resources/adjustablelouver.jpg');
                break;
            default:
                AccTexture = loader.load('../Image/Resources/fixedlouver.jpg');
                break;
        }
    }
    else if (AccName == "OpenWall") {
        switch (Type) {
            case "ACCESS":
            case "NONE": //none,acess
                AccTexture = loader.load('../Image/Resources/white.jpg');
                break;
            case "BLOCK WALL":
                AccTexture = loader.load('../Image/Resources/BlockWall.jpg');
                AccTexture.repeat.set(10, .25);
                break;
            case "PRECAST PANEL":
                AccTexture = loader.load('../Image/Resources/BlockWall.jpg');
                break;
            case "GLAZING":
                AccTexture = loader.load('../Image/Resources/GLASS.jpg');
                break;
            default:
                AccTexture = loader.load('../Image/Resources/white.jpg');
                break;
        }
    }
    else if (AccName == "RollupDoor") {
        switch (Type) {
            case "MANUAL":
                AccTexture = loader.load('../Image/Resources/rollupdoor.jpg');
                break;
            case "ELECTRICAL":
                AccTexture = loader.load('../Image/Resources/rollupdoor.jpg');
                break;
            default:
                AccTexture = loader.load('../Image/Resources/rollupdoor.jpg');
                break;
        }
    }
    else if (AccName == "Window") {
        switch (Type) {

            case "STANDARD":
                AccTexture = loader.load('../Image/Resources/window.jpg');
                break;
            case "CONTINUOUS":
                AccTexture = loader.load('../Image/Resources/cwindow.png');
                break;
            default:
                AccTexture = loader.load('../Image/Resources/window.jpg');
                break;
        }
    }
    else if (AccName == "TranslucentPanel") {
        AccTexture = loader.load('../Image/Resources/white.jpg');

    }
    else if (AccName == "PowerVentilator") {
        AccTexture = loader.load('../Image/Resources/ventilationFan.jpg');
    }
    else if (AccName == "FramedOpening") {
        AccTexture = loader.load('../Image/Resources/white.jpg');
    }
        //check
    else if (AccName == "GravityRidgeVentillator") {
        AccTexture = loader.load('../Image/Resources/white.jpg');
    }
    else if (AccName == "FiberglassRoofCurb") {
        AccTexture = loader.load('../Image/Resources/white.jpg');
    }
    else {
        AccTexture = loader.load('../Image/Resources/ventilationFan.jpg');
    }
    AccTexture.wrapS = AccTexture.wrapT = THREE.RepeatWrapping;
    AccTexture.anisotropy = 16;


    var Acc3DObj = Draw3DObj(AccTexture, true, AccWidth, AccHeight, basePoint, Direction);
    scene.add(Acc3DObj);
    return AccTexture;
};

function Draw3DObj(AccTexture, isDoubleSided, width, height, basePoint, Direction) {
    try {


        var AccMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, specular: 0xFFFFFF, map: AccTexture, side: THREE.DoubleSide });

        var geometry = new THREE.PlaneGeometry(width, height)
        var mesh = new THREE.Mesh(geometry, AccMaterial);

        mesh.position.z = basePoint.x - BALength / 2;
        mesh.position.x = basePoint.z - shiftLeft - 1;
        mesh.position.y = basePoint.y + height / 2;
        if (Direction == 0) {
            mesh.rotation.y = -Math.PI / 2;
            mesh.position.x = mesh.position.x + ShiftAcc;

        }
        else
        {
            mesh.position.z = mesh.position.z + ShiftAcc;
        }
        mesh.receiveShadow = true;
        return mesh;
    }
    catch (ex) {
        return null;
    }
};



//Get Object By String Prop
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