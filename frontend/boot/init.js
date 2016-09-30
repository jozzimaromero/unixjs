window.addEventListener("load", init);

function init (event)
{
	desktop.open();
	gusers.open();
	
	/*if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
		session_env = null;
	}
	
	if (sessionStorage.hasOwnProperty ("session"))
	{
		switch (sessionStorage.getItem ("session"))
		{
			case "created":
				login.open ();
				break;
	
			case "block":
				block_session ();
				break;
				
			case "active":
				start_session ();
		}
	}
	else 
	{
		sessionStorage.setItem ("session", "created");
		login.open ();
	}*/
}

function start_up_env (user)
{
	login.close ();
	new Gwt.Core.Request ("/backend/sys/", {'action': "start_up_env", 'username': user}, function (data) {	sessionStorage.setItem ("session", "active"); sessionStorage.setItem ('group', data.response.group); sessionStorage.setItem ("user", data.response.user); start_session();});
}

function start_session (data)
{

	
	lancelot.open ();
	
	document.onmousemove = renueve_session;
	document.onkeypress = renueve_session;
	
	if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
	}
	session_env = setTimeout (block_session, 60000);
}

function block_session ()
{
	sessionStorage.setItem ("session", "block");
	lancelot.close ();
	block.open ();
	if (typeof(session_env) != "undefined")
	{
		clearTimeout (session_env);
	}
	session_env = setTimeout (close_session, 60000);
}

function unlock_session ()
{
	clearTimeout (session_env);
	session_env = null;
	block.close ();
	login.open ();
}

function renueve_session ()
{
	if (sessionStorage.hasOwnProperty ("session"))
	{
		if (sessionStorage.getItem ("session") != "block")
		{
			clearTimeout (session_env);
			session_env = setTimeout (block_session, 60000);
		}
	}
}

function close_session ()
{
	clearTimeout(session_env);
	session_env = null;
	new Gwt.Core.Request ("/backend/auth/", {'action': "logout"}, function (data) {console.log(data);});
	sessionStorage.clear ();
	block.close ();
	login.open ();
}