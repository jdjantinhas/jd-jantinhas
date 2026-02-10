import './Footer.css';
import {
    Facebook,
    Instagram,
    WhatsApp,
    Email
} from '@mui/icons-material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleSocialClick = (platform) => {
        const urls = {
            facebook: 'https://facebook.com/seu-restaurante',
            instagram: 'https://instagram.com/seu-restaurante',
            whatsapp: 'https://wa.me/5511999999999',
            email: 'mailto:contato@jdjantinhas.com'
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <footer className="main-footer">
            {/* SEU SVG ORIGINAL EXATAMENTE COMO ESTAVA */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0A0403" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>

            {/* Conteúdo principal do footer */}
            <div>
                <div className="footer">
                    <div className="footer-row">
                        {/* Coluna da Imagem/SVG à esquerda */}
                        <div className="footer-column footer-image-column">
                            <div className="footer-image-container">
                                {/* Aqui você pode colocar uma imagem ou SVG */}
                                <svg
                                    className="footer-logo-svg"
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="100" cy="100" r="90" fill="#AF1D1D" fillOpacity="0.1" />
                                    <path d="M60,80 L140,80 L140,120 L60,120 Z" fill="#AF1D1D" fillOpacity="0.3" />
                                    <path d="M80,60 L120,60 L120,100 L80,100 Z" fill="#AF1D1D" fillOpacity="0.5" />
                                    <path d="M90,100 L110,100 L110,140 L90,140 Z" fill="#AF1D1D" fillOpacity="0.7" />
                                    <text x="100" y="180" textAnchor="middle" fill="#AF1D1D" fontSize="18" fontWeight="bold">
                                        JD
                                    </text>
                                </svg>

                                {/* Ou se preferir uma imagem, use este código: */}
                                {/* <img src="/logo.png" alt="JD Jantinhas" className="footer-logo-img" /> */}

                                {/* Botões de redes sociais na mesma coluna */}
                                <div className="social-media-container">
                                    <div className="social-buttons">
                                        <button
                                            className="social-btn facebook-btn"
                                            onClick={() => handleSocialClick('facebook')}
                                            aria-label="Facebook"
                                            title="Facebook"
                                        >
                                            <Facebook />
                                        </button>

                                        <button
                                            className="social-btn instagram-btn"
                                            onClick={() => handleSocialClick('instagram')}
                                            aria-label="Instagram"
                                            title="Instagram"
                                        >
                                            <Instagram />
                                        </button>

                                        <button
                                            className="social-btn whatsapp-btn"
                                            onClick={() => handleSocialClick('whatsapp')}
                                            aria-label="WhatsApp"
                                            title="WhatsApp"
                                        >
                                            <WhatsApp />
                                        </button>

                                        <button
                                            className="social-btn email-btn"
                                            onClick={() => handleSocialClick('email')}
                                            aria-label="Email"
                                            title="Email"
                                        >
                                            <Email />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coluna da Descrição */}
                        <div className="footer-column">
                            <div className="footer-brand">
                                <h4 className="footer-title">JD Jantinhas</h4>
                                <p className="brand-tagline">
                                    Comida de qualidade para todos os momentos
                                </p>
                                <p className="brand-description">
                                    Sabores autênticos que transformam cada refeição em uma experiência única.
                                </p>
                            </div>
                        </div>

                        {/* Coluna de Horário */}
                        <div className="footer-column">
                            <div className="footer-section">
                                <h5 className="section-title">Horário de Funcionamento</h5>
                                <div className="section-info">
                                    <div className="info-item">
                                        <span className="info-text">Segunda a Sábado: 11h - 23h</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-text">Domingo: 12h - 22h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coluna de Contato */}
                        <div className="footer-column">
                            <div className="footer-section">
                                <h5 className="section-title">Contato</h5>
                                <div className="section-info">
                                    <div className="info-item">
                                        <span className="info-text">Tel: (11) 99999-9999</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-text">Email: contato@jdjantinhas.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Linha de Copyright */}
                    <div className="footer-bottom">
                        <div className="copyright">
                            <p className="copyright-text">
                                &copy; {currentYear} JD Jantinhas - Todos os direitos reservados
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;