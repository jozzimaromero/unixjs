#include "database.h"
#include "uploadfile.h"
#include "media_row.h"
#include "variable_row.h"
#include "auth_user_row.h"
#include "contrib.h"

#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <json-c/json.h>

//upload_file
int upload_file (struct http_request *req)
{
    int                 fd;
    struct http_file    *file=NULL;
    struct http_file    *user_info=NULL;
    u_int8_t            buf[BUFSIZ];
    u_int8_t            buf_user_info[BUFSIZ];
    ssize_t             ret, written;
    const char          *msg=NULL;
    char                path[64]="";
    char                ext[8] = ".";
    char                *subpath = NULL;
	char                *type = NULL;
	unsigned int        i = 0;
    variable_row_t      variable = new_variable_row ();
    media_row_t         media = new_media_row ();
    auth_user_row_t     user = new_void_auth_user_row ();
    
	    
    if (req->method != HTTP_METHOD_POST)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "method is not post");
        return (KORE_RESULT_OK);
    }

    http_populate_multipart_form (req);
    //kore_log (LOG_INFO, "%s", req->http_body->data);
    
    if ((user_info = http_file_lookup (req, "user_info")) == NULL)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "user_info key not found");
        return (KORE_RESULT_OK);
    }
    
    int ret_tmp = http_file_read (user_info, buf_user_info, sizeof(buf_user_info));
    
    if (ret_tmp < 0)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "user_info key error data");
        return (KORE_RESULT_OK);
    }
    
    char data_user_info[BUFSIZ];
    sprintf (data_user_info, "%s", buf_user_info);
   
    json_object *jobj = NULL;
    jobj =  json_tokener_parse(data_user_info);
    
    if (json_to_auth_user_row (jobj, &user) == KORE_RESULT_ERROR)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "document or document_type key not found");
        return (KORE_RESULT_OK);
    }
    
    if ((file = http_file_lookup (req, "userfile")) == NULL)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "userfile key not found");
        return (KORE_RESULT_OK);
    }
    
    char *documents_ext[] = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
    size_t length_documents_ext = sizeof (documents_ext) / sizeof (documents_ext[0]);
    
    char *music_ext[] = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
    size_t length_music_ext = sizeof (music_ext) / sizeof (music_ext[0]);
    
    char *pictures_ext[] = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
    size_t length_pictures_ext = sizeof (pictures_ext) / sizeof (pictures_ext[0]);
    
    char *videos_ext[] = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};
    size_t length_videos_ext = sizeof (videos_ext) / sizeof (videos_ext[0]);
    
    strcpy (path, "../media/");    
	
    for (i = 0; i < length_documents_ext; i++)
    {
        if (strstr (file->filename, strcat (ext, documents_ext[i])) != NULL)
        {
            type = documents_ext [i];
            subpath = "documents/";
            break;
        }
        strcpy(ext, ".");
    }
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_music_ext; i++)
        {
            if (strstr (file->filename, strcat (ext, music_ext[i])) != NULL)
            {
                type = music_ext [i];
                subpath = "music/";
                break;
            }
            strcpy(ext, ".");;
        }
    }
    
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_pictures_ext; i++)
        {
            if (strstr (file->filename, strcat (ext, pictures_ext[i])) != NULL)
            {
                type = pictures_ext [i];
                subpath = "pictures/";
                break;
            }
            strcpy(ext, ".");
        }
    }
    
    if (subpath == NULL)
    {
        for (i = 0; i < length_videos_ext; i++)
        {
            if (strstr (file->filename, strcat (ext, videos_ext[i])) != NULL)
            {
                type = videos_ext [i];
                subpath = "videos/";
                break;
            }
            strcpy(ext, ".");
        }
    }
    
    if (subpath == NULL)
    {
        http_response_json_msg (req, KORE_RESULT_ERROR, "file type not suported");
        return (KORE_RESULT_OK);
    }
    
    Connection_T conn = get_connection ();
    
    if (Connection_ping (conn))
    {   
        TRY
        {
            ResultSet_T r;
            r = Connection_executeQuery (conn, "SELECT id FROM auth_user WHERE document_type='%s' AND document='%s';", user.document_type, user.document);
            if (ResultSet_next (r))
            {
                user.id = ResultSet_getLLongByName (r, "id");
                char *tmp = variable.name;
                sprintf (tmp, "%lld", user.id);
                strcat (variable.name, "_");
                strcat (variable.name, type);
            }
            else
            {
                Connection_close (conn);
        
                http_response_json_msg (req, KORE_RESULT_ERROR, "user not found in db");
                return (KORE_RESULT_OK);
                
            }
            
            PreparedStatement_T p;            
            r = Connection_executeQuery (conn, "SELECT name, val_int FROM variable WHERE name='%s';", variable.name);
           
            if (ResultSet_next (r))
            {
                variable.val_int = ResultSet_getLLongByName (r, "val_int");
                variable.val_int += 1;
                p = Connection_prepareStatement (conn, "UPDATE variable SET val_int=? WHERE name=?");
                PreparedStatement_setLLong (p, 1, variable.val_int);
                PreparedStatement_setString (p, 2, variable.name);
                PreparedStatement_execute (p);
            }
            else
            {
                variable.val_int = 0;
                p = Connection_prepareStatement (conn, "INSERT INTO variable (name, val_int) VALUES (?, ?)");
                PreparedStatement_setString (p, 1, variable.name);
                PreparedStatement_setLLong (p, 2, variable.val_int);
                PreparedStatement_execute (p);
            }
            
            char usr_str[32];
            sprintf (usr_str, "%lld", user.id);
            char var_str[32];
            sprintf (var_str, "%lld", variable.val_int);
            strcpy (media.name, usr_str);
            strcat (media.name, "_");
            strcat (media.name, var_str);
            strcpy (media.type, type);
            
            p = Connection_prepareStatement (conn, "INSERT INTO media (name, type) VALUES (?, ?)");
            PreparedStatement_setString (p, 1, media.name);
            PreparedStatement_setString (p, 2, media.type);
            PreparedStatement_execute (p);
            
            Connection_close (conn);
        }
        CATCH (SQLException)
        {
            const char *message = Exception_frame.message;
            kore_log (LOG_INFO, "error sql, %s", message);
            
            Connection_close (conn);
            return (KORE_RESULT_OK);
        }
        FINALLY
        {
        }
        END_TRY;
    }
    else
    {
       kore_log (LOG_INFO, "imposible to make connection, first open pool");
       return (KORE_RESULT_OK);
    }

    
    
    char full_name[32] = "";
    strcat (path, subpath);
    strcpy (full_name, media.name);
    strcat (full_name, ext);
    strcat (path, full_name);
    
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
            char tmpmsg [128] = "";
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
    
    json_object *json_msg = NULL;
    json_msg = json_object_new_object ();
    char *json_media_name = NULL;
    char *json_media_type = NULL;
    json_media_name = media.name;
    json_media_type = media.type;
    
    json_object_object_add (json_msg, "name", json_object_new_string (json_media_name));
    json_object_object_add (json_msg, "type", json_object_new_string (json_media_type));
    
    msg = json_object_to_json_string(json_msg);
    http_response (req, 200, msg, strlen(msg));
    
    return (KORE_RESULT_OK);
}

