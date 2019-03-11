// belongs_to form
$(function() {
  $(".field-unit--belongs-to-search select").each(function initializeSelectize(index, element) {
    var $element = $(element);
    $element.selectize({
      preload: true,
      valueField: 'id',
      labelField: 'dashboard_display_name',
      searchField: 'dashboard_display_name',
      createOnBlur: true,
      searchUrl: $element.data('url') + '?per_page=10000&search=',
      create: function() {
        url = $element.data('url').replace('.json', '/new');
        window.location = url;
      },
      load: function(query, callback) {
        // if (!query.length) return callback();
        var searchUrl = this.settings.searchUrl;
        $.ajax({
          url: searchUrl + encodeURIComponent(query),
          type: 'GET',
          error: function() {
            callback();
          },
          success: function(res) {
            callback(res.resources);
          }
        });
      },
    });
  });
});
