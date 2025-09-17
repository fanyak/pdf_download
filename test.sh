rm -f test.txt && \
cd ./assets && \
for dirname in $(find -type d)
do
  echo ${dirname}
  touch test.txt && echo ${dirname}: $(ls -l ${dirname} | grep ".pdf" | wc -l) >> test.txt
done