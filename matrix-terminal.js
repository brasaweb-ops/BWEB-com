document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('terminal-input');
    const adTextElement = document.createElement('span');
    adTextElement.classList.add('ad-line');
    output.appendChild(adTextElement);
    const knockSound = document.getElementById('knockSound');

    const ads = [
        "HYPNOWARE: Ferramentas dinâmicas de onboarding e apresentações.",
        "CHATNOIR: Mensagens em sigilo. Criptografia total.",
        "GETAOS: Nosso sistema operacional bootável. Segurança offline.",
        "TUNIKA AI: Inteligência artificial privada. Nossa curadoria.",
        "BRASABITS: O Palco da comunidade e aprendizado."
    ];
    let adIndex = 0;
    
    // Novo estado de controle
    let isInitialized = false;

    // Função para adicionar uma nova linha ao terminal
    const addLine = (text) => {
        output.textContent += `${text}\n`;
        output.scrollTop = output.scrollHeight;
    };
    
    const handleCommand = (command) => {
        addLine(`BRASAWB > ${command}`);
        input.value = '';

        if (!isInitialized) {
            if (command.toLowerCase().trim() === 'enter') {
                isInitialized = true;
                if (knockSound) {
                    knockSound.play().catch(error => console.error("Erro ao tocar o áudio:", error));
                }
                
                // Inicia o script do Matrix
                setTimeout(() => {
                    addLine('Wake up, Neo...');
                    setTimeout(() => {
                        addLine('The Matrix has you.');
                        setTimeout(() => {
                            addLine('Follow the white rabbit.');
                            setTimeout(() => {
                                addLine('Knock, knock, Neo.');
                                // Já tocamos o som, então apenas a mensagem aparece
                                // O usuário pode pressionar enter novamente para continuar...
                            }, 2000);
                        }, 2000);
                    }, 2000);
                }, 1000);
            } else {
                addLine('Comando não reconhecido. Pressione ENTER para iniciar.');
            }
            return;
        }

        // Lógica dos comandos
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
    
    const cycleAds = () => {
        adTextElement.textContent = ads[adIndex];
        adIndex = (adIndex + 1) % ads.length;
    };
    setInterval(cycleAds, 5000);
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.value;
            handleCommand(command);
        }
    });

    // Mensagem de início
    addLine('Pressione ENTER para iniciar a conexão.');
    input.focus();
});