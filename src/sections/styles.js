const AegisubInvalidStyle = require('../errors/aegisub-invalid-style');

class Styles {
  constructor() {
    this.header = null;
    this.styles = new Map();
  }

  registerHeaders() {
    return [
      'V4+ Styles',
    ];
  }

  getValue() {
    return this.styles;
  }

  parse(line) {
    if (!this.header) {
      this.header = line.split('Format: ')[1].split(', ');
      return;
    }

    if (!line.startsWith('Style: ')) {
      const lineNumber = [...this.styles.keys()].length;
      throw new AegisubInvalidStyle(
        `Invalid Style Definition. Style Line: [${lineNumber}]`
      );
    }

    const values = line.split('Style: ')[1].split(',');

    if (this.header.length !== values.length) {
      throw new AegisubInvalidStyle("Style Definition Doesn't Match Header");
    }

    const name = values.splice(0, 1)[0];
    const style = new Map();
    values.forEach((val, i) => style.set(this.header[i], val));

    this.styles.set(name, style);
  }
}

module.exports = Styles;
