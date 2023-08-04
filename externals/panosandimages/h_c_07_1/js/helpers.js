const getUserDeviceInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);
    const isiPhone = /iphone/.test(userAgent);
  
    let deviceType = "desktop";
    if (isMobile) {
      deviceType = "mobile";
      if (isiPhone) {
        deviceType = "iPhone";
      }
    } else if (window.innerWidth <= 768) {
      deviceType = "tablet";
    }
  
    const getBrowser = () => {
      if (userAgent.indexOf("edge") > -1) return "edge";
      else if (userAgent.indexOf("opr") > -1) return "opera";
      else if (userAgent.indexOf("chrome") > -1) return "chrome";
      else if (userAgent.indexOf("firefox") > -1) return "firefox";
      else if (userAgent.indexOf("safari") > -1) return "safari";
      else if (userAgent.indexOf("trident") > -1) return "ie";
      else return "unknown";
    };
  
    const browser = getBrowser();
  
    return {
      browser,
      deviceType,
      isMobile,
      isiPhone,
    };
  };
  
  const asyncLoopPositive = (condition, time=300) => {
    const whatchIf = (resolve) => {
      if (condition()) {
        resolve();
      } else
        setTimeout((_) => {
          whatchIf(resolve);
        }, time);
    };
    return new Promise(whatchIf);
  };
  
  const fadeInFadeOut = async (id,op,display='none')=>{
  
    document.getElementById(id).style.opacity=op;
    await asyncLoopPositive((_)=>getComputedStyle(document.getElementById(id)).opacity == op,10);
    document.getElementById(id).style.display=display;
  
  }
  
  
  const rgbToHex = (color) => {
    const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const hex = (c) => {
      const hexValue = parseInt(c, 10).toString(16);
      return hexValue.length === 1 ? "0" + hexValue : hexValue;
    };
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  };
  