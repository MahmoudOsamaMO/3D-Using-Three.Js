using PIS3D.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Xml;
using System.Xml.Serialization;

namespace PIS3D
{
    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Session_Start(Object sender, EventArgs e)
        {
            Session.Timeout = 60;
            BuildingArea BA = new BuildingArea();

            //

            ////string defult = "<?xml version=\"1.0\" encoding=\"utf - 8\"?><BuildingArea><PISX_VER><Created>4.0.0.3</ Created >< Current > 4.0.0.3 </ Current ></ PISX_VER >< GeneralData >< ID > 1 </ ID >< Location >< AlongBuildingWidth >< FromGL > A </ FromGL >< ToGL > B </ ToGL >< Axes > A,B </ Axes ></ AlongBuildingWidth >< AlongBuildingLength >< FromGL > 1 </ FromGL >< ToGL > 2 </ ToGL >< Axes > 1,2 </ Axes ></ AlongBuildingLength ></ Location >< Width > 20.000 </ Width >< WidthReference > OUT TO OUT OF STEEL LINE(O / O OF EAVE STRUTS) </ WidthReference >< Length > 8.000 </ Length >< LengthReference > OUT TO OUT OF STEEL LINE(O / O ENDWALL GIRTS) </ LengthReference >< HeightReference > EAVE HEIGHT </ HeightReference >< FrameType > CLEAR SPAN </ FrameType >< FixedBaseAllowed > true </ FixedBaseAllowed >< Gables >< Gable >< ID > 1 </ ID >< LeftSlope > 1 </ LeftSlope >< RightSlope > -1 </ RightSlope >< Width > 20.000 </ Width >< RidgeDistance > 10.000 </ RidgeDistance >< LeftHeight > 6.000 </ LeftHeight >< LeftColBase > 0.000 </ LeftColBase >< RightHeight > 6.000 </ RightHeight >< RightColBase > 0.000 </ RightColBase >< EaveCondition >< NearSide >< EaveConditionEnum > NO EAVE </ EaveConditionEnum ></ NearSide >< FarSide >< EaveConditionEnum > NO EAVE </ EaveConditionEnum ></ FarSide ></ EaveCondition ></ Gable ></ Gables >< Bays >< Bay >< ID > 1 </ ID >< Width > 8.000 </ Width >< BracingAvailable > true </ BracingAvailable ></ Bay ></ Bays >< EndWalls >< LEW >< Type > RIGID FRAME </ Type >< Profile >< ID > 1 </ ID >< GablesWidthModules >< GableWidthModules >< GableNo > 1 </ GableNo >< WidthModules >< Width > 20.000 </ Width ></ WidthModules ></ GableWidthModules ></ GablesWidthModules ></ Profile ></ LEW >< REW >< Type > RIGID FRAME </ Type >< Profile >< ID > 1 </ ID >< GablesWidthModules >< GableWidthModules >< GableNo > 1 </ GableNo >< WidthModules >< Width > 20.000 </ Width ></ WidthModules ></ GableWidthModules ></ GablesWidthModules ></ Profile ></ REW ></ EndWalls >< Profiles >< Profile >< ID > 1 </ ID >< GablesWidthModules >< GableWidthModules >< GableNo > 1 </ GableNo >< WidthModules >< Width > 20.000 </ Width ></ WidthModules ></ GableWidthModules ></ GablesWidthModules ></ Profile ></ Profiles >< Frames >< FrameProfile >< ID > 1 </ ID >< ProfileNo > 1 </ ProfileNo ></ FrameProfile >< FrameProfile >< ID > 2 </ ID >< ProfileNo > 1 </ ProfileNo ></ FrameProfile ></ Frames >< BaysProfile > 1@8.000 </ BaysProfile >< FramesProfile > 2@1 </ FramesProfile >< FutureExtension >< TransverseDirection > false </ TransverseDirection >< LongitudinalDirection > false </ LongitudinalDirection ></ FutureExtension >< Remarks /></ GeneralData >< DesignCode >< DeadLoad >< AsPerDesign > As Per Design</ AsPerDesign >< UserValue > 1 </ UserValue ></ DeadLoad >< LiveLoadOnRoof > 0.57 </ LiveLoadOnRoof >< LiveLoadOnFrame > 0.57 </ LiveLoadOnFrame >< GroundSnowLoad > 0.00 </ GroundSnowLoad >< ThicknessGroundSnow > 0.00 </ ThicknessGroundSnow >< CollateralLoad > 0 </ CollateralLoad >< RainFall >< Intensity > 150 </ Intensity >< HeavyRainArea > false </ HeavyRainArea >< Years > 25 </ Years >< Minutes > 5 </ Minutes ></ RainFall >< Temperature >< Plus > 0.00 </ Plus >< Minus > 0.00 </ Minus ></ Temperature >< Wind >< WindSpeed > 137 </ WindSpeed >< WindExposure > B </ WindExposure >< WindSpeedEnum > 3 SECOND GUST SPEED </ WindSpeedEnum ></ Wind >< Seismic > NONE </ Seismic >< DesignCodes > AISC </ DesignCodes >< ApplyLoadsPer > MBMA 2002 </ ApplyLoadsPer >< ColdFormedDesignCodes > AISI 01 </ ColdFormedDesignCodes >< Remarks /></ DesignCode >< SurfaceTreatment >< PrimaryMembers >< SurfaceFinish > PAINTED </ SurfaceFinish >< SurfaceTreatment > NONE </ SurfaceTreatment >< PaintSystem > NONE </ PaintSystem >< Coats />< Remarks /></ PrimaryMembers >< SecondaryMembers >< SurfaceFinish > PRE GALVANIZED </ SurfaceFinish >< SurfaceTreatment > NONE </ SurfaceTreatment >< PaintSystem > NONE </ PaintSystem >< Coats />< Remarks /></ SecondaryMembers ></ SurfaceTreatment >< Bracings >< NSW > DIAGONAL </ NSW >< NSWHeight > 0 </ NSWHeight >< FSW > DIAGONAL </ FSW >< FSWHeight > 0 </ FSWHeight >< LEW > NONE </ LEW >< LEWHeight > 0 </ LEWHeight >< REW > NONE </ REW >< REWHeight > 0 </ REWHeight >< InteriorBracings />< Remarks /></ Bracings >< PanelsAndInsulations >< SingleSkinTypes >< SingleSkin >< ID > 1 </ ID >< ProfileType > S </ ProfileType >< BaseMetal > ZA - Steel </ BaseMetal >< PaintFinish > ZSP </ PaintFinish >< Thickness > 0.5 </ Thickness >< Color > FW </ Color >< Description > S - ZA - ZSP - 0.5 - FW </ Description ></ SingleSkin ></ SingleSkinTypes >< TempconTypes />< InsulationTypes /></ PanelsAndInsulations >< RoofWallCladding >< RoofPanel >< Panel >< ByWho > OTHER </ ByWho >< Weight > 0 </ Weight ></ Panel >< Insulation >< ByWho > NONE </ ByWho >< SupplyWireMesh > false </ SupplyWireMesh >< Area > 0 </ Area ></ Insulation >< Liner >< ByWho > NONE </ ByWho ></ Liner ></ RoofPanel >< WallPanel >< NSW >< Condition > FULLY BLOCKED </ Condition >< GirtCondition > BY PASS </ GirtCondition ></ NSW >< FSW >< Condition > FULLY BLOCKED </ Condition >< GirtCondition > BY PASS </ GirtCondition ></ FSW >< LEW >< Condition > FULLY BLOCKED </ Condition >< GirtCondition > BY PASS </ GirtCondition ></ LEW >< REW >< Condition > FULLY BLOCKED </ Condition >< GirtCondition > BY PASS </ GirtCondition ></ REW ></ WallPanel >< Remarks /></ RoofWallCladding >< WallPanelAccessories >< WallPanelRelatedAccessories > SPECIAL </ WallPanelRelatedAccessories >< WallAccessories />< Remarks /></ WallPanelAccessories >< Openings >< Louvers >< Remarks /></ Louvers >< Windows >< Remarks /></ Windows >< FiberglassRoofCurbs >< Remarks /></ FiberglassRoofCurbs >< GravityRidgeVentillators >< Remarks /></ GravityRidgeVentillators >< OtherSBO >< Remarks /></ OtherSBO >< PersonnelDoors >< Remarks /></ PersonnelDoors >< PipeFlashings >< Remarks /></ PipeFlashings >< PowerVentilators >< Remarks /></ PowerVentilators >< RollupDoors >< Remarks /></ RollupDoors >< SlidingDoors >< Remarks /></ SlidingDoors >< FramedOpenings >< Remarks /></ FramedOpenings >< OpenWalls >< Remarks /></ OpenWalls >< TranslucentPanels >< Remarks /></ TranslucentPanels ></ Openings >< Subsystems >< Canopies >< Remarks /></ Canopies >< RoofExtensions >< Remarks /></ RoofExtensions >< Fascias >< Remarks /></ Fascias >< RoofMonitors >< Remarks /></ RoofMonitors >< InteriorCatwalks >< Remarks /></ InteriorCatwalks >< Ladders >< Remarks /></ Ladders >< Partitions >< Remarks /></ Partitions >< RoofPlatforms >< Remarks /></ RoofPlatforms >< RoofWalkways >< Remarks /></ RoofWalkways >< Staircases >< Remarks /></ Staircases ></ Subsystems >< CraneSystems >< Remarks /></ CraneSystems >< Mezzanines >< Remarks /></ Mezzanines >< OldArea /></ BuildingArea > ";
            string Pathde = Server.MapPath(@"\App_Data\Defult.xml");
            string defult = File.ReadAllText(Pathde);

            XmlSerializer serializer = new XmlSerializer(typeof(BuildingArea));
            //xmlStr=xmlStr.Replace("utf-8", "utf-16");

            StringReader rdr = new StringReader(defult);

            BA = (BuildingArea)serializer.Deserialize(rdr);

            HttpContext.Current.Session.Add("_BA", BA);
            HttpContext.Current.Session.Add("_Job", "New Job");
        }
    }
}
