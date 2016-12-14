const fs = require('fs');
const readline = require('readline');
const sections = require('./sections');

class AegisubScript {
  constructor() {
    this.parsers = new Map();

    // Load Section Parsers
    Object.keys(sections).forEach((key) => {
      const parser = new sections[key]();

      parser.registerHeaders().forEach((header) => {
        if (this.parsers.has(header)) {
          this.parsers.set(header, [parser, ...this.parsers.get(header)]);
        } else {
          this.parsers.set(header, [parser]);
        }
      });
    });
  }

  static parse(filename) {
    return new Promise((resolve, reject) => {
      const script = new AegisubScript();

      const rl = readline.createInterface({
        input: fs.createReadStream(filename),
      });

      let currentSection = null;

      rl.on('line', (line) => {
        const val = line.trim();

        // Ignore Comments
        if (val.startsWith(';') || val.startsWith('Comment: ') || val === '') {
          return;
        }

        // Assign new section
        if (val.startsWith('[')) {
          currentSection = val.substr(1, val.length - 2);
          return;
        }

        // Run relevant parsers
        if (script.parsers.has(currentSection)) {
          script.parsers.get(currentSection).forEach((parser) => {
            try {
              parser.parse(val);
            } catch (err) {
              reject(err);
            }
          });
        }
      });

      rl.on('close', () => {
        [...script.parsers.values()].forEach((parsers) => {
          parsers.forEach((parser) => {
            script[parser.constructor.name.toLowerCase()] = parser.getValue();
          });
        });

        resolve(script);
      });
    });
  }
}

class AegisubParser {
  static parse(filename) {
    return AegisubScript.parse(filename);
  }
}

module.exports = AegisubParser;
