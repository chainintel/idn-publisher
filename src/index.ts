const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
var RegClient = require('npm-registry-client');
const tarpack = require('tar-pack');

class Publisher {
  registry;
  client;
  auth;
  access;
  constructor(auth = {}, access = 'public', registry = 'https://registry.npmjs.org/') {
    this.registry = registry;
    this.auth = auth;
    this.access = access;
    this.client = new RegClient({});
  }
  async publish(pkg) {
    return new Promise((resolve, reject) => {
      tmp.dir({ unsafeCleanup: true }, (err, tmppath, cleanupCallback) => {
        if (err) throw err;
        fs.writeFileSync(path.join(tmppath, 'package.json'), JSON.stringify(pkg, null, 2));
        let tarball = tarpack.pack(require('fstream-npm')(tmppath));
        this.client.publish(
          this.registry,
          {
            metadata: pkg,
            body: tarball,
            access: this.access,
            auth: this.auth
          },
          function(error, data, raw, res) {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
            cleanupCallback();
          }
        );
      });
    });
  }
}

export { Publisher };
