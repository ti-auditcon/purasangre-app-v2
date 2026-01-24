# Estado Actual del Proyecto - PuraSangre App

**Fecha de auditoría**: 24 de enero de 2026
**Rama**: migration/ionic-8

---

## 📦 Versiones de Dependencias Principales

### Ionic & Angular
- **Ionic Angular**: v4.11.8
- **Angular Core**: v11.0.5 ⚠️
- **Angular CLI**: v8.1.2 ⚠️
- **Angular (otros paquetes)**: v8.1.2 ⚠️
- **TypeScript**: v3.4.3
- **RxJS**: v6.5.1
- **Zone.js**: v0.9.1

### Capacitor
- **Capacitor Core**: v1.4.0
- **Capacitor Android**: v1.4.0
- **Capacitor iOS**: v1.4.0
- **Capacitor CLI**: v1.4.0

### Ionic Native (Deprecado)
- **@ionic-native/core**: v5.19.1
- **@ionic-native/splash-screen**: v5.19.1
- **@ionic-native/status-bar**: v5.19.1
- **@ionic-native/in-app-browser**: v5.19.1

### Otras Dependencias
- **@ionic/storage**: v2.2.0
- **chart.js**: v2.9.3
- **ng2-charts**: v2.3.0
- **hammerjs**: v2.0.8
- **ionic-long-press**: v2.0.2

---

## ⚠️ Problemas Identificados

### 1. CRÍTICO: Versiones Inconsistentes de Angular
El proyecto tiene una mezcla peligrosa de versiones:
- Angular Core está en **v11.0.5**
- Angular CLI y otros paquetes están en **v8.1.2**

**Impacto**: El proyecto NO compila correctamente
```
This version of CLI is only compatible with Angular versions ^8.0.0-beta || >=8.0.0 <9.0.0,
but Angular version 11.0.5 was found instead.
```

**Solución**: Fase 1 - Normalización

### 2. Tecnologías Deprecadas
- **Ionic Native**: Deprecado, debe migrarse a plugins de Capacitor
- **Core.js v2**: Deprecado y con vulnerabilidades de seguridad
- **TSLint**: Deprecado, debe migrarse a ESLint

### 3. Vulnerabilidades de Seguridad
```
119 vulnerabilities (14 low, 34 moderate, 62 high, 9 critical)
```

**Nota**: Estas vulnerabilidades se resolverán automáticamente al actualizar las dependencias.

---

## 📁 Estructura del Proyecto

### Páginas Principales
- **auth/** - Autenticación y login
- **clases/** - Gestión de clases
- **dashboard/** - Dashboard principal
- **home/** - Página de inicio
- **plans/** - Planes
- **profile/** - Perfil de usuario
- **reservations/** - Reservas

### Modelos
- **users/** - Modelos de usuario (profile, user, wod)

### Servicios Identificados
- **auth.service.ts** - Autenticación
- **clases.service.ts** - Gestión de clases

---

## 🔧 Configuración Actual

### Build Configuration (angular.json)
- Output path: `www`
- Index: `src/index.html`
- Main: `src/main.ts`

### Capacitor Configuration
- Configuración en `capacitor.config.json`
- Plataformas: Android, iOS

### Android
- Gradle configurado
- Google Services integrado

---

## 📊 Estado de Compilación

### ❌ Build: FALLA
Razón: Incompatibilidad entre Angular CLI v8 y Angular Core v11

### ❌ Serve: NO PROBADO
Esperado: Fallará por la misma razón

### 📱 Plataformas Nativas
- Android: No probado (requiere build exitoso primero)
- iOS: No probado (requiere build exitoso primero)

---

## 🎯 Funcionalidades Principales a Verificar Post-Migración

### Autenticación
- [ ] Login
- [ ] Logout
- [ ] Recuperar contraseña
- [ ] Registro

### Clases
- [ ] Ver lista de clases
- [ ] Ver clases del día (clases-today)
- [ ] Reservar clase

### Reservas
- [ ] Ver mis reservas
- [ ] Cancelar reserva
- [ ] Historial de reservas

### Perfil
- [ ] Ver perfil
- [ ] Editar perfil
- [ ] Ver WODs

### Dashboard
- [ ] Visualización de estadísticas
- [ ] Gráficos (chart.js)

### Storage
- [ ] Guardar datos localmente
- [ ] Sincronizar con backend

---

## 🔌 Plugins y Dependencias Especiales

### Plugins de Ionic Native (a migrar)
1. **SplashScreen** → Migrar a @capacitor/splash-screen
2. **StatusBar** → Migrar a @capacitor/status-bar
3. **InAppBrowser** → Migrar a @capacitor/browser

### Componentes UI Especiales
- **hammerjs**: Gestos táctiles
- **ionic-long-press**: Evento long-press
- **ng2-charts**: Gráficos con Chart.js

---

## 🌐 Integraciones Externas

### Firebase
- Google Services configurado en Android (`google-services.json`)

### APIs
- (Por determinar - revisar servicios HTTP)

---

## 📝 Notas Adicionales

### Versiones de Node y NPM
- Se recomienda usar Node 20.x LTS
- NPM actualizado a última versión

### Warnings Durante Instalación
- Múltiples paquetes deprecados (normal para proyecto antiguo)
- Se resolverán durante la migración

---

## ✅ Criterios de Éxito Post-Migración

1. ✅ Proyecto compila sin errores
2. ✅ Angular, Ionic y Capacitor en últimas versiones
3. ✅ Todas las funcionalidades funcionan
4. ✅ Cero vulnerabilidades críticas
5. ✅ Código modernizado (signals, standalone components)
6. ✅ Rendimiento mejorado

---

## 🚀 Siguiente Paso

**Fase 1**: Normalización de Angular (resolver versiones inconsistentes)

Ver: `tasks/02-normalizacion-angular.md`
