#include <kore/kore.h>
#include <kore/http.h>
#include <zdb/zdb.h>

#ifndef _DATABASE_
#define _DATABASE_
//function to open and close pools in database
int open_pool (void);
int close_pool (void);
int test_pool (struct http_request *);

Connection_T get_connection (void);

//tables map
typedef struct {
    char name[32];
    unsigned long long val_int;
    char val_text[256];
} variables_row;

typedef struct {
    char name[32];
    char type[8];
} media_row;

typedef struct {
    char name[64];
    char lastname [64];
    char document [16];
    char document_type [8];
    char password [256];
} users_row;
#endif
