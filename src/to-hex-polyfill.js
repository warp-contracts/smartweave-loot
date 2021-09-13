// const oldBigInt = BigInt;
// BigInt = function(arg) {
//   console.log({arg});
//   if (typeof arg == 'string' && arg.includes(',')) {
//     const newBuffer = new Uint8Array(arg.split(','));
//     const hex = '0x' + toHexString(newBuffer);
//     console.log({newBuffer});
//     console.log({ hex });
//     return oldBigInt(hex);
//   } else {
//     return oldBigInt(arg);
//   }
// }

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

const originalToString = Array.prototype.toString;
Uint8Array.prototype.toString = function(...params) {
  if (params[0] == "hex") {
    return toHexString(this);
  } else {
    return originalToString(...params).bind(this);
  }
}
