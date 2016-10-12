//###############################################################################################################################################
//Class Gwt::Gui::VBox
Gwt.Gui.VBox = function (Margin)
{
	Gwt.Gui.Frame.call (this);
	
	this.MarginElements = null;
	this.Alignment = null;
	
	this.InitVBox (Margin);
}

Gwt.Gui.VBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.VBox.prototype.constructor = Gwt.Gui.VBox;

Gwt.Gui.VBox.prototype.FinalizeVBox = function ()
{
	this.MarginElements = null;
	this.Alignment = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.VBox.prototype.InitVBox = function (Margin)
{
	this.SetClassName ("Gwt_Gui_VBox");
	this.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	this.SetAlignment (Gwt.Gui.ALIGN_LEFT);
	
	this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
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
        var Others = [];
        for (var i = 0; i < this.GetChilds ().length; i++)
        {
            if (this.GetChilds ()[i] instanceof Gwt.Gui.HBox)
            {
                HBoxs.push (this.GetChilds ()[i]);
            }
            else
            {
                Others.push (this.GetChilds ()[i]);
            }
        }
	
        var SpaceOcuped = 0;
        for (var k = 0; k < Others.length; k++)
        {
            SpaceOcuped += Others[k].GetHeight();
        }
            
        for (var j = 0; j < HBoxs.length; j++)
        {
            HBoxs[j].SetWidth (this.GetWidth ());
            HBoxs[j].SetHeight (((this.GetHeight () - SpaceOcuped) / HBoxs.length));
        }
    }
    else
    {
        Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
        if (Element.GetHtml () === this.GetHtml ().firstChild)
        {
            Element.SetMarginTop (0);
        }
        
        else if (Element.GetHtml () === this.GetHtml ().lastChild)
        {
            Element.SetMarginTop (this.GetMarginElements ());
        }
		
        if (Element.GetExpand ()) Element.SetWidth (this.GetWidth ()*0.99);
		
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
                    Element.SetMarginLeft (this.GetWidth() - (Element.GetWidth() + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid VBox Alignment Value");
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
	    throw TypeError("Invalid VBox Alignment Value");
	    break;
    }
}

Gwt.Gui.VBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.VBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.VBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetWidth (this.GetWidth ()*0.99);
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_LEFT:
                    tmp.SetMarginLeft (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginLeft ((this.GetWidth() - tmp.GetWidth())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginLeft (this.GetWidth() - (tmp.GetWidth() + tmp.GetBorder()*2));
                    break;
                        
                default:
                    throw TypeError("Invalid VBox Alignment Value");
                    break;
            }
        }
    }
}

Gwt.Gui.VBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    var hboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.HBox)
        {
            hboxs.push (tmp);
        }
        else
        {
            others.push (tmp);
        }
    }
    
    var SpaceOcuped = 0;
    for (var k = 0; k < others.length; k++)
    {
        var tmp = others[k];
        SpaceOcuped += tmp.GetHeight();
    }
            
    for (var j = 0; j < hboxs.length; j++)
    {
        var tmp = hboxs[j];
        tmp.SetHeight (((this.GetHeight () - SpaceOcuped) / hboxs.length));
    }
}
//Ends Gwt::Gui::VBox
//##################################################################################################

