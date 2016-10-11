//#########################################################################################################################################
//# class Gwt::Gui::Item
Gwt.Gui.Item = function (Text, Value)
{
    Gwt.Gui.Frame.call (this);
	
    this.Text = null;
    this.Value = null;
	
    this.InitItem (Text, Value);
}

Gwt.Gui.Item.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Item.prototype.constructor = Gwt.Gui.Item;

Gwt.Gui.Item.prototype.FinalizeItem = function ()
{
    this.Text = null;
    this.Value = null;
	
    this.FinalizeFrame ();
}

Gwt.Gui.Item.prototype.InitItem = function (Text, Value)
{
    this.SetClassName ("Gwt_Gui_Item");
	
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Value = Value;
	
    this.SetHeight (24);
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBorderColor (background_color);
    this.SetBorder (0);
    this.SetBackgroundColor (background_color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius (0);
	
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseOver.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind (this));
	
    this.Add (this.Text);
}

Gwt.Gui.Item.prototype.GetValue = function ()
{
    return this.Value;
}

Gwt.Gui.Item.prototype.GetText = function ()
{
    return this.Text.GetText();
}

Gwt.Gui.Item.prototype.MouseOver = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0.25);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.MouseOut = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.Reset = function ()
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}
//Ends Gwt::Gui::Item
//####################################################################################################################################




//# class Gwt::Gui::SelectDialogBox
//###################################################################################################
Gwt.Gui.SelectDialogBox = function ()
{
    Gwt.Gui.Dialog.call (this);
    this.items = null;
    this.LayoutDialog = null;
    this.Container = null;
	
    this.InitSelectDialogBox ();
}

Gwt.Gui.SelectDialogBox.prototype = new Gwt.Gui.Dialog ();
Gwt.Gui.SelectDialogBox.prototype.constructor = Gwt.Gui.SelectDialogBox;

Gwt.Gui.SelectDialogBox.prototype.FinalizeSelectDialogBox = function ()
{
    this.LayoutDialog.FinalizeVBox();
    this.LayoutDialog = null;
    
    this.Container.FinalizeVBox();
    this.Container = null;
    
    this.items = null;
    
    this.FinalizeDialog ();
}

Gwt.Gui.SelectDialogBox.prototype.InitSelectDialogBox = function ()
{
    this.SetClassName ("Gwt_Gui_Select_dialog_box");
    this.LayoutDialog = new Gwt.Gui.VBox (this.DialogBox, 0);
    this.LayoutDialog.SetSize (this.DialogBox.GetWidth ()*0.95, this.DialogBox.GetHeight ()*0.95);
    var top = (this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;
    var left = (this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;
    this.LayoutDialog.SetPosition (top, left);
	
    this.Container = new Gwt.Gui.VBox (this.DialogBox, 3);
    this.Container.AddEvent (Gwt.Gui.Event.Mouse.Wheel, this.EventScroll.bind(this));
    this.Container.SetSize (this.LayoutDialog.GetWidth (), 0);
	
    this.DialogBox.Add (this.LayoutDialog);
    this.LayoutDialog.Add (this.Container);
}

Gwt.Gui.SelectDialogBox.prototype.AddItem = function (item)
{
	item.SetWidth (this.Container.GetWidth ());
	this.Container.SetHeight (this.Container.GetHeight () + item.GetHeight());
	this.Container.Add (item);
	this.items++;
}

Gwt.Gui.SelectDialogBox.prototype.EventScroll = function (event)
{
    var deltaY = event.deltaY;
	
    var posTop = this.Container.GetPositionTop();
    var posLeft = this.Container.GetPositionLeft();
    
    var isScroll = this.Container.GetHeight () > this.LayoutDialog.GetHeight ();
    var itemsPlus = this.items-10;
    
    var maxScroll = 0;
    
    if (itemsPlus > 0)
    {
        maxScroll = -24*itemsPlus;
    }
	
    if (deltaY < 0 && isScroll && posTop < 0)
    {
        posTop += 24;
    }
    else if (deltaY > 0 && isScroll && posTop > maxScroll)
    {
	posTop -= 24;
    }
    else
    {
        posTop = posTop;
    }
	
    this.Container.SetPosition (posLeft, posTop);
}

//Ends Gwt::Gui::SelectboxDialogBox
//##################################################################################################




//###################################################################################################
//# class Gwt::Gui::SelectBox
Gwt.Gui.SelectBox = function (Placeholder, options)
{
    Gwt.Gui.Frame.call (this);
	
    this.StaticText = null;
    this.SelectDialogBox = null;
    this.Placeholder = null;
    this.Options = null;
    this.Text=null;
    this.Value=null;
	
    this.InitSelectBox (Placeholder, options);
}


Gwt.Gui.SelectBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBox.prototype.constructor = Gwt.Gui.SelectBox;


Gwt.Gui.SelectBox.prototype.FinalizeSelectBox = function ()
{
    if(this.SelectDialogBox !== null)
    {
        this.SelectDialogBox.FinalizeSelectDialogBox ();
    }
    this.SelectDialogBox = null;
    
    this.StaticText = null;
    this.Placeholder = null;
    this.Options = null;
	
    this.FinalizeFrame ();
}


Gwt.Gui.SelectBox.prototype.InitSelectBox = function (Placeholder, options)
{
    this.SetClassName ("Gwt_Gui_Select_Box");
    this.SetExpand (true);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ShowDialog.bind(this));
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.ShowDialog.bind(this));
    this.Placeholder = Placeholder;
    this.StaticText = new Gwt.Gui.StaticText (this.Placeholder);
	
    this.Add (this.StaticText);
	
    this.Options = [];
    
    options = [{"text": this.Placeholder, "value": ""}].concat(options);
    for (var i = 0; i < options.length; i++)
    {
        if (i === 0)
        {
            this.Options [i] = new Gwt.Gui.Item (this.Placeholder, "");
        }
        else
        {
            this.Options [i] = new Gwt.Gui.Item (options[i].text, options[i].value);
        }
	this.Options [i].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValueListener.bind(this, Event, options[i].text, options[i].value));
    }
    
    this.SetValue("");
}

Gwt.Gui.SelectBox.prototype.ShowDialog = function (event)
{
    //event.stopPropagation ();
    if (event.type === Gwt.Gui.Event.Keyboard.KeyPress || event.type === Gwt.Gui.Event.Mouse.Click)
    {
        if (event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
	{
            this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
        else if (event.type === Gwt.Gui.Event.Mouse.Click)
        {
            this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
    }
}

Gwt.Gui.SelectBox.prototype.SetText = function (Text)
{
    this.Text = Text;
    this.StaticText.SetText (this.Text);
}

Gwt.Gui.SelectBox.prototype.SetValueListener = function (Event, Text, Value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === Value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
            
            this.SetText(Text);
            this.Value=Value;
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}

Gwt.Gui.SelectBox.prototype.SetValue = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	if(this.Options [i].GetValue () === value)
	{
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.SetText(this.Options[i].GetText());
            this.Value=this.Options[i].GetValue();
	}
	else
	{
            this.Options [i].SetBackgroundImage ("");
	}
    }
}
//Ends Gwt::Gui::Selectbox
//##################################################################################################


