# 🗺️ Sistema de Geolocalización con Análisis de Patrones de Incidentes

<div align="center">

![GitHub stars](https://img.shields.io/badge/stars-⭐⭐⭐⭐⭐-yellow?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/World%20Map.png" alt="World Map" width="150" />

### 🌍 Plataforma de reportes ciudadanos con geolocalización en tiempo real

*Registra, visualiza y analiza incidentes urbanos de forma inteligente*

[🚀 Demo](#-instalación) • [📖 Docs](#-api-documentation) • [🐛 Issues](https://github.com/issues) • [✨ Features](#-características)

---

</div>

## ✨ Características

<table>
<tr>
<td width="50%">

### 🗺️ Mapas Interactivos
- Visualización en tiempo real
- Mapas de calor por zonas de riesgo
- Clustering de incidentes
- Geolocalización automática

</td>
<td width="50%">

### 📊 Análisis Inteligente
- Predicción de zonas de riesgo con ML
- Patrones temporales de incidentes
- Estadísticas y métricas avanzadas
- Alertas automáticas por proximidad

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Seguridad
- Autenticación JWT
- Reportes anónimos
- Control de roles (Admin/Usuario)
- Validación de incidentes

</td>
<td width="50%">

### 📱 Experiencia de Usuario
- Diseño responsive
- Interfaz intuitiva
- Notificaciones en tiempo real
- Categorías personalizables

</td>
</tr>
</table>

## 🏗️ Arquitectura

```
geo-incidents/
├── backend/                 # API REST Node.js + Express
│   ├── src/
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores
│   │   ├── middlewares/    # Middlewares (auth, validation)
│   │   ├── models/         # Modelos Sequelize
│   │   ├── routes/         # Rutas API
│   │   ├── services/       # Lógica de negocio
│   │   ├── utils/          # Utilidades
│   │   └── app.ts          # Entrada principal
│   └── package.json
│
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas/Vistas
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios API
│   │   ├── store/          # Estado global (Zustand)
│   │   ├── types/          # Tipos TypeScript
│   │   └── App.tsx
│   └── package.json
│
├── ml-service/             # Servicio ML Python + FastAPI
│   ├── app/
│   │   ├── models/         # Modelos ML
│   │   ├── services/       # Lógica de predicción
│   │   └── main.py
│   └── requirements.txt
│
└── docker-compose.yml      # Orquestación de servicios
```



