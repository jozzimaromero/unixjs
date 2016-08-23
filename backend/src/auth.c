#include <kore/kore.h>
#include <kore/http.h>

#include "auth.h"

//session validate
int v_session_validate (struct http_request *req, char *data)
{
	kore_log(LOG_NOTICE, "v_session_validate: %s", data);

	if (strcmp(data, "test123") == 0)
	{
		return (KORE_RESULT_OK);
	}

	return (KORE_RESULT_ERROR);
}

