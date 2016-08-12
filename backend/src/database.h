#include <kore/kore.h>
#include <kore/http.h>

#ifndef _DATABASE_
#define _DATABASE_
//function to open and close pools in database
int open_pool (struct http_request *);
int close_pool (struct http_request *);
int test_pool (struct http_request *);
#endif
