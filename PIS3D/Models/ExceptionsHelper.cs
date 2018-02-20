using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace PIS3D.Models
{
    public static class ExceptionHelper
    {
        /// <summary>
        /// return number of line that has exception
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static int LineNumber(this Exception e)
        {

            int linenum = 0;

            try
            {

                linenum = Convert.ToInt32(e.StackTrace.Substring(e.StackTrace.LastIndexOf(":line", StringComparison.Ordinal) + 5));

            }

            // ReSharper disable once EmptyGeneralCatchClause
            // ReSharper disable EmptyGeneralCatchClause
            catch
            // ReSharper restore EmptyGeneralCatchClause
            {

                //Stack trace is not available!

            }

            return linenum;

        }
        /// <summary>
        /// write on log file
        /// </summary>
        /// <param name="sExceptionName"></param>
        /// <param name="sEventName"></param>
        /// <param name="sControlName"></param>
        /// <param name="nErrorLineNo"></param>
        /// <param name="sFormName"></param>
        public static void LogFile(string sExceptionName, string sEventName, string sControlName, int nErrorLineNo, string sFormName)
        {

            try
            {

                StreamWriter log;
                //if (!File.Exists(App.SpecialFileName))
                //{

                //    log = new StreamWriter(App.SpecialFileName);

                //}

                //else
                //{

                //    log = File.AppendText(App.SpecialFileName);

                //}
                //// Write to the file:

                //log.WriteLine("Data Time:" + DateTime.Now);

                //log.WriteLine("Exception Name:" + sExceptionName);

                //log.WriteLine("Event Name:" + sEventName);

                //log.WriteLine("Control Name:" + sControlName);

                //log.WriteLine("Error Line No.:" + nErrorLineNo);

                //log.WriteLine("Form Name:" + sFormName);
                //log.WriteLine("-----------------------------------------------------------------------------------------");
                //log.WriteLine();
                //// Close the stream:

                //log.Close();

            }
            catch
            {

                //MessageBox.Show(Properties.Settings.Default.msg14, "Log File", MessageBoxButton.OK, MessageBoxImage.Error);

            }


        }
        public static void ValidationLogFile(Exception ex, string sExceptionName, string sEventName, string sControlName, int nErrorLineNo, string sFormName)
        {
            try
            {
                //StreamWriter streamWriter = File.Exists(App.SpecialFileName2Validation) ?
                //    File.AppendText(App.SpecialFileName2Validation) : new StreamWriter(App.SpecialFileName2Validation);
                //streamWriter.WriteLine("Data Time:" + (object)DateTime.Now);
                //streamWriter.WriteLine("Exception Name:" + sExceptionName);
                //streamWriter.WriteLine("Event Name:" + sEventName);
                //streamWriter.WriteLine("Control Name:" + sControlName);
                //streamWriter.WriteLine("Error Line No.:" + (object)nErrorLineNo);
                //streamWriter.WriteLine("Form Name:" + sFormName);
                //streamWriter.WriteLine("-----------------------------------------------------------------------------------------");
                //streamWriter.WriteLine();
                //streamWriter.Close();
            }
            catch
            {
                //int num = (int)MessageBox.Show(string.Format(Settings.Default.msg14, (object)"Validation Log File"), "Validation Log File", MessageBoxButton.OK, MessageBoxImage.Hand);
            }
        }
        public static void FormatError(string sExceptionName, string sEventName, string sControlName, string nErrorLineNo, string sFormName)
        {

            try
            {

                StreamWriter log;
                //if (!File.Exists(App.SpecialFileName))
                //{

                //    log = new StreamWriter(App.SpecialFileName);

                //}

                //else
                //{

                //    log = File.AppendText(App.SpecialFileName);

                //}
                //// Write to the file:

                //log.WriteLine("Data Time:" + DateTime.Now);

                //log.WriteLine("Exception Name:" + sExceptionName);

                //log.WriteLine("Element Path:" + sEventName);

                //log.WriteLine("Value:" + sControlName);

                //log.WriteLine("Method Name:" + nErrorLineNo);

                //log.WriteLine("Form Name:" + sFormName);
                //log.WriteLine("-----------------------------------------------------------------------------------------");
                //log.WriteLine();
                //// Close the stream:

                //log.Close();

            }
            catch
            {

                //MessageBox.Show(Properties.Settings.Default.msg14, "Log File", MessageBoxButton.OK, MessageBoxImage.Error);

            }


        }
        public static void _3DLogFile(Exception exc, string sControlName, string filename)
        {

            try
            {

                StreamWriter log;
                //if (!File.Exists(App.SpecialFileName3D))
                //{

                //    log = new StreamWriter(App.SpecialFileName3D);

                //}

                //else
                //{

                //    log = File.AppendText(App.SpecialFileName3D);

                //}
                // Write to the file:

                //log.WriteLine("Job Name: " + filename + ", Data Time:" + DateTime.Now);
                //if (exc.InnerException != null)
                //{
                //    log.Write("Inner Exception Type: ");
                //    log.WriteLine(exc.InnerException.GetType().ToString());
                //    log.Write("Inner Exception: ");
                //    log.WriteLine(exc.InnerException.Message);
                //    log.Write("Inner Source: ");
                //    log.WriteLine(exc.InnerException.Source);
                //    if (exc.InnerException.StackTrace != null)
                //    {
                //        log.WriteLine("Inner Stack Trace: ");
                //        log.WriteLine(exc.InnerException.StackTrace);
                //    }
                //}
                //log.Write("Exception Type: ");
                //log.WriteLine(exc.GetType().ToString());
                //log.WriteLine("Exception: " + exc.Message);
                //log.WriteLine("Source: " + sControlName);
                //log.WriteLine("Stack Trace: ");
                //if (exc.StackTrace != null)
                //{
                //    log.WriteLine(exc.StackTrace);
                //    log.WriteLine();
                //}
                //log.WriteLine("-----------------------------------------------------------------------------------------");
                //// Close the stream:
                //log.Close();

            }
            catch
            {

                //MessageBox.Show(Properties.Settings.Default.msg14, "3D Log File", MessageBoxButton.OK, MessageBoxImage.Error);

            }


        }
    }

}