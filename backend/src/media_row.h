#ifndef _MEDIA_ROW_
#define _MEDIA_ROW_

typedef struct {
    char name[32];
    char type[8];
} media_row_t;

media_row_t   new_media_row (void);

#endif
