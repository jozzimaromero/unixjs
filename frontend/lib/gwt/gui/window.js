//Class Gwt::Gui::Window
Gwt.Gui.Window = function ()
{
	Gwt.Gui.Frame.call (this);
	
	this.InitWindow ();
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype.FinalizeWindow = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Window.prototype.InitWindow = function ()
{
	this.SetClassName ("Gwt_Gui_Window");
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBoxShadow (0, 0, 10, 2, new Gwt.Gui.Contrib.Color (102,205,102,0.3));
	this.SetBorder (0);
	var Color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.White);
	Color.SetAlpha (0.5);
	this.SetBorderColor (Color);
	this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetBorder (1);
	this.SetBorderRadius (5);
	this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	this.SetSize (256, 256);
	this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	var Left = (Math.random () * Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth ();
	var Top = (Math.random () * Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight ();
	if (Left < 0) Left=0;
	if (Top < 0) Top=0;
	this.SetPosition (Top, Left);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
	var Border_ = Border*2;
	this.layout.SetWidth (this.GetWidth ()-Border_);
	this.layout.SetHeight (this.GetHeight ()-Border_);
	var left = (this.GetWidth ()-(this.GetWidth ()-Border_))/2;
	var top = ((this.GetHeight ()-(this.GetHeight ()-Border_))/2);
	this.layout.SetPosition (left, top);
}

Gwt.Gui.Window.prototype.Open = function ()
{
	desktop.show (this);
}

Gwt.Gui.Window.prototype.Close = function ()
{
	this.FinalizeWindow ();
}
//Ends Gwt::Gui::Window
//##################################################################################################
