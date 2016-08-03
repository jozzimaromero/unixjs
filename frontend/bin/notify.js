notify = (function ()
{
var instance;

function notify(message)
{
    //Gwt.Gui.Window.call (this);
    console.log (message);
}

//notify.prototype = new Gwt.Gui.Window ();
//notify.prototype.constructor = notify;

return new function ()
{
	this.open = function(message)
	{
		if(instance == null)
		{
			instance = new notify (message);
			//desktop.show (instance);
                        this.close ();
		}
		else
		{
			console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.close = function ()
	{
		if(instance != null)
		{
			//instance.close();
			instance = null;
		}
	}
}
})();
