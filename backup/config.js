var config =
  {
    uri: 'mongodb://localhost:27017/strapi',// mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: './dump', // write files into this dir
    //collections: [ 'logins' ], // save this collection only
    tar: 'database-dump.tar', // save backup into this tar file
    callback: function (err) {

      if (err) {
        console.error(err);
      } else {
        console.log('finish');
      }
    }
  };


module.exports = config;