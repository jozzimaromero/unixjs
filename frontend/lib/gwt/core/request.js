//Gwt::Core::Request
Gwt.Core.Request = function (app, method, params, callback)
{
	Gwt.Core.Contrib.request_id++;
	this.xmlhttp = new XMLHttpRequest ();
	this.xmlhttp.onreadystatechange = this.ready.bind(this, callback);
	this.xmlhttp.open ("POST", "/backend/"+app+"/"+method, true);
	this.xmlhttp.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
	this.data = "params="+JSON.stringify(params);
	this.xmlhttp.send (this.data);
}

Gwt.Core.Request.prototype.ready = function (callback)
{
	if (this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
	{
		callback(this.xmlhttp.response);
	}
}
//End of Gwt::Core::Request
//##########################################################
