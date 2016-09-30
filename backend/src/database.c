#include <kore/kore.h>
#include <kore/http.h>
#include <zdb/zdb.h>
#include <json-c/json.h>
#include "database.h"

static URL_T url;
static ConnectionPool_T pool;

//defined function to open and close pools
int open_pool (void)
{
    if (url == NULL)
    {
        url = URL_new ("postgresql://localhost:5432/unixjs?user=unixjs&password=unixjs123456");
        pool = ConnectionPool_new (url);
        ConnectionPool_setReaper (pool, 2);
        ConnectionPool_start (pool);
    }
    else
    {
        kore_log (LOG_INFO, "url opened yet");
    }

    return 0;
}

int close_pool (void)
{
    if (url != NULL)
    {
        int conns =  ConnectionPool_reapConnections(pool);
        kore_log (LOG_INFO, "connections closed: %d", conns);
        ConnectionPool_free (&pool);
        URL_free (&url);
    }
    else
    {
        kore_log (LOG_INFO, "url not opened");
    }

    
    return 0;
}

Connection_T get_connection ()
{
    Connection_T conn;

    if (url != NULL)
    {
        conn = ConnectionPool_getConnection (pool);
    }
    else 
    {
        if (!open_pool ())
        {
            conn = ConnectionPool_getConnection (pool);
        }
        else
        {
            return NULL;
        }
    }
    
    return conn;
}

