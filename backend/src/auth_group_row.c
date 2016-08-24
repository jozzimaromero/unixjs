#include <string.h>
#include "auth_group_row.h"

auth_group_row_t  new_auth_group_row (char *name)
{
    auth_group_row_t x;
    strcpy (x.name, name);

    return x;
}



auth_group_row_t new_void_auth_group_row (void)
{
    auth_group_row_t x;
    strcpy (x.name, "");

    return x;
}



json_object*    auth_group_row_to_json (auth_group_row_t* group)
{
    json_object *jobj = NULL;
    jobj = json_object_new_object ();
                
    json_object_object_add (jobj, "name", json_object_new_string (group->name));
    
    return jobj;
}
