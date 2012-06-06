(function($) {
  $.fn.IsNameSelector = function() {
    var me = $(this);
    me.append($("<option>").prop('text', 'Select a name...'));
    for (var i = 0; i < Model.StaffMember.Count(); i++) {
      var theStaffMember = Model.StaffMember.Get(i);
      var theOption = $("<option>");
      theOption.prop('value', theStaffMember.id);
      theOption.prop('text', theStaffMember.name);
      me.append(theOption);
    }
    me.change(function(e) {
      var theMember = Model.StaffMember.GetById(e.target.value);
      Presenter.Refresh('StaffMember', theMember);
    });
    return me;
  };
  $.fn.IsIDField = function() {
    var me = $(this);
    me.prop('type', 'text').hide();
    Presenter.Register('StaffMember', function(theMember){
      if (!theMember) {
        me.val('').hide();
      } else {
        me.val(theMember.id).show();
        me.focus();
      }
    });
    return me;
  };
  $.fn.IsClockInOutButton = function() {
    var me = $(this);
    me.hide();
    Presenter.Register('StaffMember', function(theMember) {
      if (!theMember) {
        me.hide();
        return;
      }
      if (theMember.lastEvent) {
        me.text('Clock Out');
      } else {
        me.text('Clock In');
      }
      me.show();
    });
    me.click(function(e) {
      var memberSelect = me.parent().find("select");
      var theMember = Model.StaffMember.GetById(memberSelect.val());
      theMember.lastEvent = !theMember.lastEvent;
      var theEvent = Model.StaffEvent.Create(theMember);
      Presenter.Refresh('StaffEvent', theEvent);
      Presenter.Refresh('StaffMember', theMember);
    });
    return me;
  };
  $.fn.IsActivityIndicator = function(memberSelect) {
    var me = $(this);
    me.addClass('activity-indicator');
    Presenter.Register('StaffMember',function(theMember) {
      if (!theMember){
        me.hide();
        return;
      }
      if (theMember.lastEvent) {
        me.addClass('indicator-active').removeClass('indicator-inactive');
      } else {
        me.addClass('indicator-inactive').removeClass('indicator-active');
      }
      me.show();
    });
    return me;
  };
  $.fn.IsEventLog = function() {
    var me = $(this);
    var appendToLog = function(theEvent) {
      var theMember = Model.StaffMember.GetById(theEvent[1]);
      var eventDate = new Date(theEvent[3]);
      var inOrOut = theEvent[2] ? 'In' : 'Out';
      var logText = "{0} {1} {2}".format(eventDate, theMember.name, inOrOut);
      me.append($("<li>").text(logText).addClass((theEvent[0]%2===0?'a-line':'b-line')));
    };
    for (var i = 0; i < Model.StaffEvent.Count(); i++) {
      var eachEvent = Model.StaffEvent.Get(i);
      appendToLog(eachEvent);
    }
    Presenter.Register("StaffEvent", function(theEvent){
      appendToLog(theEvent);
    });
    return me;
  };
  $.fn.IsApplicationViewport = function() {
    var memberSelect = $("<select>").IsNameSelector();
    $(this).append(memberSelect);
    $(this).append($("<input>").IsIDField());
    $(this).append($("<button>").IsClockInOutButton());
    $(this).append($("<span>").IsActivityIndicator(memberSelect));
    $(this).append($("<ol>").IsEventLog());
    return $(this);
  };
})(jQuery);
$(function() {
  $("#apptitle").text("Online Timesheet Sign-in");
  $("#appviewport").IsApplicationViewport();
});

