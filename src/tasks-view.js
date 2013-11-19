define(['backbone'], function(Backbone) {
  var TasksList = Backbone.View.extend({
    tagName: 'ol',
    className: 'tasks-list',
    
    initialize: function() {
      this.listenTo(this.collection, 'sort', this.render);
      this.taskTmpl = _.template('<li data-id="<%- id %>"><strong><%- name %></strong> -'+
                                 '<span class="priority"><%= priority %></span></li>');
    },
    
    render: function() {
      var tmpl = this.taskTmpl;
      var lis = this.collection.map(function(task) {
        return tmpl(task.toJSON());
      });
      this.$el.html(lis.join('\n'));
    }
  });
  return TasksList;
});