#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>

#ifndef _ROOT_
#define _ROOT_
int	home (struct http_request *);

//function to validate params
int	v_params_enabled (struct http_request *, char *);

//users
int user_insert (struct http_request*);
int user_update (struct http_request*);
int user_delete (struct http_request*);

//groups
int group_select (struct http_request*);
int group_insert (struct http_request*);
int group_update (struct http_request*);
int group_delete (struct http_request*);

#endif
