//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	
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
	this.SetOpacity (0);
	this.SetWidth (180);
	this.SetClassName ("Gwt_Gui_Text");
}

//Ends Gwt::Gui::File
//##################################################################################################
