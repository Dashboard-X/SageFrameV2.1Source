﻿#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using System.Collections;
using SageFrame.FileManager;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
#endregion

public partial class Modules_FileManager_FileMgr : BaseAdministrationUserControl
{
    public int UserID = 0;
    public int UserModuleID = 0;
    public string UserName = "";
    public string ImgPath = "";

    public void Initialize()
    {
        IncludeJs("FileManager", "/Modules/FileManager/js/jqueryFileTree.js", "/Modules/FileManager/js/ajaxupload.js", "/Modules/FileManager/js/jquery.lightbox-0.5.js");
        IncludeJs("FileManager", "/Modules/FileManager/js/UploadFileJScript.js", "/Modules/FileManager/js/jquery.imgareaselect.js");
        IncludeJs("FileManager", "/Modules/FileManager/js/jquery.tools.min.js");
        IncludeCss("FileManager", "/Modules/FileManager/css/module.css", "/Modules/FileManager/css/popup.css", "/Modules/FileManager/css/jqueryFileTree.css", "/Modules/FileManager/css/popup.css", "/Modules/FileManager/css/jquery.lightbox-0.5.css");
        IncludeCss("FileManager", "/Modules/FileManager/css/imgareaselect-animated.css", "/Modules/FileManager/css/FileUploaderStyleSheet.css");
        IncludeJs("FileManager", "/Modules/FileManager/JS/jquery.alerts.js");

        IncludeJs("FileManager", false, "/Modules/FileManager/CodeMirror/codemirror.js");
        IncludeJs("FileManager", "/Modules/FileManager/CodeMirror/xml.js");
        IncludeJs("FileManager", "/Modules/FileManager/CodeMirror/css.js");
        IncludeJs("FileManager", "/Modules/FileManager/CodeMirror/scheme.js");
        IncludeCss("FileManager", "/Modules/FileManager/CodeMirror/codemirror.css");
        IncludeCss("FileManager", "/Modules/FileManager/CodeMirror/default.css");
        IncludeCss("FileManager", "/Modules/FileManager/css/jcrop.css");
        IncludeJs("FileManager", "/Modules/FileManager/js/jquery.Jcrop.js");
        IncludeJs("FileManager", "/Modules/FileManager/js/crop.js");

        IncludeJs("FileManager", "/js/jquery.alerts.js");
    }
    protected void Page_Init(object sender, EventArgs e)
    {
        if (ViewState["UserID"] != null)
        {
            UserID = int.Parse(ViewState["UserID"].ToString());
        }
        else
        {
            UserID = FileManagerController.GetUserID(GetUsername);
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        Initialize();
        string modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "FileManagerGlobalVariable1", " var FileManagerPath='" + ResolveUrl(modulePath) + "';", true);
        UserModuleID = int.Parse(SageUserModuleID.ToString());
        UserName = GetUsername;

    }

}
