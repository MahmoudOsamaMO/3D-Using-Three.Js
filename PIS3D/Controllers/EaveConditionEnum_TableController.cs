using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PIS3D.Models;

namespace PIS3D.Controllers
{
    public class EaveConditionEnum_TableController : Controller
    {
        private PISEntities db = new PISEntities();

        // GET: EaveConditionEnum_Table
        public async Task<ActionResult> Index()
        {
            return View(await db.EaveConditionEnum_Table.ToListAsync());
        }
        public ActionResult GetEaveConditionEnum()
        {
            //return Json(db.EaveConditionEnum_Table.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.EaveConditionEnum_Table.Select(u => u.EaveConditionEnum).ToList(), JsonRequestBehavior.AllowGet);

        }

        // GET: EaveConditionEnum_Table/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EaveConditionEnum_Table eaveConditionEnum_Table = await db.EaveConditionEnum_Table.FindAsync(id);
            if (eaveConditionEnum_Table == null)
            {
                return HttpNotFound();
            }
            return View(eaveConditionEnum_Table);
        }

        // GET: EaveConditionEnum_Table/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: EaveConditionEnum_Table/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ID_EaveConditionEnum,EaveConditionEnum")] EaveConditionEnum_Table eaveConditionEnum_Table)
        {
            if (ModelState.IsValid)
            {
                db.EaveConditionEnum_Table.Add(eaveConditionEnum_Table);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(eaveConditionEnum_Table);
        }

        // GET: EaveConditionEnum_Table/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EaveConditionEnum_Table eaveConditionEnum_Table = await db.EaveConditionEnum_Table.FindAsync(id);
            if (eaveConditionEnum_Table == null)
            {
                return HttpNotFound();
            }
            return View(eaveConditionEnum_Table);
        }

        // POST: EaveConditionEnum_Table/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ID_EaveConditionEnum,EaveConditionEnum")] EaveConditionEnum_Table eaveConditionEnum_Table)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eaveConditionEnum_Table).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(eaveConditionEnum_Table);
        }

        // GET: EaveConditionEnum_Table/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EaveConditionEnum_Table eaveConditionEnum_Table = await db.EaveConditionEnum_Table.FindAsync(id);
            if (eaveConditionEnum_Table == null)
            {
                return HttpNotFound();
            }
            return View(eaveConditionEnum_Table);
        }

        // POST: EaveConditionEnum_Table/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            EaveConditionEnum_Table eaveConditionEnum_Table = await db.EaveConditionEnum_Table.FindAsync(id);
            db.EaveConditionEnum_Table.Remove(eaveConditionEnum_Table);
            await db.SaveChangesAsync();
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
