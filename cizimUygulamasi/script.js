const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ciz2d = canvas.getContext("2d");

let size = 30;
let isPressed = false;
let color = "black"; // Başlangıç rengi
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    daireCiz(x2, y2); // Daire çizecek
    cizgiCiz(x, y, x2, y2); // Çizgi çizecek
    x = x2;
    y = y2;
  }
});

function daireCiz(x, y) {
  ciz2d.beginPath();
  ciz2d.arc(x, y, size, 0, Math.PI * 2);
  ciz2d.fillStyle = color; // Rengi uygula
  ciz2d.fill();
}

function cizgiCiz(x1, y1, x2, y2) {
  ciz2d.beginPath();
  ciz2d.moveTo(x1, y1);
  ciz2d.lineTo(x2, y2);
  ciz2d.strokeStyle = color; // Rengi uygula
  ciz2d.lineWidth = size * 2;
  ciz2d.stroke();
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  boyutBilgisi();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  boyutBilgisi();
});

colorEl.addEventListener("input", (e) => {  // Renk değişimi için 'input' event'ı
  color = e.target.value; // Yeni renk değeri al
});

clearEl.addEventListener("click", () => {
  ciz2d.clearRect(0, 0, canvas.width, canvas.height); // Ekranı temizle
});

function boyutBilgisi() {
  sizeEl.innerText = size; // Boyutu gösterecek
}
