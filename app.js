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

// Close menu if menu window is clicked, but not menu item
$('#menu-window').click(function(e) {
  if($(e.target).children()[0] != undefined) {
    $('#menu-window').addClass('hidden');
  }
});

// Dark <--> Light UI
$('#ui-trigger').click(function() {
  let n = $('#ui:checked').length;
  if (n === 0) {
    $('body').addClass('light');
  } else if (n === 1) {
    $('body').removeClass('light');
  }
});

// Change style of Pads when clicked.
$('.pad').mousedown(function(event) {
  $(this).children().addClass('pressed');
  setTimeout(function() {
    $('.pad-inner').removeClass('pressed');
  }, 100);
});

// Pad Sounds Setup
// pad = #id
// sound = filepath to sound
// shortcut = ASCII Code (integer)
function registerSound(pad, sound, shortcut) {
  $(document).keydown(function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == shortcut) {
      $(pad).mousedown();
    }
  });

  $(pad).mousedown(function() {
    let audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play();
  });
}
// Row 1
// Cymbals
registerSound('#pad1', 'audio/cymbals/cymbal-crash.mp3', 81);
registerSound('#pad2', 'audio/cymbals/cymbal-crash-hard.mp3', 87);
registerSound('#pad3', 'audio/cymbals/cymbal-ride-2.mp3', 69);
registerSound('#pad4', 'audio/cymbals/cymbal-ride.mp3', 82);

// Row 2
// Hi-Hat
// Snares
registerSound('#pad5', 'audio/hi-hat/hi-hat.mp3', 65);
registerSound('#pad6', 'audio/hi-hat/hi-hat-3.mp3', 83);
registerSound('#pad7', 'audio/hi-hat/hi-hat-4.mp3', 68);
registerSound('#pad8', 'audio/snares/snare.mp3', 70);

// Row 3
// Snares & Toms
registerSound('#pad9', 'audio/snares/snare-80s.mp3', 85);
registerSound('#pad10', 'audio/snares/rimshot.mp3', 73);
registerSound('#pad11', 'audio/toms/tom.mp3', 79);
registerSound('#pad12', 'audio/toms/tom-2.mp3', 80);

// Row 4
// Toms & Kick
registerSound('#pad13', 'audio/toms/tom-3.mp3', 72);
registerSound('#pad14', 'audio/kick/kick.mp3', 74);
registerSound('#pad15', 'audio/kick/kick-2.mp3', 75);
registerSound('#pad16', 'audio/kick/kick-3.mp3', 76);
