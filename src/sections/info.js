class Info {
  constructor() {
    this.data = new Map();
  }

  registerHeaders() {
    return [
      'Script Info',
    ];
  }

  getValue() {
    return this.data;
  }

  parse(line) {
    const key = line.split(':')[0].trim();
    const value = line.split(':').slice(1).join(':').trim();

    this.data.set(key, value);
  }
}

module.exports = Info;
