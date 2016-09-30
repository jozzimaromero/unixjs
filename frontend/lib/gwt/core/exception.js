//########################################################################################
//Class Gwt::Core::E
Gwt.Core.Exception = function(name, message) {
   this.message = message;
   this.name = name || "GwtException";
}

Gwt.Core.BooleanException = function ()
{
    Gwt.Core.Exception.call (this, "BooleanException","Invalid value from boolean type");
}

Gwt.Core.NumberException = function ()
{
    Gwt.Core.Exception.call (this, "NumberException","Invalid value from Number type");
}

Gwt.Core.StringException = function ()
{
    Gwt.Core.Exception.call (this, "StringException","Invalid value from String type");
}
//Ends Gwt::Core::Exception
//##################################################################################################