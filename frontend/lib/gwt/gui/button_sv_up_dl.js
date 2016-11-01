//##################################################################################################
//Class Gwt::Gui::ButtonSvUpDl
Gwt.Gui.ButtonSvUpDl = function ()
{
    Gwt.Gui.Button.call (this, Gwt.Core.Contrib.Images+"appbar.cabinet.in.svg", "Guardar");
    
    this.Update = null;
    
    this.InitButtonSvUpDl ();
}

Gwt.Gui.ButtonSvUpDl.prototype = new Gwt.Gui.Button ();
Gwt.Gui.ButtonSvUpDl.prototype.constructor = Gwt.Gui.ButtonSvUpDl;

Gwt.Gui.ButtonSvUpDl.prototype.FinalizeButtonSvUpDl = function ()
{
    this.Update = null;
    this.FinalizeButton ();
}

Gwt.Gui.ButtonSvUpDl.prototype.InitButtonSvUpDl = function ()
{
    this.SetWidth (95);
    this.SetText ("Guardar");
    this.AddEvent (Gwt.Gui.Event.Mouse.Mousemove, this.CtrlSvUpDl.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.Mouseout, this.CtrlReset.bind (this));
    
    this.Update = false;
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlSvUpDl = function (event)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else if (this.Update && !event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else if (this.Update && event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/application-exit.svg");
    	this.SetWidth (90);
        this.SetText ("Eliminar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlReset = function (enable_disable)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.SetUpdate = function (enable_disable)
{
    this.Update = enable_disable;
    
    if (this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
}
//Ends Gwt::Gui::Button_sv_up_dl
//##################################################################################################

