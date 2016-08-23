#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>

#ifndef _ROOT_
#define _ROOT_
int	home (struct http_request *);

//function to validate params
int	v_params_enabled (struct http_request *, char *);

//users
int insert_user (struct http_request*);
//int update_user (struct http_request*);
//int delete_user (struct http_request*);

//groups
//int select_group (struct http_request*);
//int insert_group (struct http_request*);
//int update_group (struct http_request*);
//int delete_group (struct http_request*);

#endif
