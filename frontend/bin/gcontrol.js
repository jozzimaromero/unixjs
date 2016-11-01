gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
	Gwt.Gui.Frame.call (this, "Usuarios");
	
	this.SetSize (244, 48);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER, Gwt.Gui.WIN_POS_BOTTOM);
        
        this.layout = new Gwt.Gui.HBox(48);
        this.layout.SetHeight(this.GetHeight());
        this.Add (this.layout);
        
        this.arrow = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg");
        this.layout.Add(this.arrow);
    
        this.circle = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.3d.collada.svg");
        this.layout.Add(this.circle);
        
        this.sqrt = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.app.remove.svg");
        this.layout.Add(this.sqrt);
 
        desktop.show (this);
}

gcontrol.prototype = new Gwt.Gui.Frame ();
gcontrol.prototype.constructor = gcontrol;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gcontrol ();
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

