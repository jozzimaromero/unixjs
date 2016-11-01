//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function ()
{
	Gwt.Gui.Image.call (this);
	
	this.InitAvatar ();
}

Gwt.Gui.Avatar.prototype = new Gwt.Gui.Image ();
Gwt.Gui.Avatar.prototype.constructor = Gwt.Gui.Avatar;

Gwt.Gui.Avatar.prototype.FinalizeAvatar = function ()
{
	this.FinalizeImage ();
}

Gwt.Gui.Avatar.prototype.InitAvatar = function (Avatar)
{
	this.SetClassName ("Gwt_Gui_Avatar");
	this.SetImage (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.camera.switch.svg");
	this.SetSize (96, 96);
}
//Ends Gwt::Gui::Avatar
//##################################################################################################
