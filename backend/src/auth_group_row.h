#include <json-c/json.h>

#ifndef _AUTH_GROUP_ROW_
#define _AUTH_GROUP_ROW_

typedef struct {
    char name[32];
} auth_group_row;

auth_group_row new_auth_group_row (void);
json_object* auth_group_row_json (auth_group_row*);

#endif
