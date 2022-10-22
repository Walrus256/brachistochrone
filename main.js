const graph1 = document.getElementById("graph1");
const ctx1 = graph1.getContext("2d");
const height_button = document.getElementById("height_submit");
const length_button = document.getElementById("length_submit");
const height_input = document.getElementById("height")
const length_input = document.getElementById("length");
const start1 = document.getElementById("startbutton1");
const scale1 = document.getElementById("scale1");
const friction1 = document.getElementById("friction1");
const frictionSubmit = document.getElementById("friction_submit");
const timer1 = document.getElementById("timer1");
const graph2 = document.getElementById("graph2");
const ctx2 = graph2.getContext("2d");
const height_button2 = document.getElementById("height_submit2");
const length_button2 = document.getElementById("length_submit2");
const height_input2 = document.getElementById("height2")
const length_input2 = document.getElementById("length2");
const start2 = document.getElementById("startbutton2");
const scale2 = document.getElementById("scale2");
const friction2 = document.getElementById("friction2");
const frictionSubmit2 = document.getElementById("friction_submit2");
const timer2 = document.getElementById("timer2");
const functions = document.getElementById("function_select");
const graph3 = document.getElementById("graph3");
const ctx3 = graph3.getContext("2d");
const height_button3 = document.getElementById("height_submit3");
const length_button3 = document.getElementById("length_submit3");
const height_input3 = document.getElementById("height3")
const length_input3 = document.getElementById("length3");
const start3 = document.getElementById("startbutton3");
const scale3 = document.getElementById("scale3");
const friction3 = document.getElementById("friction3");
const frictionSubmit3 = document.getElementById("friction_submit3");
const timer3 = document.getElementById("timer3");
const functions3 = document.getElementById("function_select3");
// ---------- Constants ---------------
// vyska
const H = 20;
// delka
const D = 30;
// text x, y positions
const coords = [10, 19, 365, 413];
// ball radius
let R = 7;
// vyska, delka v pixelech
let Hpx; 
let Dpx;
// koeficient treni (0.35 pro drevo)
let F = 0;

const lastText = ["H = 355", "D = 348"];
let topCoords = [[15, 45, 25, 45], [368, 395, 368, 405]]
let time1;
let time2;
let timeDif = 0;
let playButton = -1;

// ------------------ functions - graph1 -------------------
function height_submit() {
    redrawLine();
    ctx1.fillStyle = "white";
    ctx1.fillText(lastText[0], coords[0], coords[1]);
    lastText[0] = `H = ${height_input.value}`;
    ctx1.fillStyle = "black";
    ctx1.fillText(lastText[0], coords[0], coords[1]);

}

function length_submit() {
    redrawLine();
    ctx1.fillStyle = "white";
    ctx1.fillText(lastText[1], coords[2], coords[3]);
    lastText[1] = `D = ${length_input.value}`;
    ctx1.fillStyle = "black";
    ctx1.fillText(lastText[1], coords[2], coords[3]);
}

let ratio;

function redrawLine() {
    
    topCoords = [[15, 45, 25, 45], [368, 395, 368, 405]]
    if (Number(length_input.value) > Number(height_input.value)){
        ratio = height_input.value / length_input.value;

        topCoords[0][1] = (1 - ratio) * 355 + 45;
        topCoords[0][3] = (1 - ratio) * 355 + 45;  
    } else if (Number(length_input.value) < Number(height_input.value)) {
        ratio = Number(length_input.value) / Number(height_input.value);

        topCoords[1][0] = ratio * 348 + 20;
        topCoords[1][2] = ratio * 348 + 20;
    }
    startGraph1();
}

function startGraph1(x = topCoords[0][0] + 5, y = topCoords[0][1] - R) {
    ctx1.clearRect(0, 0, graph2.width, graph2.height);
    ctx1.beginPath();

    ctx1.moveTo(20, 20);
    ctx1.lineTo(20, 400);
    ctx1.lineTo(400, 400);
    ctx1.moveTo(topCoords[1][0], topCoords[1][1]);
    ctx1.lineTo(topCoords[1][2], topCoords[1][3]);
    ctx1.moveTo(topCoords[0][0], topCoords[0][1]);
    ctx1.lineTo(topCoords[0][2], topCoords[0][3]);
    ctx1.stroke();

    ctx1.fillStyle = "#4f2112";
    ctx1.beginPath();
    ctx1.moveTo(topCoords[0][0] + 6, topCoords[0][1])
    ctx1.lineTo(21, 399);
    ctx1.lineTo(topCoords[1][0], topCoords[1][1] + 4)
    ctx1.fill();
    ctx1.fillStyle = "black";

    
    ctx1.font = "15px Arial";
    ctx1.fillText(lastText[0], coords[0], coords[1]);
    ctx1.fillText(lastText[1], coords[2], coords[3]);

    ctx1.beginPath();
    ctx1.arc(x, y, R, 0, 2 * Math.PI);
    ctx1.fill();
}
//

function startAnimation1(t, induced = 0) {
    if (playButton === -1) return;
    Hpx = topCoords[1][1] + 5 - topCoords[0][1];
    Dpx = topCoords[1][0] - (topCoords[0][0] + 5);
    let angle1 = Math.atan(Hpx / Dpx);
    let xpos1 = (9.80665 * (Math.sin(angle1) - F * Math.cos(angle1)) * (t ** 2))/(2 * Math.sqrt((Hpx ** 2)/(Dpx ** 2) + 1));
    let ypos1 = Hpx - (Hpx/Dpx) * xpos1;

    if (ypos1 > Hpx || xpos1 > Dpx) {
        playButton *= -1;
        start1.innerHTML = "play";
        timeDif = 0.0000011;
        return;
    }
    startGraph1(xpos1 + 20, 400 - ypos1 - Number(R));
    if (induced === 1) {
        time1 = new Date();
    }
    time2 = new Date();
    timeDif += time2.getSeconds() - time1.getSeconds() + (time2.getMilliseconds() - time1.getMilliseconds())/1000;
    time1 = time2;
    timer1.textContent = `time: ${timeDif.toFixed(2)}s`;
    setInterval(() => startAnimation1(2 * timeDif), 50);
    //requestAnimationFrame(() => startAnimation1(timeDif));
}
// ------------------ END functions - graph1 --------------------

let ratio2;
let topCoords2 = [[15, 45, 25, 45], [368, 395, 368, 405]]
const lastText2 = ["H = 355", "D = 348"];
let playButton2 = -1;
let timeDif2 = 0;
let R2 = 7;
let x1 = topCoords2[0][0] + 5;
let y1 = topCoords2[0][1] - R2;
Hpx2 = topCoords2[1][1] + 5 - topCoords2[0][1];
Dpx2 = topCoords2[1][0] - (topCoords2[0][0] + 5);
let v1 = 0;
let F2 = 0;
let t1 = 0;
let time3;
let time4;
let xpos2 = 0;
let ypos2 = Hpx2;
// ------------------ functions - graph2 ------------------------
function startGraph2(x = topCoords2[0][0] + 5, y = topCoords2[0][1] - R2) {
    ctx2.clearRect(0, 0, graph2.width, graph2.height);
    ctx2.beginPath();

    ctx2.moveTo(20, 20);
    ctx2.lineTo(20, 400);
    ctx2.lineTo(400, 400);
    ctx2.moveTo(topCoords2[1][0], topCoords2[1][1]);
    ctx2.lineTo(topCoords2[1][2], topCoords2[1][3]);
    ctx2.moveTo(topCoords2[0][0], topCoords2[0][1]);
    ctx2.lineTo(topCoords2[0][2], topCoords2[0][3]);
    ctx2.stroke();
    
    ctx2.font = "15px Arial";
    ctx2.fillText(lastText2[0], coords[0], coords[1]);
    ctx2.fillText(lastText2[1], coords[2], coords[3]);

    ctx2.fillStyle = "#4f2112";
    ctx2.beginPath();
    ctx2.moveTo(topCoords2[0][0] + 5, topCoords2[0][1]);

    switch (functions.value) {
        case "0":
            for (let i=0; i <= Dpx2; i++) {
                ctx2.lineTo(i + topCoords2[0][0] + 5, graph2.height - (graph2.height - topCoords2[1][1] - 5 + (Hpx2 * (Dpx2 + 1) / (Dpx2 * (i + 1)) - Hpx2 / Dpx2)));
            }
            ctx2.lineTo(21, 399);
            break;
        case "1":
            ctx2.lineTo(topCoords2[1][0], topCoords2[1][1] + 5);
            break;
        case "2":
            for (let i=0; i <= Dpx2; i++){
                ctx2.lineTo(i + topCoords2[0][0] + 5, graph2.height - (graph2.height - topCoords2[1][1] - 5 + (-Hpx2/Math.sqrt(Dpx2)) * Math.sqrt(i) + Hpx2));
            }
            ctx2.lineTo(21, 399);
            break;
        case "3":
            Dpx2 = Hpx2;
            if (length_input2.value !== height_input2.value){
                length_input2.value = height_input2.value;
                length_submit2();
                break;
            }
            for (let i=0; i <= Dpx2; i++){
                ctx2.lineTo(i + topCoords2[0][0] + 5, graph2.height - (graph2.height - topCoords2[1][1] - 5 + (-Math.sqrt(Hpx2 ** 2 - (i - Hpx2) ** 2) + Hpx2)));
            }
            ctx2.lineTo(21, 399);
            break;
        default:
    }
    ctx2.fill();
    ctx2.fillStyle = "black";
    //ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(x, y, R2, 0, 2 * Math.PI);
    ctx2.fill();
}

function redrawLine2() {
    
    topCoords2 = [[15, 45, 25, 45], [368, 395, 368, 405]];

    if (Number(length_input2.value) > Number(height_input2.value)){
        ratio2 = height_input2.value / length_input2.value;

        topCoords2[0][1] = (1 - ratio2) * 355 + 45;
        topCoords2[0][3] = (1 - ratio2) * 355 + 45;  
    } else if (Number(length_input2.value) < Number(height_input2.value)){
        ratio2 = Number(length_input2.value) / Number(height_input2.value);

        topCoords2[1][0] = ratio2 * 348 + 20;
        topCoords2[1][2] = ratio2 * 348 + 20;
    }
    x1 = topCoords2[0][0] + 5;
    y1 = topCoords2[0][1] - R2;

    Hpx2 = topCoords2[1][1] + 5 - topCoords2[0][1];
    Dpx2 = topCoords2[1][0] - (topCoords2[0][0] + 5);

    ypos2 = Hpx2;
    startGraph2();
}

function height_submit2() {
    redrawLine2();
    ctx2.fillStyle = "white";
    ctx2.fillText(lastText2[0], coords[0], coords[1]);
    lastText2[0] = `H = ${height_input2.value}`;
    ctx2.fillStyle = "black";
    ctx2.fillText(lastText2[0], coords[0], coords[1]);
}

function length_submit2() {
    redrawLine2();
    ctx2.fillStyle = "white";
    ctx2.fillText(lastText2[1], coords[2], coords[3]);
    lastText2[1] = `D = ${length_input2.value}`;
    ctx2.fillStyle = "black";
    ctx2.fillText(lastText2[1], coords[2], coords[3]);
}

function startAnimation2(t, induced = 0) {
    if (playButton2 === -1) return;
    let angle2;
    let c;
    let a;
    switch (functions.value) {
        case "0":
            c = (Hpx2 * (Dpx2 + 1) / (Dpx2 * (xpos2 + 1 + 0.00001)) - Hpx2 * (Dpx2 + 1) / (Dpx2 * (xpos2 + 1))) / 0.00001;
            break;
        case "1":
            break;
        case "2":
            c = ((-Hpx2/Math.sqrt(Dpx2)) * Math.sqrt(xpos2 + 0.00001) - (-Hpx2/Math.sqrt(Dpx2)) * Math.sqrt(xpos2)) / 0.00001;
            break;
        case "3":
            c = ((-Math.sqrt(Hpx2 ** 2 - (xpos2 + 0.00001 - Hpx2) ** 2) + Hpx2) - (-Math.sqrt(Hpx2 ** 2 - (xpos2 - Hpx2) ** 2) + Hpx2)) / 0.00001;
            break;
        }
    angle2 = Math.atan(-c);
    a = 9.80665 * (Math.sin(angle2) - F2 * Math.cos(angle2));
    x1 = (0.5 * a * (t - t1) ** 2 + v1 * (t - t1)) / Math.sqrt(c ** 2 + 1);
    y1 = - c * x1;
    //console.log(`x1: ${x1}\nc: ${c}\na: ${a}\nt1: ${t1}\ntimeDif2: ${2 * timeDif2}\nv1: ${v1}`);
    xpos2 += x1;
    ypos2 -= y1;
    v1 += a * (t - t1);
    t1 = t;
    if (functions.value === "1"){
        xpos2 = 0.5 * 355 * (t - Math.sin(t));
        ypos2 = 0.5 * 355 * (-1 + Math.cos(t)) + 355;
    }
    
    if (ypos2 > Hpx2 || xpos2 > Dpx2 || x1 < - 0.01) {
        playButton2 *= -1;
        start2.innerHTML = "play";
        timeDif2 = 0;
        ypos2 = Hpx2;
        xpos2 = 0;
        t1 = 0;
        v1 = 0;
        return;
    }
    startGraph2(xpos2 + 20 /*+ Number(R2)*/, 400 - ypos2 - Number(R2));
    if (induced === 1) {
        time3 = new Date();
    }
    time4 = new Date();
    timeDif2 += time4.getSeconds() - time3.getSeconds() + (time4.getMilliseconds() - time3.getMilliseconds())/1000;
    time3 = time4;
    timer2.textContent = `time: ${timeDif2.toFixed(2)}s`;
    setInterval(() => startAnimation2(2 * timeDif2), 10);
}
// ------------------ END functions - graph2 --------------------
// ------------------ functions - graph3 -----------------------
let ratio3;
let topCoords3 = [[15, 45, 25, 45], [368, 395, 368, 405]]
const lastText3 = ["H = 355", "D = 348"];
let playButton3 = -1;
let timeDif3 = 0;
let R3 = 7;
let x3 = topCoords2[0][0] + 5;
let y3 = topCoords2[0][1] - R3;
Hpx3 = topCoords3[1][1] + 5 - topCoords3[0][1];
Dpx3 = topCoords3[1][0] - (topCoords3[0][0] + 5);
let v3 = 0;
let F3 = 0;
let t3 = 0;
let time5;
let time6;
let xpos3 = 0;
let ypos3 = Hpx3;

function startGraph3(x = topCoords3[0][0] + 5, y = topCoords3[0][1] - R3) {
    ctx3.clearRect(0, 0, graph3.width, graph3.height);
    ctx3.beginPath();

    ctx3.moveTo(20, 20);
    ctx3.lineTo(20, 400);
    ctx3.lineTo(400, 400);
    ctx3.moveTo(topCoords3[1][0], topCoords3[1][1]);
    ctx3.lineTo(topCoords3[1][2], topCoords3[1][3]);
    ctx3.moveTo(topCoords3[0][0], topCoords3[0][1]);
    ctx3.lineTo(topCoords3[0][2], topCoords3[0][3]);
    ctx3.stroke();
    
    ctx3.font = "15px Arial";
    ctx3.fillText(lastText3[0], coords[0], coords[1]);
    ctx3.fillText(lastText3[1], coords[2], coords[3]);

    ctx3.fillStyle = "#4f2112";
    ctx3.beginPath();
    ctx3.moveTo(topCoords3[0][0] + 5, topCoords3[0][1]);

    switch (functions3.value) {
        case "0":
            for (let i=0; i <= Dpx3; i++) {
                ctx3.lineTo(i + topCoords3[0][0] + 5, graph3.height - (graph3.height - topCoords3[1][1] - 5 + (Hpx3 * (Dpx3 + 1) / (Dpx3 * (i + 1)) - Hpx3 / Dpx3)));
            }
            ctx3.lineTo(21, 399);
            break;
        case "1":
            ctx3.lineTo(topCoords3[1][0], topCoords3[1][1] + 5);
            break;
        case "2":
            for (let i=0; i <= Dpx3; i++){
                ctx3.lineTo(i + topCoords3[0][0] + 5, graph3.height - (graph3.height - topCoords3[1][1] - 5 + (-Hpx3/Math.sqrt(Dpx3)) * Math.sqrt(i) + Hpx3));
            }
            ctx3.lineTo(21, 399);
            break;
        case "3":
            Dpx3 = Hpx3;
            if (length_input3.value !== height_input3.value){
                length_input3.value = height_input3.value;
                length_submit3();
                break;
            }
            for (let i=0; i <= Dpx3; i++){
                ctx3.lineTo(i + topCoords3[0][0] + 5, graph3.height - (graph3.height - topCoords3[1][1] - 5 + (-Math.sqrt(Hpx3 ** 2 - (i - Hpx3) ** 2) + Hpx3)));
            }
            ctx3.lineTo(21, 399);
            break;
        default:
    }
    ctx3.fill();
    ctx3.fillStyle = "black";
    //ctx3.stroke();

    ctx3.beginPath();
    ctx3.arc(x, y, R3, 0, 2 * Math.PI);
    ctx3.fill();
}

function redrawLine3() {
    
    topCoords3 = [[15, 45, 25, 45], [368, 395, 368, 405]];

    if (Number(length_input3.value) > Number(height_input3.value)){
        ratio3 = height_input3.value / length_input3.value;

        topCoords3[0][1] = (1 - ratio3) * 355 + 45;
        topCoords3[0][3] = (1 - ratio3) * 355 + 45;  
    } else if (Number(length_input3.value) < Number(height_input3.value)){
        ratio3 = Number(length_input3.value) / Number(height_input3.value);

        topCoords3[1][0] = ratio3 * 348 + 20;
        topCoords3[1][2] = ratio3 * 348 + 20;
    }
    x3 = topCoords3[0][0] + 5;
    y3 = topCoords3[0][1] - R3;

    Hpx3 = topCoords3[1][1] + 5 - topCoords3[0][1];
    Dpx3 = topCoords3[1][0] - (topCoords3[0][0] + 5);

    ypos3 = Hpx3;
    startGraph3();
}

function height_submit3() {
    redrawLine3();
    ctx3.fillStyle = "white";
    ctx3.fillText(lastText3[0], coords[0], coords[1]);
    lastText3[0] = `H = ${height_input3.value}`;
    ctx3.fillStyle = "black";
    ctx3.fillText(lastText3[0], coords[0], coords[1]);
}

function length_submit3() {
    redrawLine3();
    ctx3.fillStyle = "white";
    ctx3.fillText(lastText3[1], coords[2], coords[3]);
    lastText3[1] = `D = ${length_input3.value}`;
    ctx3.fillStyle = "black";
    ctx3.fillText(lastText3[1], coords[2], coords[3]);
}

function startAnimation3(t, induced = 0) {
    if (playButton3 === -1) return;
    let angle2;
    let c;
    let a;
    switch (functions3.value) {
        case "0":
            c = (Hpx3 * (Dpx3 + 1) / (Dpx3 * (xpos3 + 1 + 0.00001)) - Hpx3 * (Dpx3 + 1) / (Dpx3 * (xpos3 + 1))) / 0.00001;
            break;
        case "1":
            break;
        case "2":
            c = ((-Hpx3/Math.sqrt(Dpx3)) * Math.sqrt(xpos3 + 0.00001) - (-Hpx3/Math.sqrt(Dpx3)) * Math.sqrt(xpos3)) / 0.00001;
            break;
        case "3":
            c = ((-Math.sqrt(Hpx3 ** 2 - (xpos3 + 0.00001 - Hpx3) ** 2) + Hpx3) - (-Math.sqrt(Hpx3 ** 2 - (xpos3 - Hpx3) ** 2) + Hpx3)) / 0.00001;
            break;
        }
    angle2 = Math.atan(-c);
    a = 9.80665 * (Math.sin(angle2) - F3 * Math.cos(angle2));
    x3 = (0.5 * a * (t - t1) ** 2 + v3 * (t - t1)) / Math.sqrt(c ** 2 + 1);
    y3 = - c * x3;
   // console.log(`x1: ${x3}\nc: ${c}\na: ${a}\nt1: ${t1}\ntimeDif2: ${2 * timeDif3}\nv1: ${v3}`);
    xpos3 += x3;
    ypos3 -= y3;
    v3 += a * (t - t1);
    t1 = t;
    if (functions3.value === "1"){
        xpos3 = 0.5 * 355 * (t - Math.sin(t));
        ypos3 = 0.5 * 355 * (-1 + Math.cos(t)) + 355;
    }
    
    if (ypos3 > Hpx3 || xpos3 > Dpx3 || x3 < - 0.01) {
        playButton3 *= -1;
        start3.innerHTML = "play";
        timeDif3 = 0;
        ypos3 = Hpx3;
        xpos3 = 0;
        t1 = 0;
        v3 = 0;
        return;
    }
    startGraph3(xpos3 + 20 /*+ Number(R2)*/, 400 - ypos3 - Number(R3));
    if (induced === 1) {
        time5 = new Date();
    }
    time6 = new Date();
    timeDif3 += time6.getSeconds() - time5.getSeconds() + (time6.getMilliseconds() - time5.getMilliseconds())/1000;
    time5 = time6;
    timer3.textContent = `time: ${timeDif3.toFixed(2)}s`;
    setInterval(() => startAnimation3(2 * timeDif3), 10);
}
// ------------------ END functions - graph3 --------------------
// ------------------ play-all function -------------------------

function playAll() {}

// ------------------ END play-all function ---------------------
height_button.addEventListener("click", height_submit);
length_button.addEventListener("click", length_submit);
start1.addEventListener("click", () => {
    playButton *= -1;
    if (playButton === 1) { 
        start1.innerHTML = "stop";
    }else {
        start1.innerHTML = "start";
    }
    startAnimation1(2 * timeDif, 1);
});
scale1.addEventListener('change', () => {
    R = scale1.value;
    startGraph1();
})
frictionSubmit.addEventListener('click', () => F = Number(friction1.value));

startGraph1();

// ---------------------- Graph2 ---------------------------
height_button2.addEventListener("click", height_submit2);
length_button2.addEventListener("click", length_submit2);
start2.addEventListener("click", () => {
    playButton2 *= -1;
    if (playButton2 === 1) { 
        start2.innerHTML = "stop";
    }else {
        start2.innerHTML = "start";
    }
    startAnimation2(2 * timeDif2, 1);
});

scale2.addEventListener('change', () => {
    R2 = scale2.value;
    startGraph2();
})
frictionSubmit2.addEventListener('click', () => F2 = Number(friction2.value));

functions.addEventListener("change", startGraph2)
startGraph2();

// ---------------------- Graph3 -------------------------

height_button3.addEventListener("click", height_submit3);
length_button3.addEventListener("click", length_submit3);
start3.addEventListener("click", () => {
    playButton3 *= -1;
    if (playButton3 === 1) { 
        start3.innerHTML = "stop";
    }else {
        start3.innerHTML = "start";
    }
    startAnimation3(2 * timeDif3, 1);
});

scale3.addEventListener('change', () => {
    R3 = scale3.value;
    startGraph3();
})
frictionSubmit3.addEventListener('click', () => F3 = Number(friction3.value));

functions3.addEventListener("change", startGraph3)
startGraph3();