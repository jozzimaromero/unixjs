block = (function ()
{ 
var instance;

function block ()
{
	Gwt.Gui.Window.call (this);

	this.SetSize (250,300);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
	var date = new Date ();

	var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	this.clock = new Gwt.Gui.Clock ();
	
	this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
	this.date.SetWidth (180);
	this.date.TextAlign ("center");
	
	this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Desbloquear");
	this.unlock_button.SetWidth (120);
	
    this.layout = new Gwt.Gui.VBox();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	
	this.Add(this.layout);
    this.SetBorderSpacing (12);
	this.layout.Add(this.clock);
	this.layout.Add(this.date);
	this.layout.Add(this.unlock_button);
		
	this.unlock_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.unlock.bind(this));
}

block.prototype = new Gwt.Gui.Window ();
block.prototype.constructor = block;	

block.prototype.unlock = function ()
{
	unlock_session ();
}
	
return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new block ();
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
