let circleX, circleY;
let circleSize = 100;
let circlesNumber;
let circlesNumbers;
let timeReaction = 0;
let testing = false;
let startButton, stopButton; // Botões para iniciar e parar o teste
let circleCreationTime;
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight - 150);

  // Cria o botão para iniciar o teste
  startButton = createButton('Iniciar Teste');
  startButton.class('start');
  startButton.position((windowWidth / 2) - 160, windowHeight - 50); // Posição do botão
  // startButton.mousePressed(startTest); // Define a função que será chamada quando o botão for clicado

  // Cria o botão para parar o teste
  stopButton = createButton('Parar Teste');
  stopButton.class('stop');
  stopButton.attribute('disabled', true); // Desativa o botão
  stopButton.position((windowWidth / 2), windowHeight - 50); // Posição do botão
  stopButton.mousePressed(stopTest); // Define a função que será chamada quando o botão for clicado
  
  document.querySelector('.start').addEventListener("click", function() {
    circlesNumber = parseInt(document.getElementById('numero-circulos').value);
    //console.log(circlesNumber);
    if (circlesNumber < 1) {
      alert('O número de círculos deve ser maior que 0!');
      return;
    }
    // console.log(circlesNumber);
    circlesNumbers = circlesNumber;
    startTest();
  });
}

function draw() {
  // put drawing code here
  background(155);

  ellipse(circleX, circleY, circleSize, circleSize);

  // Verifica se o mouse está dentro do círculo
  let d = dist(mouseX, mouseY, circleX, circleY); // Calcula a distância entre o mouse e o centro do círculo
  if (d < circleSize / 2) { // Se a distância for menor que o raio do círculo, o mouse está dentro do círculo
    fill(0, 255, 0); // Define a cor para verde
  } else {
    fill(255); // Define a cor para branco
  }
}

function mostrarResultado() {
  document.getElementById('resultado-card').classList.remove('hidden');
  let resultadoTexto = `<p>Parabéns! Seu tempo de reação foi  ${timeReaction} segundos!</p>`;
  resultadoTexto += `<p>Tempo médio de reação: ${timeReaction / circlesNumbers} segundos!</p>`;
  document.getElementById('resultado-texto').innerHTML = resultadoTexto;
}

function tiraResultado() {
  document.getElementById('resultado-card').classList.add('hidden');
}

function startTest() {
  tiraResultado();  
  zeraTeste();
  testing = true; // Marca o teste como em andamento
  startButton.attribute('disabled', true); // Desativa o botão de iniciar teste
  stopButton.removeAttribute('disabled');
  createCircle(); // Inicia o teste criando o círculo inicial
}

function stopTest() {
  tiraResultado();
  testing = false; // Marca o teste como parado
  stopButton.attribute('disabled', true); // Desativa o botão de parar teste
  startButton.removeAttribute('disabled');
  zeraTeste();

}

function zeraTeste(){
  circleX = undefined; // Remove o círculo do canvas
  circleY = undefined;
  circleCreationTime = undefined;
  timeReaction = 0;
  circlesNumber = circlesNumbers;
}

function mouseClicked() {

  if (testing && circleX !== undefined && circleY !== undefined) {
    // Verifica se o mouse está dentro do círculo quando é clicado
    let d = dist(mouseX, mouseY, circleX, circleY);
    if (d < circleSize / 2) {
      if (circlesNumber == 0) {
        return;
      }
      let clickTime = performance.now(); // Registra o tempo atual em milissegundos com alta precisão
      let elapsedTime = (clickTime - circleCreationTime) / 1000; // Calcula o tempo decorrido em segundos
      //console.log("Tempo decorrido desde a criação do círculo: " + elapsedTime + " segundos");
      timeReaction += elapsedTime;
      circlesNumber--;
      createCircle(); // Cria um novo círculo
    }
  }
}

function createCircle() {
  // Define a posição inicial do círculo aleatoriamente dentro do canvas
  if (circlesNumber == 0) {
    // console.log("Fim do jogo!");
    // console.log("time reaction: " + timeReaction + " segundos");
    // console.log("Tempo médio de reação: " + timeReaction / circlesNumbers + " segundos");
    // console.log("numeros de circulos: " + circlesNumber);
    startButton.removeAttribute('disabled');
    mostrarResultado();
    zeraTeste();
    return;
  }
  circleX = random(circleSize, width - circleSize);
  circleY = random(circleSize, height - circleSize);
  circleCreationTime = performance.now(); // Registra o momento em que o círculo foi criado com alta precisão
}
