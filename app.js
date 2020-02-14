// Set up edit and keyCode listen variables.
let edit = false;
let listen = false;

// Set up object for pad IDs and Keycodes
let padShortcuts = {
  'pad1': {
    'id': '#pad1',
    'sound': 'audio/cymbals/cymbal-crash.mp3',
    'keyCode': 81
  },
  'pad2': {
    'id': '#pad2',
    'sound': 'audio/cymbals/cymbal-crash-hard.mp3',
    'keyCode': 87
  },
  'pad3': {
    'id': '#pad3',
    'sound': 'audio/cymbals/cymbal-ride-2.mp3',
    'keyCode': 69
  },
  'pad4': {
    'id': '#pad4',
    'sound': 'audio/cymbals/cymbal-ride.mp3',
    'keyCode': 82
  },
  'pad5': {
    'id': '#pad5',
    'sound': 'audio/hi-hat/hi-hat.mp3',
    'keyCode': 65
  },
  'pad6': {
    'id': '#pad6',
    'sound': 'audio/hi-hat/hi-hat-3.mp3',
    'keyCode': 83
  },
  'pad7': {
    'id': '#pad7',
    'sound': 'audio/hi-hat/hi-hat-4.mp3',
    'keyCode': 68
  },
  'pad8': {
    'id': '#pad8',
    'sound': 'audio/snares/snare.mp3',
    'keyCode': 70
  },
  'pad9': {
    'id': '#pad9',
    'sound': 'audio/snares/snare-80s.mp3',
    'keyCode': 85
  },
  'pad10': {
    'id': '#pad10',
    'sound': 'audio/snares/rimshot.mp3',
    'keyCode': 73
  },
  'pad11': {
    'id': '#pad11',
    'sound': 'audio/toms/tom.mp3',
    'keyCode': 79
  },
  'pad12': {
    'id': '#pad12',
    'sound': 'audio/toms/tom-2.mp3',
    'keyCode': 80
  },
  'pad13': {
    'id': '#pad13',
    'sound': 'audio/toms/tom-3.mp3',
    'keyCode': 72
  },
  'pad14': {
    'id': '#pad14',
    'sound': 'audio/kick/kick.mp3',
    'keyCode': 74
  },
  'pad15': {
    'id': '#pad15',
    'sound': 'audio/kick/kick-2.mp3',
    'keyCode': 75
  },
  'pad16': {
    'id': '#pad16',
    'sound': 'audio/kick/kick-3.mp3',
    'keyCode': 76
  }
};

// Set Copyright Date Automatically
let year = new Date().getFullYear();

$('#copyrightDate').text(function() {
  if (year - 2020 === 0) {
    return year;
  } else {
      return '2020 - ' + year;
  }
});

// Set up Modal Action
function modalAction(elementId, openTriggerId, closeTriggerId, noCloseOnItem) {
  $(openTriggerId).click(function() {
    $(elementId).removeClass('hidden');
  });

  $(closeTriggerId).click(function() {
    $(elementId).addClass('hidden');
  });

  $(elementId).click(function(e) {
    if (noCloseOnItem) {
      if($(e.target).children()[0] != undefined) {
        $(elementId).addClass('hidden');
      }
    } else {
      $(elementId).addClass('hidden');
    }
  });
}

// Register Back to Menu button
$('#back').click(function() {
  $(this).parent().addClass('hidden');
  $('#menu-window').removeClass('hidden');
});

// Open/Close Options Menu
modalAction('#menu-window', '#menu-trigger', '#menuClose', false);

// Open/Close Theme Editor Window
modalAction('#edit-modal', '#edit-theme', '#edit-modal-close', true);

// Dark <--> Light UI
$('#ui-trigger').click(function() {
  let n = $('#ui:checked').length;
  if (n === 0) {
    $('body').addClass('light');
    $('.pad-inner').css('background-color', '#ddd');
    $('#logo').attr('src', 'logo-dark.png');
  } else if (n === 1) {
    $('body').removeClass('light');
    $('.pad-inner').css('background-color', '#333');
    $('#logo').attr('src', 'logo.png');
  }
});

// Show/Hide Undo Changes button
$('#save-layout').click(function() {
  $('#undo').removeClass('hidden');
});

$('#edit-theme').click(function() {
  $('#undo').removeClass('hidden');
});

$('#edit-shortcuts').click(function() {
  $('#undo').removeClass('hidden');
});

$('#undo').click(function() {
  $(this).addClass('hidden');
  location.reload();
});

// Customize Keyboard Shortcuts
$('#edit-shortcuts').click(function() {
  edit = true;
  listen = true;
  $('.pad').css('opacity', '.5');
  $('#save-shortcuts').removeClass('hidden');
  $('#menu-trigger').addClass('hidden');
  $('.pad').click(function() {
    if (edit) {
      $('.pad').css('opacity', '.5');
      $(this).css('opacity', '1.0');
      $('.shortcut-prompt').html('&nbsp;');
      $(this).children('.pad-inner').children('.shortcut-prompt').text('Press any key.');
      $('#save-shortcuts').removeClass('cancel');
      $('#save-shortcuts').text('Save Changes');
      let id = $(this).attr('id');
      let keyCode;
      // Capture Keycode When Key Is Pressed
      $(document).keydown(function(event) {
        if (listen) {
          keyCode = (event.keyCode ? event.keyCode : event.which);
          $.each(padShortcuts, function(index, value) {
            if (index === id) {
              value.keyCode = keyCode;
              registerSound(value.id, value.sound, value.keyCode);
              $('#' + index).find('.shortcut-hint').removeClass('hidden').text(String.fromCharCode(keyCode).toLowerCase());
              $('#' + index).find('.shortcut-prompt').addClass('hidden');
            }
          });
        }
      });
    }
  });
  $('body').click(function(e) {
    if (!$(e.target).closest('.pad').length && edit) {
      $('.pad').css('opacity', '.5');
      $('.shortcut-prompt').html('&nbsp;');
    }
  });
  $('.shortcut-hint').addClass('hidden');
});

$('#save-shortcuts').click(function() {
  edit = false;
  listen = false;
  $(this).addClass('hidden');
  $(this).addClass('cancel');
  $(this).text('Cancel');
  $('#menu-trigger').removeClass('hidden');
  $('.pad').css('opacity', '1.0');
  $('.shortcut-hint').removeClass('hidden');
  $('.shortcut-prompt').html('&nbsp;');
});

// Make Pad flash when clicked.
$('.pad').mousedown(function() {
  if (!edit) {
    $(this).children().css('background-color', accentColor);
  }

  setTimeout(function() {
    if($('body').hasClass('light')) {
      $('.pad-inner').css('background-color', '#ddd');
    } else {
        $('.pad-inner').css('background-color', '#333');
    }
  }, 100);
});

// Change Accent Color based on User input
let accentColor = '#bf37b2';

$('#accent-color').on('change', function() {
  accentColor = $(this).val();
  $('.pad').css({'background-color': accentColor, 'box-shadow': '1px 1px 5px ' + accentColor});
});

// Make pads draggable to reposition them.
$('#edit-layout').click(function() {
  console.log('Edit Layout clicked.');
  edit = true;
  $('.pad').draggable();
  $('.pad').draggable('enable');
  $('.pad').css('opacity', '.5');
  $('#save-layout').removeClass('hidden');
  $('#menu-trigger').addClass('hidden');
});

$('.pad').mousedown(function() {
  if (edit) {
    $(this).css('opacity', '1.0');
    $('#save-layout').text('Save Changes');
    $('#save-layout').removeClass('cancel');
  }
});

$('.pad').mouseup(function() {
  if (edit) {
    $(this).css('opacity', '.5');
  }
});

$('#save-layout').click(function() {
  edit = false;
  $('.pad').draggable('disable');
  $(this).addClass('hidden');
  $(this).addClass('cancel');
  $(this).text('Cancel');
  $('#menu-trigger').removeClass('hidden');
  $('.pad').css('opacity', '1.0');
});

// Pad Sounds Setup
// pad = #id
// sound = filepath to sound
// shortcut = ASCII Code (integer)
function registerSound(pad, sound, shortcut) {
  $(document).keydown(function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == shortcut) {
      if (!edit) {
        $(pad).mousedown();
      }
    }
  });

    $(pad).mousedown(function() {
      if (!edit) {
        let audio = new Audio(sound);
        audio.currentTime = 0;
        audio.play();
      }
    });
}

// Row 1
// Cymbals
registerSound(padShortcuts.pad1.id, padShortcuts.pad1.sound, padShortcuts.pad1.keyCode);
registerSound(padShortcuts.pad2.id, padShortcuts.pad2.sound, padShortcuts.pad2.keyCode);
registerSound(padShortcuts.pad3.id, padShortcuts.pad3.sound, padShortcuts.pad3.keyCode);
registerSound(padShortcuts.pad4.id, padShortcuts.pad4.sound, padShortcuts.pad4.keyCode);

// Row 2
// Hi-Hat
// Snares
registerSound(padShortcuts.pad5.id, padShortcuts.pad5.sound, padShortcuts.pad5.keyCode);
registerSound(padShortcuts.pad6.id, padShortcuts.pad6.sound, padShortcuts.pad6.keyCode);
registerSound(padShortcuts.pad7.id, padShortcuts.pad7.sound, padShortcuts.pad7.keyCode);
registerSound(padShortcuts.pad8.id, padShortcuts.pad8.sound, padShortcuts.pad8.keyCode);

// Row 3
// Snares & Toms
registerSound(padShortcuts.pad9.id, padShortcuts.pad9.sound, padShortcuts.pad9.keyCode);
registerSound(padShortcuts.pad10.id, padShortcuts.pad10.sound, padShortcuts.pad10.keyCode);
registerSound(padShortcuts.pad11.id, padShortcuts.pad11.sound, padShortcuts.pad11.keyCode);
registerSound(padShortcuts.pad12.id, padShortcuts.pad12.sound, padShortcuts.pad12.keyCode);

// Row 4
// Toms & Kick
registerSound(padShortcuts.pad13.id, padShortcuts.pad13.sound, padShortcuts.pad13.keyCode);
registerSound(padShortcuts.pad14.id, padShortcuts.pad14.sound, padShortcuts.pad14.keyCode);
registerSound(padShortcuts.pad15.id, padShortcuts.pad15.sound, padShortcuts.pad15.keyCode);
registerSound(padShortcuts.pad16.id, padShortcuts.pad16.sound, padShortcuts.pad16.keyCode);
