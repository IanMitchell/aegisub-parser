const path = require('path');
const AegisubParser = require('../../');

const garbageFile = path.join(__dirname, '../files/garbage.ass');

describe('Garbage Parser', () => {
  test('Registers correct headers', () => {
    const Garbage = require('../../src/sections/garbage');
    const garbage = new Garbage();

    expect(garbage.registerHeaders()).toHaveLength(1);
  });

  test('getValue returns Map', () => {
    return AegisubParser.parse(garbageFile).then(script => {
      expect(script.garbage).toBeInstanceOf(Map);
    });
  });

  test('Parser sets correct key value pairs', () => {
    return AegisubParser.parse(garbageFile).then(script => {
      expect([...script.garbage.keys()]).toHaveLength(9);
      expect([...script.garbage.keys()]).toContain('Active Line');
      expect([...script.garbage.values()]).toContain(
        'D:/Fansubbing/GoodJob/Orange/01/orange 01 premux [A289397E].mkv'
      );
    });
  });
});
