(function($) {
  $.fn.IsNameSelector = function() {
    var me = $(this);
    me.append($("<option>").prop('text', 'Select a name...'));
    for (var i = 0; i < Controller.StaffMember.Count(); i++) {
      var theStaffMember = Controller.StaffMember.Get(i);
      var theOption = $("<option>");
      theOption.prop('value', theStaffMember.id);
      theOption.prop('text', theStaffMember.name);
      me.append(theOption);
    }
    me.change(function(e) {
      var theMember = Controller.StaffMember.GetById(e.target.value);
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
      var theMember = Controller.StaffMember.GetById(memberSelect.val());
      theMember.lastEvent = !theMember.lastEvent;
      var theEvent = Controller.StaffEvent.Create(theMember);
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
      var theMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var theMember = Controller.StaffMember.GetById(theEvent[1]);
      var eventDate = new Date(theEvent[3]);
      var dateStr = "{0} {1} {2} {3}:{4}:{5}".format(
          theMonths[eventDate.getMonth(i)],
          eventDate.getDay().padZero(),
          eventDate.getFullYear(),
          eventDate.getHours().padZero(),
          eventDate.getMinutes().padZero(),
          eventDate.getSeconds().padZero()
      );
      var logText = "{0} {1} {2}".format(dateStr, theMember.name, theEvent[2] ? 'In' : 'Out');
      me.append($("<li>").text(logText).addClass((theEvent[0]%2===0?'a-line':'b-line')));
    };
    for (var i = 0; i < Controller.StaffEvent.Count(); i++) {
      var eachEvent = Controller.StaffEvent.Get(i);
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

