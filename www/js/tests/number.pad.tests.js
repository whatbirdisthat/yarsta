var TestA = function() {

  var expectations = [
    { input: -1, pad:6, expected: '-000001' },
    { input: -1, pad:3, expected: '-001' },
    { input: 12, pad:2, expected: '12' },
    { input: -12, pad:2, expected: '-12' },
    { input: 126000, pad:9, expected: '000126000' },
    { input: -1200.5, pad:8, expected: '-001200.5' },
    { input: -923.424, pad:6, expected: '-923.424' },
    { input: -1024.768, pad:10, expected: '-001024.768' },
    { input: 1208.9292, pad:10, expected: '01208.9292' },
    { input: -12.4245, pad:12, expected: '-0000012.4245' },
    { input: 126000, pad:9, expected: '000126000' },
    { input: -1200.5, pad:null, expected: '-1200.5' },
    { input: 1, pad:2, expected: '01' }
  ];

  var starttime = new Date().getTime();

  var stringA = "";
  for (var exp in expectations) {
    var input = expectations[exp].input;
    var expected = expectations[exp].expected;
    var pad = expectations[exp].pad;
    if (input.pad(pad) != expected) {
      console.info("input: {0}, pad: {1},  expected: {2}, actual: {3}"
          .format(input, pad, expected, input.pad(pad)));
      throw ("Test Assertion Failed.");
    }
  }

  var endtime = new Date().getTime();
  var timetaken = (endtime - starttime);

  return "Test A took {0}ms".format(timetaken);
};

var theNumbers = [];
for (var i = -10000; i < 10000; i++) {
  theNumbers.push(i);
}

function TestB() {
  var str = "";
  var num;
  var starttime = new Date().getTime();

  var endtime = new Date().getTime();
  var timetaken = (endtime - starttime);
  return "Test B took {0}ms".format(timetaken);
}


function TestC() {
  var str = "";
  var num;
  var starttime = new Date().getTime();

  var endtime = new Date().getTime();
  var timetaken = (endtime - starttime);
  return "Test C took {0}ms".format(timetaken);
}


