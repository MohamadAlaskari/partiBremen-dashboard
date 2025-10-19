# PartiBremen Dashboard

Ein modernes Angular-Dashboard für die Bürgerbeteiligung in Bremen. Diese Anwendung ermöglicht es Bürgern, ihre Stadt zu verbessern, indem sie Probleme melden, Fotos teilen und neue Projekte vorschlagen.

## 🚀 Überblick

Das PartiBremen Dashboard ist eine umfassende Verwaltungsplattform, die verschiedene Module für die Verwaltung von Benutzern, POIs (Points of Interest), Kommentaren, Berichten und Umfragen bietet. Die Anwendung nutzt moderne Web-Technologien und bietet eine intuitive Benutzeroberfläche für die Stadtverwaltung.

## ✨ Hauptfunktionen

### 📊 Dashboard
- Übersichtliche Statistiken und Charts
- Benutzer-, POI- und Kommentar-Analysen
- Interaktive Diagramme mit Chart.js
- Echtzeit-Benachrichtigungen für Berichte

### 👥 Benutzerverwaltung
- Vollständige CRUD-Operationen für Benutzer
- Benutzerrollen und Berechtigungen
- Benutzer-Sperrung und Aktivierung
- Benutzerprofil-Verwaltung

### 📍 POI-Management
- Verwaltung von Points of Interest
- Geografische Kartenintegration (Leaflet/Mapbox)
- POI-Erstellung und -Bearbeitung
- POI-Listen und -Anzeige

### 💬 Kommentarverwaltung
- Kommentar-Moderation
- Kommentar-Details und -Verwaltung
- Kommentar-Berichte und -Status

### 📋 Berichtsmanagement
- Verwaltung von Benutzer-, POI- und Kommentar-Berichten
- Berichtsstatus-Tracking
- Benachrichtigungssystem

### 📊 Umfrageverwaltung
- Erstellung und Verwaltung von Umfragen
- Umfrage-Listen und -Anzeige
- Umfrage-Statistiken

## 🛠️ Technologie-Stack

- **Frontend**: Angular 17.3.0
- **UI Framework**: Angular Material, Bootstrap 5
- **Karten**: Leaflet, Mapbox GL
- **Charts**: Chart.js, ng2-charts, ApexCharts
- **Styling**: SCSS, Bootstrap Icons
- **State Management**: RxJS
- **Testing**: Jasmine, Karma
- **Build**: Angular CLI
- **Deployment**: Docker, Nginx

## 📦 Installation

### Voraussetzungen
- Node.js (Version 18 oder höher)
- npm oder yarn
- Angular CLI

### Setup
```bash
# Repository klonen
git clone https://github.com/MohamadAlaskari/partiBremen-dashboard.git

# In das Projektverzeichnis wechseln
cd partiBremen-dashboard

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

## 🚀 Entwicklung

### Entwicklungsserver
```bash
npm start
# oder
ng serve
```
Die Anwendung ist dann unter `http://localhost:4200/` erreichbar.

### Build
```bash
# Development Build
npm run build

# Production Build
npm run confbuild
```

### Tests
```bash
# Unit Tests
npm test

# E2E Tests (falls konfiguriert)
ng e2e
```

## 🌐 Deployment

### Live URLs
- **Production**: https://partibremen.student.28apps-software.de
- **Master Branch**: https://parti-bremen-dashboard.vercel.app/
- **Development Branch**: https://parti-bremen-dashboard-git-development-mo-alaskaris-projects.vercel.app

### API Dokumentation
- **Swagger UI**: https://api.partibremen.student.28apps-software.de/swagger-ui/index.html#/

### Docker Deployment
```bash
# Docker Image erstellen
docker build -t parti-bremen-dashboard .

# Container starten
docker run -p 80:80 parti-bremen-dashboard
```

## 📁 Projektstruktur

```
src/
├── app/
│   ├── core/                    # Core Services und Models
│   ├── modules/                 # Feature-Module
│   │   ├── auth/               # Authentifizierung
│   │   ├── dashboard/          # Dashboard
│   │   ├── home/               # Startseite
│   │   ├── user-management/    # Benutzerverwaltung
│   │   ├── poi-management/     # POI-Verwaltung
│   │   ├── comment-management/ # Kommentarverwaltung
│   │   ├── report-management/  # Berichtsverwaltung
│   │   └── survey-management/  # Umfrageverwaltung
│   ├── shared/                 # Gemeinsame Komponenten
│   └── utils/                  # Utility-Funktionen
├── assets/                     # Statische Assets
└── styles/                     # SCSS-Styles
```

## 🔧 Konfiguration

### Umgebungsvariablen
Die Anwendung nutzt verschiedene Umgebungsvariablen für die API-Konfiguration. Diese sind in `src/environment.ts` definiert.

### API-Integration
Die Anwendung kommuniziert mit einer Backend-API für:
- Benutzerauthentifizierung
- Datenverwaltung (CRUD-Operationen)
- Datei-Uploads
- Echtzeit-Benachrichtigungen

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 Lizenz

Dieses Projekt steht unter der ISC-Lizenz. Siehe die [LICENSE](LICENSE) Datei für Details.

## 👨‍💻 Autor

**Mohamad Alaskari**
- GitHub: [@MohamadAlaskari](https://github.com/MohamadAlaskari)

## 📞 Support

Bei Fragen oder Problemen:
- Erstelle ein Issue im GitHub Repository
- Kontaktiere den Autor über GitHub

## 🔄 Changelog

### Version 0.0.0
- Initiale Version
- Grundlegende Dashboard-Funktionalität
- Benutzer-, POI- und Kommentarverwaltung
- Berichts- und Umfragesystem
