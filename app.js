// Set Copyright Date Automatically
let year = new Date().getFullYear();

$('#copyrightDate').text(function() {
  if (year - 2020 === 0) {
    return year;
  } else {
      return '2020 - ' + year;
  }
});

// Open/Close Menu
$('#menu-trigger').click(function() {
  $('#menu-window').removeClass('hidden');
});

$('#menu-close').click(function() {
  $('#menu-window').addClass('hidden');
});

// Change style of Pads when clicked.
$('.pad').click(function(event) {
  $(this).children().addClass('pressed');
  setTimeout(function() {
    $('.pad-inner').removeClass('pressed');
  }, 100);
});
