const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Caminho de entrada das imagens no seu sistema Windows
const inputDir = "C:\\Users\\ricar\\OneDrive\\Documentos\\jd-jantinhas\\public\\img\\imageproducts";
// Caminho de saída para as imagens otimizadas
const outputDir = "C:\\Users\\ricar\\OneDrive\\Documentos\\jd-jantinhas\\public\\img\\optimized";

// Certifica-se de que o diretório de saída existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Tamanhos em pixels de largura para gerar as imagens responsivas
const sizes = [320, 480, 800, 1200, 1600];

console.log(`Iniciando otimização de imagens de: ${inputDir}`);

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Erro ao ler o diretório de entrada:", err);
    return;
  }

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    // Processa apenas arquivos de imagem comuns
    if ([".webp", ".jpg", ".jpeg", ".png"].includes(ext)) {
      const imagePath = path.join(inputDir, file);

      sizes.forEach(size => {
        const outputFileName = `${name}-${size}w.webp`;
        const outputPath = path.join(outputDir, outputFileName);

        sharp(imagePath)
          .resize({ width: size })
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`Imagem otimizada: ${outputFileName}`))
          .catch(sharpErr => console.error(`Erro ao otimizar ${file} para ${size}w:`, sharpErr));
      });
    }
  });
  console.log("Processo de otimização iniciado para todas as imagens. Verifique os logs para o status individual.");
});
