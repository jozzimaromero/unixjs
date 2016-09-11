#include <string.h>
#include "media_row.h"

media_row_t  new_media_row (void)
{
    media_row_t x;
    strcpy (x.name, "");
    strcpy (x.type, "");
    
    return x;
}


