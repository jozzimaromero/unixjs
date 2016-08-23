#include "media_row.h"

media_row new_media_row (void)
{
    media_row x;
    strcpy (x.name, "");
    strcpy (x.type, "");
    
    return x;
}


