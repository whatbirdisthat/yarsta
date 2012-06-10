String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(orig,num) {
    return typeof args[num] != 'undefined' ? args[num] : orig;
  });
};

Number.prototype.pad = function(intPad) {
  if (this<0) {
    return "-" + (this-this*2).pad(intPad);
  }
  var newThis = this.toString();
  var reqPad = intPad - newThis.length;
  if (reqPad > 0) {
    return '0000000000000000'.substr(0,reqPad) + this;
  }
  return newThis;
};

Date.prototype.toString = function() {
  var theMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var dateStr = "{0} {1} {2} {3}:{4}:{5}".format(
    theMonths[this.getMonth()],
    this.getDay().pad(),
    this.getFullYear(),
    this.getHours().pad(),
    this.getMinutes().pad(),
    this.getSeconds().pad()
  );
  return dateStr;
};

