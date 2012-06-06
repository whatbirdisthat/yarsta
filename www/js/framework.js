Date.prototype.toString = function() {
  var theMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var dateStr = "{0} {1} {2} {3}:{4}:{5}".format(
    theMonths[this.getMonth()],
    this.getDay().padZero(),
    this.getFullYear(),
    this.getHours().padZero(),
    this.getMinutes().padZero(),
    this.getSeconds().padZero()
  );
  return dateStr;
};
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

