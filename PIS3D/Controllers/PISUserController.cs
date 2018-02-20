using PIS3D.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIS3D.Controllers
{
    public class PISUserController : Controller
    {
        private PISEntities db = new PISEntities();

        // GET: PISUser
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetEaveConditionEnum()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.EaveConditionEnum_Table.Select(u => u.EaveConditionEnum).ToList(), JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetDownspouts()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.Downspouts_Table.Select(u => u.Downspouts).ToList(), JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetWidthReference()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.WidthReferenceTables.Select(u => u.WidthReference).ToList(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetLengthReference()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.LengthReference_Table.Select(u => u.LengthReference).ToList(), JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetHeightReference()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.HeightReference_Table.Select(u => u.HeightReference).ToList(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetFrameType()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.FrameType_Table.Select(u => u.FrameType).ToList(), JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetEndWallsType()
        {
            return Json(db.EndWallTypeTypeTables.Select(u => u.EndWallTypeType).ToList(), JsonRequestBehavior.AllowGet);
        }

        // Looads And Codes
        public ActionResult GetWindExposure()
        {
            return Json(db.WindExposureTables.Select(u => u.WindExposure).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetWindSpeedEnum()
        {
            return Json(db.WindSpeedEnumTables.Select(u => u.WindSpeedEnum).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDesignCodes()
        {
            return Json(db.DesignCodesTables.Select(u => u.DesignCodes).ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetApplyLoadsPer()
        {
            return Json(db.ApplyLoadsPerTables.Select(u => u.ApplyLoadsPer).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetColdFormedDesignCodes()
        {
            return Json(db.ColdFormedDesignCodesTables.Select(u => u.ColdFormedDesignCodes).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetSeismic()
        {
            return Json(db.SeismicTables.Select(u => u.Seismic).ToList(), JsonRequestBehavior.AllowGet);
        }
        // End Looads And Codes

        //Primary Member 
        public ActionResult GetSurfaceFinish()
        {
            return Json(db.SurfaceFinishTables.Select(u => u.SurfaceFinish).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetSurfaceTreatment()
        {
            return Json(db.SurfaceTreatmentTables.Select(u => u.SurfaceTreatment).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetPaintSystem()
        {
            return Json(db.PaintSystemTables.Select(u => u.PaintSystem).ToList(), JsonRequestBehavior.AllowGet);
        }
        //End Primary Member

        //Secondery Member 
        public ActionResult GetSecondarySurfaceFinish()
        {
            return Json(db.SecondarySurfaceFinishTables.Select(u => u.SecondarySurfaceFinish).ToList(), JsonRequestBehavior.AllowGet);
        }

        //End secondery Member


        // Bracing 
        public ActionResult GetBracingType()
        {
            return Json(db.BracingTypeTables.Select(u => u.BracingType).ToList(), JsonRequestBehavior.AllowGet);
        }
        //End Bracing 

    }
}