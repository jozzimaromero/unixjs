#include <kore/kore.h>
#include <kore/http.h>

#ifndef _SESSION_
#define _SESSION_
//function session management
int	v_session_validate (struct http_request *, char *);
int create_user (struct http_request *);
char *encrypt_password (char *);
#endif
