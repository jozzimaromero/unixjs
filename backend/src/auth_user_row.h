#ifndef _AUTH_USER_ROW_
#define _AUTH_USER_ROW_

typedef struct {
    char document[16];
    char document_type[8];
    char password[256];
} auth_user_row;

auth_user_row   new_auth_user_row (char*, char*, char*);
auth_user_row   new_auth_user_row_void (void);
auth_user_row*  json_to_auth_user_row (json_object*, int);

#endif
