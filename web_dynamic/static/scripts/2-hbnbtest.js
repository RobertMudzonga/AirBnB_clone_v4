$(document).ready(function () {
  checkUncheckAmenities();
  API_CALL();
});

function checkUncheckAmenities () {
  const amenities = {};

  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const values = Object.values(amenities);
    if (values.length > 0) {
      $('div.amenities > h4').text(Object.values(amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
}

// red circle if status ok

function API_CALL () {
  const api = window.location.hostname;
  $.ajax({
    type: 'GET',
    url: `${api}/api/v1/status/`,
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
}
