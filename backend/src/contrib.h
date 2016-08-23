#include <stdio.h>

#ifndef _CONTRIB_
#define _CONTRIB_

const char *encrypt_password (const char*);
int check_password (const char*);
int verify_request (struct http_request*, char**);

#endif
