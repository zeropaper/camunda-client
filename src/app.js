define('camunda-client', [
  'backbone',
  'underscore',
  './search-view',
  './tasks-view',
  './task-details-view',
  './tasks-collection'
], function(Backbone, _, SearchView, TasksView, TaskDetailsView, TasksCollection) {
  var $ = Backbone.$;
  var App = Backbone.Router.extend({
    routes: {
      '':             'homePage',
      'tasks':        'tasksPage',
      'tasks/:id':    'taskDetailsPage'
    },
    initialize: function() {
      var list = new TasksCollection();

      this.listView = new TasksView({
        collection: list
      });


      // this.searchView = VS.init({
      //   container : $('.search'),
      //   query     : '',
      //   callbacks : {
      //     search: function(query, searchCollection) {
      //       console.info('search query', query);
      //     },
      //     facetMatches : function(callback) {
      //       callback([
      //         'assignee', 'name', 'description'
      //       ]);
      //     },
      //     valueMatches: function(facet, searchTerm, callback) {
      //       var values = [];
      //       switch (facet) {
      //         case 'assignee':
      //         break;
      //         case 'name':
      //         break;
      //         case 'description':
      //         break;
      //       }
      //       callback(values);
      //     }
      //     // search       : function(query, searchCollection) {},
      //     // facetMatches : function(callback) {},
      //     // valueMatches : function(facet, searchTerm, callback) {}
      //   }
      // });
    },
    
    homePage: function() {
      // TODO: something else for the homePage
      this.tasksPage();
    },
    tasksPage: function() {
      $('.results')
        .empty()
        .append(this.listView.el)
      ;

      this.listView.collection.fetch({});
    },
    taskDetailsPage: function() {

    }
  });

  return App;
});