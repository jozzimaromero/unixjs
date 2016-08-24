#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include <stdlib.h>
#include "auth_user_row.h"
#include "database.h"
#include "contrib.h"

auth_user_row_t  new_auth_user_row (char *document, char *document_type, char *password)
{
    auth_user_row_t x;
    
    strcpy (x.document, document);
    strcpy (x.document_type, document_type);
    strcpy (x.password, encrypt_password (password));
    
    return x;
}


auth_user_row_t  new_void_auth_user_row (void)
{
    auth_user_row_t x;
    
    strcpy (x.document, "");
    strcpy (x.document_type, "");
    strcpy (x.password, "");
    
    return x;
}
