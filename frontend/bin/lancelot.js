/*lancelot = (function ()
{
var instance;

function lancelot ()
{
	Gwt.Gui.Window.call (this);
	
	this.set_size (250, 500);
	this.set_position (Gwt.Gui.WIN_POS_CENTER);
	this.set_border_width (12);
	
	this.row1 = new Gwt.Gui.HBox ();
	this.row2 = new Gwt.Gui.HBox ();
	this.row3 = new Gwt.Gui.HBox ();
	this.row4 = new Gwt.Gui.HBox ();

	this.add (this.row1);
	this.add (this.row2);
	this.add (this.row3);
	this.add (this.row4);
}

lancelot.prototype = new Gwt.Gui.Window ();
lancelot.prototype.constructor = lancelot;

return new function ()
{
	this.open = function ()
	{
		if (instance == null)
		{
			instance = new lancelot ();
			desktop.show (instance);
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.close = function ()
	{
		if (instance != null)
		{
			instance.close ();
			instance = null;
		} 
	}
}

})();
*/
