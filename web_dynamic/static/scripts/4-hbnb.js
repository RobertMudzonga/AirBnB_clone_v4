$(document).ready(function () {
  checkUncheckAmenities();
  API_CALL();
  API_POP();
  API_FILTER();
});

const checkedAmenities = {};

function checkUncheckAmenities () {
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    const values = Object.values(checkedAmenities);
    if (values.length > 0) {
      $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
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

//   Populate fontend
function API_POP () {
  const api = window.location.hostname;
  $.ajax({
    type: 'POST',
    url: `${api}/api/v1/places_search`,
    data: JSON.stringify({}),
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="description">' + data[i].description + '</div></article>');
      }
    }
  });
}

// Filter places by Amenity
function API_FILTER () {
  const api = window.location.hostname;
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: `${api}/api/v1/places_search`,
      data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
      contentType: 'application.json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="description">' + data[i].description + '</div></article>');
        }
      }

    });
  });
}
