'use strict'

//Ф-ция выполнится при загрузке контента
window.onload = function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        const content = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');
        const human = document.querySelector('.images-parallax__human');

        let forClouds = 40;
        let forMountains = 20;
        let forHuman = 10;

        let animationSpeed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXpercent = 0, coordYpercent = 0;

        let setMouseParalax = () => {
            let distX = coordXpercent - positionX;
            let distY = coordYpercent - positionY;

            positionX = positionX + (distX * animationSpeed);
            positionY = positionY + (distY * animationSpeed);

            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParalax);
        }
        setMouseParalax();

        parallax.addEventListener('mousemove', function(e) {
            let parallaxWidth = parallax.offsetWidth;
            let parallaxHeight = parallax.offsetHeight;

            //Когда курсор посередине блока - параллакс элементы возвращаются в начальную позицию
            let coordX = e.pageX - parallaxWidth / 2;
            let coordY = e.pageY - parallaxHeight / 2;

            //Получаем проценты
            coordXpercent = coordX / parallaxWidth * 100;
            coordYpercent = coordY / parallaxHeight * 100;
        });

        //Параллакс при скролле
        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i)
        }
        const callback = function (entries, observer) {
            const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItem(scrollTopPercent);
        }
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        let setParallaxItem = (scrollTopPercent) => {
            content.style.cssText = `transform: translate(0%, -${scrollTopPercent / 9}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 3}%);`;
        }
    } 
}