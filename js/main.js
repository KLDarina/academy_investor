$(document).ready(function () {
    /*на IOS видеоофон изменить начало*/
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        document.querySelector(".final-block__video>video").style = "display: none";
        document.querySelector(".final-block__video").style = "background: url(./assets/mobile-video-2.jpg) center / cover no-repeat";
        document.querySelector(".become-presenter__video>video").style = "display: none";
        document.querySelector(".become-presenter__video").style = "background: url(./assets/mobile-video-1.jpg) center / cover no-repeat";
    }
    /*на IOS видеоофон изменить конец*/


    /*добавление шума начало*/
    const noise = () => {
        let canvas, ctx;
        let wWidth, wHeight;
        let noiseData = [];
        let frame = 0;
        let loopTimeout;
        const createNoise = () => {
            const idata = ctx.createImageData(wWidth, wHeight);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) {
                    buffer32[i] = 0xff000000;
                }
            }
            noiseData.push(idata);
        };
        const paintNoise = () => {
            if (frame === 9) {
                frame = 0;
            } else {
                frame++;
            }
            ctx.putImageData(noiseData[frame], 0, 0);
        };
        const loop = () => {
            paintNoise(frame);
            loopTimeout = window.setTimeout(() => {
                window.requestAnimationFrame(loop);
            }, (1000 / 25));
        };
        const setup = () => {
            wWidth = window.innerWidth;
            wHeight = window.innerHeight;
            canvas.width = wWidth;
            canvas.height = wHeight;
            for (let i = 0; i < 10; i++) {
                createNoise();
            }
            loop();
        };
        let resizeThrottle;
        () => {
            window.addEventListener('resize', () => {
                window.clearTimeout(resizeThrottle);
                resizeThrottle = window.setTimeout(() => {
                    window.clearTimeout(loopTimeout);
                    setup();
                }, 200);
            }, false);
        };
        (() => {
            canvas = document.getElementById('noise');
            ctx = canvas.getContext('2d');
            setup();
        })();
    };
    noise();
    /*добавление шума конец*/


    /*добавление якорей начало*/
    if (document.documentElement.clientWidth > 1200) {
        $(document).on("scroll", { passive: true }, onScroll);

        $('.aside__menu-item a').click(function () {
            $(document).off("scroll");

            var navLink = $(this).attr("href"),
                dest = $(navLink).offset().top;
            $('html,body').stop().animate({
                scrollTop: dest
            }, 800, function () {
                $(document).on("scroll", { passive: true }, onScroll);
            });

            $('.aside__menu-item a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');

            return false;
        });
        function onScroll() {
            var scrollPos = $(document).scrollTop() + 300;
            $('.aside__menu-item a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos) {
                    $('.aside__menu-item a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        }
    } else {
        /*открытие и закрытие бургера начало*/
        let isOpenMenu = false;
        document.querySelector(".header__burger").addEventListener("click", function () {
            if (!isOpenMenu) {
                document.querySelector(".menu__wrapper").classList.add("active");
                document.querySelector(".header__burger").classList.add("active");
                return isOpenMenu = true;
            } else {
                document.querySelector(".menu__wrapper").classList.remove("active");
                document.querySelector(".header__burger").classList.remove("active");
                return isOpenMenu = false;
            }

        })

        $('.menu__list-item a').click(function () {
            $(document).off("scroll");
            var navLink = $(this).attr("href"),
                dest = $(navLink).offset().top;
            $('html,body').stop().animate({
                scrollTop: dest
            }, 800, function () {
                $(document).on("scroll", { passive: true }, onScroll);
            });

            $('.menu__list-item a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            document.querySelector(".menu__wrapper").classList.remove("active");
            document.querySelector(".header__burger").classList.remove("active");
            isOpenMenu = false;
            return false;
        });
        function onScroll() {
            var scrollPos = $(document).scrollTop() + 300;
            $('.menu__list-item a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos) {
                    $('.menu__list-item a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        }
        /*открытие и закрытие бургера конец*/
    }

    /*добавление якорей конец*/


    /*горизонтальный скрол начало*/
    (function () {

        function scrollHorizontally(e) {
            e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            document.querySelector('.course-components__block').scrollLeft -= (delta * 100); // Multiplied by 10
            e.preventDefault();
        }
        if (document.querySelector('.course-components__block').addEventListener) {
            // IE9, Chrome, Safari, Opera
            document.querySelector('.course-components__block').addEventListener("mousewheel", scrollHorizontally, false);
            // Firefox
            document.querySelector('.course-components__block').addEventListener("DOMMouseScroll", scrollHorizontally, false);
        } else {
            // IE 6/7/8
            document.querySelector('.course-components__block').attachEvent("onmousewheel", scrollHorizontally);
        }

    })();
    /*горизонтальный скрол конец*/


    /*слайдер ведущих начало*/
    let allLeaders = [{ name: "Татьяна Туркова1", photo: "./assets/leader-1.png", link: "#####" }, { name: "Татьяна Туркова2", photo: "./assets/leader-1.png", link: "#" }, { name: "Татьяна Туркова3", photo: "./assets/leader-1.png", link: "#" }, { name: "Татьяна Туркова4", photo: "./assets/leader-1.png", link: "#" }, { name: "Марсель Борисов1", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов2", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов7", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов8", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов9", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов10", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов11", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов12", photo: "./assets/leader-2.png", link: "#" }, { name: "Марсель Борисов13", photo: "./assets/leader-2.png", link: "#" }]

    let resultLeaders = [];
    let currentCount;
    document.documentElement.clientWidth > 1200 ? currentCount = 6 : currentCount = 4;
    let countBlocks = Math.ceil(allLeaders.length / currentCount); //количество страниц
    for (let i = 0; i < countBlocks; i++) {
        resultLeaders.push({ id: i, leaders: [] });
    }

    resultLeaders.forEach((el, index) => {
        index = index + 1;
        let templateArr = [];
        allLeaders.forEach((leader, ind) => {
            ind = ind + 1;
            if (index * currentCount >= ind && ind > (index - 1) * currentCount) {
                templateArr.push(leader);
            }
        });
        el.leaders = templateArr;
    });

    let currentIndexOfLeaders = 0;

    function pushLeaders() {
        resultLeaders[currentIndexOfLeaders].leaders.forEach(elem => {
            createLeader(elem.name, elem.link, elem.photo);
        });
    } //добавление ведущих на страницу

    pushLeaders();

    function createLeader(name, link, photo) {
        let divEl = document.createElement("div");
        divEl.classList.add("practicing-presenters__slider-item--box");
        let aEl = document.createElement("a");
        aEl.target = "_blank";
        aEl.classList.add("practicing-presenters__slider-item--box-button");
        aEl.href = link;
        let nameEl = document.createElement("div");
        nameEl.classList.add("practicing-presenters__slider-item--box-name");
        nameEl.textContent = name;
        let imgLeaderEl = document.createElement("img");
        imgLeaderEl.src = photo;
        divEl.appendChild(aEl);
        divEl.appendChild(nameEl);
        divEl.appendChild(imgLeaderEl);
        document.querySelector(".practicing-presenters__slider-item").appendChild(divEl);
    } //создание ведущих

    document.querySelector("#practicing-presenters__button--left").addEventListener("click", function () {
        while (document.querySelector(".practicing-presenters__slider-item").firstChild) {
            document.querySelector(".practicing-presenters__slider-item").firstChild.remove();
        }
        currentIndexOfLeaders = currentIndexOfLeaders - 1;
        if (currentIndexOfLeaders < 0) {
            currentIndexOfLeaders = 0;
        }
        pushLeaders();
    })

    document.querySelector("#practicing-presenters__button--right").addEventListener("click", function () {
        while (document.querySelector(".practicing-presenters__slider-item").firstChild) {
            document.querySelector(".practicing-presenters__slider-item").firstChild.remove();
        }
        currentIndexOfLeaders = currentIndexOfLeaders + 1;
        if (currentIndexOfLeaders > resultLeaders.length - 1) {
            currentIndexOfLeaders = resultLeaders.length - 1;
        }
        pushLeaders();
    })
    /*слайдер ведущих конец*/


    /*слайдер видеоотзывов начало*/
    let arrVideoReviews = [{ linkVideo: "https://www.youtube.com/embed/zo86Zk7T_-k", linkPreview: "./assets/video-1.jpg", name: "Ангелина Трубецкая", country: "Беларусь" }, { linkVideo: "https://www.youtube.com/embed/BNdJaetPrlg", linkPreview: "./assets/video-2.jpg", name: "Максим Максимов", country: "Украина" }, { linkVideo: "https://www.youtube.com/embed/YtZZ-hxz9TI", linkPreview: "./assets/video-3.jpg", name: "Антон Птушкин", country: "Украина" }, { linkVideo: "https://www.youtube.com/embed/xuqJL70LEOY", linkPreview: "./assets/video-4.jpg", name: "Олег Олегов", country: "Россия" }];

    document.querySelector(".videoreviews__left > iframe").src = arrVideoReviews[0].linkVideo;
    document.querySelector(".videoreviews__about > .videoreviews__name").textContent = arrVideoReviews[0].name;
    document.querySelector(".videoreviews__about > .videoreviews__country").textContent = arrVideoReviews[0].country;

    arrVideoReviews.forEach((el, ind) => {
        let divWrapper = document.createElement("div");
        divWrapper.classList.add("videoreviews__block-item");
        divWrapper.style = `background: url(${el.linkPreview}) center / cover no-repeat`;
        let divButton = document.createElement("div");
        divButton.classList.add("videoreviews__block-item--button");
        document.querySelector(".videoreviews__block").appendChild(divWrapper);
        divWrapper.appendChild(divButton);
        if (ind === 0) {
            setTimeout(() => {
                divWrapper.classList.add("active");
            }, 500);
        }
    });

    document.querySelectorAll(".videoreviews__block > .videoreviews__block-item").forEach((el, ind) => {
        el.addEventListener("click", function () {
            document.querySelector(".videoreviews__left > iframe").src = `${arrVideoReviews[ind].linkVideo}`;
            document.querySelector(".videoreviews__about > .videoreviews__name").textContent = arrVideoReviews[ind].name;
            document.querySelector(".videoreviews__about > .videoreviews__country").textContent = arrVideoReviews[ind].country;
            document.querySelector(".videoreviews__block-item.active").classList.remove("active");
            el.classList.add("active");
        })
    });
    /*слайдер видеоотзывов конец*/


    /*слайдер отзывов начало*/
    let allReviews = [{ name: "Татьяна Туркова", country: "Украина", text: "Какой-то отзыв" }, { name: "Иван Иванов", country: "Россия", text: "Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва. Много отзыва." }, { name: "Александр Семёнов", country: "Беларусь", text: "Просто отзыв" }, { name: "Ирина Витальевна", country: "Турция", text: "Отзыв. Отзыв. Отзыв. Отзыв. Отзыв. Отзыв. Отзыв." }, { name: "Алёна Ломоносова", country: "Азербайджан", text: "Еееее" }, { name: "Мария Степанова", country: "ОАЭ", text: "Что-то на нерусском" }, { name: "Ирина Аллегрова", country: "Россия", text: "С Днём Рождения!!!! Успехов, радости, везения!!!" }]

    let resultReviews = [];
    let currentCountReviews;
    document.documentElement.clientWidth > 1200 ? currentCountReviews = 3 : currentCountReviews = 2;
    let countBlocksReviews = Math.ceil(allReviews.length / currentCountReviews); //количество страниц
    for (let i = 0; i < countBlocksReviews; i++) {
        resultReviews.push({ id: i, reviews: [] });
    }

    resultReviews.forEach((el, index) => {
        index = index + 1;
        let templateArr = [];
        allReviews.forEach((review, ind) => {
            ind = ind + 1;
            if (index * currentCountReviews >= ind && ind > (index - 1) * currentCountReviews) {
                templateArr.push(review);
            }
        });
        el.reviews = templateArr;
    });

    let currentIndexOfReviews = 0;

    function pushReviews() {
        if (document.documentElement.clientWidth > 850) {
            resultReviews[currentIndexOfReviews].reviews.forEach(elem => {
                createReview(elem.name, elem.country, elem.text);
            });
        } else {
            console.log(resultReviews);
            resultReviews.forEach(el => {
                el.reviews.forEach(elem => {
                    createReview(elem.name, elem.country, elem.text);
                })
            });
            $(".reviews__block").slick({
                slidesToShow: 1.01,
                slidesToScroll: 1,
                centerMode: true,
                nextArrow: "#reviews-right",
                prevArrow: "#reviews-left"
            })

        }

    } //добавление отзывов на страницу

    pushReviews();

    function createReview(name, country, text) {
        let divEl = document.createElement("div");
        divEl.classList.add("reviews__block-item");
        let divNameEl = document.createElement("div");
        divNameEl.classList.add("reviews__block-item--name");
        divNameEl.textContent = name;
        let divCountryEl = document.createElement("div");
        divCountryEl.classList.add("reviews__block-item--country");
        divCountryEl.textContent = country;
        let divTextEl = document.createElement("div");
        divTextEl.classList.add("reviews__block-item--text");
        divTextEl.textContent = text;
        divEl.appendChild(divNameEl);
        divEl.appendChild(divCountryEl);
        divEl.appendChild(divTextEl);
        document.querySelector(".reviews__block").appendChild(divEl);
    } //создание отзывов

    document.querySelector("#reviews-left").addEventListener("click", function () {
        if (document.documentElement.clientWidth > 850) {
            while (document.querySelector(".reviews__block").firstChild) {
                document.querySelector(".reviews__block").firstChild.remove();
            }
            currentIndexOfReviews = currentIndexOfReviews - 1;
            if (currentIndexOfReviews < 0) {
                currentIndexOfReviews = 0;
            }
            pushReviews();
        }

    })

    document.querySelector("#reviews-right").addEventListener("click", function () {
        if (document.documentElement.clientWidth > 850) {
            while (document.querySelector(".reviews__block").firstChild) {
                document.querySelector(".reviews__block").firstChild.remove();
            }
            currentIndexOfReviews = currentIndexOfReviews + 1;
            if (currentIndexOfReviews > resultReviews.length - 1) {
                currentIndexOfReviews = resultReviews.length - 1;
            }
            pushReviews();
        }

    })
    /*слайдер отзывов конец*/


    /*изменение кнопки хедера начало*/
    document.addEventListener("scroll", function () {
        if (window.scrollY >= document.documentElement.clientHeight) {
            document.querySelector(".header__button").classList.contains("scroll") ? null : document.querySelector(".header__button").classList.add("scroll");

        } else {
            document.querySelector(".header__button").classList.contains("scroll") ? document.querySelector(".header__button").classList.remove("scroll") : null;
        }
    });
    /*изменение кнопки хедера конец*/


    /*открытие закрытие языков начало*/
    let isLanguagesOpen = false;
    document.querySelector(".header__languages").addEventListener("click", function () {
        if (!isLanguagesOpen) {
            document.querySelector(".header__languages").classList.add("open");
            return isLanguagesOpen = true;
        } else {
            document.querySelector(".header__languages").classList.remove("open");
            return isLanguagesOpen = false;
        }
    })
    /*открытие закрытие языков конец*/


    /*инверсия логотипа начало*/
    function isVisibleInverse(elem) {
        let wt = $(window).scrollTop();
        let wh = $(window).height();
        let et = $(elem).offset().top;
        let eh = $(elem).outerHeight();

        if (wt + 100 >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
            return true;
        } else {
            return false;
        }
    }
    function InverseAnimation() {
        if (document.documentElement.clientWidth > 1200) {
            if (isVisibleInverse(".suitable__wrapper")) {
                document.querySelectorAll(".header__logo > svg > path").forEach(el => {
                    el.style = "fill: #ffffff";
                })
            } else {
                document.querySelectorAll(".header__logo > svg > path").forEach(el => {
                    el.style = "fill: #290E17";
                })
            }
        }
    }
    InverseAnimation();
    document.addEventListener("scroll", function () {
        InverseAnimation();
    })
    /*инверсия логотипа конец*/

    // document.querySelector(".header__wrapper").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     return false;
    // })

    if (document.documentElement.clientWidth <= 1200) {
        $(".videoreviews__block").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 1.5
                    }
                }
            ]
        })
    }

    /*анимация начало*/
    function isVisible(elem) {
        let wt = $(window).scrollTop();
        let wh = $(window).height();
        let et = $(elem).offset().top;
        let eh = $(elem).outerHeight();
        if (document.body.clientWidth > 1200) {
            if (wt + wh >= et + 100 && wt + wh - eh * 2 <= et + (wh - eh)) {
                return true;
            } else {
                return false;
            }
        } else {
            if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
                return true;
            } else {
                return false;
            }
        }
    }
    let isTitle1Typed, isTitle2Typed, isTitle3Typed, isTitle4Typed, isTitle5Typed, isTitle6Typed, isTitle7Typed, isTitle8Typed, isTitle9Typed, isTitle10Typed, isTitle11Typed, isTitle12Typed, isTitle13Typed, isTitle14Typed, isTitle15Typed, isTitle16Typed = false;
    function Animation() {
        setTimeout(() => {
            if (isVisible(".become-presenter__wrapper")) {
                if (!isTitle1Typed) {
                    new Typed('#typed-1', {
                        strings: ['СТАНЬТЕ ВЕДУЩИМ ИГРЫ «ГЕНИЙ ФИНАНСОВ»'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".become-presenter__untitle").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".become-presenter__right--button").classList.add("slide-top");
                            }, 500);
                        }
                    });
                    return isTitle1Typed = true;
                }
            }
            if (isVisible(".receiving__wrapper")) {
                if (!isTitle2Typed) {
                    new Typed('#typed-2', {
                        strings: ['На этом курсе Вы получите:'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelectorAll(".receiving__box").forEach((el, ind) => {
                                setTimeout(() => {
                                    el.classList.add("slide-top");
                                }, ind * 200);

                            })
                        }
                    });
                    return isTitle2Typed = true;
                }
            }
            if (isVisible(".suitable__wrapper")) {
                if (!isTitle3Typed) {
                    new Typed('#typed-3', {
                        strings: ['Кому подойдет данный курс:'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelectorAll(".suitable__box").forEach((el, ind) => {
                                setTimeout(() => {
                                    el.classList.add("slide-top");
                                }, ind * 200);

                            })
                        }
                    });
                    return isTitle3Typed = true;
                }
            }
            if (isVisible(".how-work__wrapper")) {
                if (!isTitle4Typed) {
                    new Typed('#typed-4', {
                        strings: ['Как будет проходить обучение:'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelectorAll(".how-work__box").forEach((el, ind) => {
                                setTimeout(() => {
                                    el.classList.add("slide-top");
                                }, ind * 200);
                            })
                        }
                    });
                    return isTitle4Typed = true;
                }
            }
            if (isVisible(".development__wrapper")) {
                if (!isTitle5Typed) {
                    new Typed('#typed-5', {
                        strings: ['Треннинг разработан в Академия частного инвестора'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".development__text").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".development__button").classList.add("slide-top");
                                setTimeout(() => {
                                    document.querySelector(".development__image").classList.add("slide-top");
                                }, 500);
                            }, 500);
                        }
                    });
                    return isTitle5Typed = true;
                }
            }
            if (isVisible(".course-components__wrapper")) {
                if (!isTitle6Typed) {
                    new Typed('#typed-6-1', {
                        strings: ['Курс состоит '],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelectorAll(".course-components__title > span").forEach((elem, ind) => {
                                if (ind === 1) {
                                    elem.style = "display: none";
                                }
                            })
                            new Typed('#typed-6-2', {
                                strings: [' из 15 уроков'],
                                typeSpeed: 20,
                                fadeOut: true,
                                onStringTyped: function () {
                                    document.querySelector(".course-components__block--wrapper").classList.add("slide-top");
                                }
                            })
                        }
                    });
                    return isTitle6Typed = true;
                }
            }
            if (isVisible(".end-course__wrapper")) {
                if (!isTitle7Typed) {
                    new Typed('#typed-7', {
                        strings: ['Что вы получаете после окончания курса'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelectorAll(".end-course__box").forEach((el, ind) => {
                                setTimeout(() => {
                                    el.classList.add("slide-top");
                                }, ind * 200);
                            })
                        }
                    });
                    return isTitle7Typed = true;
                }
            }
            if (isVisible(".start-training__wrapper")) {
                if (!isTitle8Typed) {
                    new Typed('#typed-8', {
                        strings: ['Начать обучение'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".start-training__text").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".start-training__button").classList.add("slide-top");
                            }, 500);
                        }
                    });
                    return isTitle8Typed = true;
                }
            }
            if (isVisible(".doubts__wrapper")) {
                if (!isTitle9Typed) {
                    new Typed('#typed-9-1', {
                        strings: ['Если вы ещё сомневаетесь,'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".doubts__title > .typed-cursor").style = "display: none";
                            new Typed('#typed-9-2', {
                                strings: ['“А стоит ли проходить данный курс?”'],
                                typeSpeed: 20,
                                fadeOut: true,
                                onStringTyped: function () {
                                    document.querySelector(".doubts__content--left").classList.add("slide-top");
                                    document.querySelectorAll(".doubts__content--item").forEach((el, ind) => {
                                        setTimeout(() => {
                                            el.classList.add("slide-top");
                                        }, ind * 200);
                                    })
                                }
                            })
                        }
                    });
                    return isTitle9Typed = true;
                }
            }
            if (isVisible(".leader__wrapper")) {
                if (!isTitle10Typed) {
                    document.querySelector(".leader__quote").classList.add("slide-top");
                    setTimeout(() => {
                        document.querySelector(".leader__title").classList.add("slide-top");
                        setTimeout(() => {
                            document.querySelector(".leader__untitle").classList.add("slide-top");
                        }, 500);
                    }, 500);
                    return isTitle10Typed = true;
                }
            }
            if (isVisible(".practicing-presenters__wrapper")) {
                if (!isTitle11Typed) {
                    new Typed('#typed-11', {
                        strings: ['Практикующие ведущие'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".practicing-presenters__text").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".practicing-presenters__slider").classList.add("slide-top");
                            }, 500);
                        }
                    });
                    return isTitle11Typed = true;
                }
            }
            if (isVisible(".participation-in-tournaments__wrapper")) {
                if (!isTitle12Typed) {
                    new Typed('#typed-12', {
                        strings: ['Участие в турнирах'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".participation-in-tournaments__text").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".participation-in-tournaments__button").classList.add("slide-top");
                            }, 500);
                        }
                    });
                    return isTitle12Typed = true;
                }
            }
            if (isVisible(".playing__wrapper")) {
                if (!isTitle13Typed) {
                    document.querySelector(".playing__text").classList.add("slide-top");
                    setTimeout(() => {
                        document.querySelector(".playing__button").classList.add("slide-top");
                    }, 500);
                    return isTitle13Typed = true;
                }
            }
            if (isVisible(".reviews__wrapper")) {
                if (!isTitle14Typed) {
                    new Typed('#typed-14', {
                        strings: ['Отзывы'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".reviews__block").classList.add("slide-top");
                        }
                    });
                    return isTitle14Typed = true;
                }
            }
            if (isVisible(".videoreviews__wrapper")) {
                if (!isTitle15Typed) {
                    document.querySelector(".videoreviews__left").classList.add("slide-top");
                    setTimeout(() => {
                        document.querySelector(".videoreviews__right").classList.add("slide-top");
                    }, 500);
                    return isTitle15Typed = true;
                }
            }
            if (isVisible(".final-block__wrapper")) {
                if (!isTitle16Typed) {
                    new Typed('#typed-16', {
                        strings: ['Помните!'],
                        typeSpeed: 20,
                        fadeOut: true,
                        onStringTyped: function () {
                            document.querySelector(".final-block__text").classList.add("slide-top");
                            setTimeout(() => {
                                document.querySelector(".final-block__right--button").classList.add("slide-top");
                            }, 500);
                        }
                    });
                    return isTitle16Typed = true;
                }
            }
        }, 500);

    }
    Animation();
    document.addEventListener("scroll", function () {
        Animation();
    })
    /*анимация конец*/
})




