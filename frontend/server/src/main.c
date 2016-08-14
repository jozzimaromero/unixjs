#include <sys/types.h>

#ifndef _WIN32
    #include <sys/select.h>
    #include <sys/socket.h>
#else
    #include <winsock2.h>
#endif

#include <microhttpd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define PORT 8888

static int answer_to_connection (void *cls, struct MHD_Connection *connection, const char *url, const char *method, const char *version, const char *upload_data, size_t *upload_data_size, void **con_cls)
{
    char path[256] = ".";
    strcat (path, url);
    
    char MIME_TYPE[32] = "text/plain; charset=utf-8";
    
    if (strstr (url, ".woff") != NULL) 
    {
        strcpy (MIME_TYPE, "application/font-woff");
    }
    else if (strstr (url, ".css") != NULL) 
    {
        strcpy (MIME_TYPE, "text/css");
    }
    else if (strstr (url, ".jpe") != NULL || strstr (url, ".jpeg") != NULL || strstr (url, ".jpg") != NULL) 
    {
        strcpy (MIME_TYPE, "image/jpeg");
    }
    else if (strstr (url, ".png") != NULL)
    {
        strcpy (MIME_TYPE, "image/png");
    }
    else if (strstr (url, ".svg") != NULL || strstr (url, ".svgz") != NULL)
    {
        strcpy (MIME_TYPE, "image/svg+xml");
    }
    else if (strstr (url, ".js") != NULL)
    {
        strcpy (MIME_TYPE, "application/javascript");
    }
    else if (strstr (url, ".html") != NULL)
    {
        strcpy (MIME_TYPE, "text/html; charset=utf-8");
    }
    
    
    int fd;
    struct stat sbuf;
    
    if ((fd = open (path, O_RDONLY)) == -1 || (fstat (fd, &sbuf)) != 0)
    {
        if (fd != -1)
        {
            (void)close (fd);
        }
     
        struct MHD_Response *response;
        
        const char *resp_error = "Error accessing file";
        response = MHD_create_response_from_buffer (strlen (resp_error), (void *) resp_error, MHD_RESPMEM_PERSISTENT);
        MHD_add_response_header (response, "Content-type", "text/plain; charset=utf-8");
        
        int ret;
        ret = MHD_queue_response (connection, MHD_HTTP_OK, response);
        MHD_destroy_response (response);
    
        return ret;
    }
    else 
    {
        struct MHD_Response *response;
        
        response = MHD_create_response_from_fd_at_offset64 (sbuf.st_size, fd, 0);
        MHD_add_response_header (response, "Content-type", MIME_TYPE);
        
        int ret;
        ret = MHD_queue_response (connection, MHD_HTTP_OK, response);
        MHD_destroy_response (response);
    
        return ret;
    }
}

int main ()
{
    printf ("Runing frontend on http://127.0.0.1:8888\n"
        "Press enter key to terminate.\n"
    );
    struct MHD_Daemon *daemon;
    daemon = MHD_start_daemon (MHD_USE_THREAD_PER_CONNECTION, PORT, NULL, NULL, &answer_to_connection, NULL, MHD_OPTION_END);
    
    if (NULL == daemon) return 1;
    
    getchar ();
    MHD_stop_daemon (daemon);
    return 0;
}
