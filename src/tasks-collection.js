define(['backbone-pageable'], function(PageableCollection) {
  var TasksList = Backbone.PageableCollection.extend({
    url: '/engine-rest/task',
    initialize: function() {
      this.on('all', function(evName) {
        console.info('event "'+ evName +'" on tasks collection');
      });
    },
    model: Backbone.Model.extend({
    })
  });

  return TasksList;
});