#ifndef _AUTH_USER_ROW_
#define _AUTH_USER_ROW_

typedef struct {
    char document[16];
    char document_type[8];
    char password[256];
} auth_user_row_t;

typedef struct {
    auth_user_row_t old_user;
    auth_user_row_t new_user;
} auth_user_update_t;

auth_user_row_t  new_auth_user_row (char*, char*, char*);
auth_user_row_t  new_void_auth_user_row (void);
#endif
