function PersonalDoor(BA) {
    try {
        var personnelDoors = BA.Openings.PersonnelDoors.PersonnelDoor;

        for (var i = 0; i < personnelDoors.length; i++) {
            f = personnelDoors[i];
            var assign = f.AssignTo;
            var locationx = f.LocationX;
            var locationy = f.LocationY;
            var wid = f.Width;
            var hei = f.Height;
            var refto = f.ReferenceTo;
            var o = f.On;
            var rewWidth = BA.GeneralData.EndWalls.REW.Profile.GablesWidthModules.GableWidthModules["0"].WidthModules["0"].Width;
            var lewWidth = BA.GeneralData.EndWalls.LEW.Profile.GablesWidthModules.GableWidthModules["0"].WidthModules["0"].Width;
            var x,
                y,
                width,
                height,
                plusx = 0,
                on;
            var bays = BA.GeneralData.Bays;   //").Elements().Reverse().ToList();

            x = parseFloat(locationx);
            y = parseFloat(locationy);
            width = parseFloat(wid);
            width = width / 1000;
            height = parseFloat(hei);
            height = height / 1000;
            on = parseFloat(o);
            var basePoint;
            switch (f.LocationFrom) {
                case "BOTTOM RIGHT":
                    basePoint = new THREE.Vector3(x - width, y, 0);
                    break;
                case "TOP LEFT":
                    basePoint = new THREE.Vector3(x, y - height, 0);
                    break;
                case "TOP RIGHT":
                    basePoint = new THREE.Vector3(x - width, y - height, 0);
                    break;
                default:
                    basePoint = new THREE.Vector3(x, y, 0);
                    break;
            }
            if (refto != "SURFACE") {
                if (refto == "BAY") {
                    //plusx =
                    //     bays.Where(w => w.ElementIgnoreCase("ID").ParseToInt()< on)
                    //         .Sum(s => s.ElementIgnoreCase("Width").ParseToDouble());

                    basePoint.x = plusx /*-*/ + basePoint.x;


                }
                else //span
                {
                    if (assign == "REW") {
                        var sum = 0;
                        var rewindx = rewWidth[on - 1];
                        for (var i = 0; i < on; i++) {
                            sum += parseFloat(rewWidth[i]);
                        }
                        plusx = sum - rewindx;
                    }
                    else if (assign == "LEW") {
                        var sum = 0;
                        var lewindx = lewWidth[on - 1];
                        for (var i = 0; i < on; i++) {
                            sum += parseFloat(lewWidth[i]);
                        }
                        plusx = sum - lewindx;
                    }
                    basePoint.x = plusx + basePoint.x;
                }


            }

            var over;
            var up = new THREE.Vector3(0, 1, 0);
            switch (assign) {
                case "REW":
                    over = new THREE.Vector3(1, 0, 0);
                    basePoint.z = length + 0.05;
                    break;
                case "LEW":
                    over = new THREE.Vector3(1, 0, 0);
                    basePoint.z = -0.05;
                    break;
                case "FSW":
                    if (refto == "Surface")
                        basePoint.x = basePoint.x;
                    over = new THREE.Vector3(0, 0, 1);
                    var myz = basePoint.x;

                    basePoint.x = this.width + 0.05;
                    basePoint.z = myz;
                    break;
                case "NSW":
                    if (refto == "Surface")
                        basePoint.x = /*length -*/ basePoint.x;
                    over = new THREE.Vector3(0, 0, 1);
                    var myz2 = basePoint.x;

                    basePoint.x = -0.05;
                    basePoint.z = /*length -*/myz2;
                    break;

            }
            var isCenter;
            if (f.LocationFrom == "CENTER")
                isCenter = true;
            else
                isCenter = false;

            var personnelDoor = CreatePersonnalDoor(f.Type, true, width, height, basePoint, isCenter, over, up, BA);

            scene.add(personnelDoor);
            //personnelDoor.Transform = new Transform3DGroup();
            //MainViewPort.Children.Add(personnelDoor);
        }
    }
    catch (ex) {
        //ExceptionHelper._3DLogFile(ex, MethodBase.GetCurrentMethod().Name, _jobName);
        alert(ex);
    }

};



function CreatePersonnalDoor(door, isDoubleSided, widthh, height, basePoint, isBasePointCenterPoint, vectorOver, vectorUp, BA) {
    try {
        var DoorTexture ;

        switch (door) {

            case "SINGLE":
                if (widthh <= 0) widthh = 0.915;
                if (height <= 0) height = 2.135;
                DoorTexture = loader.load('../Image/Resources/SINGLE_PD.jpg')
                //mataterialWithLabel.Brush = App.SinglePersonDoor;
                break;
            case "DOUBLE":
                if (widthh <= 0) widthh = 1.829;
                if (height <= 0) height = 2.135;
                DoorTexture = loader.load('../Image/Resources/DOUBLE_PD.jpg')
                //mataterialWithLabel.Brush = App.DoublePersonDoor;
                break;
            case "PILOT":
                if (widthh <= 0) widthh = 1.829;
                if (height <= 0) height = 2.135;
                DoorTexture = loader.load('../Image/Resources/DOUBLE_PD.jpg')
                //mataterialWithLabel.Brush = App.DoublePersonDoor;
                break;
            default:
                if (widthh <= 0) widthh = 0.915;
                if (height <= 0) height = 2.135;
                DoorTexture = loader.load('../Image/Resources/SINGLE_PD.jpg')
                //mataterialWithLabel.Brush = App.SinglePersonDoor;
                break;
        }

        var width = widthh;
        var p0 = basePoint;
        var p1 = basePoint;
        var p2 = basePoint;
        var p3 = basePoint;

        if (isBasePointCenterPoint)
            p0 = basePoint - width / 2 * vectorOver - height / 2 * vectorUp;
        //p1 = p0 + vectorUp * 1 * height;
        //p2 = p0 + vectorOver * width;
        //p3 = p0 + vectorUp * 1 * height + vectorOver * width;

        p1 = p0.add(vectorUp);
        p2 = p0.add(vectorOver);
        p22 = p0.add(vectorUp);
        p3 = p22.add(vectorOver);

        DoorTexture.wrapS = DoorTexture.wrapT = THREE.RepeatWrapping;
        //DoorTexture.repeat.set(25, 25);
        DoorTexture.anisotropy = 16;
        var DoorMaterial = new THREE.MeshPhongMaterial({ color: 0x666768, specular: 0x111111, map: DoorTexture ,side: THREE.DoubleSide });
        var BAREW = BA.GeneralData.Gables.Gable[0].RightHeight;
        //var BALEW = BA.GeneralData.Gables.Gable[BA.GeneralData.Gables.Gable.Length-1].LeftHeight;
        var PeakPoint = 100;
        var BAWidth = BA.GeneralData.Width * scale;
        var BALength = BA.GeneralData.Length * scale;
        var shiftbottm = -100; // shift to bottom value
        var shiftLeft = -BAWidth / 2; // shift to left value to center building




        //var geometry = new THREE.Geometry();
        //geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm, 0));
        //geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm, 5000));
        //geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm + 500, 500));
        //geometry.vertices.push(new THREE.Vector3(shiftLeft - 1, shiftbottm + 500, 0));
        //var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 50 });
        var geometry = new THREE.PlaneGeometry(width * scale, height * scale)

        var mesh = new THREE.Mesh(geometry, DoorMaterial);
        mesh.position.z = 500;
        mesh.position.y = -50;
        mesh.rotation.y = -Math.PI / 2;
        mesh.receiveShadow = true;
        return mesh;
    }
    catch (ex) {
        return null;
    }
};
