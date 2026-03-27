import React from 'react';

const UseCases = () => {
  return (
    <>
      <style>
        {`
          /* ==========================================
             ISOLATION TOTALE & VARIABLES (ANTI-WP)
             ========================================== */
          #cshield-wp-uc-section {
              --cswp-uc-blue: #2563EB;
              --cswp-uc-blue-light: #EFF6FF;
              --cswp-uc-navy: #0F172A;
              --cswp-uc-white: #FFFFFF;
              --cswp-uc-slate-50: #F8FAFC;
              --cswp-uc-slate-100: #F1F5F9;
              --cswp-uc-slate-200: #E2E8F0;
              --cswp-uc-slate-500: #64748B;
              --cswp-uc-slate-600: #475569;
              
              --cswp-uc-shadow-card: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.03);
              --cswp-uc-shadow-hover: 0 15px 30px -5px rgba(37, 99, 235, 0.1);

              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
              background-color: var(--cswp-uc-slate-50) !important;
              padding: 4rem 1rem !important;
              box-sizing: border-box !important;
              border-top: 1px solid var(--cswp-uc-slate-200) !important;
          }

          /* Reset strict pour bloquer les marges par défaut des thèmes WP */
          #cshield-wp-uc-section *, 
          #cshield-wp-uc-section *::before, 
          #cshield-wp-uc-section *::after {
              box-sizing: border-box !important;
          }
          
          .cshield-wp-uc-container {
              max-width: 1200px !important;
              margin: 0 auto !important;
          }

          /* ==========================================
             EN-TÊTE
             ========================================== */
          .cshield-wp-uc-title {
              font-size: 1.75rem !important;
              font-weight: 800 !important;
              color: var(--cswp-uc-navy) !important;
              text-align: center !important;
              margin: 0 auto 3rem auto !important;
              line-height: 1.2 !important;
              letter-spacing: -0.02em !important;
              padding: 0 !important;
          }

          @media (min-width: 768px) {
              #cshield-wp-uc-section { padding: 6rem 1.5rem !important; }
              .cshield-wp-uc-title { font-size: 2.25rem !important; margin-bottom: 4rem !important; }
          }

          /* ==========================================
             GRILLE RESPONSIVE
             ========================================== */
          .cshield-wp-uc-grid {
              display: grid !important;
              grid-template-columns: 1fr !important; /* 1 colonne Mobile */
              gap: 1.5rem !important;
          }

          @media (min-width: 768px) {
              .cshield-wp-uc-grid {
                  grid-template-columns: repeat(2, 1fr) !important; /* 2 colonnes Tablette */
                  gap: 2rem !important;
              }
          }

          @media (min-width: 1024px) {
              .cshield-wp-uc-grid {
                  grid-template-columns: repeat(4, 1fr) !important; /* 4 colonnes Desktop */
                  gap: 1.5rem !important;
              }
          }

          /* ==========================================
             CARTES CARRÉES (ASPECT-RATIO 1/1)
             ========================================== */
          .cshield-wp-uc-card {
              background-color: var(--cswp-uc-white) !important;
              border: 1px solid var(--cswp-uc-slate-200) !important;
              border-radius: 1rem !important; 
              padding: 2rem 1.5rem !important;
              box-shadow: var(--cswp-uc-shadow-card) !important;
              
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              justify-content: center !important; 
              
              /* Force la carte à être un carré parfait */
              aspect-ratio: 1 / 1 !important; 
              
              /* Limite de taille sur mobile pour éviter des carrés géants */
              width: 100% !important;
              max-width: 320px !important; 
              margin: 0 auto !important;
              
              position: relative !important;
              overflow: hidden !important;
              transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
          }

          @media (min-width: 768px) {
              .cshield-wp-uc-card {
                  max-width: none !important; /* La carte prend tout l'espace de la grille sur desktop */
                  padding: 2rem !important;
              }
          }

          .cshield-wp-uc-card:hover {
              transform: translateY(-5px) !important;
              box-shadow: var(--cswp-uc-shadow-hover) !important;
              border-color: var(--cswp-uc-blue) !important;
          }

          /* Ligne bleue animée en bas */
          .cshield-wp-uc-card::after {
              content: '' !important;
              position: absolute !important;
              bottom: 0 !important;
              left: 0 !important;
              width: 100% !important;
              height: 4px !important;
              background-color: var(--cswp-uc-blue) !important;
              transform: scaleX(0) !important;
              transform-origin: left !important;
              transition: transform 0.3s ease !important;
          }

          .cshield-wp-uc-card:hover::after {
              transform: scaleX(1) !important;
          }

          /* ==========================================
             ICÔNES ET TEXTES
             ========================================== */
          .cshield-wp-uc-icon {
              width: 3rem !important;
              height: 3rem !important;
              background-color: var(--cswp-uc-blue-light) !important;
              color: var(--cswp-uc-blue) !important;
              border-radius: 0.75rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              margin-bottom: 1.25rem !important;
              transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease !important;
          }

          .cshield-wp-uc-icon svg {
              width: 1.5rem !important;
              height: 1.5rem !important;
              display: block !important;
          }

          .cshield-wp-uc-card:hover .cshield-wp-uc-icon {
              background-color: var(--cswp-uc-blue) !important;
              color: var(--cswp-uc-white) !important;
              transform: scale(1.05) !important;
          }

          .cshield-wp-uc-card h3.cshield-wp-uc-card-title {
              font-size: 1.125rem !important;
              font-weight: 700 !important;
              color: var(--cswp-uc-navy) !important;
              margin: 0 0 0.5rem 0 !important;
              padding: 0 !important;
              line-height: 1.3 !important;
          }

          .cshield-wp-uc-card p.cshield-wp-uc-card-text {
              font-size: 0.875rem !important;
              color: var(--cswp-uc-slate-500) !important;
              line-height: 1.5 !important;
              margin: 0 !important;
              padding: 0 !important;
          }
        `}
      </style>
      <div id="cshield-wp-uc-section">
        <div className="cshield-wp-uc-container">
          <h2 className="cshield-wp-uc-title">Adapté à votre situation</h2>
          <div className="cshield-wp-uc-grid">
            <div className="cshield-wp-uc-card">
              <div className="cshield-wp-uc-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
                </svg>
              </div>
              <h3 className="cshield-wp-uc-card-title">Migration CRM</h3>
              <p className="cshield-wp-uc-card-text">Vous quittez Salesforce, HubSpot ou un fichier Excel ? Importez tout en quelques heures, sans perte de données, sans consultant externe.</p>
            </div>
            <div className="cshield-wp-uc-card">
              <div className="cshield-wp-uc-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"></path>
                </svg>
              </div>
              <h3 className="cshield-wp-uc-card-title">Fusion de bases</h3>
              <p className="cshield-wp-uc-card-text">Vous avez plusieurs sources de données (CRM, Excel, fichier prospects) ? Consolidez-les en une seule source fiable avec déduplication automatique.</p>
            </div>
            <div className="cshield-wp-uc-card">
              <div className="cshield-wp-uc-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path>
                </svg>
              </div>
              <h3 className="cshield-wp-uc-card-title">Intégration SI</h3>
              <p className="cshield-wp-uc-card-text">Connectez Cirrus Shield à votre ERP, outil marketing ou e-commerce via API REST ou Myddleware pour des flux de données automatisés.</p>
            </div>
            <div className="cshield-wp-uc-card">
              <div className="cshield-wp-uc-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
                </svg>
              </div>
              <h3 className="cshield-wp-uc-card-title">Nettoyage de base</h3>
              <p className="cshield-wp-uc-card-text">Votre base CRM actuelle est polluée par des doublons et des données obsolètes ? L'assistant de déduplication nettoie tout en quelques minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UseCases;
