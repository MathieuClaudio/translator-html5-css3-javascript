# Traductor Entre Diferentes Idiomas (Versión Simple y POO)

Ejemplo aplicación web simple y educativa utilizando la API de **MyMemory Translation** para traducción gratuita entre varios lenguajes.

## Incluye **2 versiones** de implementación:
- 🧩 Una versión **simple** con JavaScript funcional
- 🧠 Una versión **modular** usando **Programación Orientada a Objetos (POO)**

## Características
- Traducción en tiempo real entre inglés, español, francés, alemán e italiano
- No requiere clave de API
- Interfaz de usuario limpia y responsiva utilizando el CDN de bootstrap@5.3.5
- Soporte para modo oscuro manual 🌙
- Alternar entre versión funcional y versión POO según necesidad
- Se puede probar en [GitHub Pages](https://MathieuClaudio.github.io/translator-html5-css3-javascript/)

## 🚀 Comparativa: Versión Simple vs Versión POO
| Aspecto                  | Versión Simple                        | Versión POO                                   |
|--------------------------|---------------------------------------|-----------------------------------------------|
| Estilo de código         | Funciones sueltas                     | Clase `TranslationManager`                    |
| Organización             | Procedural, más directo               | Modular, encapsulado                          |
| Reutilización            | Difícil                               | Alta (clase reutilizable y escalable)         |
| Mantenimiento            | Puede volverse desordenado            | Más limpio y estructurado                     |
| Ideal para...            | Principiantes, primeras explicaciones | Enseñar buenas prácticas, refactor, escalado  |
| Dependencia de jQuery    | Sí                                    | No                                            |

> 💡 Ambas versiones pueden alternarse fácilmente desde el HTML para enseñar en diferentes niveles.


## 🧪 Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript
- Bootstrap (para estilos y menú desplegable)
- API: [MyMemory Translation](https://mymemory.translated.net/doc/)
- POO (Programación Orientada a Objetos)
- (Opcional) jQuery (solo en la versión simple)

## 📦 Instalación
1. Clona este repositorio (https://github.com/MathieuClaudio/translator-html5-css3-javascript.git)
2. Abre la carpeta del proyecto en tu editor de código preferido
3. Inicia un servidor local (ej., Live Server en VS Code)
4. Abre la aplicación en tu navegador web
5. Ver demo en [GitHub Pages](https://MathieuClaudio.github.io/translator-html5-css3-javascript/)

## Cómo Usar
1. Ingresa tu texto en inglés en el campo de entrada
2. Haz clic en el botón de traducir
3. La traducción en español aparecerá en el campo de salida

## 🌐 Dependencias
- Bootstrap (incluido vía CDN)
- Conexión a Internet (requerida para las llamadas a la API)

## 🧑‍🏫 Uso Educativo
Este proyecto también se utiliza como material de apoyo para enseñar conceptos de JavaScript y programación orientada a objetos. Ideal para comparar enfoques de desarrollo en tiempo real.

## 📝 Licencia
Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

-------------------------------------------------------------------------------------------------------------------------

# 🚀 Ideas Para Futuras Funcionalidades:

- [] 📦 Guardar traducciones favoritas
Permitir guardar pares de traducciones en localStorage para repasarlas después.

- [] 🔄 Historial de traducciones
Mostrar un historial de traducciones recientes en una lista o dropdown.

- [] 🗣️ Reconocimiento de voz
Usar Web Speech API para dictar el texto a traducir. No requiere registro es es gratuita.

- [] 🔊 Síntesis de voz
Que lea en voz alta la traducción con speechSynthesis. No requiere registro es es gratuita.

- [] 📷 Traducción de texto desde imagen
Subir una imagen y extraer el texto con Tesseract.js (OCR - Reconocimiento Óptico de Caracteres). No requiere registro es es gratuita.

- [] 📁 Modo sin conexión
Guardar los archivos .json de traducción localmente para seguir funcionando offline. PWA (Progressive Web App) - usar Service Workers.

- [] 💾 Exportar traducciones
Permitir descargar las traducciones como .txt, .pdf o .json.

- [] 🧪 Quiz de idiomas
Jugar a traducir palabras o completar frases para aprender idiomas.

- [] 🌐 Soporte para más APIs
Permitir elegir entre MyMemory, Google Translate (si se paga), LibreTranslate, etc.

- [] 📱 Aplicación servidor NodeJS
Permitir ejecutar la aplicación como una aplicación del lado del servidor con NodeJS.

- [] 📱 Aplicación de escritorio NodeJS
Permitir ejecutar la aplicación como una aplicación de escritorio con NodeJS.
