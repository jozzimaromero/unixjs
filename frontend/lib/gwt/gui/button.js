//##################################################################################################
//Class Gwt::Gui::Button
Gwt.Gui.Button = function (Image, Text)
{
    Gwt.Gui.Frame.call (this);
	
    this.Image = null;
    this.Text = null;
	
    this.InitButton (Image, Text);
}

Gwt.Gui.Button.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Button.prototype.constructor = Gwt.Gui.Button;

Gwt.Gui.Button.prototype.FinalizeButton = function ()
{
    this.Image = null;
    this.Text = null;
    this.FinalizeFrame ();
}

Gwt.Gui.Button.prototype.InitButton = function (Image, Text)
{
    this.SetClassName ("Gwt_Gui_Button");
    this.SetExpand (false);
    this.SetBorder (1);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    color.SetAlpha (0.3);
    this.SetBorderColor (color);
    this.SetBorderRadius (5);
    this.SetMargin (0);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseMove, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseDown, this.MouseDown.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseUp, this.MouseMove.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
	
    this.Image = new Gwt.Gui.Image (Image);
    this.Image.SetSize (18, 18);
    this.Image.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Image.SetMarginRight (5);
    this.Image.SetMarginLeft (5);
    this.Image.SetMarginTop (2);
    this.Image.SetValign (Gwt.Gui.Contrib.Valign.Top);
	
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Text.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Text.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
	
    this.Add (this.Image);
    this.Add (this.Text);
}

Gwt.Gui.Button.prototype.MouseMove = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.1));
}

Gwt.Gui.Button.prototype.MouseDown = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.2));
}

Gwt.Gui.Button.prototype.MouseOut = function ()
{
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
}

Gwt.Gui.Button.prototype.SetText = function (Text)
{
    //console.log (this.Image);
    this.Text.SetText (Text);
    this.Text.SetWidth (this.GetWidth ()*0.7);
}

Gwt.Gui.Button.prototype.SetImage = function (Src)
{
    this.Image.SetImage (Src);
}

Gwt.Gui.Button.prototype.SetFontSize = function (FontSize)
{
    this.Text.SetFontSize (FontSize);
    this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
}

//Ends Gwt::Gui::Button
//##################################################################################################
