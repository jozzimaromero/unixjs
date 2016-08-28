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


sql_state init_database_system ()
{
    const char *init_database_statements[] = {   
        "CREATE TABLE variable"
        "("
            "name VARCHAR(32) UNIQUE NOT NULL,"
            "val_int BIGINT,"
            "val_text VARCHAR(256)"
        ")",
        
        "CREATE TABLE media"
        "("
            "id BIGSERIAL PRIMARY KEY,"
            "name VARCHAR(32) NOT NULL,"
            "type VARCHAR(8) NOT NULL,"
            "UNIQUE (name, type)"
        ")",
        
        "CREATE TABLE auth_user"
        "("
            "id BIGSERIAL PRIMARY KEY,"
            "document VARCHAR(16) NOT NULL,"
            "document_type VARCHAR(8) NOT NULL,"
            "UNIQUE (document, document_type)"
        ")",
        "INSERT INTO auth_user (document, document_type) VALUES ('root', 'xxxxxxxx')",
        
        "CREATE TABLE auth_password"
        "("
            "user_id BIGINT NOT NULL REFERENCES auth_user (id) ON UPDATE CASCADE ON DELETE CASCADE,"
            "password VARCHAR(256) NOT NULL"
        ")",
        
        "CREATE TABLE auth_group"
        "("
            "id BIGSERIAL PRIMARY KEY,"
            "name VARCHAR(32) UNIQUE NOT NULL"
        ")",
        "INSERT INTO auth_group (name) VALUES ('root')",
        "INSERT INTO auth_group (name) VALUES ('user')",
        
        "CREATE TABLE auth_user_group"
        "("
            "user_id BIGINT NOT NULL REFERENCES auth_user (id) ON UPDATE CASCADE ON DELETE CASCADE,"
            "group_id BIGINT NOT NULL REFERENCES auth_group (id) ON UPDATE CASCADE ON DELETE CASCADE,"
            "UNIQUE (user_id, group_id)"
        ")",
    };
    
    int length = sizeof (init_database_statements) / sizeof (init_database_statements[0]);
    
    sql_state s;
    
    Connection_T conn = get_connection ();
        
    if (!Connection_ping (conn))
    {   
        s = new_sql_state (KORE_RESULT_ERROR, "error not database connection");
        return s;
    }
    
    TRY
    {   
        Connection_beginTransaction (conn);
        
        PreparedStatement_T p;
        
        for (int i = 0; i < length; i++)
        {
            p = Connection_prepareStatement (conn, "%s", init_database_statements[i]);
            PreparedStatement_execute (p);
        }

        Connection_commit (conn);    
        s = new_sql_state (KORE_RESULT_OK, "database initialized");
    }
    CATCH (SQLException)
    {    
        Connection_rollback (conn);
        s = new_sql_state (KORE_RESULT_ERROR, Exception_frame.message);
    }
    FINALLY
    {
    }
    END_TRY;
    
    Connection_close (conn);
    return s;
}
