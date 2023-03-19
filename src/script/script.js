const popupI = document.querySelector(".info-pop-up");

const showPopup = () => {
  popupI.style.display = "block";
}

document.querySelector(".close").addEventListener('click', () => {
  document.querySelector(".info-pop-up").style.display = "none";
})

const closePopup = (e) => {
  e.stopPropagation();
  e.preventDefault();
}

window.addEventListener('load', () => {
  showPopup();
  if (showPopup)
  {
    popupI.addEventListener('click', closePopup);
  }
})

const alertControl = () => {

    toastr.options.positionClass = 'toast-top-right';
    toastr.options.showDuration = 500;
    toastr.options.hideDuration = 500;
    toastr.options.timeOut = 2000;
    toastr.options.extendedTimeOut = 1000;
    toastr.options.showEasing = 'swing';
    toastr.options.hideEasing = 'linear';
    toastr.options.showMethod = 'fadeIn';
    toastr.options.hideMethod = 'fadeOut';

    let bgc = document.body.style.backgroundColor;
    toastr.success(`${bgc} rengi panoya kopalandı.`);
}


const container = document.querySelector('body');
const bgval = document.body.style.backgroundColor;
let r = bgval;
let g = bgval;
let b = bgval;
let a = 1;
let color = '#f0f0f0f0'
let isLeftToRight = true;

container.addEventListener('mousemove', (e) => {
  if (e.clientX < container.offsetWidth / 2) 
  {
    isLeftToRight = false;
  } 
  else 
  {
    isLeftToRight = true;
  }
  if (isLeftToRight && Math.abs(e.movementX) > Math.abs(e.movementY)) 
  {
    r -= 3;
    g -= 2;
    b -= 1;
  } 
  else if (!isLeftToRight && Math.abs(e.movementX) > Math.abs(e.movementY)) 
  {
    r += 3;
    g += 2;
    b += 1;
  }
  if (e.movementY > 0)
  {
    a +=0.01;
  }
  else
  {
    a -=0.01;
  }
  if (e.movementY > 0) {
    color = lightenColor(color, 0.1);
  } else {
    color = darkenColor(color, 0.1);
  }
  container.style.backgroundColor = color;

  r = Math.min(Math.max(r, 0), 255);
  g = Math.min(Math.max(g, 0), 255);
  b = Math.min(Math.max(b, 0), 255);
  a = Math.min(Math.max(a, 0), 1);
  container.style.backgroundColor = `rgb(${r}, ${g}, ${b}, ${a})`;
});

container.addEventListener('mousemove', (e) => {

  const hexValue = document.querySelector(".hexactive");
  hexValue.placeholder = rgba2hex(window.getComputedStyle(e.target).getPropertyValue("background-color"));

  const rgbValue = document.querySelector(".rgbactive");
  rgbValue.placeholder = `rgb(${r}, ${g}, ${b})`;

  const rgbaValue = document.querySelector(".rgbaactive");
  rgbaValue.placeholder = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;

});

let popup = document.createElement("div");

const choose = (e) => {
  let x = e.clientX;
  let y = e.clientY;
  let color = window.getComputedStyle(e.target).getPropertyValue("background-color");
  popup.innerHTML = "<p>" + rgbColor(color) + "</p>" + "<br/>" +
                    "<p>" + rgbaColor(color) + "</p>" + "<br/>" +
                    "<p>" + rgba2hex(color) + "</p>";
  popup.style.position = "fixed";
  popup.style.top = y + "px";
  popup.style.left = x + "px";
  popup.classList.add("choose");
  document.body.appendChild(popup);

}

document.addEventListener("click", (e) => {
  if (popup.classList.contains("choose")) {
    popup.remove();
  }

  choose(e);
});

popup.addEventListener("mouseleave", () => {
  document.querySelectorAll(".choose").forEach(e => e.remove());
})

const rgbColor = (e) => {
  let rgb = e.match(/\d+/g);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
} 

const rgbaColor = (e) => {
  let rgba = e.match(/\d+(\.\d+)?/g);

  if (rgba[3] === undefined)
  {
    return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1)`;
  }


  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

const rgba2hex = (rgba) => {
  rgba = rgba.match(/\d+/g);
  var hex = "#" + ((1 << 24) + (+rgba[0] << 16) + (+rgba[1] << 8) + +rgba[2]).toString(16).slice(1);
  var alpha = Math.round(+rgba[3] * 255).toString(16);
  if (alpha.length == 1) alpha = "0" + alpha;
  hex = hex + alpha;
  return hex;
}

const copyText = (e) => {
  const textToCopy = e.target.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {

      let audio = new Audio("src/audio/clicksound.wav");
      audio.play();

      window.addEventListener('click', alertControl);

    }, () => {
      alert("Seçmiş olduğunuz renk panoya kopyalanamadı. Lütfen tekrar deneyiniz.");
    });
};

popup.querySelectorAll("p").forEach((p) => {
  p.addEventListener("click", (e) => {
    copyText(e);
  });
})

const rgbaToHex = (r, g, b, a) => {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
};

const hexToRgba = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    result[4] ? parseInt(result[4], 16) / 255 : 1,
  ] : null;
};

const lightenColor = (hex, amount) => {
  const [r, g, b, a] = hexToRgba(hex);
  return rgbaToHex(
    r - Math.round(r * amount),
    g - Math.round(g * amount),
    b - Math.round(b * amount),
    a - a * amount
  );
};

const darkenColor = (hex, amount) => {
  const [r, g, b, a] = hexToRgba(hex);
  return rgbaToHex(
    r + Math.round((255 - r) * amount),
    g + Math.round((255 - g) * amount),
    b + Math.round((255 - b) * amount),
    a + (1 - a) * amount
  );
  
};