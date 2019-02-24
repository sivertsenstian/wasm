function increment(num) {
  return num + 1;
};

// V8 compiler is lazy, so call to make it actually do work..
increment(10);

// --print-bytecode
