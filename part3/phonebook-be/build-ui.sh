rm -R build
cd ../fullStackOpen/part2/phonebook
npm run build
echo $PWD
cp -R build ../../../phonebook-backend