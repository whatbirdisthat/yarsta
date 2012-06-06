
var Model = {
  Datasource: {
    get: function(modelname, callback) {
      $.ajax({
        async: false,
        url: "js/{0}.json".format(modelname),
        error: function(err,msg,exc) {
          console.info(msg);
          console.info(err);
        },
        success: function(serverResponse) {
          Model[modelname].list = serverResponse;
          callback();
        }
      });
    }
  },
  StaffMember : {
    list: null,
    RefreshList: function(callback) {
      Model.Datasource.get("StaffMember", callback);
    },
    Count: function() {
      if (Model.StaffMember.list === null) {
        Model.StaffMember.RefreshList();
      }
      return Model.StaffMember.list.length;
    },
    Get: function(index) {
      if (Model.StaffMember.list === null) {
        Model.StaffMember.RefreshList();
      }
      return Model.StaffMember.list[index];
    },
    GetById: function(id) {
      var returnval = null;
      for (var i = 0; i < Model.StaffMember.list.length; i++) {
        var theMember = Model.StaffMember.list[i];
        if (theMember.id == id) {
          returnval = theMember;
          break;
        }
      }
      return returnval;
    },
    Set: function(newObj) {
      for (var i = 0; i < Model.StaffMember.list.length; i++) {
        var theMember = Model.StaffMember.list[i];
        if (theMember.id == newObj.id) {
          Model.StaffMember.list[i] = newObj;
          //send off the new value to the serveri as JSON
          break;
        }
      }
    }
  },
  StaffEvent: {
    list: null,
    RefreshList: function(callback) {
      Model.Datasource.get("StaffEvent", callback);
    },
    Count: function() {
      return Model.StaffEvent.list.length;
    },
    Get: function(index) {
      //Staff.Events should be a lazy loaded data set
      return Model.StaffEvent.list[index];
    },
    Set: function(newObj) {
      for (var i = 0; i < Model.StaffEvent.list.length; i++) {
        var theEvent = Model.StaffEvent.list[i];
        if (theEvent[0] == newObj[0]) {
          Model.StaffEvent.list[i] = newObj;
          //send off the update to the server
          break;
        }
      }
    },
    Create: function(staffMember) {
      var eventID = Model.StaffEvent.list.length;
      var thisDate = new Date();
      var theEvent = [eventID, staffMember.id, staffMember.lastEvent, thisDate.getTime()];
      Model.StaffEvent.list.push(theEvent);
      //send off the new value to the server
      return theEvent;
    }
  }
};

