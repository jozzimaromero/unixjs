//###########################################################################
//Gwt::Core
Gwt.Core = new Object ();

Gwt.Core.Contrib = {
	"Protocol" : window.location.protocol,
	"HostName" : window.location.hostname,
	"Port" : window.location.port,
	"Backend" : this.Protocol+"//"+this.HostName+"/backend",
	"Host": this.Protocol+"//"+this.HostName+"/frontend",
	"Images": "share/images/",
	"Icons": "share/icons/",
	"db": "remote",
	"request_id": 0,
};
//End Gwt::Core::Contrib
//###########################################################################
