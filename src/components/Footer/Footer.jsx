import {
    Facebook,
    Instagram,
    WhatsApp,
    Email
} from '@mui/icons-material';
import { Store } from 'lucide-react';
import { Box, Typography, Link, Button } from '@mui/material';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleSocialClick = (platform) => {
        const urls = {
            // facebook: 'https://facebook.com/seu-restaurante',
            instagram: 'https://instagram.com/jdjantinhas/',
            whatsapp: 'https://wa.me/5562992802125',
            email: 'mailto:adm@jdjantinhas.com'
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'noopener,noreferrer');
        }
    };

    const handleDeliveryClick = (app) => {
        const urls = {
            ifood: 'https://www.ifood.com.br/',
            noventaNove: 'https://www.99food.com.br/'
        };
        window.open(urls[app], '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className="main-footer">
            {/* SVG ondulado superior */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0A0403" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,261.3C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </div>

            {/* Conteúdo principal do footer */}
            <div>
                <div className="footer">
                    <div className="footer-row">
                        {/* Coluna da Imagem */}
                        <div className="footer-column footer-image-column">
                            <div className="footer-image-container">
                                <svg width="227" height="325" viewBox="0 0 427 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* (conteúdo do SVG mantido igual) */}
                                    <g clip-path="url(#clip0_199_2)">
                                        <path d="M195 143.103V115L130 234.866H141.412L146.249 234.789C173.765 234.353 195.755 211.763 195.453 184.246L195 143.103Z" fill="#DC0612" />
                                        <g filter="url(#filter0_d_199_2)">
                                            <path d="M248.847 192.09C270.321 192.09 289.752 183.392 303.825 169.328C317.888 155.275 326.592 135.847 326.592 114.387V117.91C326.602 117.26 326.612 116.619 326.612 115.979C326.612 115.448 326.612 114.918 326.592 114.387C326.602 114.267 326.592 114.147 326.592 114.027C326.592 113.967 326.592 113.907 326.582 113.837C326.572 110.814 326.361 107.851 325.961 104.928C321.343 69.7953 292.026 43.0403 255.588 43.0403H213V0C218.479 0 268.859 0.47041 274.097 1.37125C287.349 3.65339 299.799 8.71813 310.936 16.005C321.614 22.9915 331.109 32.05 338.931 42.6599C353.044 61.7278 361.868 85.8804 362.89 112.285C362.96 114.007 363 115.748 363 117.5C363 118.511 362.99 119.532 362.96 120.533C362.96 121.073 362.93 121.614 362.91 122.154C361.978 148.759 353.164 173.092 338.961 192.3C331.019 203.08 321.373 212.239 310.496 219.295C299.468 226.412 287.178 231.377 274.097 233.629C268.859 234.53 262.979 235 257.5 235H205L224.5 192.3" fill="white" />
                                        </g>
                                        <path d="M195 196.625C195 223.859 174.51 235 149.825 235H85.0742V192H135C151.733 187.656 149.825 178.501 149.825 173V103.5L150 49H195V196.625Z" fill="#DC0612" />
                                    </g>
                                    <path d="M259 43.0001H150V0.00012207H213.5L259 43.0001Z" fill="#DC0612" />
                                    <path d="M0 284L426.5 284L388 329.5L426.5 375H0L34.5 329.5L0 284Z" fill="url(#paint0_linear_199_2)" />
                                    <path d="M63.3921 344.681C62.0151 344.681 60.792 344.417 59.7227 343.89C58.6533 343.363 57.7744 342.682 57.0859 341.847L56.2729 344.264H50.3843V330.091H56.7344C56.7344 332.23 56.9248 333.797 57.3057 334.793C57.7012 335.775 58.4995 336.266 59.7007 336.266C60.7261 336.266 61.5464 335.79 62.1616 334.837C62.7769 333.871 63.0845 332.743 63.0845 331.454V316.776H58.8438V308.998H77.8281V316.776H74.3345V333.563C74.3345 335.819 73.8877 337.782 72.9941 339.452C72.1152 341.107 70.8555 342.396 69.2148 343.319C67.5889 344.227 65.6479 344.681 63.3921 344.681ZM95.1865 336.266V344H79.7617V336.266H83.2334L89.2539 316.776H84.6616V309.042H106.437L114.237 336.266H117.687V344H98.021V336.266H100.877L99.9326 332.53H92.0005L91.0117 336.266H95.1865ZM98.8779 327.213L96.3291 316.512L93.1211 327.213H98.8779ZM133.507 336.134V344H119.51V336.134H123.07V316.732H119.598V308.998H135.748L146.69 329.784V316.776H143.175V309.042H157.171V316.776H153.7V344H140.384L129.991 324.686V336.134H133.507ZM186 336.09V344H166.422V336.09H170.025V316.776H166.927L165.982 322.796H159.808V309.042H192.701V322.796H186.549L185.604 316.776H182.396V336.09H186ZM215.465 336.266V344H197.206V336.266H200.721V316.776H197.206V309.042H215.465V316.776H211.971V336.266H215.465ZM232.735 336.134V344H218.739V336.134H222.298V316.732H218.827V308.998H234.977L245.919 329.784V316.776H242.403V309.042H256.4V316.776H252.928V344H239.613L229.22 324.686V336.134H232.735ZM276.812 336.266V344H259.256V336.266H262.772V316.776H259.256V309.042L276.812 308.998V316.776H274.022V322.533H282.438V316.776H279.647V308.998L297.181 309.042V316.776H293.688V336.266H297.181V344H279.647V336.266H282.438V330.047H274.022V336.266H276.812ZM314.957 336.266V344H299.532V336.266H303.004L309.024 316.776H304.432V309.042H326.207L334.007 336.266H337.457V344H317.792V336.266H320.648L319.703 332.53H311.771L310.782 336.266H314.957ZM318.648 327.213L316.1 316.512L312.892 327.213H318.648ZM344.836 312.365C344.566 313.415 344.221 314.555 343.801 315.785C343.381 317.015 342.916 318.245 342.406 319.475C341.926 320.675 341.446 321.815 340.966 322.895H338.041C338.251 322.055 338.461 321.155 338.671 320.195C338.911 319.235 339.121 318.275 339.301 317.315C339.511 316.325 339.691 315.365 339.841 314.435C340.021 313.505 340.171 312.65 340.291 311.87H344.521L344.836 312.365ZM363.495 344.637C362.293 344.637 361.268 344.549 360.418 344.374C359.569 344.198 358.778 343.912 358.045 343.517C357.328 343.121 356.559 342.608 355.738 341.979L354.969 344H347.872V333.299H354.925C355.379 334.53 356.075 335.401 357.013 335.914C357.965 336.412 359.129 336.661 360.506 336.661C361.356 336.661 362.081 336.493 362.682 336.156C363.282 335.804 363.583 335.343 363.583 334.771C363.583 334.054 363.275 333.519 362.66 333.167C362.044 332.801 361.18 332.464 360.067 332.157C358.646 331.776 357.357 331.373 356.2 330.948C355.057 330.523 354.032 330.084 353.124 329.63C351.307 328.722 349.842 327.433 348.729 325.763C347.616 324.093 347.059 321.874 347.059 319.105C347.059 316.981 347.521 315.106 348.443 313.48C349.352 311.869 350.655 310.616 352.354 309.723C354.068 308.814 356.083 308.36 358.397 308.36C361.224 308.36 363.458 309.261 365.099 311.063L366.219 308.998H372.525V319.479H365.78C365.15 318.16 364.454 317.245 363.692 316.732C362.931 316.219 361.883 315.963 360.55 315.963C359.54 315.963 358.756 316.146 358.199 316.512C357.643 316.864 357.364 317.354 357.364 317.984C357.364 318.688 357.767 319.222 358.573 319.588C359.364 319.969 360.492 320.321 361.957 320.643C364.52 321.229 366.732 321.969 368.592 322.862C370.409 323.756 371.859 325.023 372.943 326.664C374.042 328.29 374.591 330.392 374.591 332.97C374.591 335.152 374.137 337.13 373.229 338.902C372.306 340.675 370.995 342.074 369.295 343.099C367.611 344.125 365.677 344.637 363.495 344.637Z" fill="white" />
                                    <defs>
                                        <filter id="filter0_d_199_2" x="201" y="0" width="166" height="243" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_199_2" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_199_2" result="shape" />
                                        </filter>
                                        <linearGradient id="paint0_linear_199_2" x1="224.709" y1="284" x2="224.709" y2="375" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#E10613" />
                                            <stop offset="0.995172" stop-color="#7D030A" />
                                        </linearGradient>
                                        <clipPath id="clip0_199_2">
                                            <rect width="308.74" height="234.78" fill="white" transform="translate(54)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Coluna da Descrição */}
                        <div className="footer-column">
                            <div className="footer-brand">
                                <h4 className="footer-title">JD Jantinha's</h4>
                                <p className="brand-tagline">
                                    Comida de Qualidade para todos os Momentos!
                                </p>
                                <p className="brand-description">
                                    Sabores autênticos que transformam cada refeição em uma experiência única.
                                </p>
                            </div>

                            {/* Redes Sociais - alinhadas horizontalmente à esquerda */}
                            <div className="footer-section">
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 1, mt: 1 }}>
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
                                </Box>
                            </div>
                        </div>

                        {/* Coluna de Horário */}
                        <div className="footer-column">
                            <div className="footer-section">
                                <h5 className="section-title">Horário de Funcionamento</h5>
                                <div className="section-info">
                                    <div className="info-item">
                                        <span className="info-text">Segunda a Sábado: 19h - 23:30h</span>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-section">
                                <h5 className="section-title">Endereço</h5>
                                <div className="section-info">
                                    <div className="info-item">
                                        <span className="info-text">Rua Ri 2, Qd 35 - Lt 1 - Residencial Itaipú, Goiânia - GO, 74356-070, Brasil</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coluna de Contato + Delivery */}
                        <div className="footer-column">
                            <div className="footer-section">
                                <h5 className="section-title">Contato</h5>
                                <div className="section-info">
                                    <div className="info-item">
                                        <span className="info-text">Telefone: (62) 99280-2125</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-text">Email: adm@jdjantinhas.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Apps */}
                            <div className="footer-section">
                                <h5 className="section-title">Peça por delivery</h5>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Store size={18} />}
                                        onClick={() => handleDeliveryClick('noventaNove')}
                                        sx={{
                                            backgroundColor: '#FFDD00',
                                            color: '#000',
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '12px',
                                            py: 1,
                                            px: 2,
                                            flex: { xs: '1 1 auto', sm: '0 1 auto' },
                                            '&:hover': {
                                                backgroundColor: '#e6c800',
                                            },
                                        }}
                                    >
                                        99Food
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Store size={18} />}
                                        onClick={() => handleDeliveryClick('ifood')}
                                        sx={{
                                            backgroundColor: '#EA1D2C',
                                            color: '#fff',
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '12px',
                                            py: 1,
                                            px: 2,
                                            flex: { xs: '1 1 auto', sm: '0 1 auto' },
                                            '&:hover': {
                                                backgroundColor: '#c41724',
                                            },
                                        }}
                                    >
                                        iFood
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </div>

                    {/* Barra inferior de copyright */}
                    <Box
                        sx={{
                            backgroundColor: "#B71C1C",
                            color: "#fff",
                            fontFamily: '"Inter", sans-serif',
                            py: 2,
                            px: 3
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                justifyContent: { xs: "center", md: "space-between" },
                                textAlign: { xs: "center", md: "left" },
                                gap: 1
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                © {currentYear} JD Jantinha's - Todos os direitos reservados
                            </Typography>

                            <Link
                                href="https://instagram.com/rycardoo_cruz"
                                target="_blank"
                                rel="noopener"
                                underline="none"
                                sx={{
                                    color: "#fff",
                                    fontSize: "0.875rem",
                                    "&:hover": {
                                        opacity: 0.8
                                    }
                                }}
                            >
                                Desenvolvido por @rycardoo_cruz
                            </Link>
                        </Box>
                    </Box>
                </div>
            </div>
        </footer>
    );
};

export default Footer;