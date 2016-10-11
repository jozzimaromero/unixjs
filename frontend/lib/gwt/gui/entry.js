//##############################################################################################
//Class Gwt::Gui::Entry
Gwt.Gui.Entry  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitEntry (Placeholder);
}

Gwt.Gui.Entry.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Entry.prototype.constructor = Gwt.Gui.Entry;

Gwt.Gui.Entry.prototype.FinalizeEntry = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Entry.prototype.InitEntry = function (Placeholder)
{
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "text");
	this.SetClassName ("Gwt_Gui_Entry");
	this.SetExpand (true);
        this.SetHeight (24);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Entry text");
	this.SetFontSize (11);
}

Gwt.Gui.Entry.prototype.SetPlaceholder = function (Text)
{
	this.Html.placeholder = Text;
}

Gwt.Gui.Entry.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Entry.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Entry.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Entry.prototype.SetMaxLength = function (MaxLength)
{	
	this.Html.maxLength = MaxLength;
}

Gwt.Gui.Entry.prototype.Reset = function ()
{
	this.SetText ("");
}
//Ends Gwt::Gui::Entry
//##################################################################################################
