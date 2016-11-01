//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Date = function (placeholder)
{
        Gwt.Gui.Frame.call (this);
        this.year = null;
        this.month = null;
        this.day = null;
        this.InitDate (placeholder);
}

Gwt.Gui.Date.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Date.prototype.constructor = Gwt.Gui.Date;

Gwt.Gui.Date.prototype.FinalizeDate = function (placeholder)
{
    this.year.FinalizeSelectBox ();
    this.year = null;
    this.month.FinalizeSelectBox ();
    this.mont = null;
    this.day.FinalizeSelectBox ();
    this.day = null;
    this.FinalizeFrame ();
}

Gwt.Gui.Date.prototype.InitDate = function (placeholder)
{
    this.SetClassName ("Gwt_Gui_Date");
    this.SetSize (190, 24);

    var y = new Date().getFullYear();
    var range = (y-150);
    var years_items = [];
    for (var i=y; i>=range; i--)
    {
        years_items.push ({"text": i, "value": i});
    }
    this.year = new Gwt.Gui.SelectBox ("Año", years_items);
    this.year.SetWidth (64);
    
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var months_items = [];
    for (var i=1; i<=12; i++)
    {
        months_items.push ({"text": months[i-1], "value": i});
    }
    this.month = new Gwt.Gui.SelectBox ("Mes", months_items);
    this.month.SetWidth (48);
    
    var days_items = [];
    for (var i=1; i<=31; i++)
    {
        if (i<10)
        {
            days_items.push ({"text": "0".concat(i), "value": i});
        }
        else
        {
            days_items.push ({"text": String(i), "value": i});
        }
    }
    
    this.day = new Gwt.Gui.SelectBox ("Día", days_items);
    this.day.SetWidth (48);

    this.container = new Gwt.Gui.HBox (0);
    this.container.SetSize (160,24);

    this.Add (this.container);
    this.container.Add (this.day);
    this.container.Add (this.month);
    this.container.Add (this.year);
}

Gwt.Gui.Date.prototype.GetDate = function ()
{
    return "%D-%M-%Y".replace ("%D", this.day.GetValue()).replace ("%M", this.month.GetValue()).replace ("%Y", this.year.GetValue());
}

Gwt.Gui.Date.prototype.SetDate = function (year, month, day)
{
    if (typeof(year) === "string")
    {
        try{
            var string_date = year.split ("-");
            this.day.SetValue (Number(string_date[0]));
            this.month.SetValue (Number(string_date[1]));
            this.year.SetValue (Number(string_date[2]));
        }
        catch (e)
        {
            console.log ("No se puede convertir la fecha de string a date");   
        }
    }
    else if (typeof(year)==="number", typeof(month)==="number", typeof(day)==="number")
    {
        this.day.SetValue (day);
        this.month.SetValue (month);
        this.year.SetValue (year);
    }
}

Gwt.Gui.Date.prototype.Reset = function ()
{
	this.day.Reset ();
	this.month.Reset ();
	this.year.Reset ();
}

Gwt.Gui.Date.prototype.Now = function ()
{
	var d = new Date ();
	this.SetDate (d.getFullYear(), d.getMonth()+1, d.getDate());
}

Gwt.Gui.Date.prototype.GetString = function ()
{
	return this.year.GetValue()+"-"+this.month.GetValue()+"-"+this.day.GetValue();
}
//Ends Gwt::Gui::Image
//##################################################################################################


