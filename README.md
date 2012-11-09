yarsta
======

Yet another really small timesheet application.

The lightbulb image is from iconarchive, resized. Thanks to them.

Yarsta is a lab, really. Build a databound set of 'form' controls
and wire them up using a 'presenter' and 'model'.

The Presenter
=============
is a solution to the event thing, and the data binding thing.
jQuery plugins are cool for descriptive work, so "element x is a y".

In the appviewport code we define some view controls:

    var eventLog = $("<span>").IsEventLog();

Inside the $.fn.IsEventLog function:

    Presenter.Register("Event", function(theThing) {
      ...
      //check theThing and $(this).text() or .append() as necessary etc
      ...
    };

Channels correspond to models, so `Model.StaffEvent` is wired to the 
`StaffEvent` channel.

Bound elements look after themselves, so to speak. This is a reaction to
code where the click of a button caused all sorts of elements to refresh -

    $(body).append($("<span>").click(function(e){
      $("#idspan").text(newtext);
      $("#field1").text(newfield1);
      $("#field2").text(newfield2);
    }).attr("id", "clickspan-1"));

Elements register to a GUI channel and receive calls from the Presenter instead.
Then when an element makes a change to the 'context' object (StaffMember x),
the Presenter sends a reference to it to all the registered callback functions,
and they redraw themselves if necessary.

The Model 
==============
is a solution to the decouple the GUI from the server thing. I want to run this
without any server, in 'demo' mode. That is achieved by implementing a 'mock'
server. This server is kind of abstract, so it doesn't really exist in the code
either, there being only the mock data model and its json mock database.

Plugging in the server is a matter of writing some server code to replace
StaffEvents.json and StaffMembers.json, and implementing some client code
to send off the sync messages.

