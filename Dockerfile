FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN chmod +x /usr/src/app/scripts/preinstall.sh
RUN npm install
EXPOSE 7000
CMD ["npm","start"]