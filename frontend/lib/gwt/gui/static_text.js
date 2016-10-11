//################################################################################################
//Class Gwt::Gui::Static_Text
Gwt.Gui.StaticText = function (Text)
{
	Gwt.Gui.Frame.call (this);
	
	this.Text = null;
	this.InitStaticText (Text);
}

Gwt.Gui.StaticText.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.StaticText.prototype.constructor = Gwt.Gui.StaticText;

Gwt.Gui.StaticText.prototype.FinalizeStaticText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.StaticText.prototype.InitStaticText = function (Text)
{
	this.SetClassName ("Gwt_Gui_Static_Text");
	this.Text = Text || "Default Text";
	this.SetText (this.Text);
        this.SetExpand (true);
	this.SetFontSize (11);
        this.SetHeight (22);
        this.SetPaddingTop (2);
	this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
	//this.SetTextShadow (0, 0, 1, new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray));
	this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
	this.SetSelectable (Gwt.Gui.Contrib.UserSelect.None);
	this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
}

Gwt.Gui.StaticText.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.Html.textContent = this.Text;
}

Gwt.Gui.StaticText.prototype.TextAlign = function (Value)
{
	if (Value == "left" || Value == "center" || Value == "right" || Value == "justify")
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		console.log ("Align invalid");
	}
}

Gwt.Gui.StaticText.prototype.GetText = function ()
{
	return this.Text;
}

Gwt.Gui.StaticText.prototype.GetLength = function()
{
    return this.Text.length;
}

Gwt.Gui.StaticText.prototype.Reset = function ()
{
	this.SetText ("Default Text");
}
//Ends Gwt::Gui::Static_Text
//##################################################################################################
