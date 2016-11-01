    //Class Gwt::Gui::Slider
Gwt.Gui.Slider = function (Slots)
{
    Gwt.Gui.Frame.call (this);
    
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.InitSlider (Slots);
}

Gwt.Gui.Slider.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Slider.prototype.constructor = Gwt.Gui.Slider;

Gwt.Gui.Slider.prototype.FinalizeSlider = function ()
{
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Slider.prototype.InitSlider = function (Slots)
{
    this.SetClassName ("Gwt_Gui_Slider");
    
    this.Slots = new Array (typeof(Slots) === "undefined"? 1 : Slots);
    
    this.Panel = new Gwt.Gui.Frame ();
    
    this.ArrowLeft = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg", "");
    this.ArrowLeft.SetWidth (28);
    this.ArrowLeft.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideRight.bind (this));
    
    this.ArrowRight = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "");
    this.ArrowRight.SetWidth (28);
    this.ArrowRight.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideLeft.bind (this));
    
    this.Viewer = new Gwt.Gui.Frame ();
    
    this.Slide = new Gwt.Gui.HBox ();
    
    this._Add (this.Viewer);
    this._Add (this.Panel);
}

Gwt.Gui.Slider.prototype.GetSlots = function ()
{
    return this.Slots;
}

Gwt.Gui.Slider.prototype._Add = function (Widget)
{
    Widget.Parent = this;
    this.Add (Widget);
}

Gwt.Gui.Slider.prototype.Setup = function ()
{
    this.Panel.SetSize (this.GetWidth (), 28);
    this.Viewer.SetSize (this.GetWidth (), (this.GetHeight () - 28));
    
    var Hbox = new Gwt.Gui.HBox (0);
    var Col1 = new Gwt.Gui.VBox (0);
    var Col2 = new Gwt.Gui.VBox (0);
    
    Hbox.SetSize (this.Panel.GetWidth(), 28);
    Col1.SetHeight (28);
    Col2.SetHeight (28);
    Col2.SetAlignment (Gwt.Gui.ALIGN_RIGHT);
    
    Hbox.Add (Col1);
    Hbox.Add (Col2);
    
    this.Panel.Add (Hbox);
    Col1.Add (this.ArrowLeft);
    Col2.Add (this.ArrowRight);
    
    this.Slide.SetSize (this.Viewer.GetWidth ()*this.GetSlots ().length, this.Viewer.GetHeight ());
 
    this.Viewer.Add (this.Slide);
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       var Tmp = new Gwt.Gui.VBox ();
       this.GetSlots ()[i] = Tmp;
    }
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       this.Slide.Add (this.GetSlots ()[i]);
    }
}

Gwt.Gui.Slider.prototype.SlideLeft = function ()
{
     if (-this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth() )
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () - this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.SlideRight = function ()
{
     if (this.Slide.GetPositionLeft() < 0 && this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth())
     {
        this.Slide.SetPosition (this.Slide.GetPositionLeft () + this.Viewer.GetWidth (), 0);
     }
}

Gwt.Gui.Slider.prototype.AddSlotWidget = function (Slot, Widget)
{
    this.GetSlots ()[Slot].Add (Widget);
}

//Ends Gwt::Gui::Slider
//##################################################################################################

