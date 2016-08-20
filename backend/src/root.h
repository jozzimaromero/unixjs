#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>

#ifndef _ROOT_
#define _ROOT_
int	home (struct http_request *);

//function to validate params
int	v_params_enabled (struct http_request *, char *);

#endif

