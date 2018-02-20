using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PIS3D.Models
{
    public class ErrorsData
    {
        private Error[] errorField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Error")]
        public Error[] Error
        {
            get
            {
                return this.errorField;
            }
            set
            {
                this.errorField = value;
            }
        }
    }
    public class Error
    {
        public string Message { get; set; }
        public string Element { get; set; }
        public string Value { get; set; }
        public string Path { get; set; }
        public string Descreption { get; set; }
    }

}