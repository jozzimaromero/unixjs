CC = gcc
CFLAGS = -c -Wall -I./
LDFLAGS = -Ofast -L./
LDLIBS = -lmicrohttpd -lpthread -ltcmalloc_minimal
SOURCE = src/
PROJECT = frontend

all: $(PROJECT)

$(PROJECT): main.o 
	$(CC) main.o -o $(PROJECT) $(LDFLAGS) $(LDLIBS)
	
main.o: $(SOURCE)main.c
	$(CC) $(CFLAGS) $(SOURCE)main.c
		
clean:
	rm *o $(PROJECT)
