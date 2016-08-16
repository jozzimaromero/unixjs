#include <kore/kore.h>
#include <kore/http.h>
#include <zdb/zdb.h>

#ifndef _DATABASE_
#define _DATABASE_
static URL_T url;
static ConnectionPool_T pool;

//function to open and close pools in database
int open_pool (void);
int close_pool (void);
int test_pool (struct http_request *);

Connection_T get_connection (void);
#endif
