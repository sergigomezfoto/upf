

const acordionContainerHeight = document.querySelector('.accordion-container').clientHeight;
const itemCampusHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--item-campus-height'));
const ctaHeight= parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cta-container-height'));

const accordions = document.querySelectorAll('.accordion-menu');

const closeAllExcept = (currentMenu) => {
    accordions.forEach(menu => {
        if (menu !== currentMenu) {
            menu.querySelector('.accordion-content').style.height = '0';
        }
    });
};

const toggleCampus = (menuId, sceneName) => {

    const content = document.getElementById(menuId);
    const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;
    if (content.style.height && content.style.height !== '0px') {
        console.log("Intentant tancar el menú, però no permetem que es tanqui ell mateix"); 
        krpano.actions.trace(`vaig a -> ${sceneName}`);
        return;
    }

        closeAllExcept(content.closest('.accordion-menu'));
        const desiredHeight = Math.min(content.scrollHeight, maxHeight);
        content.style.height = desiredHeight + 'px';

    // Aquí pots afegir la funcionalitat per carregar la panoràmica basant-te en sceneName
    krpano.actions.trace(`vaig a -> ${sceneName}`);
};




document.addEventListener('DOMContentLoaded', function() {
    const contentBalmes = document.getElementById('menuBalmes');
    const contentCiutadella = document.getElementById('menuCiutadella');
    const maxHeight = acordionContainerHeight - ctaHeight - itemCampusHeight;

    contentCiutadella.style.height = '0px';

    const desiredHeightBalmes = Math.min(contentBalmes.scrollHeight, maxHeight);
    contentBalmes.style.height = desiredHeightBalmes + 'px';
});