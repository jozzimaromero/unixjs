#include <kore/kore.h>
#include <kore/http.h>
#include <zdb/zdb.h>

#ifndef _DATABASE_
#define _DATABASE_
//function to open and close pools in database
int open_pool (void);
int close_pool (void);
Connection_T get_connection (void);

//tables map
typedef struct {
    char name[32];
    unsigned long long val_int;
    char val_text[256];
} variable_row;

variable_row new_variable_row (void);

typedef struct {
    char name[32];
    char type[8];
} media_row;

media_row new_media_row (void);

typedef struct {
    char document[16];
    char document_type[8];
    char password[256];
} auth_user_row;

auth_user_row new_auth_user_row (void);


typedef struct {
    char name[32];
} auth_group_row;

auth_group_row new_auth_group_row (void);
json_object* auth_group_row_json (auth_group_row*);
#endif
