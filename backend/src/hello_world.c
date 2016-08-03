#include <kore/kore.h>
#include <kore/http.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

int	home (struct http_request *);
int upload_file (struct http_request *);


//upload_file
int upload_file (struct http_request *req)
{
    int                 fd;
    struct http_file    *file;
    u_int8_t            buf[BUFSIZ];
    ssize_t             ret, written;
    
    if (req->method != HTTP_METHOD_POST)
    {
        http_response (req, 405, NULL, 0);
        return (KORE_RESULT_OK);
    }
    
    http_populate_multipart_form (req);
    
    if ((file = http_file_lookup (req, "userfile")) == NULL)
    {
        http_response (req, 400, NULL, 0);
        return (KORE_RESULT_OK);
    }
    
    char path[32];
    strcpy (path, "./uploads/");
    strcat (path, file->filename);
    fd = open (path, O_CREAT | O_TRUNC | O_WRONLY, 0700);
    
    if (fd == -1)
    {
        http_response (req, 500, NULL,  0);
        return (KORE_RESULT_OK);
    }
    
    ret = KORE_RESULT_ERROR;
    
    for(;;)
    {
        ret = http_file_read (file, buf, sizeof(buf));
        
        if (ret == -1)
        {
            kore_log (LOG_ERR, "failed to read from file");
            http_response (req, 500, NULL,  0);
            goto cleanup;            
        }
        
        if (ret == 0)
        {
            break;
        }
        
        written = write (fd, buf, ret);
        
        if (written != ret)
        {
            kore_log (LOG_ERR, "partial write on %s", file->filename);
            http_response (req, 500, NULL,  0);
            goto cleanup;
        }
    }
    
    ret = KORE_RESULT_OK;
    const char *msg = "upload file!";
    http_response (req, 200, msg,  strlen(msg));
    kore_log (LOG_INFO, "file %s successfully upload", file->filename);
 
    cleanup:
        if (close (fd) == -1)
        {
            kore_log (LOG_WARNING, "close(%s) %s", file->filename, errno_s);
        }
        
        if (ret == KORE_RESULT_ERROR)
        {
            if (unlink (file->filename) == -1)
            {
                kore_log (LOG_WARNING, "unlink(%s): %s", file->filename, errno_s);
            }
            
            ret = KORE_RESULT_OK;
        }
    
    return (KORE_RESULT_OK);
}


//home
int home (struct http_request *req)
{
    
    const char *msg = "hello world!";
    http_response (req, 200, msg,  strlen(msg));
    return (KORE_RESULT_OK);
}
