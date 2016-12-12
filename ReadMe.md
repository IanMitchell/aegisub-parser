# Aegisub Parser

Parses [Aegisub](http://www.aegisub.org/) files (.ass). Easily extensible for past/future sections.

## Installation

```
npm install aegisub-parser --save
```

## Usage

```javascript
const AegisubParser = require('aegisub-parser');

AegisubParser.parse('./full_metal_panic_01.ass').then(script => {
  console.log(script.events.length);
}).catch(err) {
  if (err instanceof AegisubInvalidStyle) {
    console.log('Please validate your Aegisub styles.');
  } else if (err instanceof AegisubInvalidEvent) {
    console.log('Please validate your Aegisub events.');
  }
};  
```

This returns an `AegisubScript` object, which given a standard v4 file looks like the following:

* **AegisubScript** Properties
  * `info` (Map): Map of info section key/value pairs.
  * `garbage` (Map): Map of garbage section key/value pairs.
  * `styles` (Map): Map of styles in name/Map<Header,Value> pairs.
  * `events` (Array): Array of Map<Header,Value> objects in sequential order.

## Special Thanks

Toby, Matthias, and Good Job Media! for design assistance and spec clarification.

Test files pulled from Vivid and Good Job Media! GitHub Repositories.
