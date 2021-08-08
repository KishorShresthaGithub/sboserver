"use strict";

var e = React.createElement;

function Form() {
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var formdata = new FormData(form);
    axios.post("http://localhost:3000/api/gallery/multiple", formdata, {
      headers: {
        "Content-type": "multipart/form-data"
      }
    }).then(function (res) {
      return console.log(res);
    });
  };

  return e("form", {
    onSubmit: function onSubmit(e) {
      return handleSubmit(e);
    }
  }, e("input", {
    placeholder: "Upload file",
    type: "file",
    name: "images",
    multiple: true
  }), e("button", null, "Click me"));
}

var domContainer = document.querySelector("#app");
ReactDOM.render(e(Form), domContainer);