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

int v_params_enabled (struct http_request *req, char *param)
{
	if (1)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}


