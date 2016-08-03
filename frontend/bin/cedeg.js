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

function record_widget ()
{
    Gwt.Gui.HBox.call (this);
    this.set_class ("record_widget");
    
    this.code = new Gwt.Gui.Entry ("Código");
    this.name = new Gwt.Gui.Static_text ("Nombre");
    this.partial = new Gwt.Gui.Entry ("Parcial");
    this.debe = new Gwt.Gui.Entry ("Debe");
    this.haber = new Gwt.Gui.Entry ("Haber");
    
    this.col1 = new Gwt.Gui.VBox ();
    this.col2 = new Gwt.Gui.VBox ();
    this.col3 = new Gwt.Gui.VBox ();
    this.col4 = new Gwt.Gui.VBox ();
    this.col5 = new Gwt.Gui.VBox ();
    
    this.cuenta_existe = false;
    this.cuenta_db = new row_cuentas (null, this.code.get_text (), "");
    
    this.table_cuentas = new Gwt.Core.Table ("cuentas");
    this.table_cuentas.set_app_srv ("contabilidad");
    
    this.table_record = new Gwt.Core.Table ("cedeg_records");
    this.table_record.set_app_srv ("contabilidad");
    
    this.code.attach_event ("keyup", this.check_id.bind (this));
}

record_widget.prototype = new Gwt.Gui.HBox ();
record_widget.prototype.constructor = record_widget;

record_widget.prototype.reset = function ()
{
    this.code.reset ();
    this.name.set_text ("Nombre");
    this.partial.reset ();
    this.debe.reset ();
    this.haber.reset ();
}

record_widget.prototype.setup = function (width, height)
{
    this.set_size (width, height);
    this.add (this.col1);
    this.add (this.col2);
    this.add (this.col3);
    this.add (this.col4);
    this.add (this.col5);
    
    this.col1.add (this.code);
    this.col2.add (this.name);
    this.col3.add (this.partial);
    this.col4.add (this.debe);
    this.col5.add (this.haber);
}

record_widget.prototype.is_savable = function ()
{
    if (this.cuenta_existe && this.partial.get_text () != "" && (this.haber.get_text () != "" || this.debe.get_text () != ""))
    {
        return true;
    }
    return false;
}

record_widget.prototype.check_id = function (event)
{
    if (event.keyCode != 17)
    {
          var row = new row_cuentas (null, this.code.get_text (), this.name.get_text ());
          this.table_cuentas.select (row, this.check_id_response.bind(this));
    }
}

record_widget.prototype.check_id_response = function (rows)
{
    if (rows instanceof Array)
    {
	  if (rows.length == 0)
	  {
               this.cuenta_db.id = null;
               this.cuenta_db.name = "";
               this.cuenta_existe = false;
               //Gui reset
               this.name.set_text ("Nombre");
               this.partial.reset ();
               this.debe.reset ();
               this.haber.reset ();
	  }
          else
          {
               for (var i=0; i<rows.length; i++)
               {
                    if (rows[i].code === this.code.get_text())
		    {
                         this.id = rows[i].id;
                         this.cuenta_db.id = rows[i].id;
                         this.cuenta_db.code = rows[i].code;
                         this.cuenta_db.name = rows[i].name;
                         this.name.set_text (this.cuenta_db.name);
                         this.cuenta_existe = true;
			 break;
		    }
	       }
	  }
     }
}

record_widget.prototype.get_data = function ()
{
    return new row_records (null, this.cuenta_db, this.partial.get_text(), this.debe.get_text(), this.haber.get_text ());
}

record_widget.prototype.copy = function (obj)
{
    this.code.set_text (obj.cuenta.code);
    this.name.set_text (obj.cuenta.name);
    this.partial.set_text (obj.parcial);
    this.debe.set_text (obj.debe);
    this.haber.set_text (obj.haber);
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
    this.number = null
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
    this.update = null;
    this.id_update_delete = null;
    this.table = null;
    
    
    this.init_cedeg ();
}

cedeg.prototype = new Gwt.Gui.Window ();
cedeg.prototype.constructor = cedeg;

cedeg.prototype.init_cedeg = function ()
{
     this.set_size (450, 450);
     this.set_position (Gwt.Gui.WIN_POS_CENTER);
     
     this.layout = new Gwt.Gui.VBox ();
     this.add (this.layout);
     this.set_borders_spacing (6);
         
     this.title_label = new Gwt.Gui.Static_text ("Comprobante De Egreso");
     this.title_label.set_width (170);
     
     this.slider = new Gwt.Gui.Slider (3);
     this.slider.set_size (this.layout.get_width (), this.layout.get_height ()*0.8);
     this.slider.setup ();
    
     this.save_button = new Gwt.Gui.Button_sv_up_dl ();
     this.save_button.attach_event ("click", this.action.bind (this));
    
     this.number = new Gwt.Gui.Entry ("Número");
     this.number.attach_event ("keyup", this.check_id.bind (this));
     this.city = new Gwt.Gui.Entry ("Lugar");
     this.date = new Gwt.Gui.Date ("Creacion");
     this.date.now ();
     this.holder = new Gwt.Gui.Entry ("A Favor De");
     this.cost = new Gwt.Gui.Entry ("Valor");
     this.bank = new Gwt.Gui.Entry ("Banco");
     this.cheque = new Gwt.Gui.Entry ("Cheque");
     this.acount = new Gwt.Gui.Entry ("Cuenta");
     this.concept = new Gwt.Gui.Text ("Concepto");
     this.records = [];
     this.update = false;
     this.table = new Gwt.Core.Table ("cedegs");
     this.table.set_app_srv ("contabilidad");
     
     this.layout.add (this.title_label);
     this.layout.add (this.slider);
     this.layout.add (this.save_button);
     
     for (var i = 0; i < 15; i++)
     {
         this.records[i] = new record_widget ();
         this.records[i].setup (this.slider.get_width (), 24);
     }
     
     this.slider.add_slot_widget (0, this.number);
     this.slider.add_slot_widget (0, this.city);
     this.slider.add (0, this.date);
     this.slider.add_slot_widget (0, this.holder);
     this.slider.add_slot_widget (0, this.cost);
     this.slider.add_slot_widget (0, this.bank);
     this.slider.add_slot_widget (0, this.cheque);
     this.slider.add_slot_widget (0, this.acount);
     this.slider.add_slot_widget (1, this.concept);
     
     for (var i=0; i<this.records.length; i++)
     {
         if (i<=5)
         {
             this.slider.add_slot_widget (1, this.records[i]);
         }
         else
         {
             this.slider.add_slot_widget (2, this.records[i]);
         }
     }
}

cedeg.prototype.check_id = function (event)
{
    if (event.keyCode != 17)
    {
	  var row = new row_cedeg (this.id_update_delete, this.number.get_text (), this.city.get_text (), this.date.get_string (), this.holder.get_text (), this.cost.get_text (), this.bank.get_text (), this.cheque.get_text (), this.acount.get_text (), this.concept.get_text (), null);
          console.log(row);
	  this.table.select (row, this.check_id_response.bind(this));
    }
}

cedeg.prototype.check_id_response = function (rows)
{
    if (rows instanceof Array)
    {
          if (rows.length == 0)
          {
               this.city.reset ();
               this.date.now ();
               this.holder.reset ();
               this.cost.reset ();
               this.bank.reset ();
               this.cheque.reset ();
               this.acount.reset ();
               this.concept.reset ();
            
          for (var i=0; i<this.records.length; i++)
          {
               this.records[i].reset ();
          }
            
	  this.save_button.set_update (false);
	  this.update = false;
          }
          else
          {
               for (var i=0; i<rows.length; i++)
               {
                    this.city.set_text (rows[i].city);
                    this.date.set_date (rows[i].date);
                    this.holder.set_text (rows[i].holder);
                    this.cost.set_text (rows[i].cost);
                    this.bank.set_text (rows[i].bank);
                    this.cheque.set_text (rows[i].cheque);
                    this.acount.set_text (rows[i].acount);
                    this.concept.set_text (rows[i].concept);
                    
                    for (var j=0; j<rows[i].records.length; j++)
                    {
                         this.records[j].copy (rows[i].records[j]);
                    }
                    
                    this.id_update_delete = rows[i].id;
                    this.save_button.set_update (true);
                    this.update = true;
                    break;
               }
          }
     } 
}

cedeg.prototype.action = function ()
{
    if (!this.update)
    {
          if(this.number.get_text () != "" && this.holder.get_text () != "" && this.cost.get_text () != "")
          {
               var records = [];
               for (var i=0; i<this.records.length; i++)
               {
                    if (this.records[i].is_savable ())
                    {
                         records[i]=this.records[i].get_data ();
                    }
               }
               var row = new row_cedeg (null, this.number.get_text (), this.city.get_text (), this.date.get_date (), this.holder.get_text (), this.cost.get_text (), this.bank.get_text (), this.cheque.get_text (), this.acount.get_text (), this.concept.get_text (), records);
               console.log (row);
          }
     }
     else
     {
          if (!event.ctrlKey)
          {
               var row = new row_cedeg (this.id_update_delete, this.number.get_text (), this.city.get_text (), this.date.get_date (), this.holder.get_text (), this.cost.get_text (), this.bank.get_text (), this.cheque.get_text (), this.acount.get_text (), this.concept.get_text (), this.records);
               this.table.update (row);
            
               this.id_update_delete = null;
               this.save_button.set_update (false);
               this.update = false;
	  }
          else
          {
               var row = new row_cedeg (this.id_update_delete, this.number.get_text (), this.city.get_text (), this.date.get_date (), this.holder.get_text (), this.cost.get_text (), this.bank.get_text (), this.cheque.get_text (), this.acount.get_text (), this.concept.get_text (), this.records);
               this.table.delete (row);
		
               this.id_update_delete = null;
	       this.save_button.set_update (false);
	       this.update = false;
	  }
     }
    
    this.city.reset ();
    this.date.now ();
    this.holder.reset ();
    this.cost.reset ();
    this.bank.reset ();
    this.cheque.reset ();
    this.acount.reset ();
    this.concept.reset ();
            
    for (var i=0; i<this.records.length; i++)
    {
        this.records[i].reset ();
    }
}

return new function ()
{
     this.open = function()
     {
          if(instance == null)
          {
               instance = new cedeg ();
	       instance.open ();
          }
	  else
	  {
	       console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
	  }
     }
	
     this.close = function ()
     {
	  if(instance != null)
	  {
               instance.close();
	       instance = null;
	  }
     }
}
})();
