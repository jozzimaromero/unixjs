#include <stdio.h>

#ifndef _CONTRIB_
#define _CONTRIB_

const char *encrypt_password (const char*);
int check_password (const char*);
int verify_request (struct http_request*, char**);
int http_response_json_msg (struct http_request*, int, const char*);
int http_response_json_array (struct http_request*, int, json_object *);

#endif
