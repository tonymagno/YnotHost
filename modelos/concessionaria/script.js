// Dados dos veículos
const veiculos = [
    {
        id: 1,
        nome: "Toyota Corolla 2024",
        marca: "toyota",
        tipo: "sedan",
        preco: 95000,
        ano: 2024,
        km: 0,
        combustivel: "Gasolina",
        cambio: "Automático",
        imagem: "../assets/images/concessionaria_toyota_corolla.jpg",
        descricao: "Sedã confortável e econômico, perfeito para uso diário."
    },
    {
        id: 2,
        nome: "Honda CR-V 2023",
        marca: "honda",
        tipo: "suv",
        preco: 145000,
        ano: 2023,
        km: 15000,
        combustivel: "Gasolina",
        cambio: "Automático",
        imagem: "../assets/images/concessionaria_honda_crv.jpg",
        descricao: "SUV espaçoso com excelente desempenho e segurança."
    },
    {
        id: 3,
        nome: "Volkswagen Polo 2024",
        marca: "volkswagen",
        tipo: "hatch",
        preco: 75000,
        ano: 2024,
        km: 0,
        combustivel: "Gasolina",
        cambio: "Manual",
        imagem: "../assets/images/concessionaria_vw_polo.jpg",
        descricao: "Hatch ágil e econômico, ideal para a cidade."
    },
    {
        id: 4,
        nome: "Fiat Strada 2024",
        marca: "fiat",
        tipo: "pickup",
        preco: 85000,
        ano: 2024,
        km: 0,
        combustivel: "Gasolina",
        cambio: "Manual",
        imagem: "../assets/images/concessionaria_fiat_strada.jpg",
        descricao: "Pickup robusta e confiável para trabalho e lazer."
    },
    {
        id: 5,
        nome: "Chevrolet Onix 2024",
        marca: "chevrolet",
        tipo: "hatch",
        preco: 65000,
        ano: 2024,
        km: 0,
        combustivel: "Gasolina",
        cambio: "Manual",
        imagem: "../assets/images/concessionaria_chevrolet_onix.jpg",
        descricao: "Hatch prático e econômico com ótima relação custo-benefício."
    },
    {
        id: 6,
        nome: "Toyota Hilux 2023",
        marca: "toyota",
        tipo: "pickup",
        preco: 165000,
        ano: 2023,
        km: 25000,
        combustivel: "Diesel",
        cambio: "Automático",
        imagem: "../assets/images/concessionaria_toyota_hilux.jpg",
        descricao: "Pickup de alta performance, ideal para trabalho pesado."
    },
    {
        id: 7,
        nome: "Honda Civic 2023",
        marca: "honda",
        tipo: "sedan",
        preco: 115000,
        ano: 2023,
        km: 20000,
        combustivel: "Gasolina",
        cambio: "Automático",
        imagem: "../assets/images/concessionaria_honda_civic.jpg",
        descricao: "Sedã esportivo com tecnologia de ponta e conforto."
    },
    {
        id: 8,
        nome: "Volkswagen T-Cross 2024",
        marca: "volkswagen",
        tipo: "suv",
        preco: 125000,
        ano: 2024,
        km: 0,
        combustivel: "Gasolina",
        cambio: "Automático",
        imagem: "../assets/images/concessionaria_vw_tcross.jpg",
        descricao: "SUV compacto moderno com design atraente."
    }
];

// Carregar veículos ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarVeiculos(veiculos);
    configurarMenuMobile();
    configurarFormulario();
});

// Função para carregar e exibir veículos
function carregarVeiculos(lista) {
    const grid = document.getElementById('veiculos-grid');
    grid.innerHTML = '';

    if (lista.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #757575;">Nenhum veículo encontrado com os filtros selecionados.</p>';
        return;
    }

    lista.forEach(veiculo => {
        const card = document.createElement('div');
        card.className = 'veiculo-card';
        card.innerHTML = `
            <div class="veiculo-image">
                <img src="${veiculo.imagem}" alt="${veiculo.nome}" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(veiculo.nome)}'">
                <div class="veiculo-badge">${veiculo.ano}</div>
            </div>
            <div class="veiculo-info">
                <h3>${veiculo.nome}</h3>
                <p>${veiculo.descricao}</p>
                <div class="veiculo-specs">
                    <div class="spec-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${veiculo.km.toLocaleString('pt-BR')} km</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${veiculo.combustivel}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cog"></i>
                        <span>${veiculo.cambio}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cube"></i>
                        <span>${veiculo.tipo}</span>
                    </div>
                </div>
                <div class="veiculo-price">R$ ${veiculo.preco.toLocaleString('pt-BR')}</div>
                <div class="veiculo-actions">
                    <a href="#contato" class="btn-info">Mais Informações</a>
                    <a href="https://wa.me/5512978135300?text=Olá! Tenho interesse no ${encodeURIComponent(veiculo.nome)} (R$ ${veiculo.preco.toLocaleString('pt-BR')}). Gostaria de mais informações e agendar um test drive." target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Função para aplicar filtros
function aplicarFiltros() {
    const tipo = document.getElementById('filtro-tipo').value;
    const marca = document.getElementById('filtro-marca').value;
    const preco = document.getElementById('filtro-preco').value;

    let filtrados = veiculos.filter(veiculo => {
        let passa = true;

        if (tipo && veiculo.tipo !== tipo) passa = false;
        if (marca && veiculo.marca !== marca) passa = false;
        if (preco && veiculo.preco > parseInt(preco)) passa = false;

        return passa;
    });

    carregarVeiculos(filtrados);
}

// Função para configurar menu mobile
function configurarMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', function() {
                nav.style.display = 'none';
            });
        });
    }
}

// Função para configurar formulário
function configurarFormulario() {
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;

            // Criar mensagem para WhatsApp
            const mensagemWhatsApp = `Olá! Meu nome é ${nome}. ${mensagem}. Você pode me contatar em ${email} ou ${telefone}.`;

            // Redirecionar para WhatsApp
            const url = `https://wa.me/5512978135300?text=${encodeURIComponent(mensagemWhatsApp)}`;
            window.open(url, '_blank');

            // Limpar formulário
            form.reset();
        });
    }
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.veiculo-card, .servico-card, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
