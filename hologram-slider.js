document.addEventListener('DOMContentLoaded', () => {
    const slideTitle = document.querySelector('.slide-title');
    const slideDescription = document.querySelector('.slide-description');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const slides = [
        {
            title: "BRASACAS: O Chaos Organizado",
            description: "Nossa rede é um sistema complexo de elementos interconectados, como uma teia fina construída por uma aranha, usada para capturar suas presas. Cada parte mantém sua individualidade, mas carrega o DNA visual da Brasaweb, crescendo organicamente sem perder a coerência."
        },
        {
            title: "HYPNOWARE: Ferramentas do Futuro",
            description: "Desenvolvemos o Hypnoware, uma ferramenta dinâmica de onboarding e apresentações com Q&A. Pensamos em utilitários como Kinote.us, Ferramenta para mensagens em sigilo, IA privada, e um OS voltado para a segurança: GetaOS."
        },
        {
            title: "TUNIKA AI: Inteligência Adaptativa",
            description: "A Tunika AI é nossa IA privada, capaz de ler e iterar sobre todos os nossos artefatos. Curadoria periódica de informações e aprendizado contínuo para manter a Brasaweb sempre à frente."
        },
        {
            title: "GETAOS: O Bunker Offline",
            description: "Um OS voltado para a segurança das nossas informações. Offline e bootável por um pen drive ou HD externo, o GetaOS é o ambiente anti-invasão que protege nosso terminal burro."
        },
        {
            title: "BRASA BITS: Conexão e Aprendizado",
            description: "No 'Palco' dos Brasabits, encontramos o Podcast de contracultura com conversas sobre o mercado de trabalho e mostras criativas de desenvolvimento de produtos. É o nosso 'Big Bang' de conhecimento."
        },
        {
            title: "BRASALABS: A Vitrine da Inovação",
            description: "Aqui, apresentamos a 'vitrine' da nossa inovação. Projetos como o Sandbox no FiveM com enredo cyberpunk, protótipos mobile-first e integrações com React e B4 Server."
        },
        {
            title: "CHATNOIR: Mensagens em Sigilo",
            description: "Acreditamos na comunicação segura. Chatnoir é nossa ferramenta dedicada para mensagens em sigilo, garantindo privacidade e controle total sobre suas informações."
        }
    ];

    let currentSlideIndex = 0;
    let typingTimeout;

    // Função para simular o efeito "typewriter"
    const typeWriterEffect = (element, text, callback) => {
        let i = 0;
        element.textContent = ''; // Limpa o conteúdo antes de digitar
        const speed = 30; // Velocidade de digitação (ms por caractere)

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeout = setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        };
        type();
    };

    const displaySlide = (index) => {
        clearTimeout(typingTimeout); // Limpa qualquer digitação anterior
        const slide = slides[index];

        // Resetar classes para reativar animação
        slideTitle.classList.remove('typewriter-text', 'active');
        slideDescription.classList.remove('typewriter-text', 'active');
        slideTitle.textContent = '';
        slideDescription.textContent = '';

        // Atraso para garantir que a classe seja removida e reativada
        setTimeout(() => {
            typeWriterEffect(slideTitle, slide.title, () => {
                slideTitle.classList.add('typewriter-text', 'active'); // Ativa o cursor piscando
                typeWriterEffect(slideDescription, slide.description, () => {
                    slideDescription.classList.add('typewriter-text', 'active'); // Ativa o cursor piscando
                });
            });
        }, 50); // Pequeno atraso para reativar animação
    };

    prevBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        displaySlide(currentSlideIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        displaySlide(currentSlideIndex);
    });

    // Iniciar o slider com o primeiro slide
    displaySlide(currentSlideIndex);
});