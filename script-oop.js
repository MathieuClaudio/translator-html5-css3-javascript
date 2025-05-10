// Clase principal para gestionar la traducción de textos y la interfaz
class TranslationManager {
    constructor(defaultLang = 'en') {
        this.lang = defaultLang;         // Idioma predeterminado
        this.translations = {};          // Objeto para guardar traducciones cargadas
        this.apiEmail = 'a@b.c';         // Email requerido por la API (simulado)
    }

    // Método que inicia el gestor: carga traducciones y asigna eventos
    async init() {
        await this.load(this.lang);
        this.attachEventListeners();
    }

    // Carga el archivo de traducción JSON correspondiente al idioma seleccionado
    async load(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            this.translations = await response.json();
            this.lang = lang;
            this.updateAllTexts();   // Actualiza todos los textos visibles
            this.updateMenu(lang);   // Marca el idioma activo en el menú
        } catch (error) {
            console.error('Error al cargar traducciones:', error);
            this.showError("⚠️ Error cargando idioma");
        }
    }

    // Actualiza todos los textos visibles de la interfaz con base en las traducciones
    updateAllTexts() {
        const t = this.translations;

        // Navegación y títulos
        document.querySelector(".nav-link[href='#']").textContent = t.nav.home;
        document.querySelector("h1").textContent = t.translator.title;
        document.querySelector("label[for='souceLanguage']").textContent = `${t.translator.sourceLanguage}:`;
        document.querySelector("label[for='targetLanguage']").textContent = `${t.translator.targetLanguage}:`;

        // Botones y etiquetas
        document.getElementById("translationTo").textContent = t.translator.translationTo;
        document.getElementById("enterText").textContent = t.translator.enterText;
        document.getElementById("translationBtn").textContent = t.translator.translate;
        document.getElementById("clearBtn").textContent = t.translator.clear;

        // Pie de página
        document.querySelector("footer p").innerHTML = `☺️ &copy; 2025 ${t.footer?.copyright}`;

        // Opciones en los select de idiomas
        this.updateLanguageOptions("souceLanguage");
        this.updateLanguageOptions("targetLanguage");

        // Textos dinámicos de idioma seleccionado
        this.updateLangText("souceLanguageText", "souceLanguage");
        this.updateLangText("targetLanguageText", "targetLanguage");
    }

    // Actualiza las opciones visibles en un <select> de idioma
    updateLanguageOptions(selectId) {
        const select = document.getElementById(selectId);
        [...select.options].forEach(opt => {
            const code = opt.value;
            opt.textContent = this.translations.languages[code] || code;
        });
    }

    // Actualiza el nombre visible del idioma actual seleccionado
    updateLangText(elementId, selectId) {
        const select = document.getElementById(selectId);
        const textElement = document.getElementById(elementId);
        const langCode = select.value;
        textElement.textContent = this.translations.languages[langCode] || langCode;
    }

    // Actualiza el menú desplegable de idiomas, marcando el idioma activo
    updateMenu(lang) {
        document.querySelector(".dropdown-toggle").textContent = this.translations.nav.language;
        document.querySelectorAll(".dropdown-item").forEach(item => {
            item.classList.toggle("active", item.dataset.lang === lang);
        });
    }

    // Función que realiza la traducción utilizando la API de MyMemory
    async translateText() {
        const sourceText = document.getElementById("sourceText").value.trim();
        const sourceLang = document.getElementById("souceLanguage").value;
        const targetLang = document.getElementById("targetLanguage").value;
        const targetDiv = document.getElementById("targetText");

        // Si no hay texto, mostrar mensaje
        if (!sourceText) {
            targetDiv.textContent = this.translations.translator.pleaseEnterText;
            return;
        }

        // Mostrar mensaje de "traduciendo" con spinner
        targetDiv.innerHTML = `
            ${this.translations.translator.translating}
            <div class="spinner-border spinner-border-sm text-primary ms-2" role="status">
                <span class="visually-hidden">${this.translations.translator.loading}</span>
            </div>`;

        try {
            // Simula una espera para mostrar spinner
            await new Promise(r => setTimeout(r, 800));

            // Llamado a la API de traducción
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}&de=${this.apiEmail}&mt=1`
            );
            const data = await response.json();

            if (data.responseStatus === 200) {
                targetDiv.textContent = data.responseData.translatedText;
            } else {
                targetDiv.textContent = this.translations.translator.translationError;
                console.warn("Detalles:", data.responseDetails);
            }
        } catch (err) {
            console.error("Error al traducir:", err);
            targetDiv.textContent = this.translations.translator.translationError;
        }
    }

    // Limpia los campos de texto
    clearFields() {
        document.getElementById("sourceText").value = "";
        document.getElementById("targetText").textContent = "";
    }

    // Muestra un mensaje de error al usuario (podés mejorar con un modal bonito)
    showError(msg) {
        alert(msg);
    }

    // Conecta todos los eventos de la interfaz (menú, botones, cambios de idioma, etc.)
    attachEventListeners() {
        // Cambio de idioma desde el menú desplegable
        document.querySelectorAll(".dropdown-item").forEach(item => {
            item.addEventListener("click", async (e) => {
                e.preventDefault();
                const selectedLang = item.dataset.lang;
                document.documentElement.lang = selectedLang;
                await this.load(selectedLang);
            });
        });

        // Cambio del idioma de origen
        document.getElementById("souceLanguage").addEventListener("change", () => {
            this.updateLangText("souceLanguageText", "souceLanguage");
        });

        // Cambio del idioma de destino
        document.getElementById("targetLanguage").addEventListener("change", () => {
            this.updateLangText("targetLanguageText", "targetLanguage");
        });

        // Botón de traducir
        document.getElementById("translationBtn").addEventListener("click", () => {
            this.translateText();
        });

        // Botón de limpiar
        document.getElementById("clearBtn").addEventListener("click", () => {
            this.clearFields();
        });
    }
}

// Inicializa el traductor una vez cargado el documento HTML
document.addEventListener("DOMContentLoaded", () => {
    const manager = new TranslationManager('en'); // Idioma por defecto: inglés
    manager.init();
});
