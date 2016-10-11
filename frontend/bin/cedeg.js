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
        Gwt.Gui.Window.call (this);
        
        this.layout = null;
        this.title_label = null;
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
        
        this.title_label.FinalizeStaticText ();
        this.title_label = null;
        
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
         
        this.title_label = new Gwt.Gui.StaticText ("Comprobante De Egreso");
        this.title_label.SetWidth (170);
     
        this.slider = new Gwt.Gui.Slider (3);
        this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ()*0.8);
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
        
        this.layout.Add (this.title_label);
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
