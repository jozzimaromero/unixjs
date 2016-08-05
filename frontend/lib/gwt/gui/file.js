//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
	this.Data = null;
	
	this.InitFile ();
}

Gwt.Gui.File.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.File.prototype.constructor = Gwt.Gui.File;

Gwt.Gui.File.prototype.FinalizeFile = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.File.prototype.InitFile = function ()
{
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "file");
	this.Html.removeAttribute ("multiple");
	this.SetOpacity (1);
	this.SetWidth (180);
	this.SetClassName ("Gwt_Gui_Text");
	
	this.AddEvent (Gwt.Gui.Event.Form.Change, this.UpdateInfo.bind (this));
}

Gwt.Gui.File.prototype.UpdateInfo = function ()
{
	this.Data = this.Html.files[0];
	this.DataSize = this.Data.size;
	this.FileName = this.Data.name;
	this.MimeType = this.Data.type;
}

Gwt.Gui.File.prototype.GetData = function ()
{
	return this.Data;
}

Gwt.Gui.File.prototype.GetDataSize = function ()
{
	return this.DataSize;
}

Gwt.Gui.File.prototype.GetFileName = function ()
{
	return this.FileName;
}

Gwt.Gui.File.prototype.GetMimeType = function ()
{
	return this.MimeType;
}

Gwt.Gui.File.prototype.Reset = function ()
{
	this.Data = null;
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
}

//Ends Gwt::Gui::File
//##################################################################################################
