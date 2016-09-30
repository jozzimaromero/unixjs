#include <kore/kore.h>
#include <kore/http.h>
#include <zdb/zdb.h>
#include "contrib.h"

#ifndef _DATABASE_
#define _DATABASE_

//function to open and close pools in database
int open_pool (void);
int close_pool (void);
Connection_T get_connection (void);

//sql_state init_database_system (void);
#endif
