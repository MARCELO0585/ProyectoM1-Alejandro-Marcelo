function generarColorHSL() {
  const h= Math.round(Math.random()*360); 
  return "hsl("+h+", 70%, 60%)";
 }

 const paleta = [];
 
 for (let i = 0; i < 5; i++) {
   console.log(generarColorHSL());
    paleta.push(generarColorHSL());
 }

 console.log(paleta);