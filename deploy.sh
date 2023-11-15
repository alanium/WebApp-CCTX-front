echo "Switching to branch master"
git chechout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* ubuntu@18.220.34.79:/var/www/18.220.34.79/

echo "Done!"