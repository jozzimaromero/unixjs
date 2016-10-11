gusers = ( function ()
{
var instance;

function gusers () 
{
	Gwt.Gui.Window.call (this);
	
	this.SetSize (256, 420);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

	this.layout = new Gwt.Gui.VBox ();
        this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	this.Add (this.layout);
	this.SetBorderSpacing (12);
	
	this.avatar = new Gwt.Gui.Avatar ();
        this.title = new Gwt.Gui.StaticText ("Datos:");
        this.doc_type = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}, {"text": "Certificado de Defunción", "value": "C.D"}]);
        this.doc_num = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.svg", "Número de Documento");
        this.name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.user.tie.svg", "Nombre");
        this.last_name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.user.add.svg", "Apellidos");
        this.phone = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.phone.svg", "Teléfono");
        this.email = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.email.minimal.svg", "Correo Electrónico");
        this.address = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.home.location.round.svg", "Dirección de Residencia");
        
	this.layout.Add (this.avatar);
        this.layout.Add (this.title);
        this.layout.Add (this.doc_type);
        this.layout.Add (this.doc_num);
        this.layout.Add (this.name);
        this.layout.Add (this.last_name);
        this.layout.Add (this.phone);
        this.layout.Add (this.email);
        this.layout.Add (this.address);
}

gusers.prototype = new Gwt.Gui.Window ();
gusers.prototype.constructor = gusers;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gusers ();
			instance.Open ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
		
	this.close = function ()
	{
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
	}
}
})();
