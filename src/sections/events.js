const AegisubInvalidEvent = require('../errors/aegisub-invalid-event');

class Events {
  constructor() {
    this.header = null;
    this.finalKey = null;
    this.events = [];
  }

  static registerHeaders() {
    return [
      'Events',
    ];
  }

  getValue() {
    return this.events;
  }

  parse(line) {
    if (!this.header) {
      this.header = line.split('Format: ')[1].split(', ');
      this.finalKey = this.header.pop();

      return;
    }

    if (!line.startsWith('Dialogue: ')) {
      const lineNumber = this.events.length;
      throw new AegisubInvalidEvent(
        `Invalid Event Definition. Event Line: [${lineNumber}]`
      );
    }

    const values = line.split('Dialogue: ')[1].split(',');

    if (this.header.length > values.length) {
      throw new AegisubInvalidEvent("Event Definition Doesn't Match Header");
    }

    const event = new Map();
    this.header.forEach((key, idx) => event.set(key, values[idx]));
    event.set(this.finalKey,
              values.splice(this.header.length, values.length - 1).join(','));

    this.events.push(event);
  }
}

module.exports = Events;
