//###########################################################################
//Gwt::Core
Gwt.Core = new Object ();

Gwt.Core.Contrib = new Object ();
Gwt.Core.Contrib.Protocol = window.location.protocol;
Gwt.Core.Contrib.HostName = window.location.hostname;
Gwt.Core.Contrib.Port = window.location.port;
Gwt.Core.Contrib.Host = Gwt.Core.Contrib.Protocol+"//"+Gwt.Core.Contrib.HostName+"/";
Gwt.Core.Contrib.Backend = Gwt.Core.Contrib.Host+"backend/";
Gwt.Core.Contrib.Frontend = Gwt.Core.Contrib.Host+"frontend/";
Gwt.Core.Contrib.Images = "share/images/";
Gwt.Core.Contrib.Icons = "share/icons/";
Gwt.Core.Contrib.db = "remote";
Gwt.Core.Contrib.request_id = 0;

//End Gwt::Core::Contrib
//###########################################################################
