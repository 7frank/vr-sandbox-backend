#
# TODO start sandbox webserver by either adding it to supervisord.conf or by trying to use entrypoint instead of cmd in base image
#
#
#


#From frank1147/vrsandbox
#TODO
#From node:8-slim

From node:carbon
LABEL maintainer "Frank Reimann <github.com/7frank>"



#############################
# install mongodb

# fixes bug when installing mongo with docker
# {@link=https://jira.mongodb.org/browse/SERVER-21812}
RUN dpkg-divert --local --rename --add /etc/init.d/mongod
RUN ln -s /bin/true /etc/init.d/mongod

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list

# secure connection ill not work
#RUN apt-get update && apt-get install apt-transport-https
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db
RUN chown -R mongodb:mongodb /data/db

ADD ./mongo/mongodb.conf /etc/mongodb.conf
#ADD mongodb.pem /etc/ssl/certs/mongodb.pem

VOLUME ["/data/db"]
EXPOSE 27017




#ENTRYPOINT ["/usr/bin/mongod", "--config", "/etc/mongodb.conf"]
#ENTRYPOINT ["mongod"]

#############################
# install strapi

WORKDIR /usr/src/app_db

COPY . .

RUN npm install


# start mongo and restore data in container
# TODO this might be reundant for containers with volumes but is there for heroku builds for now
#RUN mongod --fork
#RUN npm run db-restore


ENV NODE_ENV production

EXPOSE 1337



#############################



# Install supervisor
#RUN apk --update add supervisor
RUN apt-get install -y supervisor

# Configure supervisor
COPY ./mongo/supervisord.conf /etc/supervisor/supervisord.conf





# Configure cron
#COPY ./mongo/crontab /etc/cron/crontab

# Init cron
#RUN crontab /etc/cron/crontab

# Run supervisor
#ENTRYPOINT  ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

# prevent "Error: positional arguments are not supported"
COPY ./mongo/supervisord.sh /opt/bin/supervisord.sh

ENTRYPOINT ["bash", "/opt/bin/supervisord.sh"]

