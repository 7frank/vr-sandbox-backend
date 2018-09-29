From node:alpine
 #mhart/alpine-node

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV NODE_ENV production

#building client and server code
# TODO this should happen in mongo docker script
#RUN npm run db-restore

EXPOSE 1337

CMD ["npm","run","start"]
#CMD ["npm","run","start2"]
