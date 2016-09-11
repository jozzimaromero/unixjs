//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Data)
{
	this.XHR = new XMLHttpRequest ();			
	this.Url = null;
	this.Func = null;
	this.Data = null;
	this.InitRequest (Url, Func, Data);
}

Gwt.Core.Request.prototype.InitRequest = function (Url, Func, Data)
{
	this.Url = Url;
	this.Func = Func;
	this.Data = Data;
	this.XHR.onreadystatechange = this.Ready.bind(this);
	this.XHR.open ("POST", this.Url, true);
	this.Send ();
}

Gwt.Core.Request.prototype.Send = function ()
{	
	if (this.Data.userfile !== undefined)
	{
		this.UploadFile ();
		return;
	}
	this.SendData ();
}

Gwt.Core.Request.prototype.UploadFile =  function ()
{
	this.Boundary = "---------------------------" + Date.now().toString(16);
	this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + this.Boundary);
	//this.XHR.setRequestHeader("document_type", this.Data.document_type.toString ());
	//this.XHR.setRequestHeader("document", this.Data.document.toString ());
	
	this.Multipart = [];
	
	this.Multipart.push ("\r\n--"+this.Boundary+"\r\n");
	var ContentDispositionDocumentType = "Content-Disposition: form-data; name=\"user_info\"; filename=\"document_type.txt\"\r\nContent-Type: \"txt\"\r\n\r\n";
	this.Multipart.push (ContentDispositionDocumentType);
	this.Multipart.push (JSON.stringify(this.Data.user_info));

	this.Multipart.push ("\r\n--"+this.Boundary+"\r\n");
	var ContentDispositionFile = "Content-Disposition: form-data; name=\"userfile\"; filename=\""+ this.Data.userfile.name + "\"\r\nContent-Type: " + this.Data.userfile.type + "\r\n\r\n";
	this.Multipart.push (ContentDispositionFile);
	
	this.FileData = new FileReader ();
	this.FileData.readAsBinaryString (this.Data.userfile);
    
	this.FileData.addEventListener ("load", this.SendFile.bind(this), false);
}

Gwt.Core.Request.prototype.SendFile = function ()
{
	this.Multipart.push (this.FileData.result);
	
	this.Multipart.push ("\r\n--"+this.Boundary+"--");
	
	var RawData = this.Multipart.join ("");
	
	this.XHR.setRequestHeader("Content-Length", RawData.length);
	
	var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
	{
      Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
	}
	
	this.XHR.send (Uint8Data);
}

Gwt.Core.Request.prototype.SendData = function ()
{
	this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
	
	var RawData = "data="+JSON.stringify(this.Data);
	
	this.XHR.send (RawData);
}

Gwt.Core.Request.prototype.Ready = function ()
{
	if (this.XHR.readyState == 4 && this.XHR.status == 200)
	{
		this.Func(JSON.parse(this.XHR.response));
	}
}
//End of Gwt::Core::Request
//##########################################################
