test = ( function ()
{
var instance;

function test () 
{
	Gwt.Gui.Window.call (this);
	
	this.SetSize (256, 256);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
	this.file1 = new Gwt.Gui.File ();
	this.file1.AddEvent (Gwt.Gui.Event.Form.Change, this.send.bind(this));
	this.file1.SetPosition (25, 10);
	
	/*
    this.graphic = new Gwt.Graphic.Svg.Canvas ();
    this.graphic.SetSize (this.GetWidth(), this.GetHeight ());
	this.graphic.SetViewBox (0, 0, this.graphic.GetWidth(), this.graphic.GetHeight());
	
	this.rect1 = new Gwt.Graphic.Svg.Rect ();
	this.rect1.SetFill ("Red");
	
	this.circle1 = new Gwt.Graphic.Svg.Circle ();
	this.circle1.SetFill ("Blue");
	this.circle1.SetCx (10);
	this.circle1.SetCy (10);
	
	this.ellipse1 = new Gwt.Graphic.Svg.Ellipse ();
	this.ellipse1.SetCx (30);
	this.ellipse1.SetCy (30);
	this.ellipse1.SetRx (25);
	this.ellipse1.SetRy (25);
	this.ellipse1.SetFill ("Green");
	
	this.line1 = new Gwt.Graphic.Svg.Line ();
	this.line1.SetStroke ("Yellow");
	this.line1.SetStrokeWidth (10);
	
	this.arc1 = new Gwt.Graphic.Svg.Arc ();
	this.arc1.DescribeArc (100, 100, 100, -30, 190);
	this.arc1.SetFill ("White");
	this.arc1.SetStroke ("Black");
	this.arc1.SetStrokeWidth (1);
	*/
	
	this.buttonoff = new Gwt.Gui.ButtonOnOff ();
	this.buttonoff.SetPosition (25, 25);
	
	this.Add (this.file1);
    this.Add (this.buttonoff);
	
	/*this.graphic.Add (this.rect1);
	this.graphic.Add (this.circle1);
	this.graphic.Add (this.ellipse1);
	this.graphic.Add (this.line1);
	this.graphic.Add (this.arc1);*/

}

test.prototype = new Gwt.Gui.Window ();
test.prototype.constructor = test;

test.prototype.send = function ()
{
	var data = {"user_info": {"document": "1098671330", "document_type": "c.c"}, "userfile": this.file1.GetData ()};
	new Gwt.Core.Request ("/backend/upload_file/", this.response.bind (this), data);
	
}

test.prototype.response = function (data)
{
	console.log (data);
}

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new test ();
			instance.Open ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
		
	this.close = function ()
	{
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
	}
}
})();
