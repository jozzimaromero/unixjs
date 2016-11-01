//##############################################################################################
//Class Gwt::Gui::IconEntry
Gwt.Gui.IconEntry = function (Icon, Placeholder)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.Entry(Placeholder));
    
    this.InitIconEntry ();
}

Gwt.Gui.IconEntry.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconEntry.prototype.constructor = Gwt.Gui.IconEntry;

Gwt.Gui.IconEntry.prototype.FinalizeIconEntry = function ()
{
    this.FinalizeIconControl ();
}

Gwt.Gui.IconEntry.prototype.InitIconEntry = function ()
{
    this.SetClassName ("Gwt_Gui_Icon_Entry");
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
