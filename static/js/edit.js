// Load the given HTML in the iframe within the given element
function view(viewer_id, html) {
  var iframe = $("#" + viewer_id + " iframe", top.document);
  var doc = iframe[0].contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

// Create a new ACE editor in the div with the given id, and return it
var ace_number = 1;
function new_editor(div) {
  // Create a unique div for the ace editor
  var ace_id = "ace_" + ace_number;
  ace_number += 1;

  // Create a div for ACE to use
  var ace_div = $("<div></div>");
  ace_div.attr("id", ace_id);
  ace_div.attr("class", 'ace');
  ace_div.appendTo(div);

  // Turn it into an editor
  var editor = ace.edit(ace_id);
  // TODO: Make these bits configurable
  var session = editor.getSession();
  session.setMode("ace/mode/html");
  editor.setTheme("ace/theme/github");
  editor.setShowPrintMargin(false);

  return editor;
}

// Attach a viewer with the given ID to the editor with the given ID
function attach_viewer(editor, viewer_id) {

  // Does editor need refreshing?
  var need_refresh = false;
  // How long (in ms) to wait between refreshes, at minimum
  var refresh_interval = 500;
  // Don't refresh if changes occur in rapid succession
  var ignore_threshold = 200;

  // Track timestamp of the last change made in the editor
  var last_changed = new Date().getTime();
  var session = editor.getSession();
  session.on('change', function(e) {
    last_changed = new Date().getTime();
    need_refresh = true;
  });

  // At regular intervals, check for changes and refresh the view
  window.setInterval(function() {
    var now = new Date().getTime();
    // If last keystroke was a while ago, and editor has changed, refresh
    if (now - last_changed > ignore_threshold && need_refresh) {
      // TODO: Generalize viewer so it can be any element, or several elements
      view(viewer_id, editor.getValue());
      need_refresh = false;
    }
    // Otherwise, either the last change was too recent, or the
    // last change has already been refreshed
  }, refresh_interval);

  return false;
}


// Make the given div element into an ACE editor
// TODO: Refactor
function make_editor(div) {
  editor = new_editor(div);

  attach_viewer(editor, "viewer");

  $(div + ' input[name="import_file"]').change(function() {
    function populate_editor(responseText, statusText, xhr, $form) {
      editor.setValue(responseText, -1);
    }
    $(div + " form").ajaxSubmit({success: populate_editor});
  });

  $(div).draggable({cancel: ".ace", containment: "#board"});
  $(div).resizable();
  $(div).resize(function() {
    editor.resize();
  });
}

$(document).ready(function() {
  make_editor("#editor");
});

