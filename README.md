# 🌾 Crop Recommendation System (HACK-P302)
> **Precision Agronomic Decision-Support Engine**  
> Full-Stack Web Application built for College Hackathon Project: **HACK-P302**

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-v18.3-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-teal.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-v4.19-lightgrey.svg)](https://expressjs.com/)
[![Deployment Ready](https://img.shields.io/badge/Deploy-Render%20Ready-purple.svg)](https://render.com/)

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Single-Server Full-Stack Architecture](#-single-server-full-stack-architecture)
3. [Key Features](#-key-features)
4. [Agronomic Recommendation Methodology](#-agronomic-recommendation-methodology)
5. [Project Directory Layout](#-project-directory-layout)
6. [Quick Start & Local Setup](#-quick-start--local-setup)
7. [Render Deployment Guide (Single URL)](#-render-deployment-guide-single-url)
8. [REST API Documentation](#-rest-api-documentation)
9. [Advisory & Decision-Support Notice](#-advisory--decision-support-notice)
10. 🚀 **Live Web Application:** [https://crop-recommendation-system-p4oe.onrender.com/](https://crop-recommendation-system-p4oe.onrender.com/)
---

## 🎯 Project Overview

Smallholder farmers and agricultural planners frequently face devastating yield losses due to misaligned crop choices—sowing seeds incompatible with local soil chemistry, micro-climates, or seasonal precipitation. 

**Crop Recommendation System (HACK-P302)** is a production-ready, full-stack decision-support system. It captures laboratory soil metrics (**N**, **P**, **K**, **pH**), seasonal meteorological variables (**Temperature**, **Relative Humidity**, **Precipitation**), and **Soil Classification** to predict optimal cultivar suitability with high mathematical rigor.

---

## 🏗️ Single-Server Full-Stack Architecture

To ensure zero-configuration deployment on platforms like **Render**, the application uses a unified single-server architecture:
- **Express Backend (`server/server.js`)**: Serves the RESTful agronomic scoring API under `/api/*`.
- **Static Asset Delivery**: In production, Express hosts the built React frontend directly from `client/dist` via `express.static`.
- **SPA Routing Catch-All**: A wildcard route `app.get('*')` delivers `index.html` for any client-side routes, enabling the entire application to operate seamlessly on a **single live URL** without cross-origin issues or multiple hosting tiers.

```
                           +----------------------------------------+
                           |           Single Live URL              |
                           |    (Render / Cloud Environment)        |
                           +-------------------+--------------------+
                                               |
                                               v
                           +----------------------------------------+
                           |       Node.js / Express Server         |
                           |           (server/server.js)           |
                           +-------------------+--------------------+
                                               |
                     +-------------------------+-------------------------+
                     |                                                   |
                     v                                                   v
          +---------------------+                             +---------------------+
          |      API Routes     |                             |    Static Frontend  |
          |  POST /api/recommend|                             |  express.static     |
          |  POST /api/compare  |                             |  serves client/dist |
          |  GET  /api/crops    |                             |  & catch-all SPA    |
          |  GET  /api/health   |                             |                     |
          +---------------------+                             +---------------------+
                     |                                                   |
                     v                                                   v
          +---------------------+                             +---------------------+
          | Recommendation      |                             | React (Vite) UI     |
          | Engine & Heuristics |                             | Tailwind & Lucide   |
          +---------------------+                             +---------------------+
```

---

## 🌟 Key Features

### 1. Soil & Climate Input Form
- Captures 9 essential agricultural parameters:
  - **Soil Classification**: Alluvial, Black, Clayey, Loamy, Sandy Loam, Sandy, Red, Laterite.
  - **pH Reaction**: Interactive slider and numerical field (3.5 to 9.5) with bio-availability status indicators (Acidic / Neutral / Alkaline).
  - **Primary Macronutrients (NPK)**: Nitrogen ($N$), Phosphorus ($P$), Potassium ($K$) in $\text{kg/ha}$.
  - **Meteorological Indicators**: Mean temperature ($^\circ\text{C}$), relative humidity ($\%$), seasonal rainfall ($\text{mm}$).
  - **Cropping Season**: Kharif (Monsoon), Rabi (Winter), Zaid (Summer), or Year-round.
- **One-Click Hackathon Presets**: Instant autofill for 5 real-world agro-climatic scenarios:
  - Eastern Delta Rice (Heavy Clayey, Monsoon)
  - Punjab Plains Wheat (Loamy, Rabi Winter)
  - Deccan Plateau Cotton (Black Cotton Soil)
  - Semi-Arid Dryland (Sandy, Low Rain)
  - Coastal Horticulture (Sandy Loam, Humid)

### 2. Ranked Recommendation Engine (`/api/recommend`)
- Scores inputs against a benchmark agronomic dataset of **26+ crops** spanning Cereals, Pulses, Cash Crops, Fruits, and Oilseeds.
- Multi-dimensional breakdown providing:
  - Overall Suitability Match Percentage ($\%$)
  - Individual indices: Soil Match $\%$, Climate Suitability $\%$, Nutrient Balance $\%$, Season Alignment $\%$.
  - Specific favorable factors and limiting constraints with corrective guidance.

### 3. Side-by-Side Crop Comparison (`/api/compare`)
- Select any two candidate crops to evaluate their trade-offs.
- Side-by-side comparative table with automated winner delta indicator, contrasting:
  - Suitability Match scores
  - N-P-K nutrient appetites
  - pH tolerance envelopes
  - Water requirement intensity & precipitation thresholds
  - Growth duration (days to harvest)
  - Expected yield potential and economic market demand
  - Fertilizer scheduling and pest/disease warnings

### 4. Interactive Agronomic Catalog
- Full encyclopedia of all 26 crops with scientific binomial taxonomy, ideal growth conditions, and pathology alerts.

### 5. Advisory Disclaimer
- Prominent compliance alert emphasizing that computer-assisted recommendations are advisory decision-support tools meant to supplement—not replace—laboratory soil testing and local agricultural extension officers.

---

## 🔬 Agronomic Recommendation Methodology

The suitability score is calculated using an explainable, multi-factor weighted Gaussian decay model:

$$\text{Match Score} = w_{\text{soil}} \cdot S_{\text{soil}} + w_{\text{season}} \cdot S_{\text{season}} + w_{\text{nutrients}} \cdot S_{\text{nutrients}} + w_{\text{climate}} \cdot S_{\text{climate}}$$

### Weights Breakdown
- **Nutrients ($S_{\text{nutrients}}$)**: **$35\%$** (Weighted: $N = 30\%$, $P = 25\%$, $K = 25\%$, $\text{pH} = 20\%$)
- **Climate ($S_{\text{climate}}$)**: **$30\%$** (Weighted: $\text{Temp} = 35\%$, $\text{Rainfall} = 35\%$, $\text{Humidity} = 30\%$)
- **Soil Type ($S_{\text{soil}}$)**: **$20\%$** (Exact match = $100$, Compatible agronomic class = $75-85$, Incompatible = $35$)
- **Cropping Season ($S_{\text{season}}$)**: **$15\%$** (Target season match or Year-round = $100$)

### Distance Decay Function
When an input $x$ falls outside the optimal range $[min, max]$, suitability decays exponentially based on standard deviation tolerance $\sigma$:

$$S(x) = \exp\left(-\frac{(x - \text{clamp}(x, min, max))^2}{2\sigma^2}\right) \times 100$$

---

## 📁 Project Directory Layout

```
crop-recommendation-system/
├── package.json                   # Root package with orchestration scripts
├── README.md                      # Complete documentation & deployment guide
├── server/
│   ├── package.json               # Server dependencies (Express, CORS)
│   ├── server.js                  # Main server, static serving & catch-all
│   ├── routes/
│   │   └── recommend.js           # API route handlers (/recommend, /compare, /crops, /presets)
│   ├── controllers/
│   │   └── recommendationEngine.js# Weighted agronomic scoring algorithm
│   └── data/
│       └── crops.json             # 26+ crops benchmark agronomic dataset
└── client/
    ├── package.json               # Client dependencies (React, Lucide, Tailwind)
    ├── vite.config.js             # Vite build configuration with /api proxy
    ├── tailwind.config.js         # Custom agricultural palette styling
    ├── postcss.config.js
    ├── index.html                 # App shell with Google Fonts & metadata
    └── src/
        ├── main.jsx               # React DOM entrypoint
        ├── App.jsx                # Main stateful dashboard
        ├── index.css              # Global styles & custom scrollbars
        ├── utils/
        │   └── api.js             # Fetch client for backend endpoints
        └── components/
            ├── Navbar.jsx         # Header with HACK-P302 badge & tab switcher
            ├── SoilClimateForm.jsx# Input form with sliders, presets, and NPK meters
            ├── RecommendationList.jsx # Ranked recommendation cards & filter
            ├── CropComparison.jsx # Side-by-side comparative table
            ├── CropsCatalog.jsx   # Knowledgebase explorer
            ├── CropDetailModal.jsx# Comprehensive agronomic modal popup
            └── AdvisoryDisclaimer.jsx # Advisory disclaimer banner
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 1. Clone or Open Workspace
```bash
cd C:\Users\veera\.gemini\antigravity\scratch\crop-recommendation-system
```

### 2. Install Dependencies
Run the root command to install both server and client packages:
```bash
npm run install-all
```
*(Or manually: `cd server && npm install && cd ../client && npm install`)*

### 3. Build Frontend
Compile the React application into `client/dist`:
```bash
npm run build
```

### 4. Start the Application
Run the single-server full-stack application:
```bash
npm start
```
The application will launch on:
👉 **`http://localhost:5000`**

### Development Mode (Hot-Reload)
To develop with instant hot-module replacement:
1. Start the backend: `npm run dev:server` (runs Express on `localhost:5000`)
2. In another terminal, start Vite: `npm run dev:client` (runs React on `localhost:3000` with automated proxy to `/api`)

---

## ☁️ Render Deployment Guide (Single URL)

Deploying this application to **Render** takes under 3 minutes:

1. **Push to GitHub**: Push this repository to your GitHub or GitLab account.
2. **Create New Web Service on Render**:
   - Log into [dashboard.render.com](https://dashboard.render.com/).
   - Click **New +** > **Web Service**.
   - Connect your GitHub repository.
3. **Configure Service Settings**:
   - **Name**: `crop-recommendation-hack-p302` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose the region closest to your audience (e.g., Singapore, Frankfurt, Oregon)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank to use workspace root)*
   - **Build Command**:
     ```bash
     npm run render-build
     ```
     *(This runs: `cd server && npm install && cd ../client && npm install && npm run build`)*
   - **Start Command**:
     ```bash
     npm start
     ```
     *(This runs: `node server/server.js`)*
   - **Plan**: `Free`
4. **Environment Variables**:
   - `NODE_ENV`: `production`
   - *(Optional)* `PORT`: `5000` (Render will automatically inject its own `$PORT`)
5. **Deploy**:
   - Click **Create Web Service**.
   - Render will install dependencies, build the React frontend into `client/dist`, and launch `server/server.js`.
   - Your app is now live at: `https://<your-service-name>.onrender.com`!

---

## 📡 REST API Documentation

### 1. Recommend Crops
- **Endpoint**: `POST /api/recommend`
- **Content-Type**: `application/json`
- **Sample Request**:
```json
{
  "soilType": "Loamy",
  "ph": 6.8,
  "nitrogen": 90,
  "phosphorus": 50,
  "potassium": 45,
  "temperature": 22,
  "humidity": 60,
  "rainfall": 80,
  "season": "Rabi"
}
```
- **Sample Response**:
```json
{
  "success": true,
  "count": 26,
  "inputs": { ... },
  "recommendations": [
    {
      "id": "wheat",
      "name": "Wheat",
      "scientificName": "Triticum aestivum",
      "category": "Cereal",
      "matchScore": 99.4,
      "suitabilityGrade": "Highly Recommended",
      "breakdown": {
        "soilScore": 100,
        "seasonScore": 100,
        "nutrientScore": 100,
        "climateScore": 100
      },
      "favorableFactors": [
        "Available Nitrogen (90 kg/ha) matches ideal requirement (80 - 120)",
        "Soil pH (6.8) is perfectly suited for nutrient bioavailability"
      ],
      "limitingFactors": []
    }
  ]
}
```

### 2. Compare Crops
- **Endpoint**: `POST /api/compare`
- **Body**: `{ "cropId1": "wheat", "cropId2": "chickpea", "inputs": { ... } }`
- **Response**: Returns full comparative breakdown of both candidates side-by-side.

### 3. Crops Catalog
- **Endpoint**: `GET /api/crops`
- **Response**: Returns all 26 crops in the reference dataset.

### 4. Presets
- **Endpoint**: `GET /api/presets`
- **Response**: Returns the 5 hackathon test presets for one-click form population.

### 5. Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `{ "status": "healthy", "project": "Crop Recommendation System (HACK-P302)", "uptimeSeconds": 45.2 }`

---

## ⚠️ Advisory & Decision-Support Notice

> **IMPORTANT DISCLAIMER FOR HACKATHON EVALUATION**  
> This Crop Recommendation System is designed as a **computer-assisted decision-support system** based on standard agronomic heuristic envelopes (ICAR / FAO guidelines). Recommendations should always be validated against laboratory chemical soil tests (Walkley-Black organic carbon, Bray/Olsen phosphorus, neutral ammonium acetate potassium) and localized agro-climatic advisories from nearest **Krishi Vigyan Kendras (KVK)** or agricultural universities prior to field expenditure.

---

**Project ID**: HACK-P302  
**Developed for**: College Hackathon Presentation  
**License**: MIT License
