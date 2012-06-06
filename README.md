yarsta
======

Yet another really small timesheet application

The lightbulb image is from iconarchive, resized. Thanks to them.

Yarsta is a lab, really. Build a databound set of 'form' controls
and wire them up using a 'presenter' and 'controller'.

The Presenter
=============
is a solution to the event thing, and the data binding thing.
jQuery plugins are cool for descriptive work, so "element x is a y".

    var activityMonitor = $("<span>").IsActivityMonitor();

Inside the $.fn.IsActivityMonitor function:

    Presenter.Register("ActiveThing", function(theThing) {
      ...
      //check theThing and $(this).text() or .append() as necessary etc
      ...
    };

So bound elements look after themselves, so to speak. This is a reaction to
code where the click of a button caused all sorts of elements to refresh -
only that code was inside the click handler and all the elements had to be
jQuery.find()'ed ... Elements register to a GUI channel and receive calls
from the Presenter instead. Then when an element makes a change to the
'context' object (StaffMember x), the Presenter sends a reference to it
too all the registered callback functions.

The Controller
==============
is a solution to the decouple the GUI from the server thing. I want to run this
without any server, in 'demo' mode. That is achieved by implementing a 'mock'
server. This server is kind of abstract, so it doesn't really exist in the code
either, there being only the controller and its staff.js mock database.

Plugging in a real server is a matter of re-implementing the controller.


