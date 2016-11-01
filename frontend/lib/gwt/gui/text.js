//##############################################################################################
//Class Gwt::Gui::Text
Gwt.Gui.Text  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitText (Placeholder);
}

Gwt.Gui.Text.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Text.prototype.constructor = Gwt.Gui.Text;

Gwt.Gui.Text.prototype.FinalizeText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Text.prototype.InitText = function (Placeholder)
{
	this.SetHtml ("textarea");
	this.SetClassName ("Gwt_Gui_Text");
	this.SetExpand (true);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Text multi-line");
	this.SetFontSize (11);
	this.SetHeight (96);
	this.SetAlign ();
	this.SetMaxLength (185);
}

Gwt.Gui.Text.prototype.SetPlaceholder = function (Text)
{
	this.Html.Placeholder = Text;
}

Gwt.Gui.Text.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Text.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Text.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Text.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Text.prototype.SetMaxLength = function (Value)
{	
	this.Html.maxLength = Value;
}

Gwt.Gui.Text.prototype.Reset = function ()
{
	this.SetText ("");
}

Gwt.Gui.Text.prototype.SetAlign = function (Value)
{
    switch (Value)
    {
        case Gwt.Gui.ALIGN_LEFT:
            this.align = Gwt.Gui.ALIGN_LEFT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Left;
            break;
        
        case Gwt.Gui.ALIGN_CENTER:
            this.align = Gwt.Gui.ALIGN_CENTER;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Center;
            break;
        
        case Gwt.Gui.ALIGN_RIGHT:
            this.align = Gwt.Gui.ALIGN_RIGHT;
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Right;
            break;
        
        default:
            this.Html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Justify;
            break;
    }
}
//Ends Gwt::Gui::Text
//##################################################################################################


