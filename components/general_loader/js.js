//////////////////////////////////////////////////loaded obj informator
class S_LoadControl {
  elements = [];
  imgElements = [];
  svgElements = [];
  krpElements = [];
  fontElements = [];
  historic = [];
  add = (el, type) => {
    this.elements.push(el);
    switch (type) {
      case "img":
        this.imgElements.push(el);
        break;
      case "svg":
        this.svgElements.push(el);
        break;
      case "krp":
        this.krpElements.push(el);
        break;
      case "font":
        this.fontElements.push(el);
        break;
      default:
        break;
    }
  };
  log = (what = "all") => {
    switch (what) {
      case "all":
        console.log(this.elements.length, " elements charged");
        console.log(this.elements);
        break;
      case "img":
        console.log(this.imgElements.length, " img charged");
        console.log(this.imgElements);
        break;
      case "svg":
        console.log(this.svgElements.length, " svg charged");
        console.log(this.svgElements);
        break;
      case "krp":
        console.log(this.krpElements.length, " krpano charged");
        console.log(this.krpElements);
        break;
      case "font":
        console.log(this.fontElements.length, " fonts charged");
        console.log(this.fontElements);
        break;
      case "historic":
        console.log(this.historic.length, " elements in historic");
        console.log(this.historic);
        break;

      default:
        break;
    }
  };

  get count() {
    return this.elements.length;
  }
  get imgCount() {
    return this.imgElements.length;
  }
  get svgCount() {
    return this.svgElements.length;
  }
  get krpCount() {
    return this.krpElements.length;
  }
  get fontCount() {
    return this.fontElements.length;
  }
  get array() {
    return this.elements;
  }
  get imgArray() {
    return this.imgElements;
  }
  get svgArray() {
    return this.svgElements;
  }
  get fontArray() {
    return this.fontElements;
  }
  get krpArray() {
    return this.krpElements;
  }
  get historic() {
    return this.historic;
  }
  resset = () => {
    this.elements = [];
    this.imgElements = [];
    this.svgElements = [];
    this.krpElements = [];
    this.fontElements = [];
    this.historic.push(this.elements);
  };
  ///////////////////////////////////
  registerSvg = (svg) => {
    // const isFirefox = typeof InstallTrigger !== 'undefined';
    const isFirefox = /Firefox/i.test(navigator.userAgent);
    const isIE = !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const loadEvent = isFirefox ? "SVGLoad" : isIE || isEdge ? "readystatechange" : "load";
    svg.addEventListener(loadEvent, () => {
      this.add(`svg|${svg.id}`, "svg");
      console.log("SVG loaded.");
    });
  };
  registerKrpano = (name) => {
    this.add(`kp|${name}`, "krp");
  };
  registerImage = async (image) => {
    let img = new Image();
    img.src = image;
    img.decode().then(this.add(`image|${image}`, "img"));
  };
  //////////////////////////////////////////////////////////////////fonts al html
  registerFonts = async (font) => {
    document.fonts.load(font, "giItT1WQy@!-/#").then(() => {
      this.add(`font|${font}`, "font");
    });
  };
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////loadeR control
const generalLoadControl = new S_LoadControl();
let krpanoTexts = false;
///////////////////////////////////////////////////////////////////LittlePlanet ready
const first_loadder = document.getElementById("first_loadder");
const svgArr = [
  // document.getElementById("start-svg"),
  // document.getElementById("time-message-wrapper-svg")
];
const imgArr = [
  "../../assets/img/lang_triangle.png",
  "../../assets/img/lang_world.png",
  "../../assets/img/logo_upf.png",
  "../../assets/img/ui_fs_bg.png",
  "../../assets/img/ui_fs_shape.png",
  "../../assets/img/ui_fs.png",
  "../../assets/img/ui_in.png",
  "../../assets/img/ui_out.png",
];
const fontArr = ["16pt lota_regular", "16pt lota_semibold"];

(async () => {
  if (test) {
    first_loadder.style.display = "none";
    await asyncLoopPositive((_) => krpanoTexts);
    politica.textContent = krpano.ui.politica;
    guide.textContent = krpano.ui.guide;
    politica.setAttribute("href", krpano.ui.politica_link);
    return;
  }
  for (const svg of svgArr) {
    generalLoadControl.registerSvg(svg);
  }
  for (const img of imgArr) {
    await generalLoadControl.registerImage(img);
  }
  for (const font of fontArr) {
    await generalLoadControl.registerFonts(font);
  }
  await asyncLoopPositive((_) => generalLoadControl.count === svgArr.length + imgArr.length + fontArr.length && krpanoTexts); 
  first_loadder.style.opacity = "0";
  console.log("he arribat!!", generalLoadControl.count);
  generalLoadControl.log();

  //defintis a js.js
  politica.textContent = krpano.ui.politica;
  guide.textContent = krpano.ui.guide;
  politica.setAttribute("href", krpano.ui.politica_link);

  await asyncLoopPositive((_) => getComputedStyle(first_loadder).opacity === "0");
  first_loadder.style.display = "none";
})();
