var expect = require('chai').expect;
const { Publisher } = require('../dist/index.js');

describe('publisher', () => {
  it('should publish', async () => {
    let publisher = new Publisher({
      token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    });
    publisher.publish({
      version: '1.0.1',
      name: '@idn/model-test',
      description: '',
      author: '',
      license: 'ISC',
      model: {
        types: ['webdnn/fallback', 'webdnn/webassembly', 'webdnn/webgl'],
        path:
          'https://s3.amazonaws.com/s3.chainintel.com/resnet18/QmR3GyiGHCfdCB4Uu9uZY3Rjn3FZESke6GBL6kdQH35RSE',
        id: 'QmR3GyiGHCfdCB4Uu9uZY3Rjn3FZESke6GBL6kdQH35RSE',
        inputs: [
          {
            shape: [1, 1, 224, 224]
          }
        ],
        outputs: [
          {
            shape: [1, 10]
          }
        ]
      }
    });
  });
});
