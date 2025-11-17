// frontend/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // --- CABEÇALHO MAIS LIMPO E VENDEDOR ---
      title: "AI Job Agent",
      subtitle: "Boost your interview chances with instant AI feedback.", // <--- MUITO MELHOR
      
      // TABS
      tab_pdf: "Upload PDF",
      tab_text: "Paste Text",

      // MAIN INTERFACE
      cv_label: "1. Your CV",
      cv_placeholder: "Click to upload your PDF CV",
      cv_change: "Change File",
      cv_limit: "(Max file size: 10MB)",
      job_label: "2. Job Description",
      job_placeholder: "Paste the job requirements here...",
      btn_analyze: "Analyze Match",
      
      // REPORT
      report_title: "Analysis Report",
      score_label: "Match Score:",
      strong_points: "Strong Points",
      gaps: "Identified Gaps",
      suggestion: "Our Suggestion",
      
      // ERRORS
      error_size: "File is too large! Max size is 10MB.",
      error_empty: "Please upload a CV and fill in the job description.",
      error_generic: "An error occurred. Please try again.",

      // --- MODAL ABOUT ---
      about_title: "About AI Job Agent",
      about_how_title: "How does it work?",
      about_how_desc: "This tool acts like a personal career coach. It reads your CV and the job offer you want, then uses Artificial Intelligence to tell you exactly what to improve.",
      about_simple: "Simple:",
      about_simple_desc: "Just upload your PDF and paste the job description.",
      about_secure: "Secure:",
      about_secure_desc: "We process your data securely.",
      about_tech_title: "Technical Architecture",
      about_btn_code: "View Source Code",
      about_btn_close: "Close"
    }
  },
  es: {
    translation: {
      // --- ESPANHOL PROFISSIONAL ---
      title: "Agente de Empleo IA",
      subtitle: "Aumenta tus posibilidades de entrevista con feedback instantáneo.", // <--- MUITO MELHOR

      // TABS
      tab_pdf: "Subir PDF",
      tab_text: "Pegar Texto",

      // MAIN INTERFACE
      cv_label: "1. Tu CV",
      cv_placeholder: "Haz clic para subir tu CV en PDF",
      cv_change: "Cambiar Archivo",
      cv_limit: "(Máx. tamaño: 10MB)",
      job_label: "2. Descripción del Puesto",
      job_placeholder: "Pega aquí los requisitos del puesto...",
      btn_analyze: "Analizar Coincidencia",
      
      // REPORT
      report_title: "Informe de Análisis",
      score_label: "Puntuación:",
      strong_points: "Puntos Fuertes",
      gaps: "Brechas Identificadas",
      suggestion: "Nuestra Sugerencia",
      
      // ERRORS
      error_size: "¡El archivo es demasiado grande! Máx 10MB.",
      error_empty: "Por favor sube un CV y completa la descripción.",
      error_generic: "Ocurrió un error. Inténtalo de nuevo.",

      // --- MODAL ABOUT ---
      about_title: "Sobre el Agente IA",
      about_how_title: "¿Cómo funciona?",
      about_how_desc: "Esta herramienta actúa como un entrenador personal de carrera. Lee tu CV y la oferta de trabajo, y usa Inteligencia Artificial para decirte exactamente qué mejorar.",
      about_simple: "Simple:",
      about_simple_desc: "Solo sube tu PDF y pega la descripción del puesto.",
      about_secure: "Seguro:",
      about_secure_desc: "Procesamos tus datos de forma segura.",
      about_tech_title: "Arquitectura Técnica",
      about_btn_code: "Ver Código",
      about_btn_close: "Cerrar"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;