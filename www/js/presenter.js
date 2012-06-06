
var Presenter = {
  channels: {
    StaffMember: [],
    StaffEvent: []
  },
  Initialize: function(channel, callback) {
    Model[channel].RefreshList(callback);
  },
  Register: function(channel, element) {
    Presenter.channels[channel].push(element);
  },
  Refresh: function(channel, newObj) {
    if(newObj) Model[channel].Set(newObj);
    for (var i = 0; i < Presenter.channels[channel].length; i++) {
      var refreshFunc = Presenter.channels[channel][i];
      refreshFunc(newObj);
    }
  }
};

