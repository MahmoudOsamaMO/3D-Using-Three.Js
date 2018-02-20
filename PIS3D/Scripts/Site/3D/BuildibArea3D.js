var loader = new THREE.TextureLoader();
var BATexture = loader.load('../Scripts/js/textures/sheeting2.bmp');
BATexture.wrapT = THREE.RepeatWrapping;
BATexture.wrapS = THREE.RepeatWrapping;
BATexture.repeat.set(.01, .01);
BATexture.anisotropy = 10;
//BATexture.flipY = false;
var material1 = new THREE.MeshPhongMaterial({ wireframe: false, color: 0xb0b4ba, specular: 0x111111, map: BATexture, vertexColors: THREE.VertexColors });    // "ZA"
//var material1 = new THREE.MeshPhongMaterial({ wireframe: false, map: THREE.ImageUtils.loadTexture('../Scripts/js/textures/sheetwall.png'), vertexColors: THREE.VertexColors });
var virical = [
new THREE.Vector2(0, 0),
new THREE.Vector2(.5, 0),

new THREE.Vector2(0.5, 1),
new THREE.Vector2(0, 1)
];
var Horzintal = [
new THREE.Vector2(0.5, 0),
new THREE.Vector2(1, 0),
new THREE.Vector2(1, 1),
new THREE.Vector2(0.5, 1)
];

//material1.side = THREE.DoubleSide;
var scale = 30;
var hexNSW, hexFSW, hexREW, hexLEW, hexRoof;
var Colors =
[
    { color: 0xbabdc1, tag: "ZA", name: "ZA" },
    { color: 0xF0F0B9, tag: "FW", name: "Frost White-[NCS-S2005-G70Y]" },
    { color: 0xffffff, tag: "TBE", name: "TBE" },
    { color: 0xBF9060, tag: "AB", name: "Arabian Beige-[NCS-S3020-Y30R]" },
    { color: 0x9FAF7F, tag: "CG", name: "Cactus Green-[NCS-S3020-G40Y]" },
    { color: 0x4A729B, tag: "RB", name: "Royal Blue-[RAL-5012]" },
    { color: 0xCC0032, tag: "FR", name: "Flame Red-[RAL-3000]" },
    { color: 0x317D02, tag: "LG", name: "Leaf Green-[RAL-6002]" },
    { color: 0xFDE302, tag: "DY", name: "Daisy Yellow-[RAL-1021]" },
    { color: 0x50707F, tag: "SB", name: "Shasta Blue-[NCS-S5020-B10G]" },
    { color: 0xA09E9E, tag: "SM", name: "Sliver Metallic-[RAL-9006]" },
    { color: 0x82ACBB, tag: "GBM", name: "Grey Blue Metallic" },
    { color: 0x094788, tag: "GB", name: "Galaxy Blue-[RAL 5009]" },
    { color: 0xffffff, tag: "RAL", name: "RAL" }
];


// Building  Golable Variables 
var BAREW;
//var BALEW = BA.GeneralData.Gables.Gable[BA.GeneralData.Gables.Gable.Length-1].LeftHeight;
var PeakHeghit;
var PeakWidth;
var BAWidth;
var BALength;
var shiftbottm; // shift to bottom value
var shiftLeft; // shift to left value to center building
var REWWidthModule;
var LEWWidthModule;
var bays;
var countLEWSpans=0;
var countREWSpans = 0;
////****************************************

function CreatBuilding(BA) {
    hexNSW = 0xffffff;
    hexFSW = 0xffffff;
    hexREW = 0xffffff;
    hexLEW = 0xffffff;
    hexRoof = 0xffffff;

    var folder = gui.addFolder('3D Oprtions');
    folder.add(material1, 'wireframe');

    // Intialize All Golable Variables 
    BAREW = BA.GeneralData.Gables.Gable[0].RightHeight;
    PeakHeghit = 0;
    PeakWidth = 0;

    BAWidth = BA.GeneralData.Width * scale;
    BALength = BA.GeneralData.Length * scale;
    shiftbottm = 0; // shift to bottom value
    shiftLeft = -BAWidth / 2; // shift to left value to center building
    REWWidthModule = [];
    LEWWidthModule = [];

    for (var k = 0; k < BA.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules.length ; k++) {
        for (var i = 0; i < BA.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules.length ; i++) {
            countLEWSpans += BA.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width.length;
            var CurWidthModule = BA.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width;
            LEWWidthModule =LEWWidthModule.concat(CurWidthModule)
        }
    }
    for (var k = 0; k < BA.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules.length ; k++) {
        for (var i = 0; i < BA.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules.length ; i++) {
            countREWSpans += BA.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width.length;
            var CurWidthModule = BA.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules[k].WidthModules[i].Width;
            REWWidthModule =REWWidthModule.concat(CurWidthModule)
        }
    }

    bays = BA.GeneralData.Bays;
    //************************************************************************

    try {
        GetRoofWallsColors(BA);
    }
    catch (ex) { };
    for (var i = 0 ; i < BA.GeneralData.Gables.Gable.length ; i++)// Gables 
    {
        var Gable = BA.GeneralData.Gables.Gable[i];

        var GableRidgeDist = Gable.RidgeDistance * scale;
        var GableREW = Gable.RightHeight * scale;
        var GableLEW = Gable.LeftHeight * scale;
        var GablePeakPoint = (Gable.LeftSlope / 10 * Gable.RidgeDistance + Gable.LeftHeight) * scale;
        
        if (PeakHeghit == 0) {
            PeakHeghit = GablePeakPoint;
            PeakWidth = GableRidgeDist;
        }
        if (PeakHeghit < GablePeakPoint) {
            PeakHeghit = GablePeakPoint;
        }

        var GableWidth = Gable.Width * scale;
        var zPos = -BALength / 2;
        for (var j = 0 ; j < BA.GeneralData.Bays.Bay.length ; j++)// Bays
        {
            var GableShape = new THREE.Shape();
            var CurrBay = BA.GeneralData.Bays.Bay[j];

            GableShape.moveTo(shiftLeft, shiftbottm); /// Center our Gables
            GableShape.lineTo(shiftLeft, GableLEW + shiftbottm);
            GableShape.lineTo(GableRidgeDist + shiftLeft, GablePeakPoint + shiftbottm);
            GableShape.lineTo(GableWidth + shiftLeft, GableREW + shiftbottm);
            GableShape.lineTo(GableWidth + shiftLeft, +shiftbottm);
            GableShape.lineTo(shiftLeft, +shiftbottm);

            var options = {
                amount: BA.GeneralData.Bays.Bay[j].Width * scale, // BALength,  // Length of build
                bevelThickness: 2,
                bevelSize: 0.5,
                bevelEnabled: true,
                bevelSegments: 3,
                bevelEnabled: true,
                curveSegments: 12,
                steps: 1,
            };
            var GableGeom = createMesh(new THREE.ExtrudeGeometry(GableShape, options));
            GableGeom.position.z = zPos;

            for (var k = 0 ; k < GableGeom.geometry.faces.length ; k++) {
                //var hex = Math.random() * 0xffffff;
                if (k == 0) //FSW
                {
                    GableGeom.geometry.faces[k].color.setHex(hexFSW);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexFSW);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexFSW);

                    //GableGeom.geometry.faceVertexUvs[0][k] = [Horzintal[0],Horzintal[1],Horzintal[2],Horzintal[3]];
                    //GableGeom.geometry.faceVertexUvs[0][k + 1] = [Horzintal[3], Horzintal[2], Horzintal[1], Horzintal[0]];
                    //GableGeom.geometry.faceVertexUvs[0][k + 2] = [Horzintal[0], Horzintal[1], Horzintal[2], Horzintal[3]];
                }

                if (k == 3) { //NSW
                    GableGeom.geometry.faces[k].color.setHex(hexNSW);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexNSW);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexNSW);
                }
                if (k == 12) { // REW 
                    GableGeom.geometry.faces[k].color.setHex(hexREW);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexREW);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexREW);
                }
                if (k == 26) { //Roof
                    GableGeom.geometry.faces[k].color.setHex(hexRoof);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexRoof);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexRoof);
                }
                if (k == 39) { //Roof
                    GableGeom.geometry.faces[k].color.setHex(hexRoof);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexRoof);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexRoof);
                }
                if (k == 54) { //LEW
                    GableGeom.geometry.faces[k].color.setHex(hexLEW);
                    GableGeom.geometry.faces[k + 1].color.setHex(hexLEW);
                    GableGeom.geometry.faces[k + 2].color.setHex(hexLEW);
                }
            }
            if (CurrBay.BracingAvailable) {
                AddBracing(CurrBay, shiftLeft, GableLEW, shiftbottm, zPos);
                AddBracing(CurrBay, shiftLeft + GableWidth + 2, GableREW, shiftbottm, zPos);
            }
            zPos = zPos + CurrBay.Width * scale;
            //GableGeom.scale = -1;
            scene.add(GableGeom);
        }
        shiftLeft = shiftLeft + GableWidth;
    }
    //Accse
    try {
        //PersonalDoor(BA);
        CreateOpening(BA); 
        CreateSubSystems(BA);
    } catch (ex) { };

};

function GetRoofWallsColors(BA) {

    if (BA.RoofWallCladding.RoofPanel.Panel.ByWho == "ZS") {
        if (BA.RoofWallCladding.RoofPanel.Panel.PanelProfile.Description) {
            if (BA.RoofWallCladding.RoofPanel.Panel.PanelProfile.Description.indexOf("OUTER") !== -1) {
                var arr = BA.RoofWallCladding.RoofPanel.Panel.PanelProfile.Description.split(';');
                //var tagcolor = arr[0].slice(-2);
                var tagcolor = arr[0].split('-');
                var tag = tagcolor[tagcolor.length - 1];
                var result = $.grep(Colors, function (e) { return e.tag == tag; });
                hexRoof = result[0].color;
            }
            else {
                var tagcolor = BA.RoofWallCladding.RoofPanel.Panel.PanelProfile.Description.split('-');
                var tag = tagcolor[tagcolor.length - 1];
                var result = $.grep(Colors, function (e) { return e.tag == tag; });
                hexRoof = result[0].color;
            }
        }
    }
    if (BA.RoofWallCladding.WallPanel.FSW.Cladding)
        if (BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel) {
            if (BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel.ByWho == "ZS") {
                if (BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile.Description) {
                    if (BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile.Description.indexOf("OUTER") !== -1) {
                        var arr = BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile.Description.split(';');
                        var tagcolor = arr[0].split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexFSW = result[0].color;
                    }
                    else {
                        var tagcolor = BA.RoofWallCladding.WallPanel.FSW.Cladding.Panel.PanelProfile.Description.split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexFSW = result[0].color;
                    }
                }
            }
        }
    if (BA.RoofWallCladding.WallPanel.NSW.Cladding)
        if (BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel) {
            if (BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel.ByWho == "ZS") {
                if (BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile.Description) {
                    if (BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile.Description.indexOf("OUTER") !== -1) {
                        var arr = BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile.Description.split(';');
                        var tagcolor = arr[0].split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexNSW = result[0].color;
                    }
                    else {
                        var tagcolor = BA.RoofWallCladding.WallPanel.NSW.Cladding.Panel.PanelProfile.Description.split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexNSW = result[0].color;
                    }
                }
            }
        }
    if (BA.RoofWallCladding.WallPanel.REW.Cladding)
        if (BA.RoofWallCladding.WallPanel.REW.Cladding.Panel) {
            if (BA.RoofWallCladding.WallPanel.REW.Cladding.Panel.ByWho == "ZS") {
                if (BA.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile.Description) {
                    if (BA.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile.Description.indexOf("OUTER") !== -1) {
                        var arr = BA.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile.Description.split(';');
                        var tagcolor = arr[0].split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexREW = result[0].color;
                    }
                    else {
                        var tagcolor = BA.RoofWallCladding.WallPanel.REW.Cladding.Panel.PanelProfile.Description.split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexREW = result[0].color;
                    }
                }
            }
        }
    if (BA.RoofWallCladding.WallPanel.LEW.Cladding)
        if (BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel) {
            if (BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel.ByWho == "ZS") {
                if (BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile.Description) {
                    if (BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile.Description.indexOf("OUTER") !== -1) {
                        var arr = BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile.Description.split(';');
                        var tagcolor = arr[0].split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexLEW = result[0].color;
                    }
                    else {
                        var tagcolor = BA.RoofWallCladding.WallPanel.LEW.Cladding.Panel.PanelProfile.Description.split('-');
                        var tag = tagcolor[tagcolor.length - 1];
                        var result = $.grep(Colors, function (e) { return e.tag == tag; });
                        hexLEW = result[0].color;
                    }
                }
            }
        }


};

function AddBracing(CurrBay, shiftLeft, GableLEW, shiftbottm, zPos) {
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 50 });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, GableLEW + shiftbottm, zPos + CurrBay.Width * scale));
    geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm, zPos));
    var line = new THREE.Line(geometry, material);
    scene.add(line);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, GableLEW + shiftbottm, zPos));
    geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm, zPos + CurrBay.Width * scale));
    var line = new THREE.Line(geometry, material);
    scene.add(line);
};

function chooseFromHash(gui, mesh, geometry, material1) {

    var selectedMaterial = window.location.hash.substring(1) || "MeshBasicMaterial";
    var material;

    switch (selectedMaterial) {

        case "MeshBasicMaterial":

            //material = new THREE.MeshBasicMaterial({ color: 0x2194CE });
            material = material1;
            guiMeshBasicMaterial(gui, mesh, material, geometry);

            return material;

            break;
    }

};

function guiMeshBasicMaterial(gui, mesh, material, geometry) {

    var folder = gui.addFolder('3D Oprtions');
    folder.add(material, 'wireframe');
    //folder.add(material, 'wireframeLinewidth', 0, 10);
};


function createMesh(geom) {

    //geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));

    //var loader = new THREE.TextureLoader();
    //var BATexture = loader.load('../Scripts/js/textures/sheeting.bmp');
    //BATexture.wrapS = BATexture.wrapT = THREE.RepeatWrapping;
    //BATexture.repeat.set(.01, .01);
    //BATexture.anisotropy = 10;

    //var material1 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xb0b4ba, specular: 0x111111, map: BATexture });    // "ZA"
    var material2 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xF0F0B9, specular: 0x111111, map: BATexture });    // "FW", 
    var material3 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xffffff, specular: 0x111111, map: BATexture });    // "TBE",
    var material4 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xBF9060, specular: 0x111111, map: BATexture });    // "AB", 
    var material5 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x9FAF7F, specular: 0x111111, map: BATexture });    // "CG", 
    var material6 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x4A729B, specular: 0x111111, map: BATexture });    // "RB", 
    var material7 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xCC0032, specular: 0x111111, map: BATexture });    // "FR", 
    var material8 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x317D02, specular: 0x111111, map: BATexture });    // "LG", 
    var material9 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xFDE302, specular: 0x111111, map: BATexture });    // "DY", 
    var material10 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x50707F, specular: 0x111111, map: BATexture });   // "SB", 
    var material11 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xA09E9E, specular: 0x111111, map: BATexture });   // "SM", 
    var material12 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x82ACBB, specular: 0x111111, map: BATexture });   // "GBM",
    var material13 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x094788, specular: 0x111111, map: BATexture });   // "GB", 
    var material14 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xffffff, specular: 0x111111, map: BATexture });   // "RAL"

    var materials = [material1, material2, material3, material4, material5, material6, material7, material8, material9, material10, material11, material12, material13, material14];

    var meshFaceMaterial = new THREE.MeshFaceMaterial(materials);
    //var l = geom.faces.length / 2;
    //for (var i = 0; i < l; i++) {
    //    var j = 2 * i;
    //    geom.faces[j].materialIndex = i % 14;
    //    geom.faces[j + 1].materialIndex = i % 14;
    //}

    var mesh = new THREE.Mesh(geom, material1);

    //mesh.material = chooseFromHash(gui, mesh, geom ,material1);

    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
};


function TestSave() {
    //saveSTL(scene, "Any");
    var result = scene.toJSON();
    //localStorage.dfb = JSON.stringify(result);
    var aaa = JSON.stringify(result);
    var blob = new Blob([aaa], { type: 'text/plain' });

    saveAs(blob, name + '.json');

}