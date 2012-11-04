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

  session.on('change', function(e) {
    view(editor.getValue());
  });

  $("#import_file").change(function() {
    function populate_editor(responseText, statusText, xhr, $form) {
      editor.setValue(responseText, -1);
    }
    $("#import_form").ajaxSubmit({success: populate_editor});
  });
}

$(document).ready(function() {
  initialize_editor("ace");
});

