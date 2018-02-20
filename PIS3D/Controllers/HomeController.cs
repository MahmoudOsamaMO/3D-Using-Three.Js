using Newtonsoft.Json;
using PIS3D.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using System.Xml.Serialization;
using System.Windows.Documents;
using System.Windows.Markup;

namespace PIS3D.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            //this.Session["_Job"] = "New Job";
            return View(liba);
        }
        public ActionResult Summary()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }

        public ActionResult LoadsAndCodes()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult Mezzannine()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult CraneSystems()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }

        public ActionResult PrimaryMember()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult SecondaryMember()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        
        public ActionResult RoofAndWalls()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult WallPanelAccessories()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult Accessories()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }
        public ActionResult Bracing()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }


        public ActionResult Index1()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            List<BuildingArea> liba = new List<BuildingArea>();
            liba.Add(BA);

            this.Session["_BA"] = BA;
            return View(liba);
        }

        public ActionResult Viewer()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }




        public ActionResult GetXML(string xmlStr)
        {
            string Xmlse = xmlStr;
            try
            {
                BuildingArea BA = (BuildingArea)this.Session["_BA"];
                XmlSerializer serializer = new XmlSerializer(typeof(BuildingArea));
                //xmlStr=xmlStr.Replace("utf-8", "utf-16");
                if (Xmlse.Contains("<Years/>"))
                    Xmlse = Xmlse.Replace("<Years/>", "<Years>0</Years>");
                if (Xmlse.Contains("<Minutes/>"))
                    Xmlse = Xmlse.Replace("<Minutes/>", "<Minutes>0</Minutes>");
                if (Xmlse.Contains("<Thickness/>"))
                    Xmlse = Xmlse.Replace("<Thickness/>", "<Thickness>0</Thickness>");
                if (Xmlse.Contains("<Area/>"))
                    Xmlse = Xmlse.Replace("<Area/>", "<Area>0</Area>");
                if (Xmlse.Contains("<Height/>"))
                    Xmlse = Xmlse.Replace("<Height/>", "<Height>0</Height>");
                if (Xmlse.Contains("<Width/>"))
                    Xmlse = Xmlse.Replace("<Width/>", "<Width>0</Width>");
                if (Xmlse.Contains("<ClearHeightBelowBeam/>"))
                    Xmlse = Xmlse.Replace("<ClearHeightBelowBeam/>", "<ClearHeightBelowBeam>0</ClearHeightBelowBeam>");
                if (Xmlse.Contains("<ClearHeightAboveJoist/>"))
                    Xmlse = Xmlse.Replace("<ClearHeightAboveJoist/>", "<ClearHeightAboveJoist>0</ClearHeightAboveJoist>");
                if (Xmlse.Contains("<TopOfMezzFinishFromFFL/>"))
                    Xmlse = Xmlse.Replace("<TopOfMezzFinishFromFFL/>", "<TopOfMezzFinishFromFFL>0</TopOfMezzFinishFromFFL>");
                if (Xmlse.Contains("<Length/>"))
                    Xmlse = Xmlse.Replace("<Length/>", "<Length>0</Length>");
                if (Xmlse.Contains("<LiveLoad/>"))
                    Xmlse = Xmlse.Replace("<LiveLoad/>", "<LiveLoad>0</LiveLoad>");
                if (Xmlse.Contains("<DeadLoad/>"))
                    Xmlse = Xmlse.Replace("<DeadLoad/>", "<DeadLoad>0</DeadLoad>");
                if (Xmlse.Contains("<CollateralLoad/>"))
                    Xmlse = Xmlse.Replace("<CollateralLoad/>", "<CollateralLoad>0</CollateralLoad>");
                if (Xmlse.Contains("<OtherLoad/>"))
                    Xmlse = Xmlse.Replace("<OtherLoad/>", "<OtherLoad>0</OtherLoad>");
                if (Xmlse.Contains("<ID/>"))
                    Xmlse = Xmlse.Replace("<ID/>", "<ID>0</ID>");
                if (Xmlse.Contains("<HookHeightH3/>"))
                    Xmlse = Xmlse.Replace("<HookHeightH3/>", "<HookHeightH3>0</HookHeightH3>");
                if (Xmlse.Contains("<TopOfCraneBeamH1/>"))
                    Xmlse = Xmlse.Replace("<TopOfCraneBeamH1/>", "<TopOfCraneBeamH1>0</TopOfCraneBeamH1>");
                if (Xmlse.Contains("<WheelBase/>"))
                    Xmlse = Xmlse.Replace("<WheelBase/>", "<WheelBase>0</WheelBase>");
                if (Xmlse.Contains("<VertH2/>"))
                    Xmlse = Xmlse.Replace("<VertH2/>", "<VertH2>0</VertH2>");
                if (Xmlse.Contains("<HorizW2/>"))
                    Xmlse = Xmlse.Replace("<HorizW2/>", "<HorizW2>0</HorizW2>");
                if (Xmlse.Contains("<Crane/>"))
                    Xmlse = Xmlse.Replace("<Crane/>", "<Crane>0</Crane>");
                if (Xmlse.Contains("<Hoist/>"))
                    Xmlse = Xmlse.Replace("<Hoist/>", "<Hoist>0</Hoist>");
                if (Xmlse.Contains("<Trolley/>"))
                    Xmlse = Xmlse.Replace("<Trolley/>", "<Trolley>0</Trolley>");
                if (Xmlse.Contains("<Bridge/>"))
                    Xmlse = Xmlse.Replace("<Bridge/>", "<Bridge>0</Bridge>");
                if (Xmlse.Contains("<ClearHeight/>"))
                    Xmlse = Xmlse.Replace("<ClearHeight/>", "<ClearHeight>0</ClearHeight>");
                if (Xmlse.Contains("<Projection/>"))
                    Xmlse = Xmlse.Replace("<Projection/>", "<Projection>0</Projection>");
                if (Xmlse.Contains("<ThroatOpening/>"))
                    Xmlse = Xmlse.Replace("<ThroatOpening/>", "<ThroatOpening>0</ThroatOpening>");
                if (Xmlse.Contains("<BottomHeightFromFFL/>"))
                    Xmlse = Xmlse.Replace("<BottomHeightFromFFL/>", "<BottomHeightFromFFL>0</BottomHeightFromFFL>");
                if (Xmlse.Contains("<HandrailLength/>"))
                    Xmlse = Xmlse.Replace("<HandrailLength/>", "<HandrailLength>0</HandrailLength>");
                if (Xmlse.Contains("<UniformLoad/>"))
                    Xmlse = Xmlse.Replace("<UniformLoad/>", "<UniformLoad>0</UniformLoad>");
                if (Xmlse.Contains("<ConcentratedLoad/>"))
                    Xmlse = Xmlse.Replace("<ConcentratedLoad/>", "<ConcentratedLoad>0</ConcentratedLoad>");
                if (Xmlse.Contains("<OpenWallLength/>"))
                    Xmlse = Xmlse.Replace("<OpenWallLength/>", "<OpenWallLength>0</OpenWallLength>");
                if (Xmlse.Contains("<OpenWallHeight/>"))
                    Xmlse = Xmlse.Replace("<OpenWallHeight/>", "<OpenWallHeight>0</OpenWallHeight>");
                if (Xmlse.Contains("<LocationX/>"))
                    Xmlse = Xmlse.Replace("<LocationX/>", "<LocationX>0</LocationX>");
                if (Xmlse.Contains("<LocationY/>"))
                    Xmlse = Xmlse.Replace("<LocationY/>", "<LocationY>0</LocationY>");
                if (Xmlse.Contains("<CarryingWeight/>"))
                    Xmlse = Xmlse.Replace("<CarryingWeight/>", "<CarryingWeight>0</CarryingWeight>");
                if (Xmlse.Contains("<Throat/>"))
                    Xmlse = Xmlse.Replace("<Throat/>", "<Throat>0</Throat>");
                if (Xmlse.Contains("<Density/>"))
                    Xmlse = Xmlse.Replace("<Density/>", "<Density>0</Density>");
                if (Xmlse.Contains("<Offset/>"))
                    Xmlse = Xmlse.Replace("<Offset/>", "<Offset>0</Offset>");
                if (Xmlse.Contains("<LiveLoadOnRoof/>"))
                    Xmlse = Xmlse.Replace("<LiveLoadOnRoof/>", "<LiveLoadOnRoof>0</LiveLoadOnRoof>");
                if (Xmlse.Contains("<LiveLoadOnFrame/>"))
                    Xmlse = Xmlse.Replace("<LiveLoadOnFrame/>", "<LiveLoadOnFrame>0</LiveLoadOnFrame>");
                if (Xmlse.Contains("<ThicknessGroundSnow/>"))
                    Xmlse = Xmlse.Replace("<ThicknessGroundSnow/>", "<ThicknessGroundSnow>0</ThicknessGroundSnow>");
                if (Xmlse.Contains("<GroundSnowLoad/>"))
                    Xmlse = Xmlse.Replace("<GroundSnowLoad/>", "<GroundSnowLoad>0</GroundSnowLoad>");
                if (Xmlse.Contains("<CollateralLoad/>"))
                    Xmlse = Xmlse.Replace("<CollateralLoad/>", "<CollateralLoad>0</CollateralLoad>");
                if (Xmlse.Contains("<Intensity/>"))
                    Xmlse = Xmlse.Replace("<Intensity/>", "<Intensity>0</Intensity>");
                if (Xmlse.Contains("<Plus/>"))
                    Xmlse = Xmlse.Replace("<Plus/>", "<Plus>0</Plus>");
                if (Xmlse.Contains("<Minus/>"))
                    Xmlse = Xmlse.Replace("<Minus/>", "<Minus>0</Minus>");
                if (Xmlse.Contains("<WindPressure/>"))
                    Xmlse = Xmlse.Replace("<WindPressure/>", "<WindPressure>0</WindPressure>");
                if (Xmlse.Contains("<WindSpeed/>"))
                    Xmlse = Xmlse.Replace("<WindSpeed/>", "<WindSpeed>0</WindSpeed>");
                if (Xmlse.Contains("<LeftSlope/>"))
                    Xmlse = Xmlse.Replace("<LeftSlope/>", "<LeftSlope>0</LeftSlope>");
                if (Xmlse.Contains("<RightSlope/>"))
                    Xmlse = Xmlse.Replace("<RightSlope/>", "<RightSlope>0</RightSlope>");
                if (Xmlse.Contains("<RidgeDistance/>"))
                    Xmlse = Xmlse.Replace("<RidgeDistance/>", "<RidgeDistance>0</RidgeDistance>");
                if (Xmlse.Contains("<LeftHeight/>"))
                    Xmlse = Xmlse.Replace("<LeftHeight/>", "<LeftHeight>0</LeftHeight>");
                if (Xmlse.Contains("<LeftColBase/>"))
                    Xmlse = Xmlse.Replace("<LeftColBase/>", "<LeftColBase>0</LeftColBase>");
                if (Xmlse.Contains("<RightHeight/>"))
                    Xmlse = Xmlse.Replace("<RightHeight/>", "<RightHeight>0</RightHeight>");
                if (Xmlse.Contains("<RightColBase/>"))
                    Xmlse = Xmlse.Replace("<RightColBase/>", "<RightColBase>0</RightColBase>");
                if (Xmlse.Contains("<NSWHeight/>"))
                    Xmlse = Xmlse.Replace("<NSWHeight/>", "<NSWHeight>0</NSWHeight>");
                if (Xmlse.Contains("<FSWHeight/>"))
                    Xmlse = Xmlse.Replace("<FSWHeight/>", "<FSWHeight>0</FSWHeight>");
                if (Xmlse.Contains("<LEWHeight/>"))
                    Xmlse = Xmlse.Replace("<LEWHeight/>", "<LEWHeight>0</LEWHeight>");
                if (Xmlse.Contains("<REWHeight/>"))
                    Xmlse = Xmlse.Replace("<REWHeight/>", "<REWHeight>0</REWHeight>");
                //Xmlse = Xmlse.ToUpper();



                //StringReader rdr = new StringReader(Xmlse);

                XDocument doc = XDocument.Parse(Xmlse);

                foreach (var desc in doc.Descendants())
                {
                    var nodes = desc.Nodes().Where(p => p.NodeType == XmlNodeType.Text);
                    string flow = "xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"";

                    foreach (XText node in nodes)
                    {
                        if (node.Value == "false" || node.Value == "true" || node.Value.Contains(flow))
                        { }
                        else
                            node.Value = node.Value.ToUpper();
                    }
                }

                string res = Edit1Area(doc.Root);

                Vaildtion(doc.ToString());
                StringReader rdr = new StringReader(res.ToString());
                //StringReader rdr = new StringReader(doc.ToString());
                //BA = (BuildingArea)serializer.Deserialize(rdr);
                BA = (BuildingArea)serializer.Deserialize(rdr);
                this.Session["_BA"] = BA;

                return null;

            }
            catch (Exception ex)
            {
                //BuildingArea BA = (BuildingArea)this.Session["_BA"];
                //this.Session["_BA"] = BA;
                StringReader rdr = new StringReader(Xmlse);
                var err = FromDictionaryToJson(expections);
                return Json(erors);
                //return Json(new { error = "Wrong File" + ex, baz = "Blech" });

            }

        }

        #region Validation 
        Dictionary<string, string> expections = new Dictionary<string, string>();
        private static string FromDictionaryToJson(Dictionary<string, string> dictionary)
        {
            var kvs = dictionary.Select(kvp => string.Format("\"{0}\":\"{1}\"", kvp.Key, string.Concat(",", kvp.Value)));
            return string.Concat("{", string.Join(",", kvs), "}");
        }
        public void Vaildtion(string _xmlFile)
        {
            bool ErrorFlag = false;
            string Pathde = Server.MapPath(@"\App_Data\BuildingAreaSchema_17-11-2015.xsd");
            string _schemaFile = System.IO.File.ReadAllText(Pathde);
            try
            {
                XmlSchemaSet schemas = new XmlSchemaSet();
                schemas.Add("", XmlReader.Create(new StringReader(_schemaFile)));
                var doc1 = XDocument.Parse(_xmlFile);
                bool errors = false;
                doc1.Validate(schemas, (sender, e) =>
                {
                    if (!expections.ContainsKey(((XElement)sender).Name.LocalName)
                           &&
                        (e.Message.EndsWith("is not a valid Integer value.") ||
                         e.Message.EndsWith("is not a valid Double value.")))
                    {
                        expections.Add(((XElement)sender).Name.LocalName, e.Message);

                        ExceptionHelper.ValidationLogFile(e.Exception, e.Message, ((object)e.Exception).ToString(),
                            "Validation", ExceptionHelper.LineNumber(e.Exception), "Validation");
                        ErrorFlag = true;
                        errors = true;
                    }

                }, true);
                DumpInvalidNodes(doc1.Root);


            }
            catch (Exception ex)
            {
                //ExceptionHelper.ValidationLogFile(null, ex.Message, ((object)ex).ToString(), MethodBase.GetCurrentMethod().Name, ExceptionHelper.LineNumber(ex), "Validation");
            }
        }
        int tstCount = 0;
        ErrorsData AllErrors = new ErrorsData();
        List<Error> erors = new List<Error>();
        public void DumpInvalidNodes(XElement el)
        {

            var xmlSchemaInfo = el.GetSchemaInfo();
            if (expections.ContainsKey(el.Name.LocalName))
            {
                if (xmlSchemaInfo != null &&
                    (xmlSchemaInfo.Validity == XmlSchemaValidity.Invalid))
                {
                    string error;
                    string value = string.IsNullOrEmpty(el.Value)
                        ? "Empty Field"
                        : el.Value;
                    var parent = el.AncestorsAndSelf()
                        .InDocumentOrder()
                        .Aggregate("", (s, i) => s + "/" + i.Name.ToString());
                    if (!el.HasElements)
                        error = el.Value;
                    //ErrorTable.Rows.Add("", "", expections[el.Name.LocalName], parent, el.Name, value, xmlSchemaInfo.Validity);
                    else
                    {
                        if (expections[el.Name.LocalName].Contains("List of possible elements expected: 'Staircases'."))
                            error = el.Value;
                        //ErrorTable.Rows.Add("", "", "You must insert at least one staircase.", parent, "Staircase", "No Staircase ",
                        //    xmlSchemaInfo.Validity);
                        //else
                        //ErrorTable.Rows.Add(expections[el.Name.LocalName], parent, el.Name, value, xmlSchemaInfo.Validity);  
                    }
                    erors.Add(new Error { Message = expections[el.Name.LocalName], Element = el.Name.ToString(), Path = parent, Value = value, Descreption = xmlSchemaInfo.Validity.ToString() });
                }
            }

            foreach (XElement child in el.Elements())
            {


                DumpInvalidNodes(child);
                tstCount++;
            }
        }
        #endregion


        private static string Edit1Area(XElement area)
        {
            try
            {
                //foreach (XElement element in area.Descendants("Remark").Where(w => w.HasElements))
                //{
                //    if (element.ElementIgnoreCase("State").Value() == "false")
                //    { element.RemoveAll(); }
                //}

                string flow = "xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"";

                foreach (XElement element in area.Descendants("Remark").Where(w => !w.HasElements))
                {
                    //if (element.Value.Contains(flow.ToUpper()))
                    if (element.Value.Contains(flow))
                        {
                        //element.Value = element.Value.ToLower();
                        //element.Value = element.Value.Replace("flowdocument", "FlowDocument");
                        var FlowDoc = (FlowDocument)XamlReader.Parse(element.Value());
                        element.Value = new TextRange(FlowDoc.ContentStart, FlowDoc.ContentEnd).Text;

                    }
                }
                return area.ToString();
            }
            catch (Exception exe)
            {
                //ExceptionHelper.LogFile(exe.Message, exe.ToString(), MethodBase.GetCurrentMethod().Name, exe.LineNumber(), "Form Area");
                return null;
            }
        }












        // Convert Json String To OuR Object (Building Area)
        public ActionResult Setjson(string jsonStr)
        {
            JavaScriptSerializer json_serializer = new JavaScriptSerializer();

            //BuildingArea BA = JsonConvert.DeserializeObject<BuildingArea>(jsonStr);
            BuildingArea BA = new BuildingArea();
            XNode node = JsonConvert.DeserializeXNode(jsonStr, "BuildingArea");

            XmlSerializer serializer = new XmlSerializer(typeof(BuildingArea));

            StringReader rdr = new StringReader(node.ToString());
            BA = (BuildingArea)serializer.Deserialize(rdr);

            this.Session["_BA"] = BA;
            return null;
        }

        // Convert OuR Object (Building Area) To Json String  
        //public ActionResult Getjson()
        public string Getjson()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            this.Session["_BA"] = BA;
            string isoJson = JsonConvert.SerializeObject(BA, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            //string isoJson = "{ \"name\":\"John Johnson\",\"street\":\"Oslo West 16\",\"phone\":-1.0}";
            //return Json(BA , JsonRequestBehavior.AllowGet);
            return isoJson;
        }
        public string GetJob()
        {
            string Job =(string)this.Session["_Job"];
            return Job;
        }
        public void SetJob(string JobTitle)
        {

            this.Session["_Job"] = JobTitle.Replace(".zxml" , " ");
        }

        // Convert OuR Object (Building Area) To XMl String and download it 
        public FileResult downloadFile()
        {
            BuildingArea BA = (BuildingArea)this.Session["_BA"];
            string a;
            XmlSerializer xsSubmit = new XmlSerializer(typeof(BuildingArea));
            StringWriter sww = new StringWriter();
            using (XmlWriter writer = XmlWriter.Create(sww))
            {
                xsSubmit.Serialize(writer, BA);
                var xml = sww.ToString(); // Your XML
                var file = File(Encoding.UTF8.GetBytes(xml), "application/xml", "Xml.xml");
                a = xml;
            }
            this.Session["_BA"] = BA;
            a = a.Replace("utf-16", "utf-8");
            return File(Encoding.UTF8.GetBytes(a), "application/xml", "job.zxml");

        }


        public string GetAxes(string s, string e)
        {
            s = s.ToUpper();
            e = e.ToUpper();
            var axes = new StringBuilder();
            try
            {
                var l1 = s.Length - 1;
                var l2 = e.Length - 1;
                var column1 = 0;
                var column2 = 0;

                if (s[0] >= 65 && s[0] <= 90)//a-z
                {
                    if (s.Length > 1 || e.Length > 1)
                    {
                        //MessageBox.Show("Fail to fill axes ,please edit axes "); return "";
                        return null;
                    }
                    for (int i = 0; i < s.Length; i++)
                    {
                        column1 += s[i] - 65;
                        column1++;
                        var pow = (int)Math.Pow(26, l1 - i);
                        column1 = column1 * pow;
                    }
                    column1--;

                    for (int i = 0; i < e.Length; i++)
                    {
                        if (e[i] - 65 < 0 || e[i] - 65 > 26) continue;
                        column2 += e[i] - 65;
                        column2++;
                        var pow = (int)Math.Pow(26, l2 - i);
                        column2 = column2 * pow;
                    }
                    column2--;

                    for (int j = column1; j <= column2; j++)
                    {
                        var i = j;
                        String col = Convert.ToString((char)('A' + (i % 26)));
                        while (i >= 26)
                        {
                            i = (i / 26) - 1;
                            col = Convert.ToString((char)('A' + (i % 26))) + col;
                        }
                        axes.Append(col + ",");
                    }
                }
                else if (s[0] >= 48 && s[0] <= 57)//0-9
                {
                    int start, end;
                    int.TryParse(s, out start);
                    int.TryParse(e, out end);
                    var list = Enumerable.Range(start, end - start + 1).ToList();
                    for (int i = 0; i < list.Count(); i++)
                    {
                        axes.Append(list[i] + ",");
                    }
                }
            }
#pragma warning disable CS0168 // The variable 'exe' is declared but never used
            catch (Exception exe)
#pragma warning restore CS0168 // The variable 'exe' is declared but never used
            {
                //ExceptionHelper.LogFile(exe.Message, exe.ToString(), MethodBase.GetCurrentMethod().Name, exe.LineNumber(), Title);
            }

            string ax = axes.Remove(axes.Length - 1, 1).ToString();

            return ax;
        }


    }
}