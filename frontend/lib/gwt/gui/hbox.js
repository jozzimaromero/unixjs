//Class Gwt::Gui::HBox
Gwt.Gui.HBox = function (Margin)
{
        Gwt.Gui.Frame.call (this);
	
        this.MarginElements = null;
        this.Alignment = null;
	
        this.InitHBox (Margin);
}

Gwt.Gui.HBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.HBox.prototype.constructor = Gwt.Gui.HBox

Gwt.Gui.HBox.prototype.FinalizeHbox = function ()
{
        this.MarginElements = null;
        this.Alignment = null;
        
        this.FinalizeFrame ();
}

Gwt.Gui.HBox.prototype.InitHBox = function (Margin)
{
        this.SetClassName ("Gwt_Gui_HBox");
        this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	this.SetAlignment (Gwt.Gui.ALIGN_TOP);
        
        this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
}

Gwt.Gui.HBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.HBox.prototype.Add = function (Element)
{
    this.GetChilds ().push (Element);
    this.GetHtml ().appendChild (Element.GetHtml ());
        
    if (Element instanceof Gwt.Gui.VBox)
    {
        var vboxs = [];
        for (var i = 0; i < this.GetChilds ().length; i++)
        {
            if (this.GetChilds ()[i] instanceof Gwt.Gui.VBox)
            {
                vboxs.push (this.GetChilds ()[i]);
            }
        }

        for (var j = 0; j < vboxs.length; j++)
        {
            vboxs[j].SetWidth (this.GetWidth () / vboxs.length);
            vboxs[j].SetHeight (this.GetHeight ());
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
            Element.SetMarginLeft (this.GetMarginElements ());
        }
        
        if (Element.GetExpand ()) Element.SetHeight (this.GetHeight ()*0.99);
        
        if (!Element.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    Element.SetMarginTop (0);
                    break;
		   
                case Gwt.Gui.ALIGN_CENTER:
                    Element.SetMarginTop ((this.GetHeight () - Element.GetHeight ())/2);
                    break;
		
                case Gwt.Gui.ALIGN_BOTTOM:
                    Element.SetMarginTop (this.GetHeight () - (Element.GetHeight () + Element.GetBorder()*2));
                    break;
		
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }       
    }
}

Gwt.Gui.HBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_TOP:
	    this.Alignment = Gwt.Gui.ALIGN_TOP;
	    break;
	
	case Gwt.Gui.ALIGN_BOTTOM:
	    this.Alignment = Gwt.Gui.ALIGN_BOTTOM;
	    break;
	
	default:
	    throw TypeError("Invalid HBox Alignment Value");
	    break;
    }
}

Gwt.Gui.HBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}

Gwt.Gui.HBox.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.HBox.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    var elements = this.GetChilds ();
    var vboxs = [];
    var others = [];
    
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp instanceof Gwt.Gui.VBox)
        {
            vboxs.push (tmp);
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
        SpaceOcuped += tmp.GetWidth ();
    }
            
    for (var j = 0; j < vboxs.length; j++)
    {
        var tmp = vboxs[j];
        tmp.SetWidth (((this.GetWidth () - SpaceOcuped) / vboxs.length));
    }
}

Gwt.Gui.HBox.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    var elements = this.GetChilds ();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        
        if (tmp.GetExpand ()) tmp.SetHeight (this.GetHeight ()*0.99);
		
        if (!tmp.GetExpand ())
        {
            switch (this.GetAlignment ())
            {
                case Gwt.Gui.ALIGN_TOP:
                    tmp.SetMarginTop (0);
                    break;
                        
                case Gwt.Gui.ALIGN_CENTER:
                    tmp.SetMarginTop ((this.GetHeight () - tmp.GetHeight ())/2);
                    break;
                        
                case Gwt.Gui.ALIGN_RIGHT:
                    tmp.SetMarginTop (this.GetHeight() - (tmp.GetHeight () + tmp.GetBorder()*2));
                    break;
                        
                default:
                    throw TypeError("Invalid HBox Alignment Value");
                    break;
            }
        }
    }
}
//Ends Gwt::Gui::HBox
//##################################################################################################
