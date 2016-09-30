//###############################################################################################################################################
//Class Gwt::Gui::VBox
Gwt.Gui.VBox = function (Margin)
{
	Gwt.Gui.Frame.call (this);
	
	this.Childs = null;
	this.MarginElements = null;
	this.Alignment = null;
	
	this.InitVBox (Margin);
}

Gwt.Gui.VBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.VBox.prototype.constructor = Gwt.Gui.VBox;

Gwt.Gui.VBox.prototype.FinalizeVBox = function ()
{
	this.Childs = null;
	this.MarginElements = null;
	this.Alignment = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.VBox.prototype.InitVBox = function (Margin)
{
	this.SetClassName ("Gwt_Gui_VBox");
	this.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	this.SetAlignment (Gwt.Gui.ALIGN_LEFT);
	
	this.Childs = [];
	this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
}

Gwt.Gui.VBox.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.VBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.VBox.prototype.Add = function (Element)
{
	this.GetChilds ().push (Element);
        this.GetHtml ().appendChild (Element.GetHtml ());
	
	if (Element instanceof Gwt.Gui.HBox)
	{
		var HBoxs = [];
		for (var i = 0; i < this.GetChilds ().length; i++)
		{
			if (this.GetChilds ()[i] instanceof Gwt.Gui.HBox)
			{
				HBoxs.push (this.GetChilds ()[i]);
			}
		}
	
		for (var j = 0; j < HBoxs.length; j++)
		{
			HBoxs[j].SetWidth (this.GetWidth ());
			HBoxs[j].SetHeight (this.GetHeight () / HBoxs.length);
		}
	}
	else
	{
		Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
		if (Element.GetHtml () === this.GetHtml ().firstChild)
		{
			Element.SetMargin (0);
		}
		else if (Element.GetHtml () === this.GetHtml ().lastChild)
		{
			Element.SetMarginTop (this.GetMarginElements ());
		}
		
		if (Element.GetExpand ()) Element.SetWidth(this.GetWidth()*0.99);
		
		if (!Element.GetExpand ())
		{
		    switch (this.GetAlignment ())
		    {
		        case Gwt.Gui.ALIGN_LEFT:
					Element.SetMarginLeft (0);
					break;
		   
		        case Gwt.Gui.ALIGN_CENTER:
					Element.SetMarginLeft ((this.GetWidth() - Element.GetWidth())/2);
					break;
		
		        case Gwt.Gui.ALIGN_RIGHT:
					Element.SetMarginLeft (this.GetWidth() - Element.GetWidth());
					break;
		
		       default:
					console.log("imposible set alignment in vbox.");
					break;
		    }
		}
	}
}

Gwt.Gui.VBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_LEFT:
	    this.Alignment = Gwt.Gui.ALIGN_LEFT;
	    break;
	
	case Gwt.Gui.ALIGN_RIGHT:
	    this.Alignment = Gwt.Gui.ALIGN_RIGHT;
	    break;
	
	default:
	    console.log("Alignment not valid in vbox.");
	    break;
    }
}

Gwt.Gui.VBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}
//Ends Gwt::Gui::VBox
//##################################################################################################
