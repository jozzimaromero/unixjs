#include <kore/kore.h>
#include <kore/http.h>
#include <string.h>

#include "root.h"

//home
int home (struct http_request *req)
{
    const char *msg = "hello world!";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}

//save_user
int save_user (struct http_request *req)
{
    char *data;
    //struct kore_buf *buf;

    if (req->method != HTTP_METHOD_POST)
    {
        http_response (req, 405, NULL, 0);
        return (KORE_RESULT_OK);
    }
    
    http_populate_post (req);
    
    //buf = kore_buf_alloc(128);
    
    if (http_argument_get_string (req, "data", &data))
    {
        //kore_buf_appendf(buf, "$name$", data);
        kore_log (LOG_INFO, "Data received!");
    }
    else
    {
        kore_log (LOG_INFO, "Data not received!");
    }
    
    //kore_buf_free(buf);
    return (KORE_RESULT_OK);
}


int v_params_enabled (struct http_request *req, char *param)
{
	kore_log(LOG_NOTICE, "v_example_func called");

	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}


