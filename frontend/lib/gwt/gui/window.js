//Class Gwt::Gui::Window
Gwt.Gui.Window = function (Title)
{
    Gwt.Gui.Frame.call (this);
    
    this.TitleBar = null;
    this.Body = null;
    this.Title = null;
    
    this.InitWindow (Title);
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype.FinalizeWindow = function ()
{
    this.TitleBar.FinalizeFrame();
    this.TitleBar = null;
    
    this.Body.FinalizeFrame();
    this.Body = null;
    
    this.Title.FinalizeStaticText();
    this.Title = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Window.prototype.InitWindow = function (Title)
{
    this.TitleBar = new Gwt.Gui.VBox (0);
    this.Body = new Gwt.Gui.Frame ();
    this.Title = new Gwt.Gui.StaticText(Title || "Default Window Title");
    
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
    this.SetPosition (Left, top);
    
    
    this.TitleBar.SetSize (this.GetWidth(), 32);
    this.TitleBar.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
    this.TitleBar.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.RootAdd (this.TitleBar);
    
    this.Title.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.TitleBar.Add (this.Title);
    
    this.Body.SetSize (this.GetWidth(), this.GetHeight () - 32);
    this.RootAdd (this.Body);
}

Gwt.Gui.Window.prototype.RootAdd = function (Element)
{
    this.GetChilds().push (Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Window.prototype.Add = function (Element)
{
    this.Body.Add (Element);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
    var Border_ = Border*2;
    this.layout.SetWidth (this.Body.GetWidth () - Border_);
    this.layout.SetHeight (this.Body.GetHeight () - Border_);
    var left = (this.Body.GetWidth () - (this.Body.GetWidth () - Border_))/2;
    var top = ((this.Body.GetHeight () - (this.Body.GetHeight () - Border_))/2);
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

Gwt.Gui.Window.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Gui.Window.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.TitleBar.SetWidth (this.GetWidth ());
    this.Body.SetWidth (this.GetWidth());
}

Gwt.Gui.Window.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.Body.SetHeight (this.GetHeight () - 32);
}
//Ends Gwt::Gui::Window
//##################################################################################################
