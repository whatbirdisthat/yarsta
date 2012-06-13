(function($){

  $.fn.IsApplicationViewport = function() {
    var testoutput = TestA();
    $(this).append($("<pre>").text(testoutput));
    testoutput = TestB();
    $(this).append($("<pre>").text(testoutput));
    testoutput = TestC();
    $(this).append($("<pre>").text(testoutput));

    return $(this);
  };

})(jQuery);

$(function() {

  $("#appviewport").IsApplicationViewport();

});
