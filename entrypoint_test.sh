#!/bin/sh
npm run coverage
curl -Os https://uploader.codecov.io/v0.1.0_4653/linux/codecov
chmod +x codecov
./codecov -t 63eade54-ea49-4fa5-8008-567bbc902a07
exec "$@"