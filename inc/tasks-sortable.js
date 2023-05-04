jQuery(document).ready(function($) {
  if ($(".tasks-list").length) {
      var sortables = [];

      $(".tasks-list").each(function() {
          var sortable = new Sortable(this, {
              animation: 150,
              group: 'shared',
              onUpdate: function(evt) {
                  var tasksOrder = sortable.toArray();
                  $.ajax({
                      url: ajaxObject.ajaxUrl,
                      method: 'POST',
                      data: {
                          action: 'update_tasks_order',
                          tasks_order: tasksOrder
                      },
                      success: function(response) {
                          console.log(response);
                      }
                  });
              },
              onAdd: function(evt) {
                  var task_id = $(evt.item).data('id');
                  var term_id = $(evt.to).data('term-id');
                  $.ajax({
                      url: ajaxObject.ajaxUrl,
                      method: 'POST',
                      data: {
                          action: 'update_tasks_taxonomy',
                          task_id: task_id,
                          term_id: term_id
                      },
                      success: function(response) {
                          console.log(response);
                      }
                  });
              }
          });
          sortables.push(sortable);
      });
  }
});



// Add this code to tasks-sortable.js
jQuery(document).ready(function($) {
    $('.read-more').on('click', function() {
        var taskId = $(this).data('id');
        var dialog = document.querySelector('#task-content-' + taskId);
        dialog.showModal();
    });

    $('.close-dialog').on('click', function() {
        var taskId = $(this).data('id');
        var dialog = document.querySelector('#task-content-' + taskId);
        dialog.close();
    });

    // Add this event listener to close the dialog when clicking outside
    $('dialog').on('click', function(event) {
        if (event.target === this) {
            this.close();
        }
    });
});
