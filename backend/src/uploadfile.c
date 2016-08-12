#include "uploadfile.h"

#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

//upload_file
int upload_file (struct http_request *req)
{
    int                 fd;
    struct http_file    *file;
    u_int8_t            buf[BUFSIZ];
    ssize_t             ret, written;
    const char          *msg;
    
    if (req->method != HTTP_METHOD_POST)
    {
        msg = "method is not post";
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    http_populate_multipart_form (req);
    
    if ((file = http_file_lookup (req, "userfile")) == NULL)
    {
        msg = "file \"userfile\" not found";
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    
    char *documents_ext[] = {".txt", ".pdf", ".ps", ".rtf", ".wps", ".xml", ".xps", ".odt", ".doc", ".docm", ".docx", ".dot", ".dotm", ".dotx", ".csv", ".dbf", ".DIF", ".ods", ".prn", ".xla", ".xlam", ".xls", ".xlsb", ".xlsm", ".xlsl", ".xlsx", ".xlt", ".xltm", ".xltx", ".xlw", ".xps", ".pot", ".potm", ".potx", ".ppa", ".ppam", ".pps", ".ppsm", ".ppsx", ".ppt", ".pptm", ".pptx"};
    size_t length_documents_ext = sizeof (documents_ext) / sizeof (documents_ext[0]);
    
    char *music_ext[] = {".mp3", ".ogg", ".wav", ".flac", ".pcm", ".aiff", ".au", ".raw", ".aac", ".mp4a", ".wma"};
    size_t length_music_ext = sizeof (music_ext) / sizeof (music_ext[0]);
    
    char *pictures_ext[] = {".jpg", ".jpeg", ".bmp", ".gif", ".pcx", ".png", ".tga", ".tiff", ".wmp"};
    size_t length_pictures_ext = sizeof (pictures_ext) / sizeof (pictures_ext[0]);
    
    char *videos_ext[] = {".mpeg", ".vob", ".3gp", ".mov", ".mp4", ".webm", ".flv", ".mkv", ".avi", ".ogm"};
    size_t length_videos_ext = sizeof (videos_ext) / sizeof (videos_ext[0]);
    
    char path[64];
    strcpy (path, "../media/");    

    char *subpath = NULL;
	
    unsigned int i = 0;
    
    for (i = 0; i < length_documents_ext; i++)
    {
        if (strstr(file->filename, documents_ext[i]) != NULL)
        {
            subpath = "documents/";
            break;
        }
    }
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_music_ext; i++)
        {
            if (strstr(file->filename, music_ext[i]) != NULL)
            {
                subpath = "music/";
                break;
            }
        }
    }
    
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_pictures_ext; i++)
        {
            if (strstr(file->filename, pictures_ext[i]) != NULL)
            {
                subpath = "pictures/";
                break;
            }
        }
    }
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_videos_ext; i++)
        {
            if (strstr(file->filename, videos_ext[i]) != NULL)
            {
                subpath = "videos/";
                break;
            }
        }
    }
    
    if (subpath == NULL)
    {
        msg = "file not supported";
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    strcat (path, subpath);
    strcat (path, file->filename);
    fd = open (path, O_CREAT | O_TRUNC | O_WRONLY, 0644);
    
    if (fd == -1)
    {
        msg = "error opening file";
        http_response (req, 200, msg,  strlen(msg));
        return (KORE_RESULT_OK);
    }
    
    ret = KORE_RESULT_ERROR;
    
    for(;;)
    {
        ret = http_file_read (file, buf, sizeof(buf));
        
        if (ret == -1)
        {
            msg = "failed to read from file";
            http_response (req, 200, msg,  strlen(msg));
            goto cleanup;            
        }
        
        if (ret == 0)
        {
            break;
        }
        
        written = write (fd, buf, ret);
        
        if (written == -1) 
        {
            char tmpmsg [128];
		    strcpy (tmpmsg, "write(%s): ");
		    strcat (tmpmsg, file->filename);
		    strcat (tmpmsg, errno_s);
		    msg = tmpmsg;
            http_response (req, 200, msg,  strlen(msg));
			goto cleanup;
        }
        
        
        if (written != ret)
        {
            msg = "partial write on file";
            http_response (req, 200, msg,  strlen(msg));
            goto cleanup;
        }
    }
    
    ret = KORE_RESULT_OK;
    msg = "upload file!";
    http_response (req, 200, msg,  strlen(msg));
 
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

