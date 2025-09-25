document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('terminal-input');
    const adTextElement = document.createElement('span');
    adTextElement.classList.add('ad-line');
    output.appendChild(adTextElement);

    // Conteúdo das "propagandas"
    const ads = [
        "HYPNOWARE: Ferramentas dinâmicas de onboarding e apresentações.",
        "CHATNOIR: Mensagens em sigilo. Criptografia total.",
        "GETAOS: Nosso sistema operacional bootável. Segurança offline.",
        "TUNIKA AI: Inteligência artificial privada. Nossa curadoria.",
        "BRASABITS: O Palco da comunidade e aprendizado."
    ];
    let adIndex = 0;

    // Função para adicionar uma nova linha ao terminal
    const addLine = (text) => {
        output.textContent += `${text}\n`;
        output.scrollTop = output.scrollHeight; // Scroll para o final
    };

    // Função para lidar com a digitação do usuário
    const handleCommand = (command) => {
        addLine(`BRASAWB > ${command}`);

        // Limpar o input
        input.value = '';

        // Processar os comandos (placeholder para a URA)
        switch (command.toLowerCase().trim()) {
            case 'help':
                addLine('Comandos disponíveis:');
                addLine('- about: Quem somos nós.');
                addLine('- products: Nossas criações.');
                addLine('- ura: Conectar a URA (ainda em desenvolvimento).');
                addLine('- clear: Limpa a tela.');
                break;
            case 'about':
                addLine('Somos a Brasaweb, o caos organizado do futuro indie. Uma rede de criativos, hackers e sonhadores.');
                break;
            case 'products':
                addLine('Nossas principais criações: Hypnoware, Chatnoir, GetaOS, Tunika AI.');
                break;
            case 'ura':
                // A URA será conectada aqui
                addLine('[Aguardando conexão com a URA...]');
                addLine('...URGÊNCIA: 🔴🔴🔴⭕⭕');
                addLine('...COMPLEXIDADE: 🔴⭕⭕⭕⭕');
                addLine('Siga as instruções da URA para continuar.');
                break;
            case 'clear':
                output.textContent = '';
                addLine('Tela limpa.');
                break;
            default:
                addLine(`Comando "${command}" não reconhecido. Digite "help" para ver os comandos.`);
                break;
        }
    };
    
    // Ciclo de propagandas
    const cycleAds = () => {
        adTextElement.textContent = ads[adIndex];
        adIndex = (adIndex + 1) % ads.length;
    };
    setInterval(cycleAds, 5000); // Muda a cada 5 segundos
    
    // Adicionar um evento para o Enter no input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita a quebra de linha
            const command = input.value;
            handleCommand(command);
        }
    });

    // Mensagem de entrada (Wake up, Neo...)
    setTimeout(() => {
        addLine('Wake up, Neo...');
        setTimeout(() => {
            addLine('The Matrix has you.');
            setTimeout(() => {
                addLine('Follow the white rabbit.');
                setTimeout(() => {
                    addLine('Knock, knock, Neo.');
                }, 2000);
            }, 2000);
        }, 2000);
    }, 1000);
    
    // Focar no input ao carregar a página
    input.focus();
});