using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PIS3D.Models;

namespace PIS3D.Controllers
{
    public class BuildingAreasController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: BuildingAreas
        public ActionResult Index()
        {
            return View(db.BuildingAreas.ToList());
        }

        // GET: BuildingAreas/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BuildingArea buildingArea = db.BuildingAreas.Find(id);
            if (buildingArea == null)
            {
                return HttpNotFound();
            }
            return View(buildingArea);
        }

        // GET: BuildingAreas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BuildingAreas/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,PISX_VER,GeneralData,DesignCode,SurfaceTreatment,Bracings,PanelsAndInsulations,RoofWallCladding,WallPanelAccessories,Openings,Subsystems,CraneSystems,Mezzanines,OldArea,Width,length,height")] BuildingArea buildingArea)
        {
            if (ModelState.IsValid)
            {
                db.BuildingAreas.Add(buildingArea);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(buildingArea);
        }

        // GET: BuildingAreas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BuildingArea buildingArea = db.BuildingAreas.Find(id);
            if (buildingArea == null)
            {
                return HttpNotFound();
            }
            return View(buildingArea);
        }

        // POST: BuildingAreas/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,PISX_VER,GeneralData,DesignCode,SurfaceTreatment,Bracings,PanelsAndInsulations,RoofWallCladding,WallPanelAccessories,Openings,Subsystems,CraneSystems,Mezzanines,OldArea,Width,length,height")] BuildingArea buildingArea)
        {
            if (ModelState.IsValid)
            {
                db.Entry(buildingArea).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(buildingArea);
        }

        // GET: BuildingAreas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            BuildingArea buildingArea = db.BuildingAreas.Find(id);
            if (buildingArea == null)
            {
                return HttpNotFound();
            }
            return View(buildingArea);
        }

        // POST: BuildingAreas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            BuildingArea buildingArea = db.BuildingAreas.Find(id);
            db.BuildingAreas.Remove(buildingArea);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
