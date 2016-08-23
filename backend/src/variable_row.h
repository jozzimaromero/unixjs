#ifndef _VARIABLE_ROW_
#define _VARIABLE_ROW_

typedef struct {
    char name[32];
    unsigned long long val_int;
    char val_text[256];
} variable_row;

variable_row new_variable_row (void);

#endif
