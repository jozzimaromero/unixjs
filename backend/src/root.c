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


//insert user
int insert_user (struct http_request *req)
{
    char                *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object *jobjs = NULL;
    jobjs =  json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_row_t auth_user_rows[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_user_rows[i] = new_void_auth_user_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                 strcpy (auth_user_rows[i].document, json_object_get_string (val));
            }
            else if (strcmp (key, "document_type") == 0)
            {
                 strcpy (auth_user_rows[i].document_type, json_object_get_string (val));
            }
            else if (strcmp (key, "password") == 0)
            {
                const char *p = NULL;
                p = encrypt_password (json_object_get_string (val));
            
                if (p != NULL)
                {
                    strcpy (auth_user_rows[i].password, p);
                }
                else 
                {
                    json_object_put (jobj);
                    jobj = NULL;
                    
                    http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys or password length is 4"); 
                    return (KORE_RESULT_ERROR);
                }
            }
            else 
            {
                json_object_put (jobj);
                jobj = NULL;
                
                http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys or password length is 4"); 
                return (KORE_RESULT_ERROR);
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
    
        PreparedStatement_T p;
        TRY
        {   
            p = Connection_prepareStatement (conn, "INSERT INTO auth_user (document, document_type, password) VALUES (?, ?, ?)");
            for (int i = 0; i < length; i++)
            {                
                PreparedStatement_setString (p, 1, auth_user_rows[i].document);
                PreparedStatement_setString (p, 2, auth_user_rows[i].document_type);
                PreparedStatement_setString (p, 3, auth_user_rows[i].password);
                PreparedStatement_execute (p);
            }
        
            http_response_json_msg (req, KORE_RESULT_OK, "user insert");    
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
        return (KORE_RESULT_OK);
    }
    
    return (KORE_RESULT_OK);
}


//update user
int update_user(struct http_request *req)
{
    char                *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_update_t auth_user_updates[length];
        
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_user_updates[i].old_user = new_void_auth_user_row ();
        auth_user_updates[i].new_user = new_void_auth_user_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                strcpy (auth_user_updates[i].old_user.document, json_object_get_string (val));    
            }
            else if (strcmp (key, "document_type") == 0)
            {
                strcpy (auth_user_updates[i].old_user.document_type, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document") == 0)
            {
                strcpy (auth_user_updates[i].new_user.document, json_object_get_string (val));
            }
            else if (strcmp (key, "new_document_type") == 0)
            {
                strcpy (auth_user_updates[i].new_user.document_type, json_object_get_string (val));
            }
            else if (strcmp (key, "new_password") == 0)
            {
                const char *p = NULL;
                p = encrypt_password (json_object_get_string (val));
                
                if (p != NULL)
                {
                    strcpy (auth_user_updates[i].new_user.password, p);
                }
                else 
                {
                    json_object_put (jobj);
                    jobj = NULL;
                    
                    http_response_json_msg (req, KORE_RESULT_ERROR, "error: verify keys document, document_type, new_document, new_document_type, new_password, and password length is 4");       
                    return (KORE_RESULT_ERROR);
                }
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
   
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   ResultSet_T r;
            PreparedStatement_T p;
            for (int i = 0; i < length; i++)
            {                
                r = Connection_executeQuery (conn, "SELECT password FROM auth_user WHERE document='%s' and document_type='%s';", auth_user_updates[i].old_user.document, auth_user_updates[i].old_user.document_type);
                if (ResultSet_next (r))
                {
                    strcpy (auth_user_updates[i].old_user.password, ResultSet_getStringByName (r, "password"));
                    if (strcmp (auth_user_updates[i].new_user.document, "") == 0)
                    {
                        strcpy (auth_user_updates[i].new_user.document, auth_user_updates[i].old_user.document);
                    }
                    if (strcmp (auth_user_updates[i].new_user.document_type, "") == 0)
                    {
                        strcpy (auth_user_updates[i].new_user.document_type, auth_user_updates[i].old_user.document_type);
                    }
                    if (strcmp (auth_user_updates[i].new_user.password, "") == 0)
                    {
                        strcpy (auth_user_updates[i].new_user.password, auth_user_updates[i].old_user.password);
                    }
                }
                else
                {
                    http_response_json_msg (req, KORE_RESULT_ERROR, "no user in db to update");
                    Connection_close (conn);
                    return (KORE_RESULT_OK);
                }
            
                p = Connection_prepareStatement (conn, "UPDATE auth_user SET document=?, document_type=?, password=? WHERE document='%s' AND document_type='%s'", auth_user_updates[i].old_user.document, auth_user_updates[i].old_user.document_type);
                PreparedStatement_setString (p, 1, auth_user_updates[i].new_user.document);
                PreparedStatement_setString (p, 2, auth_user_updates[i].new_user.document_type);
                PreparedStatement_setString (p, 3, auth_user_updates[i].new_user.password);
                PreparedStatement_execute (p);

            }
            
            Connection_close (conn);
            http_response_json_msg (req, KORE_RESULT_OK, "user update");
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
        return (KORE_RESULT_OK);
    }

    return (KORE_RESULT_OK);
}


//delete user
int delete_user (struct http_request *req)
{    
    char            *data = NULL;
      
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }    
    
    json_object *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_row_t auth_user_rows[length];
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_user_rows[i] = new_void_auth_user_row ();
        
        json_object_object_foreach (jobj, key, val)
        {
            if (strcmp (key, "document") == 0)
            {
                 strcpy (auth_user_rows[i].document, json_object_get_string (val));
            }
            else if (strcmp (key, "document_type") == 0)
            {
                 strcpy (auth_user_rows[i].document_type, json_object_get_string (val));
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
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM auth_user WHERE document=? AND document_type=?");
            for (int i = 0; i < length; i++)
            {
                PreparedStatement_setString (p, 1, auth_user_rows[i].document);
                PreparedStatement_setString (p, 2, auth_user_rows[i].document_type);
                PreparedStatement_execute (p);
            }
            
            http_response_json_msg (req, KORE_RESULT_OK, "user delete");
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



//select group
int select_group (struct http_request *req)
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



//insert group
int insert_group (struct http_request *req)
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



//update goup
int update_group (struct http_request *req)
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



//delete group
int delete_group (struct http_request *req)
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
