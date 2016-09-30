//##################################################################################################
//Class Gwt::Gui::Button_on_off
Gwt.Gui.ButtonOnOff = function ()
{
	Gwt.Gui.Frame.call (this);
	this.Graphic = null;
	this.InitButtonOnOff ();
	this.Status = 0;
}

Gwt.Gui.ButtonOnOff.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.ButtonOnOff.prototype.constructor = Gwt.Gui.ButtonOnOff;

Gwt.Gui.ButtonOnOff.prototype.FinalizeButtonOnOff = function ()
{
	this.Graphic = null;
	this.FinalizeFrame ();
}

Gwt.Gui.ButtonOnOff.prototype.InitButtonOnOff = function ()
{
	this.SetClassName ("Gwt_Gui_Button_on_off");
	this.SetSize (48,24);
	this.SetBorder(1);
	this.SetOutLine (Gwt.Gui.Contrib.OutLine.None);
	var colorborder = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	colorborder.SetAlpha (0.5);
	this.SetBorderColor(colorborder);
	var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
	colorbackground.SetAlpha (0.25);
	this.SetBackgroundColor(colorbackground);
	this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetBorderRadius(24);
	
	this.Graphic = new Gwt.Graphic.Svg.Canvas ();
        this.Graphic.SetSize (24, 24);
	this.Graphic.SetViewBox (0, 0, this.Graphic.GetWidth(), this.Graphic.GetHeight());
		
	this.Circle = new Gwt.Graphic.Svg.Circle ();
	this.Circle.SetFill ("Azure");
	this.Circle.SetCx (12);
	this.Circle.SetCy (12);
	
	this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Click.bind(this));
	
	this.Graphic.Add (this.Circle);
	this.Add (this.Graphic);

}

Gwt.Gui.ButtonOnOff.prototype.Click = function ()
{
		
	if (this.Status === 0)
	{
		//Habia un pequeño bug porque el metodo SetPosition(Y, X) recibia los argumentos trocados
		//X era Y y Y era X, como ya lo arreglé tenga cuidado la declaración de SetPosition(X, Yser) es la correcta;
		this.Graphic.SetPosition (24,0);
		var colorbackground = new Gwt.Gui.Contrib.Color (0,102,255);
		colorbackground.SetAlpha (0.3);
		this.SetBackgroundColor(colorbackground);
		this.Status = 1;
	}
	else
	{
		this.Graphic.SetPosition (0,0);
		var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
		colorbackground.SetAlpha (0.25);
		this.SetBackgroundColor(colorbackground);
		this.Status = 0;
	}
}


//Ends Gwt::Gui::ButtonOnOff
//##################################################################################################
