/* scrollbar*/
const scrollupBtn = document.querySelector(".scroll-up");
window.addEventListener(
    "scroll",
    (scrollup = () => {
        const scrollbar = document.getElementById("scrollBar");
        const scrollValue = document.documentElement.scrollHeight - 1000;
        scrollbar.style.height = (scrollY / scrollValue) * 100 + "%";
        if (scrollY > 300) {
            gsap.to(scrollupBtn, 0.4, {
                scale: 1,
                ease: "bounce.out"
            });
        } else {
            gsap.to(scrollupBtn, 0.3, {
                scale: 0
            });
        }
    })
);

scrollup();

/*Scroll Up*/

scrollupBtn.addEventListener("click", () => {
    gsap.to(window, 0.4, {
        scrollTo: {
            y: 0,
            ease: "power2"
        }
    });
});

const controller = new ScrollMagic.Controller();

const rule = CSSRulePlugin.getRule(".recomendation::before");
const linkToExercise = document.querySelectorAll(".link-to-exercise");
const sections = document.querySelectorAll("section");

linkToExercise.forEach(l => {
    l.addEventListener("click", () => {
        gsap.to(window, 1, {
            scrollTo: {
                y: sections[l.id],
                ease: "power2"
            }
        });
    });
});

gsap.to(rule, {
    duration: 1.5,
    delay: 0.6,
    cssRule: {
        scaleX: 1
    }
});

gsap.from(".link-to-exercise", 0.5, {
    x: 1000,
    opacity: 0,
    stagger: 0.3,
    delay: 0.5
});

sections.forEach(s => {
    const exercise = s.querySelector(".exercise");
    const resultDiv = s.querySelector(".result");
    const numberExersices = s.querySelector("h3");
    const tl = new TimelineMax();

    new ScrollMagic.Scene({
            triggerElement: s,
            triggerHook: 0.8
        })
        .setTween(tl)
        .addTo(controller);

    tl.from(s, 0.3, {
            x: -700,
            opacity: 0
        })
        .from(exercise, 0.3, {
            scale: 1.4,
            y: -50,
            opacity: 0
        })
        .from(resultDiv, 0.3, {
            y: 30,
            opacity: 0,
            ease: "elastic.out(1.2, 0.3)"
        })
        .from(numberExersices, 1, {
            x: 600,
            opacity: 0,
            ease: "bounce.out"
        });
});

const tl2 = new TimelineMax();
const tl3 = new TimelineMax();

gsap.from("article", 0.4, {
    scaleX: 0
});
gsap.from(".recomendation", 0.4, {
    scaleY: 0,
    opacity: 0,
    delay: 0.5,
    stagger: 0.2
});
gsap.from("a", 0.4, {
    opacity: 0,
    stagger: 0.2,
    delay: 0.9
});
gsap.from(".link", 0.8, {
    opacity: 0,
    y: -40,
    delay: 0.6
});
gsap.from(".main-header-1", 0.5, {
    x: -500,
    opacity: 0
});
gsap.from(".main-header-2", 0.5, {
    scaleY: 0,
    opacity: 0,
    delay: 1.6
});
gsap.from(".main-header-3", 0.5, {
    x: 2000,
    opacity: 0
});

new ScrollMagic.Scene({
        triggerElement: sections[5],
        triggerHook: 0.8
    })
    .setTween(tl2)
    .addTo(controller);

tl2
    .from("#vowel", 0.4, {
        opacity: 0,
        x: -500
    })
    .from(".vowel-label", 0.3, {
        opacity: 0,
        y: -30,
        delay: 0.4,
        ease: "elastic.out(1.2, 1)"
    })

    .from(".frame-btn", 0.4, {
        y: 50,
        opacity: 0,
        scale: 1.2
    }, "-=1.3")
    .from("#vowels-btn", 0.6, {
        opacity: 0,
        delay: 0.2
    })
    .fromTo(
        ".overlay",
        0.3, {
            skewX: 15,
            scale: 1.1
        }, {
            skewX: 10,
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 0",
            ease: Power2.easeOut
        },
        "-=0.2"
    );

let dropMenu = false;
const nav = document.querySelector("nav");
const navHeader = document.querySelector(".nav-header");
const navDiv = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    let leftPos = 80;
    gsap.to(window, 0.4, {
        scrollTo: {
            x: 0,
            ease: "power2"
        }
    });
    if (navDiv.offsetTop <= scroll && dropMenu === false) {
        const tl = new TimelineMax();
        new ScrollMagic.Scene({
                triggerElement: navDiv,
                duration: 150,
                triggerHook: 0
            })
            .setTween(tl)
            .addTo(controller);
        nav.classList.add("nav-onscroll");
        tl.fromTo(nav, 0.3, {
            top: -300
        }, {
            y: 0,
            top: 0,
            left: 0
        });

        linkToExercise.forEach(l => {
            l.classList.add("link-onscroll");
            tl.fromTo(
                l,
                0.3, {
                    left: "50%",
                    top: -100
                }, {
                    left: leftPos,
                    top: 0
                }
            );

            leftPos += 130;
        });
        tl.fromTo(
            navHeader,
            0.3, {
                left: -100,
                opacity: 0,
                top: -10
            }, {
                left: 100,
                opacity: 1,
                top: -20
            }
        );

        dropMenu = true;
    } else if (navDiv.offsetTop > scroll && dropMenu === true) {
        linkToExercise.forEach(l => {
            gsap.fromTo(
                l,
                0.3, {
                    left: l.offsetLeft,
                    top: l.offsetTop - 300
                }, {
                    left: 0,
                    top: -500,
                    zIndex: 4
                }
            );
        });
        gsap.fromTo(
            navHeader,
            0.2, {
                left: "10%",
                opacity: 0
            }, {
                left: "4%",
                opacity: 1,
                top: -15,
                onComplete: changeClass
            }
        );
        gsap.fromTo(
            nav,
            0.3, {
                top: "10%",
                left: 10
            }, {
                y: -130,
                top: "0%",
                left: "50%"
            }
        );
        dropMenu = false;
    }
});

const option = {
    treshold: 0.1
};

const observerFunction = e => {
    e.forEach(s => {
        linkToExercise.forEach(a => (a.style.opacity = "1"));
        const index = s.target.dataset.index;
        if (s.isIntersecting) {
            linkToExercise[index].classList.add("active-section");
            scrollDirection();
        } else {
            linkToExercise[index].classList.remove("active-section");
            scrollDirection();
        }
    });
};

let observer = new IntersectionObserver(observerFunction, option);
sections.forEach(s => observer.observe(s));

if (dropMenu) {
    linkToExercise.forEach(a => (a.style.opacity = "1"));
    window.addEventListener("scroll", scrollDirection());
}

let lastScrollTop = 0;
const scrollDirection = () => {
    const actives = document.querySelectorAll(".active-section");
    const middle = actives.length / 2;
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st < lastScrollTop) {
        if (actives.length >= 3) {
            actives[Math.round(middle - 1)].style.opacity = "0.7";
            actives[Math.round(middle)].style.opacity = "0.5";
        } else if (actives.length >= 2) {
            actives[Math.round(middle)].style.opacity = "0.7";
        }
    } else {
        if (actives.length >= 3) {
            actives[Math.round(middle - 1)].style.opacity = "0.7";
            actives[Math.round(middle - 2)].style.opacity = "0.5";
        } else if (actives.length >= 2) {
            actives[Math.round(middle - 1)].style.opacity = "0.7";
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
};

setTimeout(() => {
    scrollDirection();
}, 2800);

const changeClass = () => {
    linkToExercise.forEach(l => l.classList.remove("link-onscroll"));
    nav.classList.remove("nav-onscroll");
    nav.classList.add("nav-pos");
};

/*zadanie 1*/

const result = document.querySelectorAll(".result");
const addToArray = document.getElementById("add-to-array");
const addBtn = document.querySelector("#add");
const numbers = [2, 5, 7, 10, 34, 16, 879, 1];

addBtn.addEventListener("click", () => {
    const regExp = /[0-9;]/g;

    const duplicates = numbers.filter(
        n => Number(n) === Number(addToArray.value)
    );
    if (duplicates[0] !== Number(addToArray.value)) {
        numbers.push(Number(addToArray.value));
        gsap.to("#hint", 0.4, {
            opacity: 0,
            y: -20
        });
        pairs();
        arrayDevideAnimation();
    } else {
        gsap.fromTo(
            "#hint",
            0.4, {
                opacity: 0,
                y: -20
            }, {
                opacity: 1,
                y: 0
            }
        );
        document.getElementById("hint").textContent =
            "Ta liczba już istnieje.";
    }
});
const pairs = () => {
    result[0].innerHTML = `<p class="answer">
                   <div class="content-array" style="grid-template-columns:repeat(${
                     numbers.length
                   },65px);"><div class="comment">Parzyste:</div> ${numbers
      .map(f => {
        return `
                    <span class="value-${f} array-number-style">${f}</span>
                `;
      })
      .join(
        ""
      )}<div class="comment" style="grid-row:3/4;grid-column:1/2;">Nieparzyste:</div></p>`;
};
pairs();

const arrayDevideAnimation = () => {
    const tl1 = new TimelineMax({
        delay: 1
    });

    let leftStart = 80;

    numbers.forEach(n => {
        gsap.to(".value-" + n, 1, {
            left: `${leftStart}`
        });
        leftStart += 60;
    });

    let leftEnd = 70;

    numbers.forEach(n => {
        if (n % 2 !== 0) {
            tl1.fromTo(
                ".value-" + n,
                0.3, {
                    top: 100
                }, {
                    top: -40
                }
            );
            tl1
                .to(".value-" + n, 0.2, {
                    left: 800
                })
                .to(".value-" + n, 0.2, {
                    top: 260
                })
                .to(".value-" + n, 0.2, {
                    left: leftEnd
                });

            leftEnd += 65;
            Draggable.create(".value-" + n, {
                type: "x,y",
                edgeResistance: 0.7,
                bounds: ".content-array"
            });
        }
    });
};

arrayDevideAnimation();

/*zadanie 2*/

const personDetails = {
    name: "Jill",
    age: 25,
    hobby: "sports"
};

document.querySelector("#add-name-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    personDetails.name = nameInput.value;
    const width = nameInput.offsetLeft - 50;

    gsap.from(".hello-name", 0.3, {
        x: width,
        y: nameInput.offsetTop + 40,
        onComplete: sayHello(personDetails)
    });
    document.getElementById("name").value = "";
});

const sayHello = name => {
    if (name instanceof Object) {
        result[1].innerHTML = `
              <div class="answer" style="display:flex">Hello
               <p class="hello-name" style="margin-top:0;margin-left:20px">
               ${name.name}
               </p>
              </div>`;
    } else {
        result[1].innerHTML = `<p class="answer">Hello </p>`;
    }
};
sayHello(personDetails);

/*zadanie 3*/

const students = [{
        name: "John",
        counter: 0
    },
    {
        name: "Bill",
        counter: 0
    },
    {
        name: "Emma",
        counter: 0
    },
    {
        name: "Stella",
        counter: 0
    },
    {
        name: "Rob",
        counter: 0
    }
];

const numberArray = [];
let isAnimated = false;

const countDrop = randomName => {
    numberArray.push(randomName);
    isAnimated = false;

    document.querySelectorAll(".count-drop")[
        randomName
    ].innerHTML = `${(students[randomName].counter += 1)}`;
};

const showPerson = () => {
    result[2].innerHTML = `
                             <div class="people-conteiner">${students
                               .map(s => {
                                 return `<div class="person"><span class="name">${s.name}</span><span class="count-drop">0</span></div>`;
                               })
                               .join("")} </div>
                              <div class="btn">
                                 <button id="random-button">Random</button>
                              </div>
                             `;
};

showPerson();

const person = document.querySelectorAll(".person");

const randomBtn = document
    .querySelector("#random-button")
    .addEventListener(
        "click",
        (randomMachine = () => {
            if (!isAnimated) {
                const tl = gsap.timeline({
                    play: false
                });
                const randomName = Math.floor(Math.random() * students.length);
                let position = 20;

                tl.to(".person", {
                    y: 0,
                    x: 0,
                    duration: 0.1
                });

                isAnimated = true;

                person.forEach(p => {
                    p.style.left = position + "%";
                    position += 15;
                    for (let i = 0; i < 2; i++) {
                        person.forEach(p => {
                            const x =
                                Math.floor(Math.random() * 650) -
                                Math.floor(Math.random() * 650);
                            tl.to(p, 0.05, {
                                motionPath: {
                                    path: [{
                                        x: x
                                    }]
                                }
                            });
                        });
                    }
                });

                const width = document.querySelector(".answerWithMath")
                    .offsetLeft;

                gsap.fromTo(
                    person[randomName], {
                        x: 0,
                        y: 0,
                        delay: 2.5
                    }, {
                        y: 240,
                        left: width,
                        duration: 0.2,
                        delay: 2.5,
                        onComplete: countDrop,
                        onCompleteParams: [randomName]
                    }
                );
                tl.to(".person", {
                    x: 0
                });
            }
        })
    );

if (isAnimated === false) {
    Draggable.create(".person", {
        type: "x,y",
        edgeResistance: 0.7,
        bounds: ".people-conteiner",
        inertia: false
    });
}

/*zadanie 4*/

const paperStoneScissors = ["paper", "stone", "scissors"];
const player1Btn = document.querySelector("#paper-stone-game-btn");
const player2Btn = document.querySelector("#paper-stone-game-btn1");
const player1Result = document.querySelector(".player1-result");
const player2Result = document.querySelector(".player2-result");
const resetPointsBtn = document.getElementById("reset-points");
const player1Drops = [];
const player2Drops = [];
let player1Points = 0;
let player2Points = 0;
let isSpinning = false;
let massage = `Kliknij "Losuj"`;

resetPointsBtn.addEventListener("click", () => {
    if (!isSpinning) {
        if (player1Points !== 0 || player2Points !== 0) {
            player1Points = 0;
            player2Points = 0;
            gameResult(`Kliknij "Losuj"`, `Kliknij "Losuj"`, "", "");
            player1Drops.length = 0;
            player2Drops.length = 0;
            massage = "Resetuję";
            playersPoints();
            sayMassage();
            delayMassage();
            animatePaperStoneResults();
        } else {
            massage = "Już zresetowano";
            sayMassage();
            delayMassage();
        }
    }
});

const sayMassage = () => {
    gsap.fromTo(".hint", 0.7, {
        scaleX: 1
    }, {
        scaleX: 0
    });
    gsap.to(".hint", 0.7, {
        scaleX: 1,
        delay: 0.5
    });
    setTimeout(() => {
        document.querySelector(".hint").innerHTML = massage;
    }, 500);
};

sayMassage();

const delayMassage = () => {
    setTimeout(
        () => {
            massage = `Kliknij "Losuj"`;
            sayMassage();
        },
        massage === "Losuję..." ? 2000 : 1000
    );
};

player1Btn.addEventListener("click", () => {
    if (!isSpinning) {
        delayMassage();
        gsap.fromTo(
            ".player-board",
            2, {
                rotate: 1200
            }, {
                rotate: 0,
                onComplete: showResult
            }
        );
        isSpinning = true;
        massage = "Losuję...";
        sayMassage();
    }
});

const showResult = () => {
    const randomCount = Math.floor(Math.random() * 3);
    const randomCount2 = Math.floor(Math.random() * 3);

    paperStoneScissorsFunction(
        paperStoneScissors[randomCount],
        paperStoneScissors[randomCount2]
    );
    isSpinning = false;
    animatePaperStoneResults();
};

let numberId = 0;
let numberIdPlayer2 = 0;

const animatePaperStoneResults = () => {
    gsap.from(".player-name", 0.4, {
        rotateX: 120
    });
    gsap.from(".players-result-board", 0.4, {
        scaleY: 0
    });
    gsap.from(".result-paper-stone", 0.4, {
        scaleY: 0,
        delay: 0.4
    });
    gsap.to(".result-paper-stone", 0.3, {
        skewY: 20,
        delay: 0.4,
        ease: "back.out(4)"
    });
    gsap.to(".result-paper-stone", 0.3, {
        skewY: 0,
        delay: 0.8,
        ease: "back.out(4)"
    });
    gsap.from(".who-won", 0.5, {
        scaleX: 0,
        transformOrigin: "center",
        ease: "back.out(4)"
    });
};

const paperStoneScissorsFunction = (player1, player2) => {
    if (
        (player1 === paperStoneScissors[0] &&
            player2 === paperStoneScissors[2]) ||
        (player1 === paperStoneScissors[1] &&
            player2 === paperStoneScissors[0]) ||
        (player1 === paperStoneScissors[2] &&
            player2 === paperStoneScissors[1])
    ) {
        player2Points++;
        gameResult("Player1 lose", "Player2 won", player1, player2);
    } else if (
        (player1 === paperStoneScissors[1] &&
            player2 === paperStoneScissors[2]) ||
        (player1 === paperStoneScissors[2] &&
            player2 === paperStoneScissors[0]) ||
        (player1 === paperStoneScissors[0] &&
            player2 === paperStoneScissors[1])
    ) {
        player1Points++;
        gameResult("Player1 won", "Player2 lose", player1, player2);
    } else if (player1 === player2)
        gameResult("Draw", "Draw", player1, player2);
    else {
        gameResult(
            "Nie ma takiej opcji",
            "Nie ma takiej opcji",
            player1,
            player2
        );
    }
    if (player2Drops.length === 5 || player1Drops.length === 5) {
        gsap.to(".history-item-0", 0.4, {
            scaleY: 0,
            transformOrigin: "center"
        });
        player2Drops.shift();
        player1Drops.shift();

        numberIdPlayer2 = 0;
        numberId = 0;
    }
};

const playersPoints = () => {
    document.querySelectorAll(
        ".result-paper-stone"
    )[0].innerHTML = player1Points;
    document.querySelectorAll(
        ".result-paper-stone"
    )[1].innerHTML = player2Points;
};

const gameResult = (player1, player2, player1Drop, player2Drop) => {
    player1Drops.push(player1Drop);
    player2Drops.push(player2Drop);

    player1Result.innerHTML = `<div class="drops"><h4 class="player-name">Player 1</h4><h5 class="who-won">${player1}</h5><p class="players-result-board">
             ${player1Drop}</p><div class="result-paper-stone">Wynik:</div></div>`;
    player2Result.innerHTML = `<div class="drops"><h4 class="player-name">Player 2</h4><h5 class="who-won">${player2}</h5><p class="players-result-board">
             ${player2Drop}</p><div class="result-paper-stone">Wynik:</div></div>`;

    document.querySelector(".history-game").innerHTML = `
              <div class="conteiner-history-game">
                <h4>Player 1</h4>
                <h4>Player 2</h4>
               <div class="player-history-game">
                ${player1Drops
                  .map(p => {
                    return `<div class="history-item-${numberId++}">${p}</div>`;
                  })
                  .join("")}</div>
               <div class="player-history-game">
               ${player2Drops
                 .map(p => {
                   return `<div class="history-item-${numberIdPlayer2++}">${p}</div>`;
                 })
                 .join("")}
            </div>
              `;

    playersPoints();

    gsap.from(".history-item-" + (numberId - 1), 0.4, {
        x: -100,
        opacity: 0
    });
};

gameResult(`Kliknij "Losuj"`, `Kliknij "Losuj"`, "", "");

/*zadanie 5*/
const getNumber = document.getElementById("number");
const btnNumber = document.querySelector(".add-number");
const btnTheHighestValue = document.querySelector(
    ".the-highest-value-btn"
);
const numbersInput = [];

btnNumber.addEventListener("click", () => {
    if (getNumber.value !== "") {
        numbersInput.push(getNumber.value);
    }

    result[4].innerHTML = `<p class="answer"><span class="score">Twoje Liczby:</span>${numbersInput.join(
      " "
    )}</p>`;
});

btnTheHighestValue.addEventListener("click", () => {
    const sortValues = numbersInput.sort((a, b) => a - b);

    const highestNumber = sortValues[sortValues.length - 1];

    for (let i = 0; i <= numbersInput.length - 1; i++) {
        const filterNumbers = sortValues.filter(h => !isNaN(Number(h)));
        if (
            !isNaN(Number(numbersInput[i])) === false ||
            numbersInput[i] === "" ||
            numbersInput.length < 2
        ) {
            result[4].innerHTML = `<p class="answer"><span class="score">Powinny być co najmniej 2 liczby</span></p>`;
            break;
        } else if (
            filterNumbers.length === numbersInput.length &&
            i === filterNumbers.length - 1 &&
            numbersInput.length >= 2
        ) {
            result[4].innerHTML =
                `<p class="answer"><span class="score">Najwyższa Liczba:</span>${highestNumber}</p>`;
            break;
        }
    }
});

/*zadanie 6 */

const input = document.querySelector("#vowel");
const btn = document.querySelector("#vowels-btn");
let animated = false;
let firstTimeAnimated = true;
let firstTimeAnimatedGood = true;

btn.addEventListener(
    "click",
    (hej = () => {
        const vowels = ["a", "e", "ą", "ć", "ę", "i", "ś", "o", "ó", "u"];
        const value = input.value.toLowerCase();
        const regExp = /[0-9@!"";:<>,.?/\\|{}[\]()|(%^&*-+=`~]/g;
        let countVowel = 0;

        if (value.length >= 1) {
            for (let i = 0; i <= value.length - 1; i++) {
                if (regExp.test(value[i])) {
                    showMessage(0);
                    if (firstTimeAnimated === true) {
                        animation();
                        firstTimeAnimated = false;
                        firstTimeAnimatedGood = true;
                    }
                    break;
                } else {
                    for (let v = 0; v < vowels.length; v++) {
                        if (value[i] === vowels[v]) {
                            countVowel++;
                        } else break;
                        if (v <= vowels.length - 1) {
                            showMessage(1, countVowel, value.length - countVowel);
                            firstTimeAnimated = true;
                            if (firstTimeAnimatedGood) {
                                animation();
                                firstTimeAnimatedGood = false;
                            }
                        }
                    }
                }
            }
        } else {
            showMessage(0);
            if (firstTimeAnimated === true) {
                animation();
                firstTimeAnimated = false;
                firstTimeAnimatedGood = true;
            }
        }
    })
);

const animation = () => {
    const answer = document.querySelectorAll(".answer");

    gsap.to(result[5], 0.3, {
        scale: 1,
        opacity: 1,
        height: 100
    });

    gsap.fromTo(
        answer[2],
        1, {
            x: -2000
        }, {
            x: 0,
            y: 0
        }
    );
};

const showMessage = (type, countVowel, consonant) => {
    const messages = [
        "Nie powinieneś używać cyfr, znaków spcecjalnych. Pole Powinno być wypełnione",
        `Liczba samogłosek to: ${countVowel}</br> Liczba spółgłosek to:${consonant}`
    ];
    result[5].innerHTML = `<p class="answer"><span class="score"> ${messages[type]}</span></p>`;
};

new ScrollMagic.Scene({
        triggerElement: sections[2],
        triggerHook: 0.8
    })
    .setTween(tl3)
    .addTo(controller);

tl3.from(".person", 0.3, {
    opacity: 0,
    y: -30,
    x: -30,
    stagger: 0.2,
    delay: 0.4
});

/*Zadanie 7*/
const functionParameters = document.getElementById("function");
const functionParametersBtn = document.getElementById(
    "linear-function-btn"
);
const linearFunction = document.querySelector(".linear-function");
const parameters = [];

functionParametersBtn.addEventListener("click", () => {
    functionParameters.focus();
    if (functionParameters.value === "") {
        result[6].innerHTML = `Musisz podać liczbę`;
    } else parameters.push(Number(functionParameters.value));
    if (parameters.length === 2) {
        zeroPlaces(parameters[0], parameters[1]);
        parameters.length = 0;
        functionParameters.placeholder = "Podaj parametr 'a'";
    } else if (parameters.length === 1) {
        functionParameters.placeholder = "Podaj parametr 'b' i pokaż wynik";
    }
    functionParameters.value = "";
});

const zeroPlaces = (a, b) => {
    linearFunction.innerHTML = `Wzór funkcji liniowej to: y=${a}x+${b}`;
    const sing = Math.sign(b);
    if (sing === 1) {
        b = -b;
    } else if (sing === -1) {
        b = b;
    }
    result[6].innerHTML = `Miejsce zerowe funkcji liniowej jest w "x=${b /
      a}"`;
};