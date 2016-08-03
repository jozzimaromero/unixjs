//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Date = function (placeholder)
{
        Gwt.Gui.Frame.call (this);
        
        this.init_date (placeholder);
}

Gwt.Gui.Date.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Date.prototype.constructor = Gwt.Gui.Date;

Gwt.Gui.Date.prototype.finalize_date = function (placeholder)
{
        this.finalize_frame ();
}

Gwt.Gui.Date.prototype.init_date = function (placeholder)
{
        this.set_class ("Gwt_Gui_Date");
	this.set_size (190, 24);

        this.year = new Gwt.Gui.Select_box (placeholder || "Creación");
        this.year.set_width (58);
        this.month = new Gwt.Gui.Select_box ("De");
        this.month.set_width (48);
        this.day = new Gwt.Gui.Select_box ("Fecha");
	this.day.set_width (48);

        this.container = new Gwt.Gui.HBox ();
        this.container.set_size (190,24);

        this.add (this.container);
        this.container.add (this.year);
        this.container.add (this.month);
        this.container.add (this.day);

        this.setup ();        
}

Gwt.Gui.Date.prototype.setup = function ()
{

    for (var i=1; i<=31; i++)
    {
        
        if (i<10)
        {
            var tmp = new Gwt.Gui.Item (i, "0".concat(i));
            
        }
        else
        {
            var tmp = new Gwt.Gui.Item (i, String(i));
        }
        
        this.day.append (tmp);
    }
    
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    for (var i=1; i<=12; i++)
    {
        var tmp = new Gwt.Gui.Item(i, months[i-1]);
        
        this.month.append (tmp);
    }
	var y = new Date().getFullYear();

    for (var i=y; i>=1900; i--)
    {
        var tmp = new Gwt.Gui.Item(i, i);
        this.year.append (tmp);
    }
}

Gwt.Gui.Date.prototype.get_date = function ()
{
		return "%D-%M-%Y".replace ("%D", this.day.get_value()).replace ("%M", this.month.get_value()).replace ("%Y", this.year.get_value());
}

Gwt.Gui.Date.prototype.set_date = function (arg1)
{
    try{
        var string_date = arg1.split ("-");
	this.day.set_value (Number(string_date[0]));
	this.month.set_value (Number(string_date[1]));
	this.year.set_value (Number(string_date[2]));
    }
    catch (e)
    {
        console.log (e.what ());   
    }
}

Gwt.Gui.Date.prototype.reset = function ()
{
	this.day.reset ();
	this.month.reset ();
	this.year.reset ();
}

Gwt.Gui.Date.prototype.now = function ()
{
	var d = new Date ();
	this.set_date (d.getFullYear(), d.getMonth()+1, d.getDate());
}

Gwt.Gui.Date.prototype.get_string = function ()
{
	return this.year.get_value()+"-"+this.month.get_value()+"-"+this.day.get_value();
}

//Ends Gwt::Gui::Image
//##################################################################################################

