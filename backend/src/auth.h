#include <kore/kore.h>
#include <kore/http.h>

#ifndef _AUTH_
#define _AUTH_
//function session management
int	v_session_validate (struct http_request *, char *);
#endif
