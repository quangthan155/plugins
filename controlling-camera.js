const html = `
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
  <style>
    html,body {
        margin: 0;
        width: 300px;
        height: 590px;
        background: #ffffffa6;
    }
    #wrapper {
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    #form-btn {
        margin-top: 15px;
    }
  </style>

  <div id="wrapper">
    <div class="col-md-12">
      <form class="form-horizontal">
      <div class="form-group">
        <label for="lng">Lng (°)</label>
        <input class="form-control" type="number" step=any id="lng" value="139.78" />
      </div>
      <div class="form-group">
        <label for="lng">Lat (°)</label>
        <input class="form-control" type="number" step=any id="lat" value="35.68" />
      </div>
      <div class="form-group">
        <label for="lng">Height (m)</label>
        <input class="form-control" type="number" step=any id="height" value="10000" /> 
      </div>
      <div class="form-group">
        <label for="lng">Heading</label>
        <input class="form-control" type="number" step=any id="heading" value="0" step="0.1"/>
      </div>
      <div class="form-group">
        <label for="lng">Pitch</label>
        <input class="form-control" type="number" step=any id="pitch" value="-1.5" step="0.1"/>
      </div>
      <div class="form-group">
        <label for="lng">Roll (work for fly to)</label>
        <input class="form-control" type="number" step=any id="roll" value="0" step="0.1"/>
      </div>
      <div class="form-group">
        <label for="lng">Range (work for look at) (m) </label>
        <input class="form-control" type="number" step=any id="range" value="10000" />
      </div>
      <div class="form-group">
        <label for="lng">Duration:(work for look at) (s)</label>
        <input class="form-control" type="number" step=any id="duration" value="2" step="0.1"/>
      </div>
      <div id="form-btn">
      <button class="btn btn-primary" id="fly">Fly to</button> 
      <button class="btn btn-success" id="look">Look at</button>
      </div>
    </div>
  </div>

  <script>
    const getValues = () => ({
      lng: parseFloat(document.getElementById("lng").value||0),
      lat: parseFloat(document.getElementById("lat").value||0),
      height: parseFloat(document.getElementById("height").value||0),
      heading: parseFloat(document.getElementById("heading").value||0),
      pitch: parseFloat(document.getElementById("pitch").value||0),
      roll: parseFloat(document.getElementById("roll").value||0),
      range: parseFloat(document.getElementById("range").value||0),
      duration: parseFloat(document.getElementById("duration").value||0),
    });
    $(document).ready(function(){

    });
    document.getElementById("fly").addEventListener("click", () => {
      parent.postMessage({ fly: getValues() }, "*");
    });

    document.getElementById("look").addEventListener("click", () => {
      parent.postMessage({ look: getValues() }, "*");
    });
  </script>
`;

reearth.ui.show(html);

reearth.on("message", msg => {
  if (msg.fly) {
      reearth.camera.flyTo({
        lat: msg.fly.lat,            // degrees
        lng: msg.fly.lng,            // degrees
        height: msg.fly.height,      // meters
        heading: msg.fly.heading,    // radians
        pitch: msg.fly.pitch,        // radians
        roll: msg.fly.roll,          // radians
      }, {
        duration: msg.fly.duration   // seconds
      });
  } else if (msg.look) {
      reearth.camera.lookAt({
        lat: msg.look.lat,          // degrees
        lng: msg.look.lng,          // degrees
        height: msg.look.height,    // meters
        heading: msg.look.heading,  // radians
        pitch: msg.look.pitch,      // radians
        range: msg.look.range,      // meters
      }, {
        duration: msg.look.duration // seconds
      });
  }
});