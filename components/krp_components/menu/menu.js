

const acordionContainerHeight = document.querySelector('.accordion-container').clientHeight;
const itemCampusHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--item-campus-height'));
const ctaHeight= parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cta-container-height'));
const accordions = document.querySelectorAll('.accordion-menu');
const menuPanel = document.getElementById('menu-panel');
const closeMenu = document.getElementById('close_menu');

const closeAllExcept = (currentMenu) => {
    accordions.forEach(menu => {
        if (menu !== currentMenu) {
            menu.querySelector('.accordion-content').style.height = '0';
        }
    });
};
const addOverflowHidden = () => {
    document.querySelectorAll('.accordion-content').forEach(element => {
        element.style.overflowY = 'hidden';
    });
    setTimeout(() => {
        document.querySelectorAll('.accordion-content').forEach(element => {
            element.style.overflowY = 'auto';
            element.scrollTop = 0;
        });
    }
        , 300);
};
const toggleCampusAndloadPanorama = (event, menuId) => {
    addOverflowHidden();
    const element = event.currentTarget; // o event.target, depenent del teu cas d'ús
    const sceneName = element.getAttribute('id');
    
    const content = document.getElementById(menuId);
    const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;

    if (content.style.height && content.style.height !== '0px') {
        console.log("Intentant tancar el menú, però no permetem que es tanqui ell mateix"); 
        krpano.actions.trace(`vaig a -> ${sceneName}`);
        krpano.call('s_loadsc(' + sceneName +')');
        // makeInvisibleAndNonInteractive(menuPanel);
        return;
    }
    
    closeAllExcept(content.closest('.accordion-menu'));
    const desiredHeight = Math.min(content.scrollHeight, maxHeight);
    content.style.height = desiredHeight + 'px';
    
    // Aquí pots afegir la funcionalitat per carregar la panoràmica basant-te en sceneName
    krpano.actions.trace(`vaig a -> ${sceneName}`);
    krpano.call('s_loadsc(' + sceneName +')');
    // makeInvisibleAndNonInteractive(menuPanel);
    
};
const loadPanorama=(event)=>{
    const element = event.currentTarget; // o event.target, depenent del teu cas d'ús
    const sceneName = element.getAttribute('id');
    krpano.actions.trace(`vaig a -> ${sceneName}`);
    krpano.call('s_loadsc(' + sceneName +')');
    
}



const updateOpenClose = (sceneName) => {
    const contentBalmes = document.getElementById('menuBalmes');
    const contentCiutadella = document.getElementById('menuCiutadella');
    const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;

    // Comprova si el nom de la escena conté '_c_' (per Ciutadella) o '_b_' (per Balmes)
    if (sceneName.includes('_c_')) {
        // Obre el menú 'menuCiutadella'
        contentBalmes.style.height = '0px';
        const desiredHeightCiutadella = Math.min(contentCiutadella.scrollHeight, maxHeight);
        contentCiutadella.style.height = desiredHeightCiutadella + 'px';
    } else if (sceneName.includes('_b_')) {
        // Obre el menú 'menuBalmes'
        contentCiutadella.style.height = '0px';
        const desiredHeightBalmes = Math.min(contentBalmes.scrollHeight, maxHeight);
        contentBalmes.style.height = desiredHeightBalmes + 'px';
    } else {
        // Tractament per altres escenes, si és necessari
    }
}

const updateBorder = (sceneName) => {
    // Obtenim l'element de la escena específica
    const sceneElement = document.getElementById(sceneName);

    if (sceneElement) {
        // Obtenim el borde actual de l'element
        const currentBorderStyle = getComputedStyle(sceneElement).borderLeft;
        
        // Comprovem el gruix actual del borde
        const isThinBorder = currentBorderStyle.includes('5px');
        
        // Canviem el color del borde segons el gruix
        sceneElement.style.borderLeft = isThinBorder
            ? '5px solid rgba(200, 16, 46, 1)' // Gruix 5px
            : '8px solid rgba(200, 16, 46, 1)'; // Gruix 8px
    }
    let keepBorderElementId;
    if (sceneName.includes('_b_')) {
        keepBorderElementId = 'scene_b_02';
    } else if (sceneName.includes('_c_')) {
        keepBorderElementId = 'scene_c_02';
    }
    // Recorrem tots els altres elements i els posem en transparent
    indexOfScenes.forEach((item) => {
        if (item !== sceneName) {
            const element = document.getElementById(item);
            if (element) {
                // Obtenim el borde actual de l'element
                const currentBorderStyle = getComputedStyle(element).borderLeft;
                
                // Comprovem el gruix actual del borde
                const isThinBorder = currentBorderStyle.includes('5px');
                
                // Canviem el color del borde segons el gruix actual
                element.style.borderLeft = isThinBorder
                    ? '5px solid rgba(200, 16, 46, 0)' // Gruix 5px
                    : '8px solid rgba(200, 16, 46, 0)'; // Gruix 8px
            }
        }
    });
    // Si hi ha un element que ha de mantenir el seu border, l'ajustem
    if (keepBorderElementId) {
        const keepBorderElement = document.getElementById(keepBorderElementId);
        if (keepBorderElement) {
            keepBorderElement.style.borderLeft = '8px solid rgba(200, 16, 46, 1)';
        }
    }
};


const makeVisibleAndInteractive=(element)=> {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    element.style.transition = 'opacity 0.3s ease-in-out'; // Ajusta la transició segons la teva preferència
}

const makeInvisibleAndNonInteractive=(element)=> {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.transition = 'opacity 0.3s ease-in-out'; // Ajusta la transició segons la teva preferència
}



//////////////////////////////////////LANGUAGA

const highlightLanguage = (clickedElementId) => {
    // Get all elements with the 'lan' class
    const elements = document.getElementsByClassName('lan');

    // Remove the 'underlined' class from all elements
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('underlined');
    }

    // Add the 'underlined' class to the clicked element
    const clickedElement = document.getElementById(clickedElementId);
    clickedElement.classList.add('underlined');
};


















// const utdateHeights = () => {
//     const contentBalmes = document.getElementById('menuBalmes');
//     const contentCiutadella = document.getElementById('menuCiutadella');
//     const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;

//     contentCiutadella.style.height = '0px';
//     const desiredHeightBalmes = Math.min(contentBalmes.scrollHeight, maxHeight);
//     contentBalmes.style.height = desiredHeightBalmes + 'px';

// }
// const utdateHeights = () => {
//     const contentBalmes = document.getElementById('menuBalmes');
//     const contentCiutadella = document.getElementById('menuCiutadella');
//     const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;

//     contentBalmes.style.height = '0px'; // Tanca el menú 'menuBalmes'
//     const desiredHeightCiutadella = Math.min(contentCiutadella.scrollHeight, maxHeight);
//     contentCiutadella.style.height = desiredHeightCiutadella + 'px'; // Obre el menú 'menuCiutadella'
// }

