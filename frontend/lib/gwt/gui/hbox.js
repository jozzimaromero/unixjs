//Class Gwt::Gui::HBox
Gwt.Gui.HBox = function (Margin)
{
        Gwt.Gui.Frame.call (this);
	
        this.Childs = null;
        this.MarginElements = null;
	
        this.InitHBox (Margin);
}

Gwt.Gui.HBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.HBox.prototype.constructor = Gwt.Gui.HBox

Gwt.Gui.HBox.prototype.FinalizeHbox = function ()
{
        this.Childs = null;
        this.MarginElements = null;
        
        this.FinalizeFrame ();
}

Gwt.Gui.HBox.prototype.InitHBox = function (Margin)
{
        this.SetClassName ("Gwt_Gui_HBox");
        this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	
        this.Childs = [];
        this.MarginElements = typeof(Margin) === "undefined" ? 12 : Margin;
}

Gwt.Gui.HBox.prototype.GetChilds = function ()
{
	return this.Childs;
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
	}
}
//Ends Gwt::Gui::HBox
//##################################################################################################
