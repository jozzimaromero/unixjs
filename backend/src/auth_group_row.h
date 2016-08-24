#include <json-c/json.h>

#ifndef _AUTH_GROUP_ROW_
#define _AUTH_GROUP_ROW_

typedef struct {
    char name[32];
} auth_group_row_t;


typedef struct {
    auth_group_row_t old_group;
    auth_group_row_t new_group;
} auth_group_update_t;

auth_group_row_t new_auth_group_row (char *);
auth_group_row_t new_void_auth_group_row (void);
json_object* auth_group_row_to_json (auth_group_row_t*);

#endif
