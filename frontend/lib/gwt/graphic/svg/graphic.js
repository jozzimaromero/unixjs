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

