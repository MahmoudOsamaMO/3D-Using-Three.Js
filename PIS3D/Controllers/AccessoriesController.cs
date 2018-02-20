using PIS3D.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIS3D.Controllers
{
    public class AccessoriesController : Controller
    {
        // GET: Accessories
        public ActionResult FramedOpinings()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult OpenWalls()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult PersonalDoors()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult SlidingDoors()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult RollupDoors()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult Windows()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult Louvers()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult PowerVentilators()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult RoofCurbs()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult TransPanels()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult RidgeVentrs()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult OtherSBO()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult PipeFlashings()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult ManageAccessories()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }

    }
}