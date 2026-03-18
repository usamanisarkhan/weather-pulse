# 🌍 Global Weather Pulse

A premium, modern web application for real-time weather tracking across any city in the world. Built with a focus on **visual excellence**, **smooth performance**, and **seamless user experience**.

[![Deploy static content to Pages](https://github.com/usamanisarkhan/weather-pulse/actions/workflows/deploy.yml/badge.svg)](https://github.com/usamanisarkhan/weather-pulse/actions/workflows/deploy.yml)

## ✨ Features

- **🔭 Comprehensive Search**: Select any country and dynamically load its list of cities.
- **☁️ Real-time Data**: Fetches current temperature, humidity, wind speed, and weather conditions.
- **🎨 Premium Aesthetics**: 
  - Glassmorphism UI for a sleak, modern feel.
  - Responsive design that works beautifully on mobile and desktop.
  - Smooth micro-animations and loading transitions.
- **⚡ Performance-First**: Extremely lightweight with minimal dependencies.
- **🤖 Automated Deployment**: Integrated with GitHub Actions for seamless updates to GitHub Pages.

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ESNext)
- **Structure**: HTML5 Semantic markup
- **Styling**: Vanilla CSS (Modern flexbox/grid, custom animations)
- **Tooling**: [Vite](https://vitejs.dev/)
- **Hosting**: [GitHub Pages](https://pages.github.com/)

## 📡 APIs Integrated

- [**REST Countries**](https://restcountries.com/): Country flags and metadata.
- [**CountriesNow**](https://countriesnow.space/): Dynamic city lists per country.
- [**Open-Meteo Geocoding**](https://open-meteo.com/en/docs/geocoding-api): City coordinate resolution.
- [**Open-Meteo Weather**](https://open-meteo.com/en/docs/forecast-api): Real-time meteorological data.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/usamanisarkhan/weather-pulse.git
    cd weather-pulse
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Navigate to `http://localhost:5173/`

## 📦 Deployment

The project is configured for automated deployment to GitHub Pages. Every push to the `main` branch triggers a GitHub Action that builds and deploys the latest version.

Live Site: [https://usamanisarkhan.github.io/weather-pulse/](https://usamanisarkhan.github.io/weather-pulse/)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by Usama Nisar
