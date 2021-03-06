#include <kore/kore.h>
#include <kore/http.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <json-c/json.h>

#include "root.h"
#include "database.h"
#include "contrib.h"

#include "auth_user_row.h"
#include "auth_group_row.h"

//home
int home (struct http_request *req)
{
    //sql_state r = init_database_system ();
    //kore_log (LOG_INFO, "%s", r.msg);
    const char *msg = "hello world!";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}

int v_params_enabled (struct http_request *req, char *param)
{
	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}



//user insert
int user_insert (struct http_request *req)
{
    char                *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object *jobjs = NULL;
    jobjs =  json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_row_t     new_users[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        new_users[i] = new_void_auth_user_row ();
        int ret = json_to_auth_user_row (jobj, &new_users[i]);
        
        json_object_put (jobj);
        jobj = NULL;
        
        if (ret == KORE_RESULT_ERROR)
        {
            http_response_json_msg (req, KORE_RESULT_ERROR, "document or document_type keys not found");
            return (KORE_RESULT_OK);        
        }
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    sql_state state = auth_user_insert (new_users, length);
    
    http_response_json_msg (req, state.result, state.msg);

    return (KORE_RESULT_OK);
}



//user update
int user_update (struct http_request *req)
{
    char                *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_update_t updates[length];
        
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        updates[i].old_user = new_void_auth_user_row ();
        updates[i].new_user = new_void_auth_user_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                strcpy (updates[i].old_user.document, json_object_get_string (val));    
            }
            else if (strcmp (key, "document_type") == 0)
            {
                strcpy (updates[i].old_user.document_type, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document") == 0)
            {
                strcpy (updates[i].new_user.document, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document_type") == 0)
            {
                strcpy (updates[i].new_user.document_type, json_object_get_string (val));
            }
            else
            {
                json_object_put (jobj);
                jobj = NULL;
                
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys document, document_type, new_document, new_document_type, new_password, and password length is 4");       
                return (KORE_RESULT_ERROR);
            }
        }

        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
   
    sql_state state = auth_user_update (updates, length);
    
    http_response_json_msg (req, state.result, state.msg);

    return (KORE_RESULT_OK);
}



//user delete
int user_delete (struct http_request *req)
{    
    char    *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_row_t users[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        users[i] = new_void_auth_user_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                 strcpy (users[i].document, json_object_get_string (val));
            }
            else if (strcmp (key, "document_type") == 0)
            {
                 strcpy (users[i].document_type, json_object_get_string (val));
            }
            else 
            {
                json_object_put (jobj);
                jobj = NULL;
                    
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys document, document_type, new_document, new_document_type, new_password, and password length is 4");       
                return (KORE_RESULT_ERROR);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    sql_state state = auth_user_delete (users, length);
    
    http_response_json_msg (req, state.result, state.msg);
    
    return (KORE_RESULT_OK);
}



//group select
int group_select (struct http_request *req)
{
    char *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
     
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        json_object *jarray = NULL;
        jarray = json_object_new_array ();

        TRY
        {   
            ResultSet_T r = Connection_executeQuery (conn, "SELECT name FROM auth_group");
            json_object *ob = NULL;
            while (ResultSet_next (r))
            {
                auth_group_row_t g = new_void_auth_group_row ();
                strcpy (g.name, ResultSet_getStringByName (r, "name"));
                ob = auth_group_row_to_json (&g);
                json_object_array_add (jarray, ob);
                
            }
            
            http_response_json_array (req, KORE_RESULT_OK, jarray);
            
            json_object_put (ob);
            ob = NULL;
            
            json_object_put (jarray);
            jarray = NULL;
            
            Connection_close (conn);
            return (KORE_RESULT_OK);
        }
        CATCH (SQLException)
        {
            json_object_put (jarray);
            jarray = NULL;
            
            http_response_json_msg (req, KORE_RESULT_OK, Exception_frame.message);
            Connection_close (conn);
            return (KORE_RESULT_OK);
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
        http_response_json_msg (req, KORE_RESULT_OK, "error not database connection");
        return (KORE_RESULT_OK);
    }
    
    return (KORE_RESULT_OK);
}



//group insert
int group_insert (struct http_request *req)
{
    char            *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_row_t  auth_group_rows[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_rows[i] = new_void_auth_group_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_rows[i].name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: not key name found");
                
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            PreparedStatement_T p = Connection_prepareStatement (conn, "INSERT INTO auth_group (name) VALUES (?)");
            
            for (int i = 0; i < length; i++)
            {
                PreparedStatement_setString (p, 1, auth_group_rows[i].name);
                PreparedStatement_execute (p);
            }
            
            http_response_json_msg (req, KORE_RESULT_ERROR, "group insert");
            Connection_close (conn);
            
            return (KORE_RESULT_OK);
        }
        CATCH (SQLException)
        {           
            http_response_json_msg (req, KORE_RESULT_ERROR, Exception_frame.message);
            Connection_close (conn);
            
            return (KORE_RESULT_OK);
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "error: not database connection");
        return (KORE_RESULT_OK);
    }
   
    return (KORE_RESULT_OK);
}



//group update
int group_update (struct http_request *req)
{
    char            *data = NULL;
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_update_t auth_group_updates[length];
        
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_updates[i].old_group = new_void_auth_group_row ();
        auth_group_updates[i].new_group = new_void_auth_group_row ();
     
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_updates[i].old_group.name, json_object_get_string (val));
            }
            else if (strcmp (key, "new_name") == 0)
            {
                strcpy (auth_group_updates[i].new_group.name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: key name or new_name not found");
                
                json_object_put (jobj);
                jobj = NULL;
                
                json_object_put (jobjs);
                jobjs = NULL;
                
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            ResultSet_T r;
            PreparedStatement_T p = Connection_prepareStatement (conn, "UPDATE auth_group SET name=? WHERE name=?");
            for (int i = 0; i < length; i++)
            {
                r = Connection_executeQuery (conn, "SELECT name FROM auth_group WHERE name='%s'", auth_group_updates[i].old_group.name);
                if (ResultSet_next (r))
                {
                    PreparedStatement_setString (p, 1, auth_group_updates[i].new_group.name);
                    PreparedStatement_setString (p, 2, auth_group_updates[i].old_group.name);
                    PreparedStatement_execute (p);    
                }
                else
                {
                    http_response_json_msg (req, KORE_RESULT_ERROR, "Error: no group found with name value");
                    return (KORE_RESULT_OK);
                }
            }
                        
            http_response_json_msg (req, KORE_RESULT_ERROR, "group update");
            Connection_close (conn);
            
            return (KORE_RESULT_OK);
        }
        CATCH (SQLException)
        {
            http_response_json_msg (req, KORE_RESULT_ERROR, Exception_frame.message);
            Connection_close (conn);
            
            return (KORE_RESULT_OK);
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "error not database connection");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);
    }

    return (KORE_RESULT_OK);
}



//group delete
int group_delete (struct http_request *req)
{
    char            *data = NULL;
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_group_row_t auth_group_rows[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_group_rows[i] = new_void_auth_group_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "name") == 0)
            {
                 strcpy (auth_group_rows[i].name, json_object_get_string (val));
            }
            else 
            {
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: key name not found");
                json_object_put (jobj);
                jobj = NULL;
                return (KORE_RESULT_OK);
            }
        }
        
        json_object_put (jobj);
        jobj = NULL;
    }
    
    json_object_put (jobjs);
    jobjs = NULL;
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM auth_group WHERE name=?");
            for (int i = 0; i < length; i++)
            {
                PreparedStatement_setString (p, 1, auth_group_rows[i].name);
                PreparedStatement_execute (p);
            }
            
            http_response_json_msg (req, KORE_RESULT_OK, "group deleted");
            Connection_close (conn);
            
            return (KORE_RESULT_OK);
        }
        CATCH (SQLException)
        {
            http_response_json_msg (req, KORE_RESULT_OK, Exception_frame.message);
            Connection_close (conn);
            
            return (KORE_RESULT_OK);   
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
        http_response_json_msg (req, KORE_RESULT_OK, "error not database connection");
        Connection_close (conn);
            
        return (KORE_RESULT_OK);   
    }
    
    return (KORE_RESULT_OK);
}

