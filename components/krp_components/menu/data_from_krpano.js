const getDataFromKrpano = () => {
  const krpanoMenu = [];
  const balmesIndex = 0;
  const ciutadellaIndex = krpano.get("global.firstcituadellaindex");
  const balmesfs = krpano.get("global.firstbalmesseparator");
  const balmesss = krpano.get("global.secondbalmesseparator");
  const ciutadellafs = krpano.get("global.firstciutadellaseparator");
  const ciutadellass = krpano.get("global.secondciutadellaseparator");
  let count = 0;

  const krpanoScenesArray = krpano.scene.getArray();
  krpanoScenesArray.forEach((scene, i) => {
    let sceneObject = { id: "", title: "" };
    let titleObject = {
      id: "",
      title: "",
    };
    let separatorObject = {
      id: "",
      title: "",
    };

    if (balmesfs === i || i === ciutadellafs) {
      count++;
      separatorObject.id = `s_${count}`;
      separatorObject.title = krpano.separators.common;
      krpanoMenu.push(separatorObject);
    }
    if (balmesss === i || i === ciutadellass) {
      count++;
      separatorObject.id = `s_${count}`;
      separatorObject.title = krpano.separators.classrooms;
      krpanoMenu.push(separatorObject);
    }
    if (ciutadellaIndex === i || balmesIndex === i) {
      titleObject.title = krpano.campus[balmesIndex === i ? "balmes" : "ciutadella"];
      titleObject.id = scene.name;
      krpanoMenu.push(titleObject);
      return;
    }

    sceneObject.id = scene.name;
    let dataObject = `${scene.name.replace("scene_", "")}_title`;
    sceneObject.title = krpano.data.getItem(dataObject).content;
    krpanoMenu.push(sceneObject);
  });

  const extractLinkData = (str) => {
    const regex = /\[a href='(.*?)'\](.*?)\[\/a\]/;
    const match = str.match(regex);

    if (match) {
      const [, url, title] = match;
      return { url, title };
    }
    return null;
  };

  const cta1 = {
    id: "cta_1",
    title: extractLinkData(krpano.ui.cta_1).title,
    url: extractLinkData(krpano.ui.cta_1).url,
  };
  const cta2 = {
    id: "cta_2",
    title: extractLinkData(krpano.ui.cta_2).title,
    url: extractLinkData(krpano.ui.cta_2).url,
  };
  krpanoMenu.push(cta1);
  krpanoMenu.push(cta2);
  const updateTextContent = (data) => {
    data.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element && !item.url) {
        element.textContent = item.title;
      }
      if (element && item.url) {
        element.href = item.url; // Això és útil per als enllaços
        element.innerHTML = `<span>${item.title}</span>`;
      }
    });
  };
  updateTextContent(krpanoMenu);
  console.log(krpanoMenu);
  return krpanoMenu;
};
