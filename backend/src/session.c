#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <openssl/sha.h>
#include <math.h>
#include <time.h>
#include <json-c/json.h>
#include <kore/kore.h>
#include <kore/http.h>

#include "session.h"
#include "database.h"

int v_session_validate (struct http_request *req, char *data)
{
	kore_log(LOG_NOTICE, "v_session_validate: %s", data);

	if (!strcmp(data, "test123"))
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}


int create_user (struct http_request *req)
{
    users_row new_user;
    char *data;
    
     if (req->method != HTTP_METHOD_POST)
    {
        char *msg = "method is not post";
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    if (http_argument_get_string (req, "data", &data))
    {
        kore_log (LOG_INFO, "Data received!");
        json_object *jobj = json_tokener_parse(data);
        json_object_object_foreach (jobj, key, val) {
            //kore_log (LOG_INFO, "%s", key);
            if (strcmp (key, "name") == 0)
            {
                strcpy (new_user.name, json_object_get_string (val));
                kore_log (LOG_INFO, "%s", new_user.name);
            }
            else if (strcmp (key, "lastname") == 0)
            {
                strcpy (new_user.lastname, json_object_get_string (val));
                kore_log (LOG_INFO, "%s", new_user.lastname);
            }
            else if (strcmp (key, "document") == 0)
            {
                strcpy (new_user.document, json_object_get_string (val));
                kore_log (LOG_INFO, "%s", new_user.document);
            }
            else if (strcmp (key, "document_type") == 0)
            {
                strcpy (new_user.document_type, json_object_get_string (val));
                kore_log (LOG_INFO, "%s", new_user.document_type);
            }
            else if (strcmp (key, "password") == 0)
            {
                strcpy (new_user.password, encrypt_password (json_object_get_string (val)));
                kore_log (LOG_INFO, "%s", new_user.password);
            }
            else 
            {
                kore_log (LOG_INFO, "key no available");
            }
        }
    }
    else
    {
        kore_log (LOG_INFO, "Data not received!");
    }  

    char *msg = "{\"name\":\"jose\"}";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}

char *encrypt_password (char *password_)
{
    time_t seconds;
	time (&seconds);	
	srand ((unsigned int) seconds);
	
	char *alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	int index = rand () % 62;
	
	char character[1];
	character[0] = alpha[index];
	
	unsigned char hash[SHA256_DIGEST_LENGTH];
				
	SHA256 (character, strlen(character), hash);
	
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
    
    SHA256 (password, strlen(password), hash);
    
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
    	
	char *p = NULL;
	p = password_salt;
	return p;
}
