#include <kore/kore.h>
#include <kore/http.h>
#include <json-c/json.h>
#include "contrib.h"
#include <openssl/sha.h>
#include <math.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

//encrypt password
const char *encrypt_password (const char *password_)
{
    char *p = NULL;
    
    if (strlen(password_) != 4)
    {
        return p;
    }
    
    time_t seconds;
	time (&seconds);	
	srand ((unsigned int) seconds);
	
	char *alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	int index = rand () % 62;
	
	char character[1];
	character[0] = alpha[index];
	
	unsigned char hash[SHA256_DIGEST_LENGTH];

    const unsigned char *p_character = NULL;
    p_character = (const unsigned char*)character;    
    
	SHA256 (p_character, strlen(character), hash);
	
	char digest_random[SHA256_DIGEST_LENGTH*2];
	
	for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (digest_random + (i*2), "%02x",(int)hash[i]);
    }
    
    char salt[16];
    snprintf (salt, sizeof(salt)+1, digest_random);
    
    salt[3] = character[0];
    char password[5];
    strcpy (password, password_);
    password[4] = character[0];
    
    const unsigned char *p_password = (const unsigned char*)password;
    SHA256 (p_password, strlen(password), hash);
    
    char digest_password[SHA256_DIGEST_LENGTH*2];

    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++)
    {
        sprintf (digest_password + (i*2), "%02x",(int)hash[i]);
    }
    
    char password_salt[128];
    strcpy (password_salt, "sha256$");
    strcat (password_salt, salt);
    strcat (password_salt, "$");
    strcat (password_salt, digest_password);
    	
	
	p = password_salt;
	//kore_log (LOG_INFO, "%s", p);
	return p;
}



int check_password (const char *password_)
{
    return 0;
}



int verify_request (struct http_request *req, char **data)
{
    const char          *msg = NULL;
    json_object         *json_msg = NULL;
    
    json_msg = json_object_new_object ();
    
    if (req->method != HTTP_METHOD_POST)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("method is not post"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_ERROR);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", data) == KORE_RESULT_ERROR)
    {
        json_object_object_add (json_msg, "result", json_object_new_int (KORE_RESULT_ERROR));
        json_object_object_add (json_msg, "message", json_object_new_string ("argument key is not data"));
        msg = json_object_to_json_string(json_msg);
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_ERROR);
    }
    
    return (KORE_RESULT_OK);
}

