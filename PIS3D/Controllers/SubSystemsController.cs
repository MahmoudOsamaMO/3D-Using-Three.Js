using PIS3D.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PIS3D.Controllers
{
    public class SubSystemsController : Controller
    {
        // GET: SubSystems
        public ActionResult Canopies()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult RoofExtensions()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult Fascias()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult RoofMonitors()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult InteriorCatwalks()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult Ladders()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult Partitions()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult RoofPlatforms()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult RoofWalkways()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
        public ActionResult Staircases()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View();
        }
    }
}