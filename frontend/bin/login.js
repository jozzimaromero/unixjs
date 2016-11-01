login = (function ()
{
var instance;

function login () 
{
    Gwt.Gui.Window.call (this);
	
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH - 50, Gwt.Gui.SCREEN_DEVICE_HEIGHT - 50);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
    this.imageLogin = new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");
    this.imageLogin.SetSize (500, 350);
    this.imageLogin.SetPosition (170, 180);
    this.imageLogin.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	
    this.title_label = new Gwt.Gui.StaticText ("Login");
    this.id_type_select = new Gwt.Gui.SelectBox ("Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}]);
    this.username_entry = new Gwt.Gui.Entry ("Número de Documento");
    this.username_entry.SetFocus ();
    this.password_entry = new Gwt.Gui.Entry ("Contraseña");
    this.password_entry.ChangeToPassword ();
    this.password_entry.SetMaxLength (4);
	
    this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Entrar");
    this.send_button.SetWidth (80);
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
	
    this.controls_container = new Gwt.Gui.VBox ();
    this.controls_container.SetSize (180, 170);
	
    this.controls_container.SetPosition ((this.GetWidth()*70)/100, ((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2));
	
    this.Add (this.imageLogin);
    this.Add (this.controls_container);
	
    this.controls_container.Add (this.title_label);
    this.controls_container.Add (this.id_type_select);
    this.controls_container.Add (this.username_entry);
    this.controls_container.Add (this.password_entry);
    this.controls_container.Add (this.send_button);
}

login.prototype = new Gwt.Gui.Window ();
login.prototype.constructor = login;

login.prototype.send = function ()
{
    if (this.username_entry.GetText () !== "" && this.password_entry.GetText () !== "")
    {
	var password = new jsSHA(this.password_entry.GetText (), "TEXT").getHash ("SHA-256", "HEX");
	new Gwt.Core.Request ("/backend/auth/", {'username': this.username_entry.GetText (), 'password': password}, this.response.bind(this));
    }
    else
    {
	console.log ("Datos vacíos");
    }
}

login.prototype.response = function (data)
{
    if (data.status === "success")
    {
        if (Boolean (Number (data.response)))
	{
            start_up_env (this.username_entry.GetText ());
	}
    }
    else
    {
	console.log (data);
    }
}
	
return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
	{
            instance = new login ();
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
