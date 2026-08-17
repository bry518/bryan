document.addEventListener('DOMContentLoaded', () => {

    // 1. GERENCIAMENTO DE ACESSIBILIDADE (FONTE E CONTRASTE)
    let currentFontSize = 16;
    const body = document.body;

    const updateFontSize = (size) => {
        if (size >= 12 && size <= 24) {
            currentFontSize = size;
            document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    };

    document.getElementById('btn-increase').addEventListener('click', () => {
        updateFontSize(currentFontSize + 2);
    });

    document.getElementById('btn-decrease').addEventListener('click', () => {
        updateFontSize(currentFontSize - 2);
    });

    document.getElementById('btn-contrast').addEventListener('click', () => {
        body.classList.toggle('high-contrast');
    });


    // 2. COMPONENTE DE CARROSSEL (Via Array de Objetos)
    const testimonials = [
        {
            text: "“Notamos um aumento imediato na participação ativa das aulas e uma redução drástica nos conflitos de pátio após a implementação das novas diretrizes.”",
            author: "Dra. Letícia Rodrigues",
            role: "Diretora Pedagógica e Consultora de Ensino"
        },
        {
            text: "“Os alunos voltaram a se olhar nos olhos e a conversar nos intervalos. O ganho cognitivo compensa qualquer esforço de adaptação das famílias.”",
            author: "Prof. Ricardo Alves",
            role: "Especialista em Psicologia Escolar"
        },
        {
            text: "“Como mãe, apoiei a medida. Meu filho agora mantém o foco nas tarefas e aproveita melhor o tempo de convivência real na escola.”",
            author: "Mariana Souza",
            role: "Representante de Associação de Pais"
        }
    ];

    const carouselContainer = document.getElementById('carousel-container');
    let currentSlide = 0;

    testimonials.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-text">${item.text}</p>
                <span class="testimonial-author">${item.author}</span>
                <span class="testimonial-role">${item.role}</span>
            </div>
        `;
        carouselContainer.appendChild(slide);
    });

    const moveCarousel = () => {
        carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    document.getElementById('btn-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        moveCarousel();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        moveCarousel();
    });


    // 3. COMPONENTE DE ACORDEÃO (FAQ Via Array de Objetos)
    const faqData = [
        {
            question: "Como funciona a exceção para uso pedagógico?",
            answer: "Os dispositivos eletrônicos podem ser utilizados unicamente quando solicitados expressamente pelo professor, integrados ao plano de aula para atividades de pesquisa ou uso de softwares específicos de aprendizagem."
        },
        {
            question: "Estudantes com necessidades médicas podem usar o aparelho?",
            answer: "Sim. Alunos que necessitam de monitoramento contínuo de saúde (como controle de glicemia para diabéticos) possuem permissão especial garantida mediante apresentação de laudo médico à coordenação escolar."
        },
        {
            question: "O que acontece se o aluno descumprir as regras?",
            answer: "A escola segue um protocolo gradativo: recolhimento do aparelho pela equipe de gestão, armazenamento seguro e devolução ao final do turno ou diretamente aos pais e responsáveis legais."
        },
        {
            question: "A regra vale também para escolas particulares?",
            answer: "Sim. A legislação abrange de forma abrangente o sistema nacional de ensino, unificando os critérios para redes públicas municipais, estaduais, federais e privadas de educação básica."
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');

    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.className = 'accordion-item';

        accItem.innerHTML = `
            <button class="accordion-header" id="faq-header-${index}" aria-expanded="false" aria-controls="faq-content-${index}">
                <span>${item.question}</span>
                <i class="fa-solid fa-chevron-down accordion-icon"></i>
            </button>
            <div class="accordion-content" id="faq-content-${index}" role="region" aria-labelledby="faq-header-${index}">
                <p>${item.answer}</p>
            </div>
        `;

        accordionContainer.appendChild(accItem);

        const headerButton = accItem.querySelector('.accordion-header');
        const contentDiv = accItem.querySelector('.accordion-content');

        headerButton.addEventListener('click', () => {
            const isActive = accItem.classList.contains('active');
            
            // Fecha todos antes de abrir o novo
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                el.querySelector('.accordion-content').style.maxHeight = '0';
            });

            if (!isActive) {
                accItem.classList.add('active');
                headerButton.setAttribute('aria-expanded', 'true');
                contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
            }
        });
    });
})