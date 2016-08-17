#!/bin/sh
cd ./frontend/server/
make clean
cd ../../
cd ./backend/tmp_files/
rm *
cd ../../
cd ./media/documents/
rm *
echo "documents">init.txt
cd ../music/
rm *
echo "music">init.txt
cd ../pictures/
rm *
echo "pictures">init.txt
cd ../videos/
rm *
echo "videos">init.txt
cd ../../
git add .
git commit -m "$1"
git push origin master
