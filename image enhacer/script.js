// Image Enhancement Application
class ImageEnhancer {
    constructor() {
        this.currentFile = null;
        this.originalImage = null;
        this.enhancedImage = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.animateHero();
    }

    setupEventListeners() {
        // File input change
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeUploadModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeUploadModal();
            }
        });
    }

    setupDragAndDrop() {
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFile(files[0]);
            }
        });
    }

    animateHero() {
        // Animate hero elements on load
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const heroVisual = document.querySelector('.hero-visual');

        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);

        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 600);

        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 800);
    }

    triggerFileInput() {
        document.getElementById('fileInput').click();
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Por favor, selecione um arquivo de imagem válido.');
            return;
        }

        // Validate file size (15MB max)
        if (file.size > 15 * 1024 * 1024) {
            this.showError('O arquivo é muito grande. Tamanho máximo: 15MB');
            return;
        }

        this.currentFile = file;
        this.showProcessingArea();
        this.processImage(file);
    }

    showProcessingArea() {
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('processingArea').style.display = 'block';
        document.getElementById('resultArea').style.display = 'none';
    }

    showResultArea() {
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('processingArea').style.display = 'none';
        document.getElementById('resultArea').style.display = 'block';
    }

    showUploadArea() {
        document.getElementById('uploadArea').style.display = 'block';
        document.getElementById('processingArea').style.display = 'none';
        document.getElementById('resultArea').style.display = 'none';
    }

    async processImage(file) {
        try {
            this.updateProgress(10, 'Carregando imagem...');
            
            // Create image element
            const img = new Image();
            img.onload = async () => {
                this.originalImage = img;
                this.updateProgress(30, 'Analisando imagem...');
                
                // Simulate processing time
                await this.delay(1000);
                this.updateProgress(50, 'Aplicando melhorias...');
                
                // Process the image
                const enhancedCanvas = await this.enhanceImage(img);
                this.enhancedImage = enhancedCanvas;
                
                this.updateProgress(80, 'Finalizando...');
                await this.delay(500);
                this.updateProgress(100, 'Concluído!');
                
                await this.delay(500);
                this.showResults();
            };
            
            img.src = URL.createObjectURL(file);
            
        } catch (error) {
            console.error('Error processing image:', error);
            this.showError('Erro ao processar a imagem. Tente novamente.');
        }
    }

    async enhanceImage(img) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions (2x upscaling)
            const newWidth = img.width * 2;
            const newHeight = img.height * 2;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            // Draw original image
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            // Get image data
            const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
            const data = imageData.data;
            
            // Apply enhancement algorithms
            this.applyUpscaling(data, newWidth, newHeight);
            this.applyDenoising(data, newWidth, newHeight);
            this.applyColorCorrection(data, newWidth, newHeight);
            this.applySharpening(data, newWidth, newHeight);
            
            // Put enhanced data back
            ctx.putImageData(imageData, 0, 0);
            
            resolve(canvas);
        });
    }

    applyUpscaling(data, width, height) {
        // Bicubic interpolation for better upscaling
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                const idx = (y * width + x) * 4;
                
                // Sample surrounding pixels for interpolation
                const samples = this.getBicubicSamples(data, x, y, width, height);
                
                // Apply bicubic interpolation
                for (let i = 0; i < 4; i++) {
                    data[idx + i] = this.bicubicInterpolate(samples, i);
                }
            }
        }
    }

    getBicubicSamples(data, x, y, width, height) {
        const samples = [];
        for (let dy = -1; dy <= 2; dy++) {
            for (let dx = -1; dx <= 2; dx++) {
                const px = Math.max(0, Math.min(width - 1, x + dx));
                const py = Math.max(0, Math.min(height - 1, y + dy));
                const idx = (py * width + px) * 4;
                samples.push([data[idx], data[idx + 1], data[idx + 2], data[idx + 3]]);
            }
        }
        return samples;
    }

    bicubicInterpolate(samples, channel) {
        // Simplified bicubic interpolation
        let sum = 0;
        let weight = 0;
        
        for (let i = 0; i < samples.length; i++) {
            const w = this.bicubicWeight(i);
            sum += samples[i][channel] * w;
            weight += w;
        }
        
        return Math.max(0, Math.min(255, sum / weight));
    }

    bicubicWeight(index) {
        // Simplified weight calculation
        const weights = [0.1, 0.3, 0.3, 0.1, 0.3, 0.5, 0.5, 0.3, 0.3, 0.5, 0.5, 0.3, 0.1, 0.3, 0.3, 0.1];
        return weights[index] || 0.1;
    }

    applyDenoising(data, width, height) {
        // Gaussian blur for denoising
        const tempData = new Uint8ClampedArray(data);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = (y * width + x) * 4;
                
                for (let c = 0; c < 3; c++) {
                    let sum = 0;
                    let weight = 0;
                    
                    // 3x3 Gaussian kernel
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const px = x + dx;
                            const py = y + dy;
                            const pidx = (py * width + px) * 4;
                            
                            const w = this.gaussianWeight(dx, dy);
                            sum += tempData[pidx + c] * w;
                            weight += w;
                        }
                    }
                    
                    data[idx + c] = Math.round(sum / weight);
                }
            }
        }
    }

    gaussianWeight(dx, dy) {
        const sigma = 1.0;
        const x = dx * dx + dy * dy;
        return Math.exp(-x / (2 * sigma * sigma));
    }

    applyColorCorrection(data, width, height) {
        // Auto color correction
        let rSum = 0, gSum = 0, bSum = 0;
        let pixelCount = 0;
        
        // Calculate average color
        for (let i = 0; i < data.length; i += 4) {
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            pixelCount++;
        }
        
        const avgR = rSum / pixelCount;
        const avgG = gSum / pixelCount;
        const avgB = bSum / pixelCount;
        
        // Target neutral gray
        const target = (avgR + avgG + avgB) / 3;
        const rFactor = target / avgR;
        const gFactor = target / avgG;
        const bFactor = target / avgB;
        
        // Apply correction
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * rFactor * 0.8 + data[i] * 0.2);
            data[i + 1] = Math.min(255, data[i + 1] * gFactor * 0.8 + data[i + 1] * 0.2);
            data[i + 2] = Math.min(255, data[i + 2] * bFactor * 0.8 + data[i + 2] * 0.2);
        }
    }

    applySharpening(data, width, height) {
        // Unsharp mask filter
        const tempData = new Uint8ClampedArray(data);
        const kernel = [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ];
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = (y * width + x) * 4;
                
                for (let c = 0; c < 3; c++) {
                    let sum = 0;
                    
                    for (let ky = 0; ky < 3; ky++) {
                        for (let kx = 0; kx < 3; kx++) {
                            const px = x + kx - 1;
                            const py = y + ky - 1;
                            const pidx = (py * width + px) * 4;
                            sum += tempData[pidx + c] * kernel[ky][kx];
                        }
                    }
                    
                    data[idx + c] = Math.max(0, Math.min(255, sum));
                }
            }
        }
    }

    showResults() {
        // Display original image
        const originalImg = document.getElementById('originalImage');
        originalImg.src = this.originalImage.src;
        
        // Display enhanced image
        const enhancedImg = document.getElementById('enhancedImage');
        enhancedImg.src = this.enhancedImage.toDataURL('image/jpeg', 0.9);
        
        this.showResultArea();
    }

    updateProgress(percent, status) {
        const progressFill = document.getElementById('progressFill');
        const processingStatus = document.getElementById('processingStatus');
        
        progressFill.style.width = percent + '%';
        processingStatus.textContent = status;
    }

    showError(message) {
        alert(message); // In a real app, you'd use a proper notification system
        this.showUploadArea();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    downloadResult() {
        if (this.enhancedImage) {
            const link = document.createElement('a');
            link.download = 'enhanced-image.jpg';
            link.href = this.enhancedImage.toDataURL('image/jpeg', 0.9);
            link.click();
        }
    }

    processNewImage() {
        this.currentFile = null;
        this.originalImage = null;
        this.enhancedImage = null;
        document.getElementById('fileInput').value = '';
        this.showUploadArea();
    }
}

// Global functions for HTML onclick events
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

function scrollToDemo() {
    const features = document.getElementById('features');
    features.scrollIntoView({ behavior: 'smooth' });
}

function downloadResult() {
    if (window.imageEnhancer) {
        window.imageEnhancer.downloadResult();
    }
}

function processNewImage() {
    if (window.imageEnhancer) {
        window.imageEnhancer.processNewImage();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.imageEnhancer = new ImageEnhancer();
    
    // Add initial styles for animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroVisual = document.querySelector('.hero-visual');
    
    [heroTitle, heroSubtitle, heroCta, heroVisual].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
