
if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, controls , gui;
//var wirestatus = true;

// scene
scene = new THREE.Scene();
//scene.fog = new THREE.Fog(0x000000, 1, 10000);
scene.fog = new THREE.Fog(0x1a1a1a, 100, 30000);

init();
animate();

function intialize3D(BA) {
    container = document.createElement('div');
    container.className = 'v3D';
    document.body.insertBefore(container, document.getElementById('before'));
    // camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.x = 1500;
    camera.position.y = 50;
    camera.position.z = 2000;
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
    //Building shadow 
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
    // controls For Camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.maxPolarAngle = Math.PI * 0.5; 
    //controls.minDistance = 1000;
    //controls.maxDistance = 5000;
    //controls.wirestatus = true;
    //performance monitor
    stats = new Stats();
    window.addEventListener('resize', onWindowResize, false);

    gui = new dat.GUI();

    gui.open();

    var loader = new THREE.TextureLoader();
    //////ground
    //var groundTexture = loader.load('../Scripts/js/textures/terrain/7.jpg'); // grasslight - big - nm.jpg
    var groundTexture = loader.load('../Scripts/js/textures/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x666768, specular: 0x111111, map: groundTexture });
    //var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a, specular: 0x111111 });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
    mesh.position.y = 0;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    drawSimpleSkybox();
};

function init() {
    var view_data;
    jQuery.ajax({
        type: "GET",
        url: "/Home/Getjson",
        dataType: 'json',
        cache: false,
        success: function (BA) {
            console.log(BA);
            intialize3D(BA);
            CreatBuilding(BA);
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
    //mesh.rotation.x += .01;
    renderer.render(scene, camera);

};

function drawSimpleSkybox() {
    // define path and box sides images
    //var path = '../Scripts/js/textures/SkyBox/';
    var path = '../Scripts/js/textures/SkyBox/TropicalSunnyDay/';
    
    //var sides = [path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg'];
    var sides = [path + 'TropicalSunnyDayBack2048.png', path + 'TropicalSunnyDayFront2048.png', path + 'TropicalSunnyDayUp2048.png', path + 'TropicalSunnyDayDown2048.png', path + 'TropicalSunnyDayLeft2048.png', path + 'TropicalSunnyDayRight2048.png'];
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
    var skyBox = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000), skyMaterial);
    skyMaterial.needsUpdate = true;
    scene.add(skyBox);
};