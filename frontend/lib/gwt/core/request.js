//Gwt::Core::Request
Gwt.Core.Request = function (Func, Url, Data)
{
	XMLHttpRequest.call (this);
			
	this.Func = null;
	this.Url = null;
	this.Data = null;
	this.InitRequest (Func, Url, Data);
}

Gwt.Core.Request.prototype = new XMLHttpRequest ();
Gwt.Core.Request.prototype.constructor = Gwt.Core.Request;

Gwt.Core.Request.prototype.InitRequest = function (Func, Url, Data)
{
	this.Func  = Func;
	this.Url = Url;
	this.Data = Data;
	this.onreadystatechange = this.Ready.bind(this);
	this.open ("POST", url, true);
	this.SetXWWWFormUrlEncode ();
}

Gwt.Core.Request.prototype.Ready = function ()
{
	if (this.readyState == 4 && this.status == 200)
	{
		this.Func("callback", this.response);
	}
}

Gwt.Core.Request.prototype.Send = function ()
{
	this.send (this.data);
}

Gwt.Core.Request.prototype.SendXW3FormUrlEncode = function ()
{
	this.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
	var data = "data="+JSON.stringify(this.Data);
	console.log (data);
}

Gwt.Core.Request.prototype.SendMultiparFormData = function ()
{
	this.sBoundary = "---------------------------" + Date.now().toString(16);
    this.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + this.sBoundary);
	var data = "data="+JSON.stringify(this.Data);
}
//End of Gwt::Core::Request
//##########################################################
