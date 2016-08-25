#include <json-c/json.h>
#include "contrib.h"

#ifndef _AUTH_USER_ROW_
#define _AUTH_USER_ROW_

typedef struct {
    int64_t id;
    char document[16];
    char document_type[8];
} auth_user_row_t;

typedef struct {
    auth_user_row_t old_user;
    auth_user_row_t new_user;
} auth_user_update_t;

auth_user_row_t     new_auth_user_row (char*, char*, char*);
auth_user_row_t     new_void_auth_user_row (void);
int                 auth_user_row_to_json (auth_user_row_t*, json_object*);
int                 json_to_auth_user_row (json_object*, auth_user_row_t*);

//sql_state    auth_user_select (auth_user_row_t[], int, int);
sql_state    auth_user_insert (auth_user_row_t[], int);
sql_state    auth_user_update (auth_user_update_t[], int);
sql_state    auth_user_delete (auth_user_row_t[], int);
#endif
