//Gwt::Core::Table 
Gwt.Core.Table = function (name)
{
    this.name = name;
    this.app_srv = "";
    this.table = {};
    this.table.serie = 0;
    this.table.rows = [];
}
Gwt.Core.Table.prototype.set_app_srv = function (app_srv)
{
    this.app_srv = app_srv;
}

Gwt.Core.Table.prototype.create = function (row)
{
    //if db is localStorage
    if(Gwt.Core.Contrib.db === "local")
    {
        if (localStorage.getItem (this.name) === null)
        {
            if (rows instanceof Array)
            {
                this.table.rows = rows;
                this.table.serie = rows.length;
            }
            else
            {
                this.table.rows.push (rows);
                this.table.serie = 1;
            }
            
            for (i=0; i<this.table.rows.length; i++)
            {
                this.table.rows[i].id = i+1;
            }
        }
        else
        {
            this.table = JSON.parse (localStorage.getItem (this.name));
            this.table.serie = Number (this.table.serie);
            
            if (rows instanceof Array)
            {
                for (i=0; i<rows.length; i++)
                {
                    this.table.serie += 1;
                    rows[i].id = this.table.serie;
                    this.table.rows.push (rows[i]);
                }
            }
            else
            {
                this.table.serie += 1;
                rows.id = this.table.serie;
                this.table.rows.push (rows);
            }
        }
        localStorage.setItem (this.name, JSON.stringify (this.table));
    }
    
    //if db is remote
    else if (Gwt.Core.Contrib.db === "remote")
    {
        var query = new Gwt.Core.Request (this.app_srv, "create_"+this.name, row, function(response){notify.open (response);});
    }
}

Gwt.Core.Table.prototype.delete = function (row)
{
    //if db is localStorage
    if(Gwt.Core.Contrib.db === "local")
    {
        if (localStorage.getItem (this.name) !== null)
        {
            this.table = JSON.parse (localStorage.getItem (this.name));
            var tmp = [];
            for (i=0;i<this.table.rows.length;i++)
            {
                if (id != this.table.rows[i].id)
                {
                    tmp.push (this.table.rows[i]);
                }
            }
            this.table.rows = tmp;
            localStorage.setItem (this.name, JSON.stringify (this.table));
        }
    }
    
    //if db is remote
    else if (Gwt.Core.Contrib.db === "remote")
    {
        var query = new Gwt.Core.Request (this.app_srv, "delete_"+this.name, row, function(response){notify.open(response)});
    }
}

Gwt.Core.Table.prototype.select = function (row, callback)
{
    //if db is local
    if (Gwt.Core.Contrib.db === "local")
    {
        if (localStorage.getItem (this.name) !== null)
        {
            this.table = JSON.parse (localStorage.getItem (this.name));
            rows = this.table.rows;
        }
    }
    
    //if db is remote
    else if (Gwt.Core.Contrib.db === "remote")
    {
        var query = new Gwt.Core.Request (this.app_srv, "select_"+this.name, row, function(response){var data = JSON.parse(response); callback(data);});
    }
}

Gwt.Core.Table.prototype.update = function (row)
{
    //if db is local
    if (Gwt.Core.Contrib.db === "local")
    {
        this.table = JSON.parse (localStorage.getItem (this.name));
        for (i=0;i<this.table.rows.length;i++)
        {
            if (row.id == this.table.rows[i].id)
            {
                this.table.rows[i] = row;
            }
        }
        
        localStorage.setItem (this.name, JSON.stringify (this.table));
    }
    
    //if db is remote
    else if (Gwt.Core.Contrib.db === "remote")
    {
        var query = new Gwt.Core.Request (this.app_srv, "update_"+this.name, row, function(response){var data = JSON.parse(response); notify.open(data.result);});
    }    
}
//End of Gwt::Core::Table
//##########################################################

