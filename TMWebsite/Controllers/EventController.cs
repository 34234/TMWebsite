using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMWebsite.Models;

namespace TMWebsite.Controllers
{
    public class EventController : Controller
    {
        // GET: Event
        public ActionResult AddEvent()
        {
            return View();
        }
        
        public ActionResult UpdateEvent(DemoEvent e)
        {
            return View(e);
        }

        [HttpGet]
        public JsonResult GetDemoData()
        {
            return Json(new DemoEvent().getDataExamble(),JsonRequestBehavior.AllowGet);
        }

    }
}