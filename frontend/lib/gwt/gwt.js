//##############################################################################
//Gwt
Gwt = new Object ();
//End Gwt
//###############################################################################
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
//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Data)
{
	this.XHR = new XMLHttpRequest ();			
	this.Url = null;
	this.Func = null;
	this.Data = null;
	this.InitRequest (Url, Func, Data);
}

Gwt.Core.Request.prototype.InitRequest = function (Url, Func, Data)
{
	this.Url = Url;
	this.Func = Func;
	this.Data = Data;
	this.XHR.onreadystatechange = this.Ready.bind(this);
	this.XHR.open ("POST", this.Url, true);
	this.Send ();
}

Gwt.Core.Request.prototype.Send = function ()
{	
	if (this.Data instanceof File)
	{
		this.UploadFile ();
		return;
	}
	this.SendData ();
}

Gwt.Core.Request.prototype.UploadFile =  function ()
{
	this.Boundary = "---------------------------" + Date.now().toString(16);
	this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + this.Boundary);
	
	this.Multipart = [];	
	this.Multipart.push ("--"+this.Boundary+"\r\n");
	
	var ContentDisposition = "Content-Disposition: form-data; name=\"userfile\"; filename=\""+ this.Data.name + "\"\r\nContent-Type: " + this.Data.type + "\r\n\r\n";
	this.Multipart.push (ContentDisposition);
	
	
	this.FileData = new FileReader ();
	this.FileData.readAsBinaryString (this.Data);
    
	this.FileData.addEventListener ("load", this.SendFile.bind(this), false);
}

Gwt.Core.Request.prototype.SendFile = function ()
{
	console.log (this.FileData.error);
	this.Multipart.push (this.FileData.result);
	
	this.Multipart.push ("\r\n--"+this.Boundary+"--");
	
	var RawData = this.Multipart.join ("");
	
	var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
	{
      Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
	}
	
	this.XHR.send (Uint8Data);
}

Gwt.Core.Request.prototype.SendData = function ()
{
	this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
	this.XHR.send (this.Data);
}

Gwt.Core.Request.prototype.Ready = function ()
{
	if (this.XHR.readyState == 4 && this.XHR.status == 200)
	{
		this.Func(this.XHR.response);
	}
}
//End of Gwt::Core::Request
//##########################################################
//Gwt::Graphic
//###########################################################################################################
Gwt.Graphic = new Object ();
//###########################################################################################################
//End Gwt::Graphic::Svg
//Gwt::Graphic::Svg
//###########################################################################################################
//environments constants
Gwt.Graphic.Svg = new Object ();
Gwt.Graphic.Svg.Contrib = new Object ();

Gwt.Graphic.Svg.Contrib.AspectRatio =
{
    XMinYMin : "xMimYMin",
    XMidYMid : "xMidYMid",
    XMaxYMax : "xMaxYMax",
    XMinYMid : "xMinYMid",
    XMidYMin : "xMidYMin",
    XMidYMax : "xMidYMax",
    XMaxYMid : "xMaxYMid",
    XMinYMax : "xMinYMax",
    XMaxYMin : "xMaxYMin",
}

Gwt.Graphic.Svg.Contrib.ZoomAndPan =
{
    Magnify : "magnify",
    Disable : "disable",
}

Gwt.Graphic.Svg.Contrib.StrokeLineCap =
{
    Butt : "butt",
    Round : "round",
    Square : "square",
}
//###########################################################################################################
//Gwt::Graphic::Conf

//##################################################################################################
//Class Gwt::Graphics::Svg::Graphic
Gwt.Graphic.Svg.Graphic = function ()
{
    this.Html = null;
    this.Width = null;
    this.Height = null;
    this.Fill = null;
    this.FillOpacity = null;
    this.Stroke = null;
    this.StrokeOpacity = null;
    this.StrokeWidth = null;
    this.StrokeLineCap = null;
    this.StrokeDashArray = null;
    
    this.InitGraphic ();
}

Gwt.Graphic.Svg.Graphic.prototype.InitGraphic = function ()
{
    this.Html = document.createElement ("svg");
    
    this.SetWidth (100);
    this.SetHeight (100);
}

Gwt.Graphic.Svg.Graphic.prototype.FinalizeGraphic = function ()
{
    this.Html = null;

    this.Width = null;
    this.Height = null;
}

Gwt.Graphic.Svg.Graphic.prototype.Add = function (element)
{
    this.Html.appendChild (element.Html);
}



Gwt.Graphic.Svg.Graphic.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.Html.setAttribute ("width", this.Width+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Graphic.Svg.Graphic.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.Html.setAttribute ("height", this.Height+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Graphic.Svg.Graphic.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFill = function (Fill)
{
    this.Fill = Fill;
    this.Html.setAttribute ("fill", this.Fill);
}

Gwt.Graphic.Svg.Graphic.prototype.SetFillOpacity = function (FillOpacity)
{
    this.FillOpacity = FillOpacity;
    this.Html.setAttribute ("fill-opacity", this.FillOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStroke = function (Stroke)
{
    this.Stroke = Stroke;
    this.Html.setAttribute ("stroke", this.Stroke);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeOpacity = function (StrokeOpacity)
{
    this.StrokeOpacity = StrokeOpacity;
    this.Html.setAttribute ("stroke-opacity", this.StrokeOpacity);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeWidth = function (StrokeWidth)
{
    this.StrokeWidth = StrokeWidth;
    this.Html.setAttribute ("stroke-width", this.StrokeWidth+"px");
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeLineCap = function (StrokeLineCap)
{
    this.StrokeLineCap = StrokeLineCap;
    this.Html.setAttribute ("stroke-linecap", this.StrokeLineCap);
}

Gwt.Graphic.Svg.Graphic.prototype.SetStrokeDashArray = function (StrokeDashArray)
{
    this.StrokeDashArray = StrokeDashArray;
    this.Html.setAttribute ("stroke-dasharray", this.StrokeDashArray);
}
//##################################################################################################
//End Gwt::Graphic::Svg::Graphic

//##################################################################################################
//Class Gwt::Graphics::Svg::Canvas
Gwt.Graphic.Svg.Canvas = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
    
    this.InitCanvas ();
}

Gwt.Graphic.Svg.Canvas.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Canvas.prototype.constructor = Gwt.Graphic.Svg.Canvas;

Gwt.Graphic.Svg.Canvas.prototype.InitCanvas = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "svg");
    this.SetX (0);
    this.SetY (0);
    this.SetWidth (100);
    this.SetHeight (100);
    this.SetViewBox (0, 0, this.GetWidth(), this.GetHeight());
    this.SetPreserveAspectRatio (Gwt.Graphic.Svg.Contrib.AspectRatio.XMaxYMax);
    this.SetZoomAndPan (Gwt.Graphic.Svg.Contrib.ZoomAndPan.Disable);
    this.SetXmlns ("http://www.w3.org/2000/svg", "http://www.w3.org/1999/xlink", "preserve");
}

Gwt.Graphic.Svg.Canvas.prototype.FinalizeCanvas = function ()
{
    this.FinalizeSvgGraphic ();
    this.X = null;
    this.Y = null;
    this.ViewBoxMinX = null;
    this.ViewBoxMinY = null;
    this.ViewBoxWidth = null;
    this.ViewBoxHeight = null;
    this.PreserveAspectRatio = null;
    this.ZoomAndPan = null;
    this.Xmlns = null;
    this.XmlnsXlink = null;
    this.XmlSpace = null;
}

Gwt.Graphic.Svg.Canvas.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Canvas.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Canvas.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Canvas.prototype.SetViewBox = function (Minx, Miny, Width, Height)
{
    this.ViewBoxMinX = Minx;
    this.ViewBoxMinY = Miny;
    this.ViewBoxWidth = Width;
    this.ViewBoxHeight = Height;
    
    this.Html.setAttribute ("viewBox", this.ViewBoxMinX+", "+this.ViewBoxMinX+", "+this.ViewBoxWidth+", "+this.ViewBoxHeight);
}

Gwt.Graphic.Svg.Canvas.prototype.SetPreserveAspectRatio = function (AspectRatio)
{
    this.PreserveAspectRatio = AspectRatio;
    
    this.Html.setAttribute ("preserveAspectRatio", this.PreserveAspectRatio);
}

Gwt.Graphic.Svg.Canvas.prototype.SetZoomAndPan = function (ZoomAndPan)
{
    this.ZoomAndPan = ZoomAndPan;
    
    this.Html.setAttribute ("zoomAndPan", this.ZoomAndPan);
}

Gwt.Graphic.Svg.Canvas.prototype.SetXmlns = function (Xmlns, XmlnsXlink, XmlSpace)
{
    this.Xmlns  = Xmlns;
    this.XmlnsXlink = XmlnsXlink;
    this.XmlSpace = XmlSpace;
    
    this.Html.setAttribute ("xmlns", this.Xmlns);
    this.Html.setAttribute ("xmlns:xlink", this.XmlnsXlink);
    this.Html.setAttribute ("xml:space", this.XmlSpace);
}
//Ends Gwt::Graphic::Svg::Canvas 
//##################################################################################################

//##################################################################################################
//Class Gwt::Graphics::Svg::Rect
Gwt.Graphic.Svg.Rect = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
 
    this.InitRect ();
}

Gwt.Graphic.Svg.Rect.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Rect.prototype.constructor = Gwt.Graphic.Svg.Rect;

Gwt.Graphic.Svg.Rect.prototype.InitRect = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "rect");
    this.SetX (0);
    this.SetY (0);
    this.SetSize (100, 100);
}

Gwt.Graphic.Svg.Rect.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Rect.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Rect.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Rect.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Rect

//##################################################################################################
//Class Gwt::Graphics::Circle
Gwt.Graphic.Svg.Circle = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Cx = null;
    this.Cy = null;
    this.R = null;
 
    this.InitCircle ();
}

Gwt.Graphic.Svg.Circle.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Circle.prototype.constructor = Gwt.Graphic.Svg.Circle;

Gwt.Graphic.Svg.Circle.prototype.InitCircle = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "circle");
    this.SetCx (0);
    this.SetCy (0);
    this.SetR (10);
}

Gwt.Graphic.Svg.Circle.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Circle.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Circle.prototype.SetR = function (R)
{
    this.R = R;
    this.Html.setAttribute ("r", this.R+"px");
}

Gwt.Graphic.Svg.Circle.prototype.GetR = function ()
{
    return this.R;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Circle

//##################################################################################################
//Class Gwt::Graphics::Svg::Ellipse
Gwt.Graphic.Svg.Ellipse = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Cx = null;
    this.Cy = null;
    this.Rx = null;
    this.Ry = null;
 
    this.InitEllipse ();
}

Gwt.Graphic.Svg.Ellipse.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Ellipse.prototype.constructor = Gwt.Graphic.Svg.Ellipse;

Gwt.Graphic.Svg.Ellipse.prototype.InitEllipse = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "ellipse");
    this.SetCx (0);
    this.SetCy (0);
    this.SetRx (0);
    this.SetRy (0);
}

Gwt.Graphic.Svg.Ellipse.prototype.SetCx = function (Cx)
{
    this.Cx = Cx;
    this.Html.setAttribute ("cx", this.Cx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCx = function ()
{
    return this.Cx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetCy = function (Cy)
{
    this.Cy = Cy;
    this.Html.setAttribute ("cy", this.Cy+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetCy = function ()
{
    return this.Cy;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Ellipse.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Ellipse.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Ellipse

//##################################################################################################
//Class Gwt::Graphics::Line
Gwt.Graphic.Svg.Line = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
 
    this.InitLine ();
}

Gwt.Graphic.Svg.Line.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Line.prototype.constructor = Gwt.Graphic.Svg.Line;

Gwt.Graphic.Svg.Line.prototype.InitLine = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "line");
    this.SetP1 (0, 0);
    this.SetP2 (10, 10);
}

Gwt.Graphic.Svg.Line.prototype.SetX1 = function (X1)
{
    this.X1 = X1;
    this.Html.setAttribute ("x1", this.X1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX1 = function ()
{
    return this.X1;
}

Gwt.Graphic.Svg.Line.prototype.SetY1 = function (Y1)
{
    this.Y1 = Y1;
    this.Html.setAttribute ("y1", this.Y1+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY1 = function ()
{
    return this.Y1;
}

Gwt.Graphic.Svg.Line.prototype.SetX2 = function (X2)
{
    this.X2 = X2;
    this.Html.setAttribute ("x2", this.X2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetX2 = function ()
{
    return this.X2;
}

Gwt.Graphic.Svg.Line.prototype.SetY2 = function (Y2)
{
    this.Y2 = Y2;
    this.Html.setAttribute ("y2", this.Y2+"px");
}

Gwt.Graphic.Svg.Line.prototype.GetY2 = function ()
{
    return this.Y2;
}

Gwt.Graphic.Svg.Line.prototype.SetP1 = function (P1X, P1Y)
{
    this.SetX1 (P1X);
    this.SetY1 (P1Y);
}

Gwt.Graphic.Svg.Line.prototype.SetP2 = function (P2X, P2Y)
{
    this.SetX2 (P2X);
    this.SetY2 (P2Y);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Line

//##################################################################################################
//Class Gwt::Graphics::Svg::Polygon
Gwt.Graphic.Svg.Polygon = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Points = null;
    this.FillRule = null;
 
    this.InitPolygon ();
}

Gwt.Graphic.Svg.Polygon.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polygon.prototype.constructor = Gwt.Graphic.Svg.Polygon;

Gwt.Graphic.Svg.Polygon.prototype.InitPolygon = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "polygon");
}

Gwt.Graphic.Svg.Polygon.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polygon.prototype.GetPoints = function ()
{
    return this.Points;
}

Gwt.Graphic.Svg.Polygon.prototype.SetFillRule = function (FillRule)
{
    this.FillRule = FillRule;
    this.Html.setAttribute ("fill-rule", this.FillRule);
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polygon

//##################################################################################################
//Class Gwt::Graphics::Svg::Polyline
Gwt.Graphic.Svg.Polyline = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.Points = null;
 
    this.InitPolygon ();
}

Gwt.Graphic.Svg.Polyline.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polyline.prototype.constructor = Gwt.Graphic.Svg.Polyline;

Gwt.Graphic.Svg.Polyline.prototype.InitPolyline = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "polyline");
}

Gwt.Graphic.Svg.Polyline.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polyline.prototype.GetPoints = function ()
{
    return this.Points;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polyline

//##################################################################################################
//Class Gwt::Graphics::Svg::Path
Gwt.Graphic.Svg.Path = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    this.D = null;
    this.M = null;
    this.L = null;
    this.H = null;
    this.V = null;
    this.C = null;
    this.S = null;
    this.Q = null;
    this.T = null;
    this.A = null;
    this.Z = null;
 
    this.InitPath ();
}

Gwt.Graphic.Svg.Path.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Path.prototype.constructor = Gwt.Graphic.Svg.Path;

Gwt.Graphic.Svg.Path.prototype.InitPath = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "path");
}

Gwt.Graphic.Svg.Path.prototype.SetD = function (D)
{
    this.D = D;
    this.Html.setAttribute ("d", this.D);
}

Gwt.Graphic.Svg.Path.prototype.GetD = function ()
{
    return this.D;
}

Gwt.Graphic.Svg.Path.prototype.SetM = function (M)
{
    this.M = "M"+M;
}

Gwt.Graphic.Svg.Path.prototype.GetM = function ()
{
    return this.M;
}

Gwt.Graphic.Svg.Path.prototype.SetL = function (L)
{
    this.L = "L"+L;
}

Gwt.Graphic.Svg.Path.prototype.GetL = function ()
{
    return this.L;
}

Gwt.Graphic.Svg.Path.prototype.SetH = function (H)
{
    this.H = "H"+H;
}

Gwt.Graphic.Svg.Path.prototype.GetH = function ()
{
    return this.H;
}

Gwt.Graphic.Svg.Path.prototype.SetV = function (V)
{
    this.V = "V"+V;
}

Gwt.Graphic.Svg.Path.prototype.GetV = function ()
{
    return this.V;
}

Gwt.Graphic.Svg.Path.prototype.SetC = function (C)
{
    this.C = "C"+C;
}

Gwt.Graphic.Svg.Path.prototype.GetC = function ()
{
    return this.C;
}

Gwt.Graphic.Svg.Path.prototype.SetS = function (S)
{
    this.S = "S"+S;
}

Gwt.Graphic.Svg.Path.prototype.GetS = function ()
{
    return this.S;
}

Gwt.Graphic.Svg.Path.prototype.SetQ = function (Q)
{
    this.Q = "Q"+Q;
}

Gwt.Graphic.Svg.Path.prototype.GetQ = function ()
{
    return this.Q;
}

Gwt.Graphic.Svg.Path.prototype.SetT = function (T)
{
    this.T = "T"+T;
}

Gwt.Graphic.Svg.Path.prototype.GetT = function ()
{
    return this.T;
}

Gwt.Graphic.Svg.Path.prototype.SetA = function (A)
{
    this.A = "A"+A;
}

Gwt.Graphic.Svg.Path.prototype.GetA = function ()
{
    return this.A;
}

Gwt.Graphic.Svg.Path.prototype.SetZ = function ()
{
    this.Z = "Z";
}

Gwt.Graphic.Svg.Path.prototype.UnsetZ = function ()
{
    this.A = "";
}

Gwt.Graphic.Svg.Path.prototype.GetZ = function ()
{
    return this.Z;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Path

//##################################################################################################
//Class Gwt::Graphics::Arc
Gwt.Graphic.Svg.Arc = function ()
{
    Gwt.Graphic.Svg.Path.call (this);
    this.X1 = null;
    this.Y1 = null;
    this.X2 = null;
    this.Y2 = null;
    this.CenterX = null;
    this.CenterY = null;
    this.Radius = null;
    this.InitArc ();
}

Gwt.Graphic.Svg.Arc.prototype = new Gwt.Graphic.Svg.Path ();
Gwt.Graphic.Svg.Arc.prototype.constructor = Gwt.Graphic.Svg.Arc;

Gwt.Graphic.Svg.Arc.prototype.InitArc = function ()
{
    this.Html = document.createElementNS ("http://www.w3.org/2000/svg", "path");
}

Gwt.Graphic.Svg.Arc.prototype.PolarToCartesian = function (centerX, centerY, angleInDegrees)
{
    var angleInRadians = (angleInDegrees-90) * (Math.PI / 180.0);

    return {
        x: (centerX + (this.Radius * Math.cos(angleInRadians))),
        y: (centerY + (this.Radius * Math.sin(angleInRadians)))
    };
}

Gwt.Graphic.Svg.Arc.prototype.DescribeArc = function (X, Y, Radius, StartAngle, EndAngle)
{
    this.CenterX = X;
    this.CenterY = Y;
    this.Radius = Radius;
    
    var start = this.PolarToCartesian(X, Y, EndAngle);
    this.X1 = start.x;
    this.Y1 = start.y;
    
    var end = this.PolarToCartesian(X, Y, StartAngle);
    this.X2 = end.x;
    this.Y2 = end.y;

    var arcSweep = EndAngle - StartAngle <= 180 ? "0" : "1";
    
    this.SetM ([this.X1, this.Y1].join (" "));
    this.SetA ([this.Radius, this.Radius, 0, arcSweep, 0, this.X2, this.Y2].join (" "));
    this.SetL ([this.CenterX, this.CenterY].join (" "));
    this.SetZ ();
    this.SetD ([this.GetM (), this.GetA (), this.GetL (), this.GetZ()]. join (" "));
}
//##########################################################################################################
//Gwt::Graphic::Svg::Arc

//#####################################################################################################
//Gwt::Gui
//environments constants
Gwt.Gui = new Object ();
Gwt.Gui =
{
WIN_POS_CENTER: "WIN_POS_CENTER",
WIN_POS_LEFT: "WIN_POS_LEFT",
WIN_POS_TOP: "WIN_POS_TOP",
WIN_POS_RIGHT: "WIN_POS_RIGHT",
WIN_POS_BOTTOM: "WIN_POS_BOTTOM",
ALIGN_CENTER: "ALIGN_CENTER",
ALIGN_LEFT: "ALIGN_LEFT",
ALIGN_RIGHT: "ALIGN_RIGHT",
};

Gwt.Gui.Event =
{
	Window :
	{
		//window events
		AfterPrint: "afterprint",
		BeforePrint: "beforeprint",
		BeforeUnload: "beforeunload",
		Error: "error",
		HashChange: "hashchange",
		Load: "load",
		Message: "message",
		Offline: "offline",
		Online: "online",
		PageHide: "pagehide",
		PageShow: "pageshow",
		PopState: "popstate",
		Resize: "resize",
		Storage: "storage",
		Unload: "unload",
	},
	
	Form:
	{
		//form events
		Blur: "blur",
		Change: "change",
		ContextMenu: "contextmenu",
		Focus: "focus",
		Input: "input",
		Invalid: "invalid",
		Reset: "reset",
		Search: "search",
		Select: "select",
		Submit: "submit",
	},
	
	Mouse:
	{
		//mouse events
		Click: "click",
		DBClick: "dbclick",
		Drag: "drag",
		DragEnd: "dragend",
		DragEnter: "dragenter",
		DragLeave: "dragleave",
		DragOver: "dragover",
		DragStart: "dragstart",
		Drop: "drop",
		MouseDown: "mousedown",
		MouseMove: "mousemove",
		MouseOut: "mouseout",
		MouseOver: "mouseover",
		MouseUp: "mouseup",
		Scroll: "scroll",
		Wheel: "wheel",
	},
	
	Keyboard:
	{
		//keyboard events
		KeyUp: "keyup",
		KeyPress: "keypress",
		KeyDown: "keydown",
		KeyCodes: {Enter: 13, Ctrl: 17, Alt: 18, AtlGr: 225, Shift: 16, Up: 38, Down: 40, Left: 37, Right: 39, Tap: 9, Insert: 45, Home: 36, Del: 46, End: 35, Repag: 33, Avpag: 34, Meta: 91},
	},
	
	Clipboard:
	{
		//clipboard events
		Copy: "copy",
		Cut: "cut",
		Paste: "paste",
	},
	
	Media:
	{
		//media events
		Abort: "abort",
		CanPlay: "canplay",
		CanPlayThtough: "canplaythrough",
		CueChange: "cuechange",
		DurationChange: "durationchange",
		Emptied: "emptied",
		Ended: "ended",
		Error: "error",
		LoadedData: "loadeddata",
		LoadedMetadata: "loadedmetadata",
		LoadStart: "loadstart",
		Pause: "pause",
		Play: "play",
		Playing: "playing",
		Progress: "progress",
		RateChange: "ratechange",
		Seeked: "seeked",
		Seeking: "seeking",
		Stalled: "stalled",
		Suspend: "suspend",
		TimeUpdate: "timeupdate",
		VolumeChange: "volumechange",
		Waiting: "waiting",
	},
	
	Misc:
	{
		//misc events
		Error: "error",
		Show: "show",
		Toggle: "toggle",
	}
	
};

//################################################################################################################################################
//screen info
Gwt.Gui.SCREEN_DEVICE_WIDTH = window.innerWidth;
Gwt.Gui.SCREEN_DEVICE_HEIGHT = window.innerHeight;
Gwt.Gui.SCREEN_DEVICE_PIXEL_RATIO = window.devicePixelRatio;
Gwt.Gui.SCREEN_DEVICE_ORIENTATION = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
Gwt.Gui.SCREEN_DEVICE_ASPECT_RATIO =  (window.innerWidth > window.innerHeight ? window.innerWidth/window.innerHeight : window.innerHeight/window.innerWidth).toString().substring(0,4);

Gwt.Gui.Contrib = new Object ();

Gwt.Gui.Contrib.Color = function (Arg1, Arg2, Arg3, Arg4)
{
	this.Red = null;
	this.Green = null;
	this.Blue = null;
	this.Alpha = null;
	
	if (typeof Arg1 !== "number")
	{
		var key = Object.keys (Gwt.Gui.Contrib.Colors);
		for (var i=0; i<key.length; i++)
		{
			
			if (Arg1 === Gwt.Gui.Contrib.Colors[key[i]])
			{
				this.Red = Arg1[0];
				this.Green = Arg1[1];
				this.Blue = Arg1[2];
				this.Alpha = Arg1[3];
			}
		}
	}
	else 
	{
		this.Red = Arg1;
		this.Green = Arg2;
		this.Blue = Arg3;
		this.Alpha = Arg4;
	}
}

Gwt.Gui.Contrib.Color.prototype.ToString = function ()
{
	return "rgba("+this.Red+","+this.Green+","+this.Blue+","+this.Alpha+")";
}

Gwt.Gui.Contrib.Color.prototype.SetRed = function (Arg1)
{
	this.Red = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetGreen = function (Arg1)
{
	this.Green = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetBlue = function (Arg1)
{
	this.Blue = Arg1;
}

Gwt.Gui.Contrib.Color.prototype.SetAlpha = function (Arg1)
{
	this.Alpha = Arg1;
}

Gwt.Gui.Contrib.Colors =
{
	Transparent : [0,0,0,0],
	Azure : [240,255,255,1],
	White : [255,255,255,1],
	Red : [255,0,0,1],
	DarkSlateGray : [47,79,79,1],
	Green: [0,255,0,1],
	Black: [0,0,0,1],
}

//Gwt Border Styles
Gwt.Gui.Contrib.BorderStyle =
{
	None: "none",
	Hidden: "hidden",
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt position type
Gwt.Gui.Contrib.PositionType =
{
	Static: "statci",
	Relative: "relative",
	Fixed: "fixed",
	Absolute: "absolute"
}

//Gwt Display
Gwt.Gui.Contrib.Display =
{
	Inline: "inline",
	Block: "block",
	Flex: "flex",
	InlineBlock: "inline-block",
	InlineFlex: "inline-flex",
	InlineTable: "inline-table",
	ListItem: "list-item",
	RunIn: "run-in",
	Table: "table",
	TableCaption: "table-caption",
	TableColumnGroup: "table-column-group",
	TableHeaderGroup: "table-header-group",
	TableFooterGroup: "table-footer-group",
	TableRowGroup: "table-row-group",
	TableCell: "table-cell",
	TableColumn: "table-column",
	TableRow: "table-row",
	None: "none",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Overflow
Gwt.Gui.Contrib.Overflow =
{
	Visible: "visible",
	Hidden: "hidden",
	Scroll: "scroll",
	Auto: "auto",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Valign
Gwt.Gui.Contrib.Valign =
{
	Baseline: "baseline",
	Length: "length",
	Percent: "%",
	Sub: "sub",
	Supper: "supper",
	Top: "top",
	TextTop: "text-top",
	Middle: "middle",
	Bottom: "bottom",
	TextBottom: "text-bottom",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Cursor
Gwt.Gui.Contrib.Cursor =
{
	Alias: "alias",
	AllScroll: "all-scroll",
	Auto: "auto",
	Cell: "cell",
	ContextMenu: "context-menu",
	ColResize: "col-resize",
	Copy: "copy",
	Crosshair: "crosshair",
	Default: "default",
	EResize: "e-resize",
	EWResize: "ew-resize",
	Grab: "grab",
	Grabbing: "grabbing",
	Help: "help",
	Move: "move",
	NResize: "n-resize",
	NEResize: "ne-resize",
	NESwResize: "nesw-resize",
	NSResize: "ns-resize",
	NWResize: "nw-resize",
	NWSEResize: "nwse-resize",
	NoDrop: "no-drop",
	None: "none",
	NotAllowed: "not-allowed",
	Pointer: "pointer",
	Progress: "progress",
	RowResize: "row-resize",
	SResize: "s-resize",
	SEResize: "se-resize",
	SWResize: "sw-resize",
	Text: "text",
	URL: "url",
	VerticalText: "vertical-text",
	WResize: "w-resize",
	Wait: "wait",
	ZoomIn: "zoom-in",
	ZoomOut: "zoom-out",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Font Weight
Gwt.Gui.Contrib.FontWeight =
{
	Normal: "normal",
	Bold: "bold",
	Bolder: "bolder",
	Lighter: "lighter",
	Initial: "initial",
	Inherit: "inherit"
}

// Gwt User Select
Gwt.Gui.Contrib.UserSelect =
{
	None: "none",
	Text: "text",
	All: "all"
}

//Gwt Text Alignment
Gwt.Gui.Contrib.TextAlign =
{
	Left: "left",
	Right: "right",
	Center: "center",
	Justify: "justify",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Backgroud Attachment
Gwt.Gui.Contrib.BackgroundAttachment =
{
	Scroll: "scroll",
	Fixed: "fixed",
	Local: "local",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Clip
Gwt.Gui.Contrib.BackgroundClip =
{
	BorderBox: "border-box",
	PaddingBox: "padding-box",
	ContentBox: "content-box",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Repeat
Gwt.Gui.Contrib.BackgroundRepeat =
{
	Repeat: "repeat",
	RepeatX: "repeat-x",
	RepeatY: "repeat-y",
	NoRepeat: "no-repeat",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Size
Gwt.Gui.Contrib.BackgroundSize =
{
	Auto: "auto",
	Length: "length",
	Cover: "cover",
	Contain: "contain",
	Initial: "initial",
	Inherit: "inherit"
}

//Gwt Background Position
Gwt.Gui.Contrib.BackgroundPosition =
{
	Left: "left",
	Right: "right",
	Top: "top",
	Bottom: "bottom",
	Center: "center"
}
//###########################################################################################################

//##################################################################################################
//Class Gwt::Gui::Frame
Gwt.Gui.Frame = function ()
{
	this.BackgroundAttachment = null;
	this.BackgroundClip = null;
	this.BackgroundColor = null;
	this.BackgroundImage = null;
	this.BackgroundOrigin = null;
	this.BackgroundPositionX = null;
	this.BackgroundPositionY = null;
	this.BackgroundRepeatX = null;
	this.BackgroundRepeatY = null;
	this.BackgroundSizeHeight = null;
	this.BackgroundSizeWidth = null;
	this.Border = null;
	this.BorderRadius = null;
	this.BorderStyle = null;
	this.BoxShadowH = null;
	this.BoxShadowV = null;
	this.BoxShadowBlur = null;
	this.BoxShadowSize = null;
	this.BoxShadowColor = null;
	this.Color = null;
	this.Cursor = null;
	this.Display = null;
	this.Expand = null;
	this.FontFamily = null;
	this.FontSize = null;
	this.FontWeight = null;
	this.Height = null;
	this.Html = null;
	this.Margin = null;
	this.MarginBottom = null;
	this.MarginLeft = null;
	this.MarginRight = null;
	this.MarginTop = null;
	this.MaxHeight = null;
	this.MaxWidth = null;
	this.MinHeight = null;
	this.MinWidth = null;
	this.Overflow = null;
	this.Opacity = null;
	this.Padding = null;
	this.PaddingBottom = null;
	this.PaddingLeft = null;
	this.PaddingRight = null;
	this.PaddingTop = null;
	this.PositionLeft = null;
	this.PositionTop = null;
	this.PositionType = null;
	this.TabIndex = null;
	this.TextShadowBlur = null;
	this.TextShadowColor = null;
	this.TextShadowOffsx = null;
	this.TextShadowOffsy = null;
	this.UserSelect = null;
	this.Valign = null;
	this.Visibility = null;
	this.Width = null;
	this.ZIndex = null;
	this.ClassName = null;
	this.Parent = null;
		
	this.InitFrame ();
}

Gwt.Gui.Frame.prototype.InitFrame = function ()
{
	this.SetHtml ("div");
	this.SetTabIndex (0);
	this.SetClassName ("Gwt_Gui_Frame");
	this.SetExpand(false);
	this.SetBorder (0);
	this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetPosition (0, 0);
}

Gwt.Gui.Frame.prototype.FinalizeFrame = function ()
{
	this.Html.parentNode.removeChild (this.Html);
	
	this.BackgroundAttachment = null;
	this.BackgroundClip = null;
	this.BackgroundColor = null;
	this.BackgroundImage = null;
	this.BackgroundOrigin = null;
	this.BackgroundPositionX = null;
	this.BackgroundPositionY = null;
	this.BackgroundRepeatX = null;
	this.BackgroundRepeatY = null;
	this.BackgroundSizeHeight = null;
	this.BackgroundSizeWidth = null;
	this.Border = null;
	this.BorderRadius = null;
	this.BorderStyle = null;
	this.Color = null;
	this.Cursor = null;
	this.Display = null;
	this.Expand = null;
	this.FontFamily = null;
	this.FontSize = null;
	this.FontWeight = null;
	this.Height = null;
	this.Html = null;
	this.Margin = null;
	this.MarginBottom = null;
	this.MarginLeft = null;
	this.MarginRight = null;
	this.MarginTop = null;
	this.MaxHeight = null;
	this.MaxWidth = null;
	this.Overflow = null;
	this.Padding = null;
	this.PaddingBottom = null;
	this.PaddingLeft = null;
	this.PaddingRight = null;
	this.PaddingTop = null;
	this.PositionLeft = null;
	this.PositionTop = null;
	this.PositionType = null;
	this.TabIndex = null;
	this.TextShadowBlur = null;
	this.TextShadowColor = null;
	this.TextShadowOffsx = null;
	this.TextShadowOffsy = null;
	this.UserSelect = null;
	this.Valign = null;
	this.Visibility = null;
	this.Width = null;
	this.ZIndex = null;
	this.ClassName = null;
	this.Parent = null;
}

Gwt.Gui.Frame.prototype.Add = function (Element)
{
	this.Html.appendChild (Element.Html);
}

Gwt.Gui.Frame.prototype.AddEvent = function (Event, Callback)
{
	this.Html.addEventListener (Event, Callback, true);
}

Gwt.Gui.Frame.prototype.RemoveEvent = function (Event, Callback)
{
	this.Html.removeEventListener (Event, Callback, true);
}
Gwt.Gui.Frame.prototype.SetHtml = function (Element)
{
	this.Html = document.createElement (Element);
	this.InitStyle ();
}
Gwt.Gui.Frame.prototype.SetTabIndex = function (TabIndex)
{
	this.TabIndex = TabIndex;
	this.Html.tabIndex = this.TabIndex;
}

Gwt.Gui.Frame.prototype.SetSize = function (Width, Height)
{
	this.Width = Width;
	this.Height = Height;
    this.SetMaxWidth (this.Width);
    this.SetMaxHeight (this.Height);
	this.SetMinWidth (this.Width);
    this.SetMinHeight (this.Height);
	this.Html.style.width = this.Width+"px";
	this.Html.style.height = this.Height+"px";
}

Gwt.Gui.Frame.prototype.SetWidth = function (Width)
{
	this.Width = Width;
    this.SetMaxWidth (this.Width);
	this.SetMinWidth (this.Width);
	this.Html.style.width = this.Width+"px";
}

Gwt.Gui.Frame.prototype.SetHeight = function (Height)
{
	this.Height = Height;
    this.SetMaxHeight (this.Height);
	this.SetMinHeight (this.Height);
	this.Html.style.height = this.Height+"px";
}

Gwt.Gui.Frame.prototype.GetWidth = function ()
{
	return this.Width;
}

Gwt.Gui.Frame.prototype.GetHeight = function ()
{
	return this.Height;
}

Gwt.Gui.Frame.prototype.GetHtml = function ()
{
	 return this.Html;
}

Gwt.Gui.Frame.prototype.SetPosition = function (Top, Left)
{
	var width_add = Gwt.Gui.SCREEN_DEVICE_WIDTH * 0.05;
	var height_add = Gwt.Gui.SCREEN_DEVICE_HEIGHT * 0.05;
	
	this.PositionTop = Top;
	this.PositionLeft = Left;
	
	if (this.PositionTop === Gwt.Gui.WIN_POS_CENTER && this.PositionLeft === undefined)
	{
		var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
		var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2);
	}
	else if (this.PositionLeft !== undefined && this.PositionTop !== undefined)
	{
		switch (this.PositionLeft)
		{
			case Gwt.Gui.WIN_POS_LEFT:
				var left_ = 0;
				break;
			
			case Gwt.Gui.WIN_POS_CENTER:
				var left_ = (Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2;
				break;
			
			case Gwt.Gui.WIN_POS_RIGHT:
				var left_ = (Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())-2;
				break;
				
			default:
				var left_ = this.PositionLeft;
		}
		
		switch (this.PositionTop)
		{
			case Gwt.Gui.WIN_POS_TOP:
				var top_ = 0;
				break;
				
			case Gwt.Gui.WIN_POS_CENTER:
				var top_ = (Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2;
				break;
				
			case Gwt.Gui.WIN_POS_BOTTOM:
				var top_ = (Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())-2;
				break;
				
			default:
				var top_ = this.PositionTop;
		}
	}
	else
	{
		top_ = 0;
		left_ = 0;
	}
	
	this.PositionTop = top_ ;
	this.PositionLeft = left_;
	
	this.Html.style.top = this.PositionTop;
	this.Html.style.left = this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionLeft = function ()
{
	return this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionTop = function ()
{
	return this.PositionTop;
}

Gwt.Gui.Frame.prototype.SetFocus = function ()
{
	this.Html.focus ();
}

Gwt.Gui.Frame.prototype.SetBackgroundAttachment = function (Attachment)
{
	this.BackgroundAttachment = Attachment;
	this.Html.style.backgroundAttachment = this.BackgroundAttachment;
}

Gwt.Gui.Frame.prototype.SetBackgroundClip = function (Clip)
{
	this.BackgroundClip = Clip;
	this.Html.style.backgroundClip = this.BackgroundClip;
}

Gwt.Gui.Frame.prototype.SetBackgroundColor = function (Color)
{
	this.BackgroundColor = Color;
	this.Html.style.backgroundColor = this.BackgroundColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetBackgroundImage = function (Image)
{
	this.BackgroundImage = Image;
	this.Html.style.backgroundImage = "url("+this.BackgroundImage+")";
}

Gwt.Gui.Frame.prototype.SetBackgroundOrigin = function (Origin)
{
	this.BackgroundOrigin = Origin;
	this.Html.style.backgroundOrigin = this.BackgroundOrigin;
}

Gwt.Gui.Frame.prototype.SetBackgroundPosition = function (X, Y)
{
	this.BackgroundPositionX = X;
	this.BackgroundPositionY = Y;
	this.Html.style.backgroundPosition = ""+this.BackgroundPositionX+" "+this.BackgroundPositionY+"";
}

Gwt.Gui.Frame.prototype.SetBackgroundRepeat = function (X, Y)
{
	this.BackgroundRepeatX = X;
	this.BackgroundRepeatY = Y;
	this.Html.style.backgroundRepeatX = this.BackgroundRepeatX;
	this.Html.style.backgroundRepeatY = this.BackgroundRepeatY;
}

Gwt.Gui.Frame.prototype.SetBackgroundSize = function (Width, Height)
{
	this.BackgroundSizeWidth = Width;
	this.BackgroundSizeHeight = Height;
	if (typeof this.BackgroundSizeWidth === "string")
	{
		this.Html.style.backgroundSize = this.BackgroundSizeWidth;
	}
	else
	{
		this.Html.style.backgroundSize = this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px";
	}
}

Gwt.Gui.Frame.prototype.SetBorder = function (Border)
{
	this.Border = Border;
	this.Html.style.borderWidth = this.Border+"px";
}

Gwt.Gui.Frame.prototype.SetBorderStyle = function (Style)
{
	this.BorderStyle = Style;
	this.Html.style.borderStyle = this.BorderStyle;
}

Gwt.Gui.Frame.prototype.SetBorderRadius = function (Radius)
{
	this.BorderRadius = Radius;
	this.Html.style.borderRadius= this.BorderRadius+"px";
}

Gwt.Gui.Frame.prototype.SetBorderColor = function (Color)
{	
	this.Html.style.borderColor = Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetBoxShadow = function (H, V, Blur, Size, Color)
{
	this.BoxShadowH = H;
	this.BoxShadowV = V;
	this.BoxShadowBlur = Blur;
	this.BoxShadowSize = Size;
	this.BoxShadowColor = Color;
	this.Html.style.boxShadow = this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetClassName = function (ClassName)
{
	this.ClassName = ClassName;
	this.Html.className = this.ClassName;
}

Gwt.Gui.Frame.prototype.GetClassName = function ()
{
	return this.ClassName;
}

Gwt.Gui.Frame.prototype.SetParent = function (Parent)
{
	this.Parent = Parent;
}

Gwt.Gui.Frame.prototype.GetParent = function ()
{
	return this.Parent;
}

Gwt.Gui.Frame.prototype.SetColor = function (Color)
{
	this.Color = Color
	this.Html.style.color = this.Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetCursor = function (Cursor)
{
	this.Cursor = Cursor;
	this.Html.style.cursor = this.Cursor;
}

Gwt.Gui.Frame.prototype.SetDisplay = function (Display)
{
	this.Display = Display;
	this.Html.style.display = this.Display;
}

Gwt.Gui.Frame.prototype.SetFontFamily = function (FontFamily)
{
	this.FontFamily = FontFamily;
	this.Html.style.fontFamily = this.FontFamily;
}

Gwt.Gui.Frame.prototype.SetFontSize = function (FontSize)
{
	this.FontSize = FontSize;
	this.Html.style.fontSize = this.FontSize+"pt";
}

Gwt.Gui.Frame.prototype.GetFontSize = function ()
{
	return this.FontSize;
}

Gwt.Gui.Frame.prototype.SetFontWeight = function (FontWeight)
{
	this.FontWeight = FontWeight;
	this.Html.style.fontWeight = this.FontWeight;
}

Gwt.Gui.Frame.prototype.InitStyle = function ()
{
	this.SetMaxHeight (Gwt.Gui.SCREEN_DEVICE_HEIGHT);
	this.SetMaxWidth (Gwt.Gui.SCREEN_DEVICE_WIDTH);
	this.SetMinHeight (0);
	this.SetMinWidth (0);
	this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
	this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
	this.SetPadding (0);
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
	this.SetBorder (0);
	this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
}

Gwt.Gui.Frame.prototype.SetMaxHeight = function (MaxHeght)
{
	this.MaxHeight = MaxHeght;
	this.Html.style.maxHeight = this.MaxHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMaxWidth = function (MaxWidth)
{
	this.MaxWidth = MaxWidth;
	this.Html.style.maxWidth = this.MaxWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMinHeight = function (MinHeight)
{
	this.MinHeight = MinHeight;
	this.Html.style.minHeight = this.MinHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMinWidth = function (MinWidth)
{
	this.MinWidth = MinWidth;
	this.Html.style.minWidth = this.MinWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMargin = function (Margin)
{
	this.Margin = Margin;
	this.Html.style.margin = this.Margin+"px";
}

Gwt.Gui.Frame.prototype.SetMarginTop = function (MarginTop)
{
	this.MarginTop = MarginTop;
	this.Html.style.marginTop = this.MarginTop+"px";
}

Gwt.Gui.Frame.prototype.SetMarginBottom = function (MarginBottom)
{
	this.MarginBottom = MarginBottom;
	this.Html.style.marginBottom = this.MarginBottom+"px";
}

Gwt.Gui.Frame.prototype.SetMarginLeft = function (MarginLeft)
{
	this.MarginLeft = MarginLeft;
	this.Html.style.marginLeft = this.MarginLeft+"px";
}

Gwt.Gui.Frame.prototype.SetMarginRight = function (MarginRigth)
{
	this.MarginRight = MarginRigth;
	this.Html.style.marginRight = this.MarginRight+"px";
}

Gwt.Gui.Frame.prototype.SetPadding = function (Padding)
{
	this.Padding = Padding;
	this.Html.style.padding = this.Padding+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingTop = function (PaddingTop)
{
	this.PaddingTop = PaddingTop;
	this.Html.style.paddingTop = this.PaddingTop+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingBottom = function (PaddingBottom)
{
	this.PaddingBottom = PaddingBottom;
	this.Html.style.paddingBottom = this.PaddingBottom+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingLeft = function (PaddingLeft)
{
	this.PaddingLeft = PaddingLeft;
	this.Html.style.paddingLeft = this.PaddingLeft+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingRight = function (PaddingRight)
{
	this.PaddingRight = PaddingRight;
	this.Html.style.paddingRight = this.PaddingRight+"px";
}

Gwt.Gui.Frame.prototype.SetPositionType = function (PositionType)
{
	this.PositionType = PositionType;
	this.Html.style.position = this.PositionType;
}

Gwt.Gui.Frame.prototype.SetOverflow = function (Overflow)
{
	this.Overflow = Overflow;
	this.Html.style.overflow = this.Overflow;
}

Gwt.Gui.Frame.prototype.SetOpacity = function (Opacity)
{
	this.Opacity = Opacity;
	this.Html.style.opacity = this.Opacity;
}

Gwt.Gui.Frame.prototype.SetTextShadow = function (Offsx, Offsy, Blur, Color)
{
	this.TextShadowOffsx = Offsx;
	this.TextShadowOffsy = Offsy;
	this.TextShadowBlur = Blur;
	this.TextShadowColor = Color;
	this.Html.style.textShadow = this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetZIndex = function (ZIndex)
{
	this.ZIndex = ZIndex;
	this.Html.style.zIndex = this.ZIndex;
}


Gwt.Gui.Frame.prototype.SetSelectable = function (UserSelect)
{
	this.UserSelect = UserSelect;
	this.Html.style.userSelect = this.UserSelect;
}

Gwt.Gui.Frame.prototype.SetValign = function (Valign)
{
	this.Valign = Valign;
	this.Html.style.verticalAlign = this.Valign;
}

Gwt.Gui.Frame.prototype.SetVisibility = function (Value)
{
	this.Visibility = Value;
	this.Html.style.visibility = this.Visibility;
}

Gwt.Gui.Frame.prototype.SetExpand = function (Expand)
{
	this.Expand = Expand;
}

Gwt.Gui.Frame.prototype.IsExpand = function ()
{
	return this.Expand;
}
//Ends Gwt::Gui::Frame Class
//Class Gwt::Gui::Window
Gwt.Gui.Window = function ()
{
	Gwt.Gui.Frame.call (this);
	
	this.InitWindow ();
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype.FinalizeWindow = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Window.prototype.InitWindow = function ()
{
	this.SetClassName ("Gwt_Gui_Window");
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBoxShadow (0, 0, 10, 2, new Gwt.Gui.Contrib.Color (102,205,102,0.3));
	this.SetBorder (0);
	var Color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.White);
	Color.SetAlpha (0.5);
	this.SetBorderColor (Color);
	this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetBorder (1);
	this.SetBorderRadius (5);
	this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	this.SetSize (256, 256);
	this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	var Left = (Math.random () * Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth ();
	var Top = (Math.random () * Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight ();
	if (Left < 0) Left=0;
	if (Top < 0) Top=0;
	this.SetPosition (Top, Left);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
	var Border_ = Border*2;
	this.layout.SetWidth (this.GetWidth ()-Border_);
	this.layout.SetHeight (this.GetHeight ()-Border_);
	var left = (this.GetWidth ()-(this.GetWidth ()-Border_))/2;
	var top = ((this.GetHeight ()-(this.GetHeight ()-Border_))/2);
	this.layout.SetPosition (left, top);
}

Gwt.Gui.Window.prototype.Open = function ()
{
	desktop.show (this);
}

Gwt.Gui.Window.prototype.Close = function ()
{
	this.FinalizeWindow ();
}
//Ends Gwt::Gui::Window
//##################################################################################################
//Class Gwt::Gui::Dialog
Gwt.Gui.Dialog = function (Parent)
{
    Gwt.Gui.Frame.call (this);
    
    this.DialogBox = null;
    
    this.InitDialog (Parent);
}

Gwt.Gui.Dialog.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Dialog.prototype.constructor = Gwt.Gui.Dialog;

Gwt.Gui.Dialog.prototype.InitDialog = function (Parent)
{
    this.SetClassName ("Gwt_Gui_Dialog");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetParent (Parent);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Close.bind (this));
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetPosition (Gwt.Gui.WIN_POS_TOP, Gwt.Gui.WIN_POS_LEFT);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray);
    color.SetAlpha (0.75);
    this.SetBackgroundColor (color);
    this.SetZIndex (900000);
    
    this.DialogBox = new Gwt.Gui.Frame ();
    this.DialogBox.SetSize (256, 256);
    var color2 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray);
    color2.SetAlpha (0.75);
    this.DialogBox.SetBackgroundColor (color2);
    var colorBorde = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorBorde.SetAlpha (0.33);
    this.DialogBox.SetBorderColor (colorBorde);
    this.DialogBox.SetBorder (1);
    this.DialogBox.SetBorderRadius (5);
    this.DialogBox.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DialogBox.SetZIndex (1000000);
    
    this.Add (this.DialogBox);
}

Gwt.Gui.Dialog.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Dialog.prototype.Close = function ()
{
    this.DialogBox.FinalizeFrame ();
    this.DialogBox = null;
    this.FinalizeFrame ();
}
//Ends Gwt::Gui::Dialog
//##################################################################################################
//##################################################################################################
//Class Gwt::Gui::Button
Gwt.Gui.Button = function (Image, Text)
{
	Gwt.Gui.Frame.call (this);
	
	this.Image = null;
	this.Text = null;
	
	this.InitButton (Image, Text);
}

Gwt.Gui.Button.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Button.prototype.constructor = Gwt.Gui.Button;

Gwt.Gui.Button.prototype.FinalizeButton = function ()
{
	this.Image = null;
	this.Text = null;
	this.FinalizeFrame ();
}

Gwt.Gui.Button.prototype.InitButton = function (Image, Text)
{
	this.SetClassName ("Gwt_Gui_Button");
	this.SetExpand (false);
	this.SetBorder (1);
	this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
	var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	color.SetAlpha (0.3);
	this.SetBorderColor (color);
	this.SetBorderRadius (5);
	this.SetMargin (0);
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseMove, this.MouseMove.bind(this));
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseDown, this.MouseDown.bind(this));
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseUp, this.MouseMove.bind(this));
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
	
	this.Image = new Gwt.Gui.Image (Image);
	this.Image.SetSize (24, 24);
	this.Image.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	
	this.Text = new Gwt.Gui.StaticText (Text);
	this.Text.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	this.Text.SetValign (Gwt.Gui.Contrib.Valign.Top);
	this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
	
	this.Add (this.Image);
	this.Add (this.Text);
}

Gwt.Gui.Button.prototype.MouseMove = function ()
{
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.1));
}

Gwt.Gui.Button.prototype.MouseDown = function ()
{
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.2));
}

Gwt.Gui.Button.prototype.MouseOut = function ()
{
	this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
}

Gwt.Gui.Button.prototype.SetText = function (Text)
{
	//console.log (this.Image);
	this.Text.SetText (Text);
	this.Text.SetWidth (this.GetWidth ()*0.7);
}

Gwt.Gui.Button.prototype.SetImage = function (Src)
{
	this.Image.SetImage (Src);
}

Gwt.Gui.Button.prototype.SetFontSize = function (FontSize)
{
	this.Text.SetFontSize (FontSize);
	this.SetSize (this.Image.GetWidth()+this.Text.GetWidth(), 24);
}

//Ends Gwt::Gui::Button
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::Entry
Gwt.Gui.Entry  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitEntry (Placeholder);
}

Gwt.Gui.Entry.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Entry.prototype.constructor = Gwt.Gui.Entry;

Gwt.Gui.Entry.prototype.FinalizeEntry = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Entry.prototype.InitEntry = function (Placeholder)
{
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "text");
	this.SetClassName ("Gwt_Gui_Entry");
	this.SetExpand (true);
	this.SetPadding (3);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Entry text");
	this.SetFontSize (11);
}

Gwt.Gui.Entry.prototype.SetPlaceholder = function (Text)
{
	this.Html.placeholder = Text;
}

Gwt.Gui.Entry.prototype.ChangeToPassword = function ()
{
	this.Html.type = "password";
}

Gwt.Gui.Entry.prototype.ChangeToText = function ()
{
	this.Html.type = "text";
}

Gwt.Gui.Entry.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
	this.Html.value = Text;
}

Gwt.Gui.Entry.prototype.SetMaxLength = function (MaxLength)
{	
	this.Html.maxLength = MaxLength;
}

Gwt.Gui.Entry.prototype.Reset = function ()
{
	this.SetText ("");
}
//Ends Gwt::Gui::Entry
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
	this.Data = null;
	
	this.InitFile ();
}

Gwt.Gui.File.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.File.prototype.constructor = Gwt.Gui.File;

Gwt.Gui.File.prototype.FinalizeFile = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.File.prototype.InitFile = function ()
{
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "file");
	this.Html.removeAttribute ("multiple");
	this.SetOpacity (1);
	this.SetWidth (180);
	this.SetClassName ("Gwt_Gui_Text");
	
	this.AddEvent (Gwt.Gui.Event.Form.Change, this.UpdateInfo.bind (this));
}

Gwt.Gui.File.prototype.UpdateInfo = function ()
{
	this.Data = this.Html.files[0];
	this.DataSize = this.Data.size;
	this.FileName = this.Data.name;
	this.MimeType = this.Data.type;
}

Gwt.Gui.File.prototype.GetData = function ()
{
	return this.Data;
}

Gwt.Gui.File.prototype.GetDataSize = function ()
{
	return this.DataSize;
}

Gwt.Gui.File.prototype.GetFileName = function ()
{
	return this.FileName;
}

Gwt.Gui.File.prototype.GetMimeType = function ()
{
	return this.MimeType;
}

Gwt.Gui.File.prototype.Reset = function ()
{
	this.Data = null;
	this.DataSize = null;
	this.FileName = null;
	this.MimeType = null;
}

//Ends Gwt::Gui::File
//##################################################################################################
//##############################################################################################
//Class Gwt::Gui::Text
Gwt.Gui.Text  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
	this.InitText ();
}

Gwt.Gui.Text.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Text.prototype.constructor = Gwt.Gui.Text;

Gwt.Gui.Text.prototype.FinalizeText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Text.prototype.InitText = function ()
{
	this.SetHtml ("textarea");
	this.SetClassName ("Gwt_Gui_Text");
	this.SetExpand (true);
	this.SetPadding (3);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Text multi-line");
	this.SetFontSize (10);
	this.SetHeight (96);
	this.SetAlign ();
	this.SetMaxLength (185);
}

Gwt.Gui.Text.prototype.SetPlaceholder = function (Text)
{
	this.html.Placeholder = Text;
}

Gwt.Gui.Text.prototype.ChangeToPassword = function ()
{
	this.html.type = "password";
}

Gwt.Gui.Text.prototype.ChangeToText = function ()
{
	this.html.type = "text";
}

Gwt.Gui.Text.prototype.GetText = function ()
{
	return this.html.value;
}

Gwt.Gui.Text.prototype.SetText = function (Text)
{
	this.html.value = text;
}

Gwt.Gui.Text.prototype.SetMaxLength = function (Value)
{	
	this.html.maxLength = value;
}

Gwt.Gui.Text.prototype.Reset = function ()
{
	this.SetText ("");
}

Gwt.Gui.Text.prototype.SetAlign = function (Value)
{
    switch (Value)
    {
        case Gwt.Gui.ALIGN_LEFT:
            this.align = Gwt.Gui.ALIGN_LEFT;
            this.html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Left;
            break;
        
        case Gwt.Gui.ALIGN_CENTER:
            this.align = Gwt.Gui.ALIGN_CENTER;
            this.html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Center;
            break;
        
        case Gwt.Gui.ALIGN_RIGHT:
            this.align = Gwt.Gui.ALIGN_RIGHT;
            this.html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Right;
            break;
        
        default:
            this.html.style.textAlign = Gwt.Gui.Contrib.TextAlign.Justify;
            break;
    }
}
//Ends Gwt::Gui::Text
//##################################################################################################
//Class Gwt::Gui::HBox
Gwt.Gui.HBox = function (Margin)
{
        Gwt.Gui.Frame.call (this);
	
        this.Childs = null;
        this.MarginElements = null;
	
        this.InitHbox (Margin);
}

Gwt.Gui.HBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.HBox.prototype.constructor = Gwt.Gui.HBox

Gwt.Gui.HBox.prototype.FinalizeHbox = function ()
{
        this.Childs = null;
        this.MarginElements = null;
	
        this.FinalizeFrame ();
}

Gwt.Gui.HBox.prototype.InitHbox = function (Margin)
{
        this.SetClassName ("Gwt_Gui_HBox");
        this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
	
        this.Childs = [];
        this.MarginElements = typeof(Margin) == "undefined" ? 12 : Margin;
}

Gwt.Gui.HBox.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.HBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.HBox.prototype.Add = function (Element)
{
	this.GetChilds ().push (Element);
        this.GetHtml ().appendChild (Element.GetHtml ());
        
        if (Element.GetClassName () == "Gwt_Gui_VBox")
        {
                var vboxs = [];
                for (var i = 0; i < this.GetChilds ().length; i++)
                {
                        if (this.GetChilds ()[i].GetClassName () == "Gwt_Gui_VBox")
                        {
                                vboxs.push (this.GetChilds ()[i]);
                        }
                }

                for (var j = 0; j < vboxs.length; j++)
                {
                        vboxs[j].SetWidth (this.GetWidth ()/vboxs.length);
                        vboxs[j].SetHeight (this.GetHeight ());
                }
        }
	else
	{
		Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
		if (Element.GetHtml () == this.GetHtml ().firstChild)
		{
			Element.SetMargin (0);
		}
		else if (Element.GetHtml () == this.GetHtml ().lastChild)
		{
			Element.SetMarginLeft (this.GetMarginElements ());
		}
	}
}


//Ends Gwt::Gui::HBox
//##################################################################################################
//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Image = function (Image)
{
	Gwt.Gui.Frame.call (this);
	
	this.InitImage (Image);
}

Gwt.Gui.Image.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Image.prototype.constructor = Gwt.Gui.Image;

Gwt.Gui.Image.prototype.FinalizeImage = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Image.prototype.InitImage = function (Image)
{
	this.SetHtml ("img");
	this.SetClassName ("Gwt_Gui_Image");
	
	this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
	this.SetImage (Image || Gwt.Core.Contrib.Host+Gwt.Core.Contrib.Images+"default_image.svg");
	this.SetSelectable ("none");
}

Gwt.Gui.Image.prototype.SetImage = function (Image)
{
	this.Html.src = Image;
}
//Ends Gwt::Gui::Image
//##################################################################################################
//#########################################################################################################################################
//# class Gwt::Gui::Item
Gwt.Gui.Item = function (Text, Value)
{
	Gwt.Gui.Frame.call (this);
	
	this.Text = null;
	this.Value = null;
	
	this.InitItem (Text, Value);
}

Gwt.Gui.Item.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Item.prototype.constructor = Gwt.Gui.Item;

Gwt.Gui.Item.prototype.FinalizeItem = function ()
{
	this.Text = null;
	this.Value = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.Item.prototype.InitItem = function (Text, Value)
{
	this.SetClassName ("Gwt_Gui_Item");
	
	this.Text = new Gwt.Gui.StaticText (Text);
	this.Value = Value;
	
	this.SetHeight (24);
	var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	background_color.SetAlpha (0);
	this.SetBorderColor (background_color);
	this.SetBorder (0);
	this.SetBackgroundColor (background_color);
	this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
	this.SetBorderRadius (0);
	
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseOver.bind (this));
	this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind (this));
	
	this.Add (this.Text);
}

Gwt.Gui.Item.prototype.GetValue = function ()
{
	return this.Value;
}

Gwt.Gui.Item.prototype.MouseOver = function (event)
{
	var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	background_color.SetAlpha (0.25);
	this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.MouseOut = function (event)
{
	var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	background_color.SetAlpha (0);
	this.SetBackgroundColor (background_color);
}

Gwt.Gui.Item.prototype.Reset = function ()
{
	var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
	background_color.SetAlpha (0);
	this.SetBackgroundColor (background_color);
}
//Ends Gwt::Gui::Item
//####################################################################################################################################




//# class Gwt::Gui::SelectDialogBox
//###################################################################################################
Gwt.Gui.SelectDialogBox = function ()
{
	Gwt.Gui.Dialog.call (this);
	this.items = null;
	this.LayoutDialog = null;
	this.Container = null;
	
	this.InitSelectDialogBox ();
}

Gwt.Gui.SelectDialogBox.prototype = new Gwt.Gui.Dialog ();
Gwt.Gui.SelectDialogBox.prototype.constructor = Gwt.Gui.SelectDialogBox;

Gwt.Gui.SelectDialogBox.prototype.FinalizeSelectDialogBox = function ()
{
	this.LayoutDialog = null;
	this.Container = null;
	this.items = null;
	this.FinalizeDialog ();
}

Gwt.Gui.SelectDialogBox.prototype.InitSelectDialogBox = function ()
{
	this.SetClassName ("Gwt_Gui_Select_dialog_box");
	this.LayoutDialog = new Gwt.Gui.VBox (this.DialogBox, 0);
	this.LayoutDialog.SetSize (this.DialogBox.GetWidth ()*0.95, this.DialogBox.GetHeight ()*0.95);
	var top = (this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;
	var left = (this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;
	this.LayoutDialog.SetPosition (top, left);
	
	this.Container = new Gwt.Gui.VBox (this.DialogBox, 3);
	this.Container.AddEvent (Gwt.Gui.Event.Mouse.Wheel, this.EventScroll.bind(this));
	this.Container.SetSize (this.LayoutDialog.GetWidth (), 0);
	
	this.DialogBox.Add (this.LayoutDialog);
	this.LayoutDialog.Add (this.Container);
}

Gwt.Gui.SelectDialogBox.prototype.AddItem = function (item)
{
	item.SetWidth (this.Container.GetWidth ());
	this.Container.SetHeight (this.Container.GetHeight () + 27);
	this.Container.Add (item);
	this.items++;
}

Gwt.Gui.SelectDialogBox.prototype.EventScroll = function (event)
{
	var deltaY = event.deltaY;
	
	var posTop = this.Container.GetPositionTop();
	var posLeft = this.Container.GetPositionLeft();
	var isScroll = this.Container.GetHeight () > this.LayoutDialog.GetHeight ();
	var itemsPlus = this.items-9;
	var maxScroll = 0;
	if (itemsPlus > 0)
	{
		maxScroll = -27*itemsPlus;
	}
	
	if (deltaY < 0 && isScroll && posTop < 0)
	{
		posTop += 27;
	}
	else if (deltaY > 0 && isScroll && posTop > maxScroll)
	{
		posTop -= 27;
	}
	else
	{
		posTop = posTop;
	}
	
	this.Container.SetPosition (posTop, posLeft);
}

//Ends Gwt::Gui::SelectboxDialogBox
//##################################################################################################




//###################################################################################################
//# class Gwt::Gui::SelectBox
Gwt.Gui.SelectBox = function (Placeholder, options)
{
	Gwt.Gui.Frame.call (this);
	
	this.StaticText = null;
	this.SelectDialogBox = null;
	this.Placeholder = null;
	this.Options = null;
	this.Text=null;
	this.Value=null;
	
	this.InitSelectBox (Placeholder, options);
}


Gwt.Gui.SelectBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBox.prototype.constructor = Gwt.Gui.SelectBox;


Gwt.Gui.SelectBox.prototype.FinalizeSelectBox = function ()
{
	this.StaticText = null;
	this.SelectDialogBox = null;
	this.Placeholder = null;
	this.Options = null;
	
	this.FinalizeFrame ();
}


Gwt.Gui.SelectBox.prototype.InitSelectBox = function (Placeholder, options)
{
	this.SetClassName ("Gwt_Gui_Select_box");
	this.SetExpand (true);
	this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ShowDialog.bind(this));
	this.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.ShowDialog.bind(this));
	this.Placeholder = Placeholder;
	this.StaticText = new Gwt.Gui.StaticText (this.Placeholder);
	
	this.Add (this.StaticText);
	
	this.Options = [];
	this.Options [0] = new Gwt.Gui.Item (this.Placeholder, "");
	this.Options [0].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValue.bind(this, Event, this.Placeholder, ""));
	this.Options [0].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
	this.Options [0].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.Options [0].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
	
	for (var i = 0; i < options.length; i++)
	{
		this.Options [i+1] = new Gwt.Gui.Item (options[i].text, options[i].value);
		this.Options [i+1].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValue.bind(this, Event, options[i].text, options[i].value));
	}
}

Gwt.Gui.SelectBox.prototype.ShowDialog = function (event)
{
	//event.stopPropagation ();
	if (event.type == Gwt.Gui.Event.Keyboard.KeyPress)
	{
        if (event.keyCode == Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
		{
			this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
			for (var i = 0; i < this.Options.length; i++)
			{
				this.Options [i].Reset();
				this.SelectDialogBox.AddItem (this.Options [i]);
			}
			
			this.SelectDialogBox.Open ();
        }
    }
	if (event.type == Gwt.Gui.Event.Mouse.Click)
	{
		this.SelectDialogBox = new Gwt.Gui.SelectDialogBox ();
		for (var j = 0; j < this.Options.length; j++)
		{
			this.Options [j].Reset();
			this.SelectDialogBox.AddItem (this.Options [j]);
		}
			
		this.SelectDialogBox.Open ();
    }
}

Gwt.Gui.SelectBox.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.StaticText.SetText (this.Text);
}

Gwt.Gui.SelectBox.prototype.SetValue = function (Event, Text, Value)
{
	this.SetText(Text);
	this.Value=Value;
	
	for (var i = 0; i < this.Options.length; i++)
	{
		if(this.Options [i].GetValue () == this.Value)
		{
			this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
			this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
			this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
		}
		else
		{
			this.Options [i].SetBackgroundImage ("");
		}
	}
}

//Ends Gwt::Gui::Selectbox
//##################################################################################################
//################################################################################################
//Class Gwt::Gui::Static_Text
Gwt.Gui.StaticText = function (Text)
{
	Gwt.Gui.Frame.call (this);
	
	this.Text = null;
	this.InitStaticText (Text);
}

Gwt.Gui.StaticText.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.StaticText.prototype.constructor = Gwt.Gui.StaticText;

Gwt.Gui.StaticText.prototype.FinalizeStaticText = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.StaticText.prototype.InitStaticText = function (Text)
{
	this.SetClassName ("Gwt_Gui_Static_Text");
	this.Text = Text || "Default Text";
	this.SetText (this.Text);
	this.SetFontSize (11);
	this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
	//this.SetTextShadow (0, 0, 1, new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray));
	this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
	this.SetSelectable (Gwt.Gui.Contrib.UserSelect.None);
	this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
}

Gwt.Gui.StaticText.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.Html.textContent = this.Text;
}

Gwt.Gui.StaticText.prototype.TextAlign = function (Value)
{
	if (Value == "left" || Value == "center" || Value == "right" || Value == "justify")
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		console.log ("Align invalid");
	}
}

Gwt.Gui.StaticText.prototype.GetText = function ()
{
	return this.Html.value;
}

Gwt.Gui.StaticText.prototype.GetLength = function()
{
    return this.Text.length;
}

Gwt.Gui.StaticText.prototype.Reset = function ()
{
	this.SetText ("Default Text");
}
//Ends Gwt::Gui::Static_Text
//##################################################################################################
//###############################################################################################################################################
//Class Gwt::Gui::VBox
Gwt.Gui.VBox = function (Parent, Margin)
{
	Gwt.Gui.Frame.call (this);
	
	this.Childs = null;
	this.MarginElements = null;
	this.Alignment = null;
	
	this.init_vbox (Margin);
}

Gwt.Gui.VBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.VBox.prototype.constructor = Gwt.Gui.VBox;

Gwt.Gui.VBox.prototype.finalize_vbox = function ()
{
	this.Childs = null;
	this.MarginElements = null;
	this.Alignment = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.VBox.prototype.init_vbox = function (Margin)
{
	this.SetClassName ("Gwt_Gui_VBox");
	this.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
	this.SetAlignment (Gwt.Gui.ALIGN_LEFT);
	
	this.Childs = [];
	this.MarginElements = typeof(Margin) == "undefined" ? 12 : Margin;
}

Gwt.Gui.VBox.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.VBox.prototype.GetMarginElements = function ()
{
	return this.MarginElements;
}

Gwt.Gui.VBox.prototype.Add = function (Element)
{
	this.GetChilds ().push (Element);
        this.GetHtml ().appendChild (Element.GetHtml ());
	
	if (Element.GetClassName () == "Gwt_Gui_HBox")
	{
		var HBoxs = [];
		for (var i = 0; i < this.GetChilds ().length; i++)
		{
			if (this.GetChilds ()[i].GetClassName () == "Gwt_Gui_HBox")
			{
				HBoxs.push (this.GetChilds ()[i]);
			}
		}
	
		for (var j = 0; j < HBoxs.length; j++)
		{
			HBoxs[j].SetWidth (this.GetWidth ());
			HBoxs[j].SetHeight (this.GetHeight ()/HBoxs.length);
		}
	}
	else
	{
		Element.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
		
		if (Element.GetHtml () == this.GetHtml ().firstChild)
		{
			Element.SetMargin (0);
		}
		else if (Element.GetHtml () == this.GetHtml ().lastChild)
		{
			Element.SetMarginTop (this.GetMarginElements ());
		}
		
		if (Element.IsExpand ()) Element.SetWidth(this.GetWidth()*0.99);
		
		if (!Element.IsExpand())
		{
		    switch (this.GetAlignment ())
		    {
		        case Gwt.Gui.ALIGN_LEFT:
					Element.SetMarginLeft (0);
					break;
		   
		        case Gwt.Gui.ALIGN_CENTER:
					Element.SetMarginLeft ((this.GetWidth() - Element.GetWidth())/2);
					break;
		
		        case Gwt.Gui.ALIGN_RIGHT:
					Element.SetMarginLeft (this.GetWidth() - Element.GetWidth());
					break;
		
		       default:
					console.log("imposible set alignment in vbox.");
					break;
		    }
		}
	}
}

Gwt.Gui.VBox.prototype.SetAlignment = function(Alignment)
{
    switch(Alignment)
    {
	case Gwt.Gui.ALIGN_CENTER:
	    this.Alignment = Gwt.Gui.ALIGN_CENTER;
	    break;
	
	case Gwt.Gui.ALIGN_LEFT:
	    this.Alignment = Gwt.Gui.ALIGN_LEFT;
	    break;
	
	case Gwt.Gui.ALIGN_RIGHT:
	    this.Alignment = Gwt.Gui.ALIGN_RIGHT;
	    break;
	
	default:
	    console.log("Alignment not valid in vbox.");
	    break;
    }
}

Gwt.Gui.VBox.prototype.GetAlignment = function()
{
	return this.Alignment;
}
//Ends Gwt::Gui::VBox
//##################################################################################################
//Class Gwt::Gui::Slider
Gwt.Gui.Slider = function (Slots)
{
    Gwt.Gui.Frame.call (this);
    
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.InitSlider (Slots);
}

Gwt.Gui.Slider.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Slider.prototype.constructor = Gwt.Gui.Slider;

Gwt.Gui.Slider.prototype.FinalizeSlider = function (Slots)
{
    this.Slots = null;
    this.Panel = null;
    this.ArrowLeft = null;
    this.ArrowRight = null;
    this.Viewer = null;
    this.Slide = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Slider.prototype.InitSlider = function (Slots)
{
    this.SetClassName ("Gwt_Gui_Slider");
    
    this.Slots = new Array (typeof(Slots) == "undefined"? 1 : Slots);
    
    this.Panel = new Gwt.Gui.Frame ();
    
    this.ArrowLeft = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"arrow-left.svg", "");
    this.ArrowLeft.SetWidth (24);
    this.ArrowLeft.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideRight.bind (this));
    
    this.ArrowRight = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"arrow-right.svg", "");
    this.ArrowRight.SetWidth (24);
    this.ArrowRight.AddEvent (Gwt.Gui.Event.Mouse.Click, this.SlideLeft.bind (this));
    
    this.Viewer = new Gwt.Gui.Frame ();
    
    this.Slide = new Gwt.Gui.HBox ();
    
    this._Add (this.Viewer);
    this._Add (this.Panel);
}

Gwt.Gui.Slider.prototype.GetSlots = function ()
{
    return this.Slots;
}

Gwt.Gui.Slider.prototype._Add = function (Widget)
{
    Widget.Parent = this;
	this.Add (Widget);
}

Gwt.Gui.Slider.prototype.Setup = function ()
{
    this.Panel.SetSize (this.GetWidth (), 28);
    this.Viewer.SetSize (this.GetWidth (), (this.GetHeight () - 28));
    
    var Hbox = new Gwt.Gui.HBox ();
    var Col1 = new Gwt.Gui.VBox ();
    var Col2 = new Gwt.Gui.VBox ();
    
    Hbox.SetSize (this.Panel.GetWidth(), 28);
    Col1.SetHeight (28);
    Col2.SetHeight (28);
    Col2.SetAlignment (Gwt.Gui.ALIGN_RIGHT);
    
    Hbox.Add (Col1);
    Hbox.Add (Col2);
    
    this.Panel.Add (Hbox);
    Col1.Add (this.ArrowLeft);
    Col2.Add (this.ArrowRight);
    
    this.Slide.SetSize (this.Viewer.GetWidth ()*this.GetSlots ().length, this.Viewer.GetHeight ());
 
    this.Viewer.Add (this.Slide);
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       var Tmp = new Gwt.Gui.VBox ();
       this.GetSlots ()[i] = Tmp;
    }
    
    for (var i=0; i < this.GetSlots ().length; i++)
    {
       this.Slide.Add (this.GetSlots ()[i]);
    }
}

Gwt.Gui.Slider.prototype.SlideLeft = function ()
{
     if (-this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth() )
     {
        this.Slide.SetPosition (0, this.Slide.GetPositionLeft () - this.Viewer.GetWidth ());
     }
}

Gwt.Gui.Slider.prototype.SlideRight = function ()
{
     if (this.Slide.GetPositionLeft() < 0 && this.Slide.GetPositionLeft () < (this.GetSlots ().length-1)*this.Viewer.GetWidth())
     {
        this.Slide.SetPosition (0, this.Slide.GetPositionLeft () + this.Viewer.GetWidth ());
     }
}

Gwt.Gui.Slider.prototype.AddSlotWidget = function (Slot, Widget)
{
    this.GetSlots ()[Slot].Add (Widget);
}

//Ends Gwt::Gui::Slider
//##################################################################################################

//##################################################################################################
//Class Gwt::Gui::Desktop
Gwt.Gui.Clock = function ()
{
	Gwt.Gui.Frame.call (this);
	
	this.resource = null;
	this.seconds = null;
	this.minutes = null;
	this.hours = null;
	this.seconds_bar = null;
	this.minutes_bar = null;
	this.hours_bar = null;
	this.center = null;
	this.seconds_interval = null;
	
	this.InitClock ();
}

Gwt.Gui.Clock.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Clock.prototype.constructor = Gwt.Gui.Clock;

Gwt.Gui.Clock.prototype.FinalizeClock = function ()
{
	this.resource = null;
	this.seconds = null;
	this.minutes = null;
	this.hours = null;
	this.seconds_bar = null;
	this.minutes_bar = null;
	this.hours_bar = null;
	this.center = null;
	this.seconds_interval = null;
	
	this.FinalizeFrame ();
}

Gwt.Gui.Clock.prototype.InitClock = function ()
{
	this.SetClassName ("Gwt_Gui_Clock");
	this.SetSize (200, 200);
	
	this.resource = new XMLHttpRequest ();
	this.resource.open ("GET", Gwt.Core.Contrib.Images+"clock.svg", true);
	this.resource.overrideMimeType("image/svg+xml");
	this.resource.onreadystatechange = this.Ready.bind(this);
	this.resource.send ("");
}

Gwt.Gui.Clock.prototype.Ready = function ()
{
	if (this.resource.readyState == 4 && this.resource.status == 200)
	{
		this.Html.appendChild (this.resource.responseXML.documentElement);
		var date = new Date ();
		this.seconds = date.getSeconds ();
		this.minutes = date.getMinutes ();
		this.hours = date.getHours ();
	
		this.seconds_bar = this.Html.firstChild.getElementById("seconds");
		this.minutes_bar = this.Html.firstChild.getElementById("minutes");
		this.hours_bar = this.Html.firstChild.getElementById("hours");
	
		this.center = {'x': this.Html.firstChild.getAttribute ("width")/2, 'y': this.Html.firstChild.getAttribute ("height")/2};
	
		this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
		this.seconds_interval = setInterval (this.UpdateSeconds.bind(this), 1000);
	
		this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
		this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	}
}

Gwt.Gui.Clock.prototype.UpdateSeconds = function ()
{
	this.seconds += 1;
	this.seconds_bar.setAttribute ("transform", "rotate("+(this.seconds*6)+", "+this.center.x+", "+this.center.y+")");
	
	if(this.seconds == 60)
	{
		this.seconds = 0;
		this.UpdateMinutes ();
	}
}

Gwt.Gui.Clock.prototype.UpdateMinutes = function ()
{
	this.minutes += 1;
	this.minutes_bar.setAttribute ("transform", "rotate("+(this.minutes*6)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.minutes == 60)
	{
		this.minutes = 0;
		this.UpdateHours ();
	}
}

Gwt.Gui.Clock.prototype.UpdateHours = function ()
{
	this.hours += 1;	
	this.hours_bar.setAttribute ("transform", "rotate("+(this.hours*30)+", "+this.center.x+", "+this.center.y+")");
	
	if (this.hours == 24)
	{
		this.hours = 0;
	}
}
//Ends Gwt::Gui::Clock
//##################################################################################################
//##################################################################################################
//Class Gwt::Gui::Button_sv_up_dl
Gwt.Gui.ButtonSvUpDl = function ()
{
    Gwt.Gui.Button.call (this, Gwt.Core.Contrib.Images+"appbar.cabinet.in.svg", "Guardar");
    
    this.Update = null;
    
    this.InitButtonSvUpDl ();
}

Gwt.Gui.ButtonSvUpDl.prototype = new Gwt.Gui.Button ();
Gwt.Gui.ButtonSvUpDl.prototype.constructor = Gwt.Gui.ButtonSvUpDl;

Gwt.Gui.ButtonSvUpDl.prototype.FinalizeButtonSvUpDl = function ()
{
    this.Update = null;
    this.FinalizeButton ();
}

Gwt.Gui.ButtonSvUpDl.prototype.InitButtonSvUpDl = function ()
{
    this.SetWidth (90);
    this.SetText ("Guardar");
    this.AddEvent (Gwt.Gui.Event.Mouse.Mousemove, this.CtrlSvUpDl.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.Mouseout, this.CtrlReset.bind (this));
    
    this.Update = false;
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlSvUpDl = function (event)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else if (this.Update && !event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else if (this.Update && event.ctrlKey)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/application-exit.svg");
    	this.SetWidth (90);
        this.SetText ("Eliminar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.CtrlReset = function (enable_disable)
{
    if (!this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
}

Gwt.Gui.ButtonSvUpDl.prototype.set_update = function (enable_disable)
{
    this.Update = enable_disable;
    
    if (this.Update)
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/dialog-ok-apply.svg");
        this.SetWidth (100);
        this.SetText ("Actualizar");
    }
    else
    {
        this.SetImage (Gwt.Core.Contrib.Images+"icons/list-add.svg");
        this.SetWidth (85);
        this.SetText ("Guardar");
    }
}
//Ends Gwt::Gui::Button_sv_up_dl
//##################################################################################################

