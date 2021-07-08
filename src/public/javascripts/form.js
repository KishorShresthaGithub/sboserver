"use strict";

const e = React.createElement;

function Form() {
  var handleSubmit = function (e) {
    e.preventDefault();
    var form = e.target;
    var formdata = new FormData(form);

    axios
      .post("http://localhost:3000/api/gallery/multiple", formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res));
  };

  return e(
    "form",
    { onSubmit: (e) => handleSubmit(e) },
    e("input", {
      placeholder: "Upload file",
      type: "file",
      name: "images",
      multiple: true,
    }),
    e("button", null, "Click me")
  );
}

const domContainer = document.querySelector("#app");
ReactDOM.render(e(Form), domContainer);
