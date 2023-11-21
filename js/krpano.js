var krpano = null;

const getStartScene = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const startSceneParam = urlParams.get("sc");
  if (startSceneParam !== null && /^[0-9]+$/.test(startSceneParam)) {
      const startSceneValue = parseInt(startSceneParam);
      if (startSceneValue >= 0 && startSceneValue <= 100) {
          return startSceneValue;
      }
  }
  return null;
};

const getLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let languageParam = urlParams.get("ln");
  const validLanguages = ["es", "ca", "en"];
  if (languageParam !== null && validLanguages.includes(languageParam)) {
      return languageParam;
  }
  return null;
};

let lang = "es";
let sc = 0;

const startSceneParam = getStartScene();
const languageParam = getLanguage();
if (startSceneParam !== null) {
  sc = startSceneParam;
}

if (languageParam !== null) {
  lang = languageParam;
}
document.getElementById(lang).classList.add("underlined");

//TOUR
embedpano({
  xml: "tour.xml",
  target: "pano",
  passQueryParameters: false,
  mobilescale: 1.0,
  consolelog: true,
  bgcolor: "#ffffff",
  onready: krpano_onready_callback,
  initvars: {
    mobile: mobile,
    test: test,
    language: lang,
    startscene: sc,
  },
});



function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;

}

