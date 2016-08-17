#include <zdb/zdb.h>
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

int test_pool (struct http_request *req)
{
    if (url != NULL)
    {
        Connection_T conn = ConnectionPool_getConnection (pool);
    
        TRY
        {
            ResultSet_T r = Connection_executeQuery (conn, "SELECT version();");
            while (ResultSet_next (r))
            {
                const char *message = ResultSet_getString (r,1);
                http_response (req, 200, message, strlen(message));
                break;
            }
                
        }
        CATCH (SQLException)
        {
            const char *message = Exception_frame.message;
            http_response (req, 200, message, strlen(message));
        }
        FINALLY
        {
            Connection_close (conn);
        }
        END_TRY;
    
        Connection_close (conn);
    }
    else
    {
       kore_log (LOG_INFO, "imposible to make connection, first open pool");
    }
    
    return (KORE_RESULT_OK);
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
