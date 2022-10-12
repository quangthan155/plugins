const html = `
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
     integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
     crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
     integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="
     crossorigin=""></script>

  <script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>
  <style>
    html,body {
      margin: 0;
      width: 800px;
      height: 200px;
      background: white;
    }
    #wrapper {
      height: 100%;
      padding:24px;
      box-sizing: border-box;
    }
    #map { height: 180px; }
  </style>
  <div id="map"></div>
  

  <script>
    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
    var bbox = turf.bbox(line);
    var bboxPolygon = turf.bboxPolygon(bbox);
    var bbox = turf.bbox(bboxPolygon);
    console.log(bboxPolygon);
    document.getElementById("send").addEventListener("click", function() {
          parent.postMessage("Button is clicked", "*");
    });

    window.addEventListener("message", function (e) {
      if (e.source !== parent) return;
      document.getElementById("msg").textContent = e.data;
    });

    var marker = L.marker([51.5, -0.09]).addTo(map);
  </script>
`;

reearth.ui.show(html);

reearth.on("message", msg => {
  console.log("message received:", msg);
});

reearth.ui.postMessage("Hello world");