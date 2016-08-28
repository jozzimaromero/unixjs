#include "variable_row.h"
#include <string.h>

variable_row_t    new_variable_row (void)
{
    variable_row_t x;
    strcpy (x.name, "");
    x.val_int = 0;
    strcpy (x.val_text, "");
    
    return x;
}

