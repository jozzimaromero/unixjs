desktop = (function ()
{
var instance;
	
function desktop ()
{
	Gwt.Gui.Frame.call (this);
	document.body.appendChild (this.Html);
	this.SetClassName ("Gwt_Gui_Desktop");
	this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
	this.SetMargin (0);
	this.SetPadding (0);
	this.SetBackgroundImage (Gwt.Core.Contrib.Images+"dark1.jpeg");
	this.SetBackgroundAttachment (Gwt.Gui.Contrib.BackgroundAttachment.Fixed);
	this.SetBackgroundClip (Gwt.Gui.Contrib.BackgroundClip.ContentBox);
	this.SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat, Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBorder (0);
	
	//new Gwt.Core.Request ("/backend/open_pool/", function () {}, {});
}
	
desktop.prototype = new Gwt.Gui.Frame ();
desktop.prototype.constructor = desktop;
	
desktop.prototype.Show = function (app)
{
	this.Add (app);
}
		
return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new desktop ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.show = function (app)
	{
		instance.Show (app);
	}
}
})();
