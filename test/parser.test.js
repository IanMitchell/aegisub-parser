const path = require('path');
const AegisubParser = require('../');

// WARNING:
// These three tests are LONG because of how Jest outputs difference.
// We don't run them by default. They'll run in Travis environments
// or if you run `npm run test-all`

function shouldRun() {
  return (process.env.CI && process.env.TRAVIS);
}

describe('Real World Tests', () => {
  test('Returns a promise', () => {
    const file = path.join(__dirname, './files/info.ass');
    expect(AegisubParser.parse(file)).toBeInstanceOf(Promise);
  });

  test('Correctly Handles GJM Charlotte Ep 2', () => {
    if (shouldRun()) {
      const file = path.join(__dirname, './files/charlotte02.ass');

      return AegisubParser.parse(file).then(script => {
        expect(script.info).toBeInstanceOf(Map);
        expect([...script.info.keys()]).toHaveLength(7);
        expect(script.garbage).toBeInstanceOf(Map);
        expect([...script.garbage.keys()]).toHaveLength(9);
        expect(script.styles).toBeInstanceOf(Map);
        expect([...script.styles.keys()]).toHaveLength(11);
        expect(script.events).toBeInstanceOf(Array);
        expect(script.events).toHaveLength(29869);
      });
    }
  });

  test('Correctly Handles Vivid Amagi 01', () => {
    if (shouldRun()) {
      const file = path.join(__dirname, './files/amagi01.ass');

      return AegisubParser.parse(file).then(script => {
        expect(script.info).toBeInstanceOf(Map);
        expect([...script.info.keys()]).toHaveLength(9);
        expect(script.garbage).toBeInstanceOf(Map);
        expect([...script.garbage.keys()]).toHaveLength(9);
        expect(script.styles).toBeInstanceOf(Map);
        expect([...script.styles.keys()]).toHaveLength(24);
        expect(script.events).toBeInstanceOf(Array);
        expect(script.events).toHaveLength(2212);
      });
    }
  });

  test('Correctly Handles Commie SNAFU TOO! 12', () => {
    if (shouldRun()) {
      const file = path.join(__dirname, './files/SNAFUTOO!12.ass');

      return AegisubParser.parse(file).then(script => {
        expect(script.info).toBeInstanceOf(Map);
        expect([...script.info.keys()]).toHaveLength(7);
        expect(script.garbage).toBeInstanceOf(Map);
        expect([...script.garbage.keys()]).toHaveLength(10);
        expect(script.styles).toBeInstanceOf(Map);
        expect([...script.styles.keys()]).toHaveLength(9);
        expect(script.events).toBeInstanceOf(Array);
        expect(script.events).toHaveLength(787);
      });
    }
  });
});
