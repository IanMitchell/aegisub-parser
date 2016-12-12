const path = require('path');
const AegisubParser = require('../../');
const AegisubInvalidEvent = require('../../src/errors/aegisub-invalid-event');


const eventsFile = path.join(__dirname, '../files/events.ass');

describe('Events Parser', () => {
  test('Correctly parses header', () => {
    const Events = require('../../src/sections/events');

    expect(Events.registerHeaders()).toHaveLength(1);
  });

  test('Correctly flags invalid definitions', () => {
    const file = path.join(__dirname, '../files/events_invalid_definition.ass');
    return AegisubParser.parse(file).then(script => {
      expect(script).toBeFalsy();
    }).catch(err => {
      expect(err).toBeInstanceOf(AegisubInvalidEvent);
    });
  });

  test('Correctly verifies key/value pairs', () => {
    const file = path.join(__dirname, '../files/events_invalid_declaration.ass');
    return AegisubParser.parse(file).then(script => {
      expect(script).toBeFalsy();
    }).catch(err => {
      expect(err).toBeInstanceOf(AegisubInvalidEvent);
    });
  });

  test('getValue returns Event Array', () => {
    return AegisubParser.parse(eventsFile).then(script => {
      expect(script.events).toBeInstanceOf(Array);
    });
  });

  test('Correctly parses event map', () => {
    return AegisubParser.parse(eventsFile).then(script => {
      const headers = [...script.events[0].keys()];

      script.events.forEach(event => {
        const keys = [...event.keys()];
        expect(keys).toHaveLength(10);
        keys.forEach(key => expect(headers).toContain(key));
      });
    });
  });

  test('Correctly handles dialogue with commas', () => {
    const str = '...for some reason, a publicity photo of Messi.';
    const file = path.join(__dirname, '../files/events_commas.ass');

    return AegisubParser.parse(file).then(script => {
      expect(script.events[0].get('Text')).toBe(str);
    });
  });
});
