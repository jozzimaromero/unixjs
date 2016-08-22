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
	AliceBlue: [240,248,255,1],
	AntiqueWhite: [250,235,215,1],
	Aqua: [0,255,255,1],
	AquaMarine: [127,255,212,1],
	Azure : [240,255,255,1],
	Beige: [245,245,220,1],
	Black: [0,0,0,1],
	Blue: [0,0,255,1],
	BlueViolet: [138,43,226,1],
	Brown: [165,42,42,1],
	BurlyWood: [222,184,135,1],
	CadetBlue: [95,158,160,1],
	Chartreuse: [127,255,0,1],
	Chocolate: [210,105,30,1],
	Coral: [255,127,80,1],
	CornFlowerBlue: [100,149,237,1],
	CornSilk: [255,248,220,1],
	Crimson: [220,20,60,1],
	DarkBlue: [0,0,139,1],
	DarkCyan: [0,139,139,1],
	DarkGrey: [169,169,169,1],
	DarkGreen: [0,100,0,1],
	DarkOliveGreen: [85,107,47,1],
	DarkOrchid: [153,50,204,1],
	DarkRed: [139,0,0,1],
	DarkSeaGreen: [143,188,143,1],
	DarkSlateBlue: [72,61,139,1],
	DarkSlateGray : [47,79,79,1],
	DarkTurquoise: [0,206,209,1],
	DeepPink: [255,20,147,1],
	DeepSkyBlue: [0,191,255,1],
	DodgerBlue: [30,144,255,1],
	Fuchsia: [255,0,255,1],
	Gainsboro: [220,220,220,1],
	GhostWhite: [248,248,255,1],
	Gold: [255,215,0,1],
	GoldenRod: [218,165,32,1],
	Green: [0,128,0,1],
	Grey: [128,128,128,1],
	GreenYellow: [173,255,47,1],
	HotPink: [255,105,180,1],
	IndianRed: [205,92,92,1],
	Khaki: [240,230,140,1],
	Lavender: [230,230,250,1],
	LavenderBlush: [255,240,245,1],
	LawnGreen: [124,252,0,1],
	LemonChiffon: [255,250,205,1],
	LightBlue: [173,216,230,1],
	LighCoral: [240,128,128,1],
	LighCyan: [224,255,255,1],
	LighGoldenRodYellow: [250,210,210,1],
	LighGrey: [211,211,211,1],
	LighPink: [255,182,193,1],
	LighSalmon: [255,160,122,1],
	LighSeaGreen: [32,178,170,1],
	LighSkyBlue: [135,206,250,1],
	LighSlateGrey: [119,136,153,1],
	LighSteelBlue: [176,196,222,1],
	LighYellow: [255,255,224,1],
	Lime: [0,255,0,1],
	LimeGreen: [50,205,50,1],
	Linen: [250,240,230,1],
	Magenta: [255,0,255,1],
	Maroon: [128,0,0,1],
	MediumAquaMarine: [102,205,170,1],
	MediumBlue: [0,0,205,1],
	MediumOrchid: [186,85,211,1],
	MediumPurple: [147,112,219,1],
	MediumSeaGreen: [60,179,113,1],
	MediumSlateBlue: [123,104,238,1],
	MediumSpringGreen: [0,250,154,1],
	MediumTurquoise: [72,209,204,1],
	MediumVioletRed: [199,21,133,1],
	MidnightBlue: [25,25,112,1],
	MintCream: [245,255,250,1],
	MistyRose: [255,225,228,1],
	Moccasin: [255,228,181,1],
	Navy: [0,0,128,1],
	OliveDrab: [107,142,35,1],
	Orange: [255,165,0,1],
	OrangeRed: [255,69,0,1],
	PaleGoldenRod: [232,232,170,1],
	PaleGreen: [152,251,152,1],
	PeachPuff: [255,218,185,1],
	Peru: [205,133,63,1],
	Pink: [255,192,203,1],
	Plum: [221,160,221,1],
	PowderBlue: [176,224,230,1],
	Purple: [128,0,128,1],
	RebeccaPurple: [102,51,153,1],
	Red : [255,0,0,1],
	RosyBrown: [188,143,143,1],
	RoyalBlue: [65,105,225,1],
	Salmon: [250,128,114,1],
	SeaGreen: [46,139,87,1],
	Sienna: [160,82,45,1],
	Silver: [192,192,192,1],
	SkyBlue: [135,206,235,1],
	SlateBlue: [106,90,205,1],
	SlateGrey: [112,128,144,1],
	Snow: [255,250,250,1],
	SpringGreen: [0,255,127,1],
	SteelBlue: [70,130,180,1],
	Tan: [210,180,140,1],
	Teal: [0,128,128,1],
	Thistle: [216,191,216,1],
	Tomato: [255,99,71,1],
	Transparent : [0,0,0,0],
	Violet: [238,130,238,1],
	Wheat: [245,222,179,1],
	White : [255,255,255,1],
	WhiteSmoke: [245,245,245,1],
	Yellow: [255,255,0,1],
	YellowGreen: [154,205,50,1],
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

// Gwt OutLine
Gwt.Gui.Contrib.OutLine =
{
	Dotted: "dotted",
	Dashed: "dashed",
	Solid: "solid",
	Double: "double",
	Groove: "groove",
	Ridge: "ridge",
	Inset: "inset",
	Outset: "outset",
	None: "none",
	Hidden: "hidden"
}
//###########################################################################################################

