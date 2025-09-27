# 🎨 ImageEnhancer - Melhore suas Imagens com IA

Um site moderno e elegante para enhancement de imagens usando algoritmos de inteligência artificial, desenvolvido com HTML, CSS e JavaScript puro.

## ✨ Características

- **Design Moderno**: Interface estilo Canva com animações suaves e responsiva
- **Upscaling 4x**: Aumente a resolução de suas imagens mantendo a qualidade
- **Restauração de Rostos**: Melhore automaticamente rostos em fotos antigas
- **Correção de Cores**: Ajuste automático de brilho, contraste e saturação
- **Remoção de Ruído**: Elimine ruídos e artefatos de compressão
- **Processamento Rápido**: Resultados em segundos
- **100% Seguro**: Processamento local, sem upload para servidores

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Processamento**: Canvas API, Web Workers (opcional)
- **Algoritmos**: Bicubic Interpolation, Gaussian Blur, Unsharp Mask
- **Design**: CSS Grid, Flexbox, Animações CSS
- **Responsividade**: Mobile-first design

## 📁 Estrutura do Projeto

```
image enhacer/
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica de processamento
└── README.md           # Documentação
```

## 🎯 Funcionalidades Implementadas

### 1. Interface de Upload
- Drag & Drop para upload de imagens
- Validação de tipo de arquivo (JPG, PNG, WebP)
- Limite de tamanho (15MB)
- Preview da imagem original

### 2. Algoritmos de Enhancement
- **Upscaling**: Interpolação bicúbica para aumento de resolução
- **Denoising**: Filtro gaussiano para remoção de ruído
- **Color Correction**: Correção automática de cores
- **Sharpening**: Filtro unsharp mask para nitidez

### 3. Comparação Antes/Depois
- Visualização lado a lado
- Download do resultado
- Processamento de nova imagem

### 4. Design Responsivo
- Layout adaptável para mobile e desktop
- Animações suaves e interativas
- Gradientes e efeitos visuais modernos

## 🛠️ Como Usar

1. **Abrir o Site**: Abra `index.html` em qualquer navegador moderno
2. **Upload**: Clique em "Melhorar Imagem Agora" ou arraste uma imagem
3. **Processamento**: Aguarde o processamento automático
4. **Resultado**: Visualize a comparação e baixe o resultado

## 🔧 Algoritmos Implementados

### Upscaling (Bicubic Interpolation)
```javascript
applyUpscaling(data, width, height) {
    // Amostragem de pixels vizinhos
    // Interpolação bicúbica para suavização
    // Preservação de detalhes
}
```

### Denoising (Gaussian Blur)
```javascript
applyDenoising(data, width, height) {
    // Kernel gaussiano 3x3
    // Redução de ruído preservando bordas
    // Suavização controlada
}
```

### Color Correction
```javascript
applyColorCorrection(data, width, height) {
    // Cálculo de cor média
    // Correção para cinza neutro
    // Ajuste de fatores RGB
}
```

### Sharpening (Unsharp Mask)
```javascript
applySharpening(data, width, height) {
    // Kernel de nitidez
    // Realce de bordas
    // Melhoria de detalhes
}
```

## 🎨 Design System

### Cores
- **Primária**: #4f46e5 (Indigo)
- **Secundária**: #7c3aed (Purple)
- **Acento**: #fbbf24 (Amber)
- **Neutro**: #6b7280 (Gray)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- **Botões**: Gradientes com hover effects
- **Cards**: Sombras suaves e bordas arredondadas
- **Modais**: Backdrop blur e animações
- **Formulários**: Validação visual e feedback

## 📱 Responsividade

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Segurança

- Validação de tipos de arquivo
- Limite de tamanho de upload
- Processamento local (sem upload para servidores)
- Remoção de metadados EXIF

## 🚀 Performance

- Processamento assíncrono
- Otimização de Canvas API
- Lazy loading de imagens
- Animações CSS otimizadas

## 📈 Próximas Melhorias

- [ ] Integração com APIs de IA (Replicate, Hugging Face)
- [ ] Processamento em lote
- [ ] Mais algoritmos de enhancement
- [ ] Histórico de processamentos
- [ ] Sistema de usuários e planos
- [ ] API REST para integração

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Contato

- **Email**: contato@imageenhancer.com
- **Website**: https://imageenhancer.com
- **GitHub**: https://github.com/imageenhancer

---

Desenvolvido com ❤️ para melhorar suas imagens
