#include "auth_group_row.h"

auth_group_row  new_auth_group_row (void)
{
    auth_group_row x;
    strcpy (x.name, "");

    return x;
}

json_object*    auth_group_row_json (auth_group_row* group)
{
    json_object *jobj = NULL;
                jobj = json_object_new_object ();
                
    json_object_object_add (jobj, "name", json_object_new_string (group->name));
    
    return jobj;
}
