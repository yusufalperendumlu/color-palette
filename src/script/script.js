const lightColors = ["#FF5733", "#FFBD33", "#DBFF33", "#33FF57", "#33FFBD", "#333FFF", "#BD33FF", "#FF33DB"];
const darkColor = ["#003666", "#222", "#6d6e70", "#2a5934", "#ffb900", "#c90f23", "#000000"];

const alertControl = (e) => {
    e.preventDefault();

    
    
}



function changeBackgroundColor() {

    window.addEventListener("mousemove", (e) => {
        let mouseX = e.clientX;

        if(mouseX < window.innerWidth/2)
        {
            let colorIndex = Math.floor(Math.random() * lightColors.length);
            let newColor = lightColors[colorIndex]; 
            document.body.style.backgroundColor = newColor; 
            document.body.style.transition = "all 200ms ease-in";
            console.log("left");
        }


        else
        {
            let colorIndex = Math.floor(Math.random() * darkColor.length); 
            let newColor = darkColor[colorIndex]; 
            document.body.style.backgroundColor = newColor; 
            document.body.style.transition = "all 200ms ease-in";
            console.log("right");
        }
    })
}

setInterval(changeBackgroundColor, 50);


document.addEventListener('mousedown', (e) => {
    e.preventDefault();
    
    if(e.button === 0)
    {
        let backColor = document.body.style.backgroundColor;

        navigator.clipboard.writeText(backColor).then( () => {
            let audio = new Audio("src/audio/clicksound.wav");
            audio.play();

            window.addEventListener('click', alertControl);

        }, () => {
            alert("Seçmiş olduğunuz renk panoya kopyalanamdı. Lütfen tekrar deneyiniz.");
        })
    }
})

document.addEventListener('mousemove', (e) => {
    let bgc = document.body.style.backgroundColor;
    console.log(bgc);
    const colorInfo = document.createElement("div");
    colorInfo.classList.add("colorInfo");
    if(e.clientX < window.innerWidth /2)
    {
        colorInfo.textContent = `Color: ${bgc} - Light color`;
    }
    else
    {
        colorInfo.textContent = `Color: ${bgc} - Dark Color`;
    }
    document.body.appendChild(colorInfo);
})
