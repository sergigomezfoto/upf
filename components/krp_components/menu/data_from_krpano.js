const getDataFromKrpano = () => {
    const krpanoMenu = [];
    const balmesIndex = 0;
    const ciutadellaIndex = krpano.get("global.firstcituadellaindex");
    const balmesfs = krpano.get("global.firstbalmesseparator");
    const balmesss = krpano.get("global.secondbalmesseparator");
    const ciutadellafs = krpano.get("global.firstciutadellaseparator");
    const ciutadellass = krpano.get("global.secondciutadellaseparator");
  
    const krpanoScenesArray = krpano.scene.getArray();
    krpanoScenesArray.forEach((scene, i) => {
      let sceneObject = { name: "", title: "" };
      let titleObject = {
        name: "",
        campus: "",
      };
      let separatorObject = {
        separator: "",
      };
  
      if (balmesfs === i || i === ciutadellafs) {
        separatorObject.separator = krpano.separators.common;
        krpanoMenu.push(separatorObject);
      }
      if (balmesss === i || i === ciutadellass) {
        separatorObject.separator = krpano.separators.classrooms;
        krpanoMenu.push(separatorObject);
      }
      if (ciutadellaIndex === i || balmesIndex === i) {
        titleObject.campus = krpano.campus[balmesIndex === i ? "balmes" : "ciutadella"];
        titleObject.name = scene.name;
        krpanoMenu.push(titleObject);
        return;
      }
  
      sceneObject.name = scene.name;
      let dataObject = `${scene.name.replace("scene_", "")}_title`;
      sceneObject.title = krpano.data.getItem(dataObject).content;
      krpanoMenu.push(sceneObject);
    });
    console.log(krpanoMenu);
    return krpanoMenu;
  };

