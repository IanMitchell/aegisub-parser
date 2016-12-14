const path = require('path');
const AegisubParser = require('../../');
const AegisubInvalidStyle = require('../../src/errors/aegisub-invalid-style');


const stylesFile = path.join(__dirname, '../files/styles.ass');

describe('Styles Parser', () => {
  test('Correctly parses header', () => {
    const Styles = require('../../src/sections/styles');
    const styles = new Styles();

    expect(styles.registerHeaders()).toHaveLength(1);
  });

  test('Correctly flags invalid declarations', () => {
    const file = path.join(__dirname, '../files/styles_invalid_declaration.ass');
    return AegisubParser.parse(file).then(script => {
      expect(script).toBeFalsy();
    }).catch(err => {
      expect(err).toBeInstanceOf(AegisubInvalidStyle);
    });
  });

  test('Correctly verifies key/value pairs', () => {
    const file = path.join(__dirname, '../files/styles_invalid_declaration.ass');
    return AegisubParser.parse(file).then(script => {
      expect(script).toBeFalsy();
    }).catch(err => {
      expect(err).toBeInstanceOf(AegisubInvalidStyle);
    });
  });

  test('getValue returns Style Map', () => {
    return AegisubParser.parse(stylesFile).then(script => {
      expect(script.styles).toBeInstanceOf(Map);
    });
  });

  test('Correctly parses style map', () => {
    return AegisubParser.parse(stylesFile).then(script => {
      const name = 'GJM_Main';
      expect([...script.styles.keys()]).toContain(name);

      const headers = [...script.styles.get(name).keys()];
      [...script.styles.values()].forEach(style => {
        const keys = [...style.keys()];
        expect(keys).toHaveLength(22);
        keys.forEach(key => expect(headers).toContain(key));
      });
    });
  });
});
