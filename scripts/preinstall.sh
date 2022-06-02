#!/bin/bash
NODE_ENV=production && cd ../src/database && \
npm install -g sequelize-cli && \
npx sequelize-cli db:create && npx sequelize-cli db:migrate