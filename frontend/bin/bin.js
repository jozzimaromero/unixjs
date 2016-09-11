desktop = (function ()
{
var instance;
	
function desktop ()
{
	Gwt.Gui.Frame.call (this);
	document.body.appendChild (this.Html);
	this.SetClassName ("Gwt_Gui_Desktop");
	this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
	this.SetMargin (0);
	this.SetPadding (0);
	this.SetBackgroundImage (Gwt.Core.Contrib.Images+"dark1.jpeg");
	this.SetBackgroundAttachment (Gwt.Gui.Contrib.BackgroundAttachment.Fixed);
	this.SetBackgroundClip (Gwt.Gui.Contrib.BackgroundClip.ContentBox);
	this.SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat, Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBorder (0);
	
	//new Gwt.Core.Request ("/backend/open_pool/", function () {}, {});
}
	
desktop.prototype = new Gwt.Gui.Frame ();
desktop.prototype.constructor = desktop;
	
desktop.prototype.Show = function (app)
{
	this.Add (app);
}
		
return new function ()
{
	this.open = function ()
	{
		if (instance == null)
		{
			instance = new desktop ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.show = function (app)
	{
		instance.Show (app);
	}
}
})();
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
	this.imageLogin.SetPosition (180, 170);
	this.imageLogin.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	
	this.title_label = new Gwt.Gui.StaticText ("Login");
	this.id_type_select = new Gwt.Gui.SelectBox ("Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}]);
	this.username_entry = new Gwt.Gui.Entry ("Número de Documento");
	this.username_entry.SetFocus ();
	this.password_entry = new Gwt.Gui.Entry ("Contraseña");
	this.password_entry.ChangeToPassword ();
	this.password_entry.SetMaxLength (4);
	
	this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"ArrowRight.svg", "Entrar");
	this.send_button.SetWidth (80);
	this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
	
	this.controls_container = new Gwt.Gui.VBox ();
	this.controls_container.SetSize (180, 170);
	
	this.controls_container.SetPosition (((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2), (this.GetWidth()*70)/100);
	
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
	if (data.status == "success")
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
block = (function ()
{ 
var instance;

function block ()
{
	Gwt.Gui.Window.call (this);

	this.SetSize (250,300);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
	var date = new Date ();

	var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	this.clock = new Gwt.Gui.Clock ();
	
	this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
	this.date.SetWidth (180);
	this.date.TextAlign ("center");
	
	this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Desbloquear");
	this.unlock_button.SetWidth (120);
	
    this.layout = new Gwt.Gui.VBox();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	
	this.Add(this.layout);
    this.SetBorderSpacing (12);
	this.layout.Add(this.clock);
	this.layout.Add(this.date);
	this.layout.Add(this.unlock_button);
		
	this.unlock_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.unlock.bind(this));
}

block.prototype = new Gwt.Gui.Window ();
block.prototype.constructor = block;	

block.prototype.unlock = function ()
{
	unlock_session ();
}
	
return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new block ();
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
test = ( function ()
{
var instance;

function test () 
{
	Gwt.Gui.Window.call (this);
	
	this.SetSize (256, 256);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
	this.file1 = new Gwt.Gui.File ();
	this.file1.AddEvent (Gwt.Gui.Event.Form.Change, this.send.bind(this));
	
	/*
    this.graphic = new Gwt.Graphic.Svg.Canvas ();
    this.graphic.SetSize (this.GetWidth(), this.GetHeight ());
	this.graphic.SetViewBox (0, 0, this.graphic.GetWidth(), this.graphic.GetHeight());
	
	this.rect1 = new Gwt.Graphic.Svg.Rect ();
	this.rect1.SetFill ("Red");
	
	this.circle1 = new Gwt.Graphic.Svg.Circle ();
	this.circle1.SetFill ("Blue");
	this.circle1.SetCx (10);
	this.circle1.SetCy (10);
	
	this.ellipse1 = new Gwt.Graphic.Svg.Ellipse ();
	this.ellipse1.SetCx (30);
	this.ellipse1.SetCy (30);
	this.ellipse1.SetRx (25);
	this.ellipse1.SetRy (25);
	this.ellipse1.SetFill ("Green");
	
	this.line1 = new Gwt.Graphic.Svg.Line ();
	this.line1.SetStroke ("Yellow");
	this.line1.SetStrokeWidth (10);
	
	this.arc1 = new Gwt.Graphic.Svg.Arc ();
	this.arc1.DescribeArc (100, 100, 100, -30, 190);
	this.arc1.SetFill ("White");
	this.arc1.SetStroke ("Black");
	this.arc1.SetStrokeWidth (1);
	*/
	
	this.buttonoff = new Gwt.Gui.ButtonOnOff ();
	this.buttonoff.SetPosition (25, 25);
		
	
	//this.Add (this.file1);
    this.Add (this.buttonoff);
	
	
	/*this.graphic.Add (this.rect1);
	this.graphic.Add (this.circle1);
	this.graphic.Add (this.ellipse1);
	this.graphic.Add (this.line1);
	this.graphic.Add (this.arc1);*/

}

test.prototype = new Gwt.Gui.Window ();
test.prototype.constructor = test;

test.prototype.send = function ()
{
	var data = [{"document": "1098671330", "document_tsype": "c.c"}];
	new Gwt.Core.Request ("/backend/insert_user/", this.response.bind (this), data);
}

test.prototype.response = function (data)
{
	console.log (data);
}

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new test ();
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
cuentas = (function ()
{
var instance;


function cuentas()
{
    Gwt.Gui.Window.call (this);
    this.SetSize (200, 170);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
    this.title_label = new Gwt.Gui.StaticText ("Cuentas");
    //this.title_label.SetWidth ();
    this.code = new Gwt.Gui.Entry ("Código");
    this.name = new Gwt.Gui.Entry ("Nombre");
    this.save_button = new Gwt.Gui.ButtonSvUpDl ();
    
    this.layout = new Gwt.Gui.VBox ();
	
    this.Add (this.layout);
    this.SetBorderSpacing (12);
    
    this.layout.Add (this.title_label);
    this.layout.Add (this.code);
    this.layout.Add (this.name);
    this.layout.Add (this.save_button);
    
    //this.save_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.action.bind (this));
    //this.code.attach_event (Gwt.Gui.Event.Keyboard.KeyUp, this.check_id.bind (this));
	
    this.update = false;
    this.id_update_delete = null;
}

cuentas.prototype = new Gwt.Gui.Window ();
cuentas.prototype.constructor = cuentas;
/*
cuentas.prototype.action = function (event)
{
    var row;
    if (!this.update)
    {
		if(this.code.get_text () !== "" && this.name.get_text () !== "")
		{
		    this.table.create (new row_cuenta (null, this.code.get_text (), this.name.get_text ()));
		    this.code.set_text ("");
		    this.name.set_text ("");
		}
	}
	else
	{
		if (!event.ctrlKey)
		{
		    row = new row_cuenta (this.id_update_delete, this.code.get_text (), this.name.get_text ());
		    this.table.update (row);
		    this.code.set_text ("");
		    this.name.set_text ("");
		    this.id_update_delete = null;
		    this.save_button.set_update (false);
		    this.update = false;
		}
		else
		{
		    row = new row_cuenta (this.id_update_delete, this.code.GetText (), this.name.GetText ());
		    this.table.delete (row);
		    this.id_update_delete = null;
		    this.code.set_text ("");
		    this.name.set_text ("");
		    this.save_button.set_update (false);
		    this.update = false;
		}
	}
}

cuentas.prototype.check_id = function (event)
{
    //console.log (event);
    if (event.keyCode != 17)
    {
		var row = new row_cuenta (this.id_update_delete, this.code.get_text (), this.name.get_text ());
		this.table.select (row, this.check_id_response.bind(this));
    }
}

cuentas.prototype.check_id_response = function (rows)
{
    if (rows instanceof Array)
    {
		if (rows.length === 0)
		{
		    this.name.set_text ("");
		    this.save_button.set_update (false);
		    this.update = false;
		}
	
		else
		{
		    for (var i=0; i<rows.length; i++)
		    {
		        if (rows[i].code === this.code.get_text())
		        {
		            this.name.set_text (rows[i].name);
				    this.id_update_delete = rows[i].id;
				    this.save_button.set_update (true);
				    this.update = true;
				    break;
				}
		    }
		}
    }
}
*/
return new function ()
{
	this.open = function()
	{
		if(instance === undefined)
		{
		    instance = new cuentas();
		    instance.Open ();
		}
		else
		{
		    console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.close = function ()
	{
		if(instance !== undefined)
		{
			instance.Close();
			instance = undefined;
		}
	}
}
})();
