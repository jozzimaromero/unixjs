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
	if (this.Data instanceof File)
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
	
	this.Multipart = [];	
	this.Multipart.push ("--"+this.Boundary+"\r\n");
	
	var ContentDisposition = "Content-Disposition: form-data; name=\"userfile\"; filename=\""+ this.Data.name + "\"\r\nContent-Type: " + this.Data.type + "\r\n\r\n";
	this.Multipart.push (ContentDisposition);
	
	
	this.FileData = new FileReader ();
	this.FileData.readAsBinaryString (this.Data);
    
	this.FileData.addEventListener ("load", this.SendFile.bind(this), false);
}

Gwt.Core.Request.prototype.SendFile = function ()
{
	this.Multipart.push (this.FileData.result);
	
	this.Multipart.push ("\r\n--"+this.Boundary+"--");
	
	var RawData = this.Multipart.join ("");
	
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
	this.XHR.send (this.Data);
}

Gwt.Core.Request.prototype.Ready = function ()
{
	if (this.XHR.readyState == 4 && this.XHR.status == 200)
	{
		this.Func(this.XHR.response);
	}
}
//End of Gwt::Core::Request
//##########################################################
