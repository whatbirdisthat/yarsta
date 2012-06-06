var Controller = {
  StaffMember : {
    Count: function() {
      return Staff.Members.length;
    },
    Get: function(index) {
      return Staff.Members[index];
    },
    GetById: function(id) {
      var returnval = null;
      for (var i = 0; i < Staff.Members.length; i++) {
        var theMember = Staff.Members[i];
        if (theMember.id == id) {
          returnval = theMember;
          break;
        }
      }
      return returnval;
    },
    Set: function(newObj) {
      for (var i = 0; i < Staff.Members.length; i++) {
        var theMember = Staff.Members[i];
        if (theMember.id == newObj.id) {
          Staff.Members[i] = newObj;
          break;
        }
      }
    }
  },
  StaffEvent: {
    Count: function() {
      return Staff.Events.length;
    },
    Get: function(index) {
      return Staff.Events[index];
    },
    Set: function(newObj) {
      for (var i = 0; i < Staff.Events.length; i++) {
        var theEvent = Staff.Events[i];
        if (theEvent[0] == newObj[0]) {
          Staff.Events[i] = newObj;
          break;
        }
      }
    },
    Add: function(newEvent) {
      Staff.Events.push(newEvent);
    },
    Create: function(staffMember) {
      var eventID = Staff.Events.length;
      var thisDate = new Date();
      var theEvent = [eventID, staffMember.id, staffMember.lastEvent, thisDate.getTime()];
      Staff.Events.push(theEvent);
      return theEvent;
    }
  }
};
var Presenter = {
  channels: {
    StaffMember: [],
    StaffEvent: []
  },
  Register: function(channel, element) {
    Presenter.channels[channel].push(element);
  },
  Refresh: function(channel, newObj) {
    if(newObj) Controller[channel].Set(newObj);
    for (var i = 0; i < Presenter.channels[channel].length; i++) {
      var refreshFunc = Presenter.channels[channel][i];
      refreshFunc(newObj);
    }
  }
};

