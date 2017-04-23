class ProtocolRegistry {

  constructor() {
    this.protocols = {};
  }

  add(protocol, resolver) {
    if (typeof this.protocols[protocol] !== "undefined") {
      throw new Error(
        'Protocol `' + protocol + '` is already registered ' +
        'and cannot be registered again'
      );
    }

    if (typeof resolver !== "function") {
      throw new Error(
        'Protocol `' + protocol + '` could not be registered ' +
        'because resolver was not a function`'
      );
    }

    this.protocols[protocol] = resolver;
  }

  remove(protocol) {
    if (typeof this.protocols[protocol] === "undefined") {
      throw new Error(
        'Protocol `' + protocol + '` is not registered'
      );
    }

    delete this.protocols[protocol];
  }

  get(protocol) {
    if (typeof this.protocols[protocol] !== "function") {
      throw new Error(
        'Protocol `' + protocol + '` is not registered ' +
        'and cannot be handled'
      );
    }

    return this.protocols[protocol];
  }

  has(protocol) {
    return typeof this.protocols[protocol] === "function";
  }
}

module.exports = ProtocolRegistry;
