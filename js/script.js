const galeria = document.getElementById("galeria");
const boton = document.getElementById("generar");
const selector = document.getElementById("cantidad");

let paleta = [];

function hslToHex(h, s, l) {
  l = l / 100;

  const a = (s * Math.min(l, 1 - l)) / 100;

  const f = function (n) {
    const k = (n + h / 30) % 12;

    const color = l - a * Math.max(
      Math.min(k - 3, 9 - k, 1),
      -1
    );

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return "#" + f(0) + f(8) + f(4);
}

function generarColor() {
  const h = Math.round(Math.random() * 360);

  const hsl = `hsl(${h}, 70%, 60%)`;
  const hex = hslToHex(h, 70, 60);

  return {
    hsl,
    hex,
    locked: false
  };
}

async function copiarColor(hex, hsl) {
  const texto = `${hex}\n${hsl}`;

  try {
    await navigator.clipboard.writeText(texto);

    alert(`Copiado:\n${hex}\n${hsl}`);
  } catch (error) {
    console.error("Error al copiar:", error);
  }
}

function crearSwatch(color, nombre, index) {
  const swatch = document.createElement("article");
  swatch.className = "swatch";

  const colorDiv = document.createElement("div");
  colorDiv.className = "swatch__color";
  colorDiv.style.backgroundColor = color.hsl;

  colorDiv.addEventListener("click", function () {
    copiarColor(color.hex, color.hsl);
  });

  const info = document.createElement("div");
  info.className = "swatch__info";

  const elNombre = document.createElement("p");
  elNombre.className = "swatch__nombre";
  elNombre.textContent = nombre;

  const elCodigo = document.createElement("p");
  elCodigo.className = "swatch__codigo";
  elCodigo.textContent = `${color.hex} · ${color.hsl}`;

  const botonLock = document.createElement("button");
  botonLock.className = "swatch__lock";
  botonLock.textContent = color.locked ? "🔒" : "🔓";

  botonLock.addEventListener("click", function (event) {
    event.stopPropagation();

    paleta[index].locked = !paleta[index].locked;

    mostrarPaleta();
  });

  info.append(elNombre, elCodigo, botonLock);

  swatch.append(colorDiv, info);

  return swatch;
}

function mostrarPaleta() {
  galeria.innerHTML = "";

  paleta.forEach((color, index) => {
    const swatch = crearSwatch(
      color,
      `Color ${index + 1}`,
      index
    );

    galeria.appendChild(swatch);
  });
}

function renderPaleta(cantidad) {
  while (paleta.length < cantidad) {
    paleta.push(generarColor());
  }

  if (paleta.length > cantidad) {
    paleta = paleta.slice(0, cantidad);
  }

  paleta = paleta.map((color) => {
    if (color.locked) {
      return color;
    }

    return generarColor();
  });

  mostrarPaleta();
}

boton.addEventListener("click", function () {
  renderPaleta(Number(selector.value));
});

selector.addEventListener("change", function () {
  renderPaleta(Number(selector.value));
});

renderPaleta(Number(selector.value));


  
