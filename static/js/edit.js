function loadScript(url, callback){
  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState){  //IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
          script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}


// Load the given HTML in the viewer iframe
function view(html) {
  var iframe = $("#viewer iframe", top.document);
  var doc = iframe[0].contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

// Create a new ACE editor in the div with the given id, and return it
function new_editor(div_id) {
  var editor = ace.edit(div_id);
  editor.setTheme("ace/theme/github");
  editor.setShowPrintMargin(false);
  return editor;
}

function initialize_editor(div_id) {
  editor = new_editor(div_id);

  var session = editor.getSession();
  session.setMode("ace/mode/html");

  // Does editor need refreshing?
  var need_refresh = false;
  // How long (in ms) to wait between refreshes, at minimum
  var refresh_interval = 500;
  // Don't refresh if changes occur in rapid succession
  var ignore_threshold = 200;

  // Track timestamp of the last change made in the editor
  var last_changed = new Date().getTime();
  session.on('change', function(e) {
    last_changed = new Date().getTime();
    need_refresh = true;
  });

  // At regular intervals, check for changes and refresh the view
  window.setInterval(function() {
    var now = new Date().getTime();
    // If last keystroke was a while ago, and editor has changed, refresh
    if (now - last_changed > ignore_threshold && need_refresh) {
      view(editor.getValue());
      need_refresh = false;
    }
    // Otherwise, either the last change was too recent, or the
    // last change has already been refreshed
  }, refresh_interval);

  $("#import_file").change(function() {
    function populate_editor(responseText, statusText, xhr, $form) {
      editor.setValue(responseText, -1);
    }
    $("#import_form").ajaxSubmit({success: populate_editor});
  });

  $("#editor").draggable({handle: "#editor_handle"});
}

$(document).ready(function() {
  initialize_editor("ace");
  $("#editor").resizable();
});

