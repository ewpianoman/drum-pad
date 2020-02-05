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

// Pad Sounds Setup
// pad = #id
// sound = filepath to sound
function registerSound(pad, sound, shortcut) {
  $(pad).click(function() {
    let audio = new Audio(sound);
    audio.currentTime = 0;
    audio.play();
  });
}
// Row 1
// Cymbals
registerSound('#pad1', 'audio/cymbals/cymbal-crash.mp3');
registerSound('#pad2', 'audio/cymbals/cymbal-crash-hard.mp3');
registerSound('#pad3', 'audio/cymbals/cymbal-ride-2.mp3');
registerSound('#pad4', 'audio/cymbals/cymbal-ride.mp3');

// Row 2
// Hi-Hat
// Snares
registerSound('#pad5', 'audio/hi-hat/hi-hat.mp3');
registerSound('#pad6', 'audio/hi-hat/hi-hat-2.mp3');
registerSound('#pad7', 'audio/cymbals/hi-hat/hi-hat-3.mp3');
registerSound('#pad8', 'audio/snares/snare.mp3');

// Row 3
// Snares & Toms
registerSound('#pad9', 'audio/snares/snare-80s.mp3');
registerSound('#pad10', 'audio/snares/rimshot.mp3');
registerSound('#pad11', 'audio/toms/tom.mp3');
registerSound('#pad12', 'audio/toms/tom-2.mp3');

// Row 4
// Toms & Kick
registerSound('#pad13', 'audio/toms/tom-3.mp3');
registerSound('#pad14', 'audio/kick/kick.mp3');
registerSound('#pad15', 'audio/kick/kick-2.mp3');
registerSound('#pad16', 'audio/kick/kick-3.mp3');
