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
    const char          *msg  = NULL;
    json_object         *json_msg = NULL;
                        json_msg  = json_object_new_object ();
    
    if (verify_request (req, &data) == KORE_RESULT_ERROR)
    {
        return (KORE_RESULT_OK);
    }
    
    json_object         *jobjs = NULL;
    jobjs = json_tokener_parse(data);
    int length = json_object_array_length (jobjs);
    auth_user_row* auth_user_rows = json_to_auth_user_row (jobjs, length);
    
    if (auth_user_rows == NULL)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error verify keys or if password key length is 4"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        PreparedStatement_T p;
        TRY
        {   
            for (int i = 0; i < length; i++)
            {
                p = Connection_prepareStatement (conn, "INSERT INTO auth_user (document, document_type, password) VALUES (?, ?, ?);");
                PreparedStatement_setString (p, 1, auth_user_rows[i].document);
                PreparedStatement_setString (p, 2, auth_user_rows[i].document_type);
                PreparedStatement_setString (p, 3, auth_user_rows[i].password);
                PreparedStatement_execute (p);
            }
            
            Connection_close (conn);
            
        }
        CATCH (SQLException)
        {
            
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
            Connection_close (conn);
            free (auth_user_rows);
            
            return (KORE_RESULT_ERROR);
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
       
        free (auth_user_rows);
        return (KORE_RESULT_ERROR);
    }
    
    free (auth_user_rows);
            
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("user insert"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
            
    return (KORE_RESULT_OK);
}


//update user
/*
int update_user(struct http_request *req)
{
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;

    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    json_object *jobj = json_tokener_parse(data);
    
    auth_user_row       select_user = new_auth_user_row ();
    auth_user_row       update_user = new_auth_user_row ();
    
    int                 update = 0;
    
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "document") == 0)
        {
            strcpy (select_user.document, json_object_get_string (val));    
        }
        else if (strcmp (key, "document_type") == 0)
        {
            strcpy (select_user.document_type, json_object_get_string (val));
        }
        else if (strcmp (key, "new_document") == 0)
        {
            strcpy (update_user.document, json_object_get_string (val));
            update = 1;
        }
        else if (strcmp (key, "new_document_type") == 0)
        {
            strcpy (update_user.document_type, json_object_get_string (val));
            update = 1;
        }
        else if (strcmp (key, "new_password") == 0)
        {
            const char *p = NULL;
            p = encrypt_password (json_object_get_string (val));
            
            if (p != NULL)
            {
                strcpy (update_user.password, p);
                update = 1;
            }
            else 
            {
                json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
                json_object_object_add (json_msg, "message", json_object_new_string ("error update user: new_password length is not 4"));
                msg = json_object_to_json_string(json_msg);
                http_response (req, 200, msg,  strlen(msg));
                return (KORE_RESULT_OK);
            }
        }
        else
        {
            update = 0;
        }
    }
    
    if (!update)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error update user need key: document, document_type and new document or new document_type or new_password"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            ResultSet_T r = Connection_executeQuery (conn, "SELECT password FROM auth_user WHERE document='%s' and document_type='%s';", select_user.document, select_user.document_type);
            if (ResultSet_next (r))
            {
                strcpy (select_user.password, ResultSet_getStringByName (r, "password"));
                if (strcmp (update_user.document, "") == 0)
                {
                    strcpy (update_user.document, select_user.document);
                }
                if (strcmp (update_user.document_type, "") == 0)
                {
                    strcpy (update_user.document_type, select_user.document_type);
                }
                if (strcmp (update_user.password, "") == 0)
                {
                    strcpy (update_user.password, select_user.password);
                }
            }
            else
            {
                json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
                json_object_object_add (json_msg, "message", json_object_new_string ("no user in db to update"));
                msg = json_object_to_json_string(json_msg);
                http_response (req, 200, msg,  strlen(msg));
                Connection_close (conn);
                return (KORE_RESULT_OK);
            }
            
            PreparedStatement_T p = Connection_prepareStatement (conn, "UPDATE auth_user SET document=?, document_type=?, password=? WHERE document='%s' AND document_type='%s'", select_user.document, select_user.document_type);
            PreparedStatement_setString (p, 1, update_user.document);
            PreparedStatement_setString (p, 2, update_user.document_type);
            PreparedStatement_setString (p, 3, update_user.password);
            PreparedStatement_execute (p);
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("user update"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
    
    return (KORE_RESULT_OK);
}


//delete user
int delete_user (struct http_request *req)
{    
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;
                    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    
    json_object         *jobj = NULL;
                        jobj = json_tokener_parse(data);
                        
    auth_user_row       delete_user = new_auth_user_row ();
    
    int delete = 1;
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "document") == 0)
        {
             strcpy (delete_user.document, json_object_get_string (val));
        }
        else if (strcmp (key, "document_type") == 0)
        {
             strcpy (delete_user.document_type, json_object_get_string (val));
        }
        else 
        {
            delete = 0;
        }
    }
    
    if (!delete)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error verify keys, user don't delete"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM auth_user WHERE document=? AND document_type=?");
            PreparedStatement_setString (p, 1, delete_user.document);
            PreparedStatement_setString (p, 2, delete_user.document_type);
            PreparedStatement_execute (p);
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("user delete"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
    
    return (KORE_RESULT_OK);
}



//select group
int select_group (struct http_request *req)
{
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;
                    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        json_object      *jarray = NULL;
                        jarray = json_object_new_array ();
                        
        TRY
        {   
            ResultSet_T r = Connection_executeQuery (conn, "SELECT name FROM auth_group");
            while (ResultSet_next (r))
            {
                auth_group_row g = new_auth_group_row ();
                strcpy (g.name, ResultSet_getStringByName (r, "name"));
                json_object *ob = auth_group_row_json (&g);
                json_object_array_add (jarray, ob);
            }
            
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
            json_object_object_add (json_msg, "groups", jarray);
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    return (KORE_RESULT_OK);
}



//insert group
int insert_group (struct http_request *req)
{
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;
                    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    json_object         *jobj = NULL;
                        jobj = json_tokener_parse(data);
                        
    auth_group_row      new_group = new_auth_group_row ();
    
    int insert = 1;
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "name") == 0)
        {
             strcpy (new_group.name, json_object_get_string (val));
        }
        else 
        {
            insert = 0;
        }
    }
    
    if (!insert)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error: group need key name"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            PreparedStatement_T p = Connection_prepareStatement (conn, "INSERT INTO auth_group (name) VALUES (?)");
            PreparedStatement_setString (p, 1, new_group.name);
            PreparedStatement_execute (p);
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("group insert"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
        
    return (KORE_RESULT_OK);
}



//update goup
int update_group (struct http_request *req)
{
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;

    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    json_object         *jobj = NULL;
                        jobj = json_tokener_parse(data);
                        
    auth_group_row      selected_group = new_auth_group_row ();
    auth_group_row      updated_group = new_auth_group_row ();
    
    int update_new_name = 0, update_name = 0;
    
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "name") == 0)
        {
             strcpy (selected_group.name, json_object_get_string (val));
             update_name = 1;
        }
        else if (strcmp (key, "new_name") == 0)
        {
            strcpy (updated_group.name, json_object_get_string (val));
            update_new_name = 1;
        }
    }
    
    if (!update_name || !update_new_name)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error: update group need name and new_name keys"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            ResultSet_T r = Connection_executeQuery (conn, "SELECT name FROM auth_group WHERE name='%s';", selected_group.name);
            if (ResultSet_next (r))
            {
                PreparedStatement_T p = Connection_prepareStatement (conn, "UPDATE auth_group SET name=? WHERE name=?");
                PreparedStatement_setString (p, 1, updated_group.name);
                PreparedStatement_setString (p, 2, selected_group.name);
                PreparedStatement_execute (p);    
            }
            else
            {
                json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
                json_object_object_add (json_msg, "message", json_object_new_string ("Error: no group found with name value"));
                msg = json_object_to_json_string(json_msg);
                http_response (req, 200, msg,  strlen(msg));
            }
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("group updated"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
    
    
    return (KORE_RESULT_OK);
}



//delete group
int delete_group (struct http_request *req)
{
    char            *data = NULL;
    const char      *msg = NULL;
    json_object     *json_msg = NULL;
                    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    
    json_object         *jobj = NULL;
                        jobj = json_tokener_parse(data);
                        
    auth_group_row       group_to_delete = new_auth_group_row ();
    
    int delete = 1;
    json_object_object_foreach (jobj, key, val)
    {
        if (strcmp (key, "name") == 0)
        {
             strcpy (group_to_delete.name, json_object_get_string (val));
        }
        else 
        {
            delete = 0;
        }
    }
    
    if (!delete)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error verify keys, group don't delete"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {   
            PreparedStatement_T p = Connection_prepareStatement (conn, "DELETE FROM auth_group WHERE name=?");
            PreparedStatement_setString (p, 1, group_to_delete.name);
            PreparedStatement_execute (p);
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
            json_object_object_add (json_msg, "message", json_object_new_string (Exception_frame.message));
            msg = json_object_to_json_string(json_msg);
            http_response (req, 200, msg,  strlen(msg));
            
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
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("error not database connection"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
    }
    
    json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_OK));
    json_object_object_add (json_msg, "message", json_object_new_string ("group deleted"));
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg,  strlen(msg));
    
    return (KORE_RESULT_OK);
}
*/
