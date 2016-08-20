#include <kore/kore.h>
#include <kore/http.h>

#ifndef _AUTH_
#define _AUTH_
//function session management
int	v_session_validate (struct http_request *, char *);

//users
int insert_user (struct http_request*);
int update_user (struct http_request*);
int delete_user (struct http_request*);

//groups
int select_group (struct http_request*);
int insert_group (struct http_request*);
int update_group (struct http_request*);
int delete_group (struct http_request*);

//contrib
const char *encrypt_password (const char*);
int check_password (const char*);
#endif
