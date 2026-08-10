// ==========================================================================
// ESTADO E CONTROLE DE LEITURA
// ==========================================================================
let lendo = false;

const btnVoz = document.getElementById("btnVoz");

if (btnVoz) {
  btnVoz.addEventListener("click", controlarLeitura);
}

function controlarLeitura() {
  // 1. Se estiver pausado, retoma a leitura
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    return;
  }

  // 2. Se já estiver falando, pausa a leitura
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    return;
  }

  // 3. Se já estiver em execução/iniciado, evita disparar novamente
  if (lendo === true) {
    return;
  }

  // 4. Cancela qualquer fala pendente antes de iniciar uma nova
  window.speechSynthesis.cancel();

  // Inicia nova leitura
  lerEmVozAlta();
}

function lerEmVozAlta() {
  const conteudo = document.querySelector("main");
  if (!conteudo) return;

  const texto = conteudo.innerText;
  const fala = new SpeechSynthesisUtterance(texto);

  fala.lang = "pt-BR";
  fala.rate = 0.9;

  // Callback acionado ao encerrar a reprodução do texto
  fala.onend = function () {
    finalizarLeitura();
  };

  lendo = true;
  window.speechSynthesis.speak(fala);
}

function finalizarLeitura() {
  lendo = false;
}

function pararLeitura() {
  window.speechSynthesis.cancel();
  finalizarLeitura();
}

// ==========================================================================
// CONTROLE DE FONTE E ALTO CONTRASTE
// ==========================================================================
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;
const tamanhoMinimo = 12;
const tamanhoMaximo = 26;

const btnAumenta = document.getElementById("btnAumentaTexto");
const btnDiminui = document.getElementById("btnDiminuiTexto");

if (btnAumenta) {
  btnAumenta.addEventListener("click", () => {
    if (tamanhoFonteAtual < tamanhoMaximo) {
      tamanhoFonteAtual += valorAdicionado;
      document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
  });
}

if (btnDiminui) {
  btnDiminui.addEventListener("click", () => {
    if (tamanhoFonteAtual > tamanhoMinimo) {
      tamanhoFonteAtual -= valorSubtraido;
      document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
  });
}

function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}