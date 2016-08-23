#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include <stdlib.h>
#include "auth_user_row.h"
#include "database.h"
#include "contrib.h"

auth_user_row   new_auth_user_row (char *document, char *document_type, char *password)
{
    auth_user_row x;
    
    strcpy (x.document, document);
    strcpy (x.document_type, document_type);
    strcpy (x.password, encrypt_password (password));
    
    return x;
}



auth_user_row   new_auth_user_row_void (void)
{
    auth_user_row x;
    
    strcpy (x.document, "");
    strcpy (x.document_type, "");
    strcpy (x.password, "");
    
    return x;
}



auth_user_row* json_to_auth_user_row (json_object *jobjs, int length)
{
    auth_user_row *auth_user_rows = malloc (sizeof(auth_user_row) * length);
    
    for (int i = 0; i < length; i++)
    {
        json_object *jobj = json_object_array_get_idx (jobjs, i);
        
        auth_user_rows[i] = new_auth_user_row_void ();
        
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
                    free (auth_user_rows);
                    return NULL;
                }
                
            }
            else 
            {
                free (auth_user_rows);
                return NULL;
            }
        }
    }
    
    return auth_user_rows;
}
