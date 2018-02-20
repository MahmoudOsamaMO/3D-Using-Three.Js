var Colors =
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

var params = {
    projection: 'normal',
    minScale: 10,
    wirestatus: false,
    rotate: true,
    clear: function () {

        removeDecals();

    }
};

if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, controls;
//var wirestatus = true;

// scene
scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1, 10000);

init();
animate();

function init() {
    var view_data;
    jQuery.ajax({
        type: "GET",
        url: "/Home/Getjson",
        dataType: 'json',
        cache: false,
        success: function (BA) {
            console.log(BA);
            container = document.createElement('div');
            container.className = 'v3D';
            document.body.insertBefore(container, document.getElementById('before'));

            // camera
            camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
            camera.position.x = 1000;
            camera.position.y = 50;
            camera.position.z = 1500;
            camera.lookAt(0, 0, 0);
            scene.add(camera);


            // lights
            var light, materials;
            scene.add(new THREE.AmbientLight(0x666666));
            light = new THREE.DirectionalLight(0xdfebff, 1.75);
            light.position.set(50, 200, 100);
            light.position.multiplyScalar(1.3);
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;

            var d = BA.GeneralData.Width * 20;
            light.shadow.camera.left = -d;
            light.shadow.camera.right = d;
            light.shadow.camera.top = d;
            light.shadow.camera.bottom = -d;
            light.shadow.camera.far = 1000;
            scene.add(light);





            // renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(scene.fog.color);
            container.appendChild(renderer.domElement);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.shadowMap.enabled = true;

            // controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI * 0.5;
            controls.minDistance = 1000;
            controls.maxDistance = 5000;
            //controls.wirestatus = true;

            //performance monitor
            stats = new Stats();
            window.addEventListener('resize', onWindowResize, false);

            var gui = new dat.GUI();
            gui.add(params, 'projection', { 'From cam to mesh': 'camera', 'Normal to mesh': 'normal' });
            gui.add(params, 'minScale', 1, 30);
            gui.add(params, 'wirestatus');
            gui.add(params, 'rotate');
            gui.add(params, 'clear');
            gui.open();

            var loader = new THREE.TextureLoader();
            //ground
            var groundTexture = loader.load('../Scripts/js/textures/terrain/7.jpg');
            groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
            groundTexture.repeat.set(25, 25);
            groundTexture.anisotropy = 16;
            var groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, map: groundTexture });
            var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
            mesh.position.y = -100;
            mesh.rotation.x = -Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add(mesh);

            var scale = 20;
            var BAREW = BA.GeneralData.Gables.Gable[0].RightHeight;
            //var BALEW = BA.GeneralData.Gables.Gable[BA.GeneralData.Gables.Gable.Length-1].LeftHeight;
            var PeakPoint = 100;
            var BAWidth = BA.GeneralData.Width * scale;
            var BALength = BA.GeneralData.Length * scale;
            var shiftbottm = -100; // shift to bottom value
            var shiftLeft = -BAWidth / 2; // shift to left value to center building
            for (var i = 0 ; i < BA.GeneralData.Gables.Gable.length ; i++)// Gables 
            {
                var Gable = BA.GeneralData.Gables.Gable[i];

                var GableRidgeDist = Gable.RidgeDistance * scale;
                var GableREW = Gable.RightHeight * scale;
                var GableLEW = Gable.LeftHeight * scale;
                var GablePeakPoint = (Gable.LeftSlope / 10 * Gable.RidgeDistance + Gable.LeftHeight) * scale;
                var GableWidth = Gable.Width * scale;
                var zPos = -BALength / 2;
                for (var j = 0 ; j < BA.GeneralData.Bays.Bay.length ; j++)// Bays
                {
                    var GableShape = new THREE.Shape();
                    GableShape.moveTo(shiftLeft, shiftbottm);
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
                    zPos = zPos + BA.GeneralData.Bays.Bay[j].Width * scale;
                    scene.add(GableGeom);
                }
                shiftLeft = shiftLeft + GableWidth;
            }







        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    //drawSimpleSkybox();
};



//
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

};

function createMesh(geom) {

    //geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));

    var loader = new THREE.TextureLoader();
    var BATexture = loader.load('../Scripts/js/textures/sheeting.bmp');
    BATexture.wrapS = BATexture.wrapT = THREE.RepeatWrapping;
    BATexture.repeat.set(.01, .01);
    BATexture.anisotropy = 10;
    var material1 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xb0b4ba, specular: 0x111111, map: BATexture });    // "ZA"
    var material2 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xF0F0B9, specular: 0x111111, map: BATexture });    // "FW", 
    var material3 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xffffff, specular: 0x111111, map: BATexture });    // "TBE",
    var material4 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xBF9060, specular: 0x111111, map: BATexture });    // "AB", 
    var material5 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x9FAF7F, specular: 0x111111, map: BATexture });    // "CG", 
    var material6 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x4A729B, specular: 0x111111, map: BATexture });    // "RB", 
    var material7 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xCC0032, specular: 0x111111, map: BATexture });    // "FR", 
    var material8 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x317D02, specular: 0x111111, map: BATexture });    // "LG", 
    var material9 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xFDE302, specular: 0x111111, map: BATexture });    // "DY", 
    var material10 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x50707F, specular: 0x111111, map: BATexture });   // "SB", 
    var material11 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xA09E9E, specular: 0x111111, map: BATexture });   // "SM", 
    var material12 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x82ACBB, specular: 0x111111, map: BATexture });   // "GBM",
    var material13 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0x094788, specular: 0x111111, map: BATexture });   // "GB", 
    var material14 = new THREE.MeshPhongMaterial({ wireframe: params.wirestatus, color: 0xffffff, specular: 0x111111, map: BATexture });   // "RAL"
    //var material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    //var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //var material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    //var material4 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    var materials = [material1, material2, material3, material4, material5, material6, material7, material8, material9, material10, material11, material12, material13, material14];

    var meshFaceMaterial = new THREE.MeshFaceMaterial(materials);
    //var l = geom.faces.length / 2;
    //for (var i = 0; i < l; i++) {
    //    var j = 2 * i;
    //    geom.faces[j].materialIndex = i % 14;
    //    geom.faces[j + 1].materialIndex = i % 14;
    //}

    //geom.faces[0].materials.push(material1);
    //geom.faces[1].materials.push(material2);
    //geom.faces[2].materials.push(material3);
    //geom.faces[3].materials.push(material4);
    var mesh = new THREE.Mesh(geom, meshFaceMaterial);









    //// assign two materials
    //var meshMaterial = new THREE.MeshNormalMaterial({
    //    shading: THREE.FlatShading,
    //    transparent: true,
    //    opacity: 0.7
    //});

    //var loader = new THREE.TextureLoader();
    //var BATexture = loader.load('../Scripts/js/textures/sheeting.bmp');
    //BATexture.wrapS = BATexture.wrapT = THREE.RepeatWrapping;
    //BATexture.repeat.set(.01, .01);
    //BATexture.anisotropy = 10;
    ////var poleMat = new THREE.MeshPhongMaterial({ wireframe: true, color: 0xffffff, specular: 0x111111, map: BATexture });
    //var poleMat = new THREE.MeshPhongMaterial({ color: 0xe03142, specular: 0x111111, map: BATexture });

    //// create a multimaterial
    ////var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
    //var mesh = new THREE.Mesh(geom, poleMat);


    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
}

//
function animate() {

    requestAnimationFrame(animate);

    var time = Date.now();

    //windStrength = Math.cos( time / 7000 ) * 20 + 40;
    //windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );

    //simulate( time );
    render();
    stats.update();

}

function render() {

    camera.lookAt(scene.position);

    renderer.render(scene, camera);

};



function drawSimpleSkybox() {
    // define path and box sides images
    var path = '../Scripts/js/textures/SkyBox/';
    var sides = [path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg'];
    // load images
    var scCube = THREE.ImageUtils.loadTextureCube(sides);
    scCube.format = THREE.RGBFormat;
    // prepare skybox material (shader)
    var skyShader = THREE.ShaderLib["cube"];
    skyShader.uniforms["tCube"].value = scCube;
    var skyMaterial = new THREE.ShaderMaterial({
        fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
        uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
    });
    // create Mesh with cube geometry and add to the scene
    var skyBox = new THREE.Mesh(new THREE.CubeGeometry(50000, 50000, 50000), skyMaterial);
    skyMaterial.needsUpdate = true;
    scene.add(skyBox);
};