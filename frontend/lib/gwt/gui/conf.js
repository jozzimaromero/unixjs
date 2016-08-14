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
	Blue: [0,0,255,1],
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

