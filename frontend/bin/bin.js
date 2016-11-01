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
		if (instance === undefined)
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
block = (function ()
{ 
var instance;

function block ()
{
    Gwt.Gui.Window.call (this, "Sessión Bloqueada");

    this.SetSize (250,300);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
    var date = new Date ();

    var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.clock = new Gwt.Gui.Clock ();
            
    this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay ()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
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
	this.file1.SetPosition (25, 10);
	
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
	var data = {"user_info": {"document": "1098671330", "document_type": "c.c"}, "userfile": this.file1.GetData ()};
	new Gwt.Core.Request ("/backend/upload_file/", this.response.bind (this), data);
	
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
gusers = ( function ()
{
var instance;

function gusers () 
{
	Gwt.Gui.Window.call (this, "Usuarios");
	
	this.SetSize (256, 440);
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
cedeg = (function ()
{
    var instance;

    function row_cuentas (id, code, name)
    {
         return {"id": id, "code": code, "name": name};
    }

    function row_records (id, cuenta, parcial, debe, haber)
    {
        return {"cuenta": cuenta, "parcial": parcial, "debe": debe, "haber": haber};
    }

    function record_widget (width, height)
    {
        Gwt.Gui.HBox.call (this, 0);
        this.SetClassName ("record_widget");
        this.SetSize (width, height);
    
        this.code = new Gwt.Gui.Entry ("Código");
        this.name = new Gwt.Gui.StaticText ("Nombre");
        this.partial = new Gwt.Gui.Entry ("Parcial");
        this.debe = new Gwt.Gui.Entry ("Debe");
        this.haber = new Gwt.Gui.Entry ("Haber");
    
        this.col1 = new Gwt.Gui.VBox (0);
        this.col2 = new Gwt.Gui.VBox (0);
        this.col3 = new Gwt.Gui.VBox (0);
        this.col4 = new Gwt.Gui.VBox (0);
        this.col5 = new Gwt.Gui.VBox (0);
        
        this.Add (this.col1);
        this.Add (this.col2);
        this.Add (this.col3);
        this.Add (this.col4);
        this.Add (this.col5);
        
        this.col1.Add (this.code);
        this.col2.Add (this.name);
        this.col3.Add (this.partial);
        this.col4.Add (this.debe);
        this.col5.Add (this.haber);
    
        this.cuenta_existe = false;
        this.cuenta_db = new row_cuentas (null, this.code.GetText (), "");
    
        this.code.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.check_id.bind (this));
    }

    record_widget.prototype = new Gwt.Gui.HBox ();
    record_widget.prototype.constructor = record_widget;

    record_widget.prototype.finalize_record_widget = function ()
    {
        this.code.FinalizeEntry();
        this.code = null;
        
        this.name.FinalizeStaticText();
        this.name = null;
        
        this.partial.FinalizeEntry();
        this.partial = null;
        
        this.debe.FinalizeEntry();
        this.debe = null;
        
        this.haber.FinalizeEntry();
        this.haber = null;
        
        this.col1.FinalizeVBox();
        this.col1 = null;
        
        this.col2.FinalizeVBox();
        this.col2 = null;
        
        this.col3.FinalizeVBox();
        this.col3 = null;
        
        this.col4.FinalizeVBox();
        this.col4 = null;
        
        this.col5.FinalizeVBox();
        this.col5 = null;
        
        this.cuenta_existe = null;
    }
    
    record_widget.prototype.Reset = function ()
    {
        this.code.Reset ();
        this.name.SetText ("Nombre");
        this.partial.Reset ();
        this.debe.Reset ();
        this.haber.Reset ();
    }

    record_widget.prototype.is_savable = function ()
    {
        if (this.cuenta_existe && this.partial.GetText () !== "" && (this.haber.GetText () !== "" || this.debe.GetText () !== ""))
        {
            return true;
        }
        return false;
    }

    record_widget.prototype.check_id = function (event)
    {
        if (event.keyCode !== 17)
        {
            var row = new row_cuentas (null, this.code.GetText (), this.name.GetText ());
        }
    }

    record_widget.prototype.check_id_response = function (rows)
    {
        if (rows instanceof Array)
        {
            if (rows.length === 0)
            {
                this.cuenta_db.id = null;
                this.cuenta_db.name = "";
                this.cuenta_existe = false;
                //Gui reset
                this.name.SetText ("Nombre");
                this.partial.Reset ();
                this.debe.Reset ();
                this.haber.Reset ();
            }
            else
            {
                for (var i=0; i<rows.length; i++)
                {
                    if (rows[i].code === this.code.GetText())
                    {
                        this.id = rows[i].id;
                        this.cuenta_db.id = rows[i].id;
                        this.cuenta_db.code = rows[i].code;
                        this.cuenta_db.name = rows[i].name;
                        this.name.SetText (this.cuenta_db.name);
                        this.cuenta_existe = true;
                        break;
                    }
                }
            }
        }
    }

    record_widget.prototype.get_data = function ()
    {
        return new row_records (null, this.cuenta_db, this.partial.GetText(), this.debe.GetText(), this.haber.GetText ());
    }

    record_widget.prototype.copy = function (obj)
    {
        this.code.SetText (obj.cuenta.code);
        this.name.SetText (obj.cuenta.name);
        this.partial.SetText (obj.parcial);
        this.debe.SetText (obj.debe);
        this.haber.SetText (obj.haber);
    }
    
    function row_cedeg (id, number, city, date, holder, cost, bank, cheque, acount, concept, records)
    {
        
        return {
            "id": id,
            "number": Number(number),
            "city": city,
            "date": date,
            "holder": holder,
            "cost": cost,
            "bank": bank,
            "cheque": cheque,
            "acount": acount,
            "concept": concept,
            "records": records
        };
    }

    function cedeg()
    {
        Gwt.Gui.Window.call (this, "Comprobante De Egreso");
        
        this.layout = null;
        this.number = null;
        this.city = null;
        this.date = null;
        this.holder = null;
        this.cost = null;
        this.bank = null;
        this.cheque = null;
        this.acount = null;
        this.concept = null;
        this.records = null;
        this.slider = null;
        this.save_button = null;
        this.update = null;
        this.id_update_delete = null;
        
        this.init_cedeg ();
    }

    cedeg.prototype = new Gwt.Gui.Window ();
    cedeg.prototype.constructor = cedeg;
    
    cedeg.prototype.finalize_cedeg = function ()
    {
        this.layout.FinalizeVBox ();
        this.layout = null;
        
        this.number.FinalizeEntry ();
        this.number = null;
        
        this.city.FinalizeEntry ();
        this.city = null;
        
        this.date.FinalizeDate ();
        this.date = null;
        
        this.holder.FinalizeEntry ();
        this.holder = null;
        
        this.cost.FinalizeEntry ();
        this.cost = null;
        
        this.bank.FinalizeEntry ();
        this.bank = null;
        
        this.cheque.FinalizeEntry ();
        this.cheque = null;
        
        this.acount.FinalizeEntry ();
        this.acount = null;
        
        this.concept.FinalizeText ();
        this.concept = null;
        
        this.slider.FinalizeSlider ();
        this.slider = null;
        
        this.save_button.FinalizeButtonSvUpDl ();
        this.save_button = null;
        
        this.update = null;
        this.id_update_delete = null;
        
        for(var i = 0; i < this.records.length; i++)
        {
            this.records[i].finalize_record_widget();
            this.records[i] = null;
        }
        
        this.records = null;
    }
    
    cedeg.prototype.init_cedeg = function ()
    {
        this.SetSize (450, 450);
        this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
         
        this.layout = new Gwt.Gui.VBox ();
        this.Add (this.layout);
        this.SetBorderSpacing (6);
     
        this.slider = new Gwt.Gui.Slider (3);
        this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ()*0.85);
        this.slider.Setup ();
    
        this.save_button = new Gwt.Gui.ButtonSvUpDl ();
        this.save_button.AddEvent ("click", this.action.bind (this));
        
        this.number = new Gwt.Gui.Entry ("Número");
        this.number.AddEvent ("keyup", this.check_id.bind (this));
        this.city = new Gwt.Gui.Entry ("Lugar");
        this.date = new Gwt.Gui.Date ("Creación");
        this.date.Now ();
        this.holder = new Gwt.Gui.Entry ("A Favor De");
        this.cost = new Gwt.Gui.Entry ("Valor");
        this.bank = new Gwt.Gui.Entry ("Banco");
        this.cheque = new Gwt.Gui.Entry ("Cheque");
        this.acount = new Gwt.Gui.Entry ("Cuenta");
        this.concept = new Gwt.Gui.Text ("Concepto");
        this.records = [];
        this.update = false;
        
        this.layout.Add (this.slider);
        this.layout.Add (this.save_button);
        
        for (var i = 0; i < 15; i++)
        {
            this.records[i] = new record_widget (this.slider.GetWidth (), 24);
        }
         
        this.slider.AddSlotWidget (0, this.number);
        this.slider.AddSlotWidget (0, this.city);
        this.slider.AddSlotWidget (0, this.date);
        this.slider.AddSlotWidget (0, this.holder);
        this.slider.AddSlotWidget (0, this.cost);
        this.slider.AddSlotWidget (0, this.bank);
        this.slider.AddSlotWidget (0, this.cheque);
        this.slider.AddSlotWidget (0, this.acount);
        this.slider.AddSlotWidget (1, this.concept);
        
        for (var i=0; i<this.records.length; i++)
        {
            if (i<=5)
            {
                this.slider.AddSlotWidget (1, this.records[i]);
            }
            else
            {
                this.slider.AddSlotWidget (2, this.records[i]);
            }
        }
    }
    
    cedeg.prototype.check_id = function (event)
    {
        if (event.keyCode !== 17)
        {
            var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_string (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), null);
        }
    }
    
    cedeg.prototype.check_id_response = function (rows)
    {
        if (rows instanceof Array)
        {
            if (rows.length === 0)
            {
                this.city.Reset ();
                this.date.now ();
                this.holder.Reset ();
                this.cost.Reset ();
                this.bank.Reset ();
                this.cheque.Reset ();
                this.acount.Reset ();
                this.concept.Reset ();
            }       
            for (var i=0; i<this.records.length; i++)
            {
                this.records[i].Reset ();
            }
              
            this.save_button.SetUpdate (false);
            this.update = false;
        }
        else
        {
            for (var i=0; i<rows.length; i++)
            {
                this.city.SetText (rows[i].city);
                this.date.set_date (rows[i].date);
                this.holder.SetText (rows[i].holder);
                this.cost.SetText (rows[i].cost);
                this.bank.SetText (rows[i].bank);
                this.cheque.SetText (rows[i].cheque);
                this.acount.SetText (rows[i].acount);
                this.concept.SetText (rows[i].concept);
                    
                for (var j=0; j<rows[i].records.length; j++)
                {
                    this.records[j].copy (rows[i].records[j]);
                }
                    
                this.id_update_delete = rows[i].id;
                this.save_button.SetUpdate (true);
                this.update = true;
                break;
            }
        }
    } 

    cedeg.prototype.action = function ()
    {
        if (!this.update)
        {
            if(this.number.GetText () !== "" && this.holder.GetText () !== "" && this.cost.GetText () !== "")
            {
                var records = [];
                for (var i=0; i<this.records.length; i++)
                {
                    if (this.records[i].is_savable ())
                    {
                        records[i]=this.records[i].get_data ();
                    }
                }
                var row = new row_cedeg (null, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), records);
            }
        }
        else
        {
            if (!event.ctrlKey)
            {
                var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), this.records);
            
                this.id_update_delete = null;
                this.save_button.SetUpdate (false);
                this.update = false;
            }
            else
            {
                var row = new row_cedeg (this.id_update_delete, this.number.GetText (), this.city.GetText (), this.date.get_date (), this.holder.GetText (), this.cost.GetText (), this.bank.GetText (), this.cheque.GetText (), this.acount.GetText (), this.concept.GetText (), this.records);
		
                this.id_update_delete = null;
                this.save_button.SetUpdate (false);
                this.update = false;
            }
        }
    
        this.city.Reset ();
        this.date.now ();
        this.holder.Reset ();
        this.cost.Reset ();
        this.bank.Reset ();
        this.cheque.Reset ();
        this.acount.Reset ();
        this.concept.Reset ();
        
        for (var i=0; i<this.records.length; i++)
        {
            this.records[i].Reset ();
        }
    }

    return new function ()
    {
        this.open = function()
        {
            if(instance === undefined)
            {
                instance = new cedeg ();
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
                instance.finalize_cedeg();
                instance.Close();
                instance = undefined;
            }
        }
    }
})();
gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
	Gwt.Gui.Frame.call (this, "Usuarios");
	
	this.SetSize (244, 48);
	this.SetPosition (Gwt.Gui.WIN_POS_CENTER, Gwt.Gui.WIN_POS_BOTTOM);
        
        this.layout = new Gwt.Gui.HBox(48);
        this.layout.SetHeight(this.GetHeight());
        this.Add (this.layout);
        
        this.arrow = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.arrow.left.svg");
        this.layout.Add(this.arrow);
    
        this.circle = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.3d.collada.svg");
        this.layout.Add(this.circle);
        
        this.sqrt = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.app.remove.svg");
        this.layout.Add(this.sqrt);
 
        desktop.show (this);
}

gcontrol.prototype = new Gwt.Gui.Frame ();
gcontrol.prototype.constructor = gcontrol;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gcontrol ();
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

