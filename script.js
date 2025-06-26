document.getElementById('botao-acessibilidade').addEventListener('click', function () {
    const opcoes = document.getElementById('opcoes-acessibilidade');
    opcoes.classList.toggle('mostrar');
  });

  // Acessibilidade: controle de fonte
  let aumentoCount = 0;
  let diminuicaoCount = 0;
  const limiteMaximo = 2;

  function ajustarFonte(delta) {
    const elementos = document.querySelectorAll(' .quadrado1, .descricao3, .descricao');

    elementos.forEach(el => {
      const estilo = window.getComputedStyle(el);
      const tamanhoAtual = parseFloat(estilo.fontSize);
      const novoTamanho = tamanhoAtual + delta;

      if (novoTamanho >= 12 && novoTamanho <= 40) {
        el.style.fontSize = ${novoTamanho}px;

        // Responsivo: altura automática, evita estouro
        el.style.height = 'auto';
        el.style.overflowWrap = 'break-word';
        el.style.wordBreak = 'break-word';
      }
    });
  }

  document.getElementById('aumentar-fonte').addEventListener('click', () => {
    if (aumentoCount < limiteMaximo) {
      ajustarFonte(2);
      aumentoCount++;
      diminuicaoCount = Math.max(0, diminuicaoCount - 1);
    }
  });

  document.getElementById('diminuir-fonte').addEventListener('click', () => {
    if (diminuicaoCount < limiteMaximo) {
      ajustarFonte(-2);
      diminuicaoCount++;
      aumentoCount = Math.max(0, aumentoCount - 1);
    }
  });

  // Leitor de texto com voz feminina
  document.getElementById('ler-texto').addEventListener('click', () => {
    const texto = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(texto);

    function escolherVoz() {
      const vozes = speechSynthesis.getVoices();
      let vozFeminina = vozes.find(voz =>
        voz.lang.toLowerCase().startsWith('pt-br') &&
        (
          voz.name.toLowerCase().includes('feminina') ||
          voz.name.toLowerCase().includes('luciana') ||
          voz.name.toLowerCase().includes('fernanda') ||
          voz.name.toLowerCase().includes('google português') ||
          voz.name.toLowerCase().includes('brasil')
        )
      ) || vozes.find(voz =>
        voz.lang.toLowerCase().startsWith('pt-br') && voz.name.toLowerCase().includes('female')
      ) || vozes.find(voz =>
        voz.lang.toLowerCase().startsWith('pt-br')
      );

      if (vozFeminina) utterance.voice = vozFeminina;
      utterance.lang = 'pt-BR';

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', escolherVoz, { once: true });
    } else {
      escolherVoz();
    }
  });

  // Instagram abrir em nova aba
  document.querySelector('.instagram')?.addEventListener('click', function () {
    const link = this.getAttribute('data-link') || this.getAttribute('href') || this.src;
    if (link) window.open(link, '_blank');
  });