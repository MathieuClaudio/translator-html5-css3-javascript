// Objeto para almacenar las traducciones
let translations = {};

// Función para manejar los diferentes lenguajes disponibles en el menú
async function loadTranslations(lang) {
    try {
        // Forma antigua // const response = await fetch('lang/' + lang + '.json');
        // Ahora el "backticks" (`) permite la interpolación de ${lang} por el valor de lang y así construir dinámicamente la URL
        const response = await fetch(`lang/${lang}.json`); 
        translations = await response.json();
        updatePageText();

        // Actualizar el menú de idiomas
        $(".dropdown-toggle").text(translations.nav.language);

        // Marcar el idioma activo en el menú
        $(".dropdown-item").removeClass("active");
        $(`.dropdown-item[data-lang="${lang}"]`).addClass("active");

        return translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        throw error;
    }
}

// Función para actualizar los texto de la página según el ideoma elegido en el menú de navegación
function updatePageText() {
    // Actualizar la barra de navegación
    $(".nav-link[href='#']").text(translations.nav.home);

    // Actualizar el contenido de los textos en la página
    $("h1").text(translations.translator.title);
    $("label[for='souceLanguage']").text(translations.translator.sourceLanguage + ":");
    $("label[for='targetLanguage']").text(translations.translator.targetLanguage + ":");
    $("#translationTo").text(translations.translator.translationTo);
    $("#enterText").text(translations.translator.enterText);
    $("#translationBtn").text(translations.translator.translate);
    $("#clearBtn").text(translations.translator.clear);

    // Actualizar los nombres de los idiomas en ambos select
    $("#souceLanguage option, #targetLanguage option").each(function () {
        const langCode = $(this).val();
        $(this).text(translations.languages[langCode]);
    });

    // Actualizar los textos dinámicamente para los idiomas de origen y destino
    $("#souceLanguageText").text(translations.languages[$("#souceLanguage").val()]);
    $("#targetLanguageText").text(translations.languages[$("#targetLanguage").val()]);

    // Actualizar el pie de página
    $("footer p").html(`☺️ &copy; 2025 ${translations.footer.copyright} ✅`);
}

// Función para traducir el texto (MyMemory Translation API)
$(document).ready(function () {
    // Establecer valores iniciales
    const browserLangs = navigator.languages || [navigator.language];
    console.log(browserLangs);
    const initialLang = "en"; // con inglés por defecto
    $("html").attr("lang", initialLang);

    // Traducciones y configuraciones iniciales
    loadTranslations(initialLang).then(() => {
        // Asegurar que los textos de los idiomas estén correctos al inicio
        $("#souceLanguageText").text(translations.languages[$("#souceLanguage").val()]);
        $("#targetLanguageText").text(translations.languages[$("#targetLanguage").val()]);
    });

    // Manejar el cambio de idioma desde el menú dropdown
    $(".dropdown-item").on("click", function (e) {
        e.preventDefault();
        const selectedLang = $(this).data("lang");
        $("html").attr("lang", selectedLang);
        loadTranslations(selectedLang);
    });

    // Detectar cambios en el idioma de origen
    $("#souceLanguage").on("change", function () {
        const sourceLang = $(this).val();
        $("#souceLanguageText").text(translations.languages[sourceLang]);
    });

    // Detectar cambios en el idioma de destino
    $("#targetLanguage").on("change", function () {
        const targetLang = $(this).val();
        $("#targetLanguageText").text(translations.languages[targetLang]);
    });

    // Si presiona el botón traducir y existe texto, traduce
    $("#translationBtn").on("click", function () {
        let text = $("#sourceText").val().trim();
        let source = $("#souceLanguage").val();
        let target = $("#targetLanguage").val();

        if (text) {
            $("#targetText").html(
                translations.translator.translating +
                '<div class="spinner-border spinner-border-sm text-primary ms-2" role="status">' +
                `<span class="visually-hidden">${translations.translator.loading}</span>` +
                "</div>"
            );

            setTimeout(() => { }, 1000); // agregué un Timeout para que siempre se muestre el spinner. Esto no es nesesario, es solo ilustrativo.

            // Agregamos el parámetro de-regional=true para mejorar la precisión de la traducción
            fetch(
                "https://api.mymemory.translated.net/get?q=" +
                encodeURIComponent(text) +
                "&langpair=" +
                source +
                "|" +
                target +
                "&de=a@b.c&mt=1"
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.responseStatus === 200) {
                        $("#targetText").text(data.responseData.translatedText);
                    } else {
                        $("#targetText").text(translations.translator.translationError);
                        console.log("Estado: " + data.responseStatus);
                        console.log("Detalles: " + JSON.stringify(data.responseDetails));
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    $("#targetText").text(translations.translator.translationError);
                    console.log("Error en la conexión: " + error.message);
                });
        } else {
            $("#targetText").text(translations.translator.pleaseEnterText);
        }
    });

    $("#clearBtn").on("click", function () {
        $("#sourceText").val("");
        $("#targetText").text("");
    });
});