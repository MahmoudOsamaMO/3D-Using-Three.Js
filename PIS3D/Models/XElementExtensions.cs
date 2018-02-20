using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

using System.Xml.Linq;
namespace PIS3D.Models
{
    public static class XElementExtensions
    {
        /// <summary>Gets the first (in document order) child element with the specified <see cref="XName"/>.</summary>  
        /// /// <param name="element">The element.</param>    /// <param name="name">The <see cref="XName"/> to match.</param>  
        /// /// <param name="ignoreCase">If set to <c>true</c> case will be ignored whilst searching for the <see cref="XElement"/>.</param>   
        /// /// <returns>A <see cref="XElement"/> that matches the specified <see cref="XName"/>, or null. </returns>  
        public static XElement ElementIgnoreCase(this XElement element, XName name, bool ignoreCase = false)
        {
            var el = element.Element(name);
            if (el != null) return el;
            if (!ignoreCase) return new XElement(name);
            var elements = element.Elements().Where(e => name != null && String.Equals(e.Name.LocalName.ToString(), name.ToString(), StringComparison.InvariantCultureIgnoreCase));
            var xElements = elements as XElement[] ?? elements.ToArray();
            return !xElements.Any() ? new XElement(name) : xElements.First();


        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static IEnumerable<XElement> ElementsIgnoreCase(this XContainer container, XName name)
        {
            return container.Elements().Where(element => element.Name.NamespaceName == name.NamespaceName &&
                                                         String.Equals(element.Name.LocalName, name.LocalName, StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// return Descendants list with IgnoreCase
        /// </summary>
        /// <param name="container"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static IEnumerable<XElement> DescendantsIgnoreCase(this XContainer container, XName name)
        {
            return container.Descendants().Where(element => element.Name.NamespaceName == name.NamespaceName &&
                                                            String.Equals(element.Name.LocalName, name.LocalName, StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// method return value ,if value=null return empty string
        /// </summary>
        /// <param name="element"></param>
        /// <returns></returns>
        public static string Value(this XElement element)
        {
            try
            {
                return element != null ? element.Value : string.Empty;
            }
            catch (Exception exe)
            {
                ExceptionHelper.LogFile(exe.Message, exe.ToString(), MethodBase.GetCurrentMethod().Name, exe.LineNumber(), "XElementExtensions");
                return string.Empty;
            }
        }
        public static void Copy_Many(int q, XElement ele, XElement root, int MAX_ID)
        {
            try
            {

                for (var i = 1; i <= q; i++)
                {
                    var ele2 = new XElement(ele);
                    ele2.SetElementValue("ID", MAX_ID + i);
                    root.Add(ele2);
                }
            }
            catch (Exception exe)
            {
                ExceptionHelper.LogFile(exe.Message, exe.ToString(), MethodBase.GetCurrentMethod().Name, exe.LineNumber(), "linktoxml calss");

            }
        }


        public static double ParseToDouble(this String s)
        {
            double d;
            if (double.TryParse(s, out d))
                return d;
            return 0;
        }
        public static int ParseToInt(this String s)
        {
            int d;
            if (int.TryParse(s, out d))
                return d;
            return 0;
        }
        public static double ParseToDouble(this XElement element)
        {

            double d;
            if (double.TryParse(element.Value(), out d))
                return d;

            if (element.Name == "Width" || element.Name == "RidgeDistance")
                d = 0;
            else if (element.Name == "Length" || element.Name == "LeftSlope" || element.Name == "RightSlope" || element.Name == "LeftHeight"
                || element.Name == "RightHeight" || element.Name == "ClearHeight")
                d = 1;
            //ExceptionHelper.FormatError(" Format Exception ", element.AncestorsAndSelf()
            //                .InDocumentOrder()
            //                .Aggregate("", (s, i) => s + "/" + i.Name.ToString()) ,element.Value(), "ParseToDouble", "Extension Method");
            return d;
        }
        public static int ParseToInt(this XElement element)
        {
            int d;
            if (int.TryParse(element.Value(), out d))
                return d;
            if (element.Name == "StartBay" || element.Name == "EndBay" || element.Name == "ID")
                d = 1;

            //ExceptionHelper.FormatError(" Format Exception ", element.AncestorsAndSelf()
            //                .InDocumentOrder()
            //                .Aggregate("", (s, i) => s + "/" + i.Name.ToString()), element.Value(), "ParseToInt", "Extension Method");
            return d;
        }
        public static bool DoubleUpToDouble(this Double number, double number2)
        {
            return Math.Round(number, 3) > Math.Round(number2, 3);
            //   return !(Math.Abs(number-number2) < double.Epsilon) && number>number2;
        }
    }

}