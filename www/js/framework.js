Number.prototype.padZero = function() {
  var val = this;
  var newThis = this;
  if (this < 10 && this > -1) {
    newThis = "0" + this;
  }
  return newThis;
};
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(orig,num) {
    return typeof args[num] != 'undefined' ? args[num] : orig;
  });
};

