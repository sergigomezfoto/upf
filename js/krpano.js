var krpano = null;

//TOUR
embedpano({
  xml: "tour.xml",
  target: "pano",
  passQueryParameters: "startscene,startlookat",
  mobilescale: 1.0,
  consolelog: true,
  bgcolor: "#ffffff",
  onready: krpano_onready_callback,
  initvars: {
    test: test,
    language: "spanish",
  },
});

function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;
}