#ifndef _MEDIA_ROW_
#define _MEDIA_ROW_

typedef struct {
    char name[32];
    char type[8];
} media_row;

media_row   new_media_row (void);

#endif
