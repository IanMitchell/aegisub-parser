const path = require('path');
const AegisubParser = require('../../');

const infoFile = path.join(__dirname, '../files/info.ass');

describe('Info Parser', () => {
  test('Registers correct headers', () => {
    const Info = require('../../src/sections/info');
    const info = new Info();

    expect(info.registerHeaders()).toHaveLength(1);
  });

  test('getValue returns Map', () => {
    return AegisubParser.parse(infoFile).then(script => {
      expect(script.info).toBeInstanceOf(Map);
    });
  });

  test('Parser sets correct key value pairs', () => {
    return AegisubParser.parse(infoFile).then(script => {
      expect([...script.info.keys()]).toHaveLength(7);
      expect([...script.info.keys()]).toContain('YCbCr Matrix');
      expect([...script.info.values()]).toContain('TV.709');
    });
  });
});
