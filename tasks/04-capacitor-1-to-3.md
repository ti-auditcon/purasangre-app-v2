# FASE 3: Capacitor 1 → Capacitor 3

## Objetivo
Actualizar Capacitor de v1.4.0 a v3.x (saltar v2 ya que es seguro).

---

## Documentación Oficial
📖 https://capacitorjs.com/docs/updating/3-0

---

## Pasos de Migración

### 1. Actualizar Dependencias de Capacitor

```json
"@capacitor/core": "^3.9.0",
"@capacitor/android": "^3.9.0",
"@capacitor/ios": "^3.9.0",
"@capacitor/cli": "^3.9.0"
```

### 2. Instalar Nuevos Plugins de Capacitor

Reemplazar Ionic Native plugins con plugins oficiales de Capacitor:

```bash
npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/app
```

Actualizar `package.json`:
```json
"@capacitor/app": "^1.1.1",
"@capacitor/splash-screen": "^1.2.2",
"@capacitor/status-bar": "^1.0.8"
```

### 3. Limpiar e Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios en Configuración

### 1. Actualizar capacitor.config.json → capacitor.config.ts

Crear archivo `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tu.app.id', // Verificar en capacitor.config.json actual
  appName: 'PuraSangre',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
```

### 2. Actualizar AndroidManifest.xml

Ubicación: `android/app/src/main/AndroidManifest.xml`

**Cambios necesarios:**
- Verificar que use `androidx` (no support library)
- Actualizar referencia a MainActivity si es necesario

---

## Migrar Código de Plugins

### 1. Splash Screen

**Antes (Ionic Native):**
```typescript
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

constructor(private splashScreen: SplashScreen) {}

this.platform.ready().then(() => {
  this.splashScreen.hide();
});
```

**Después (Capacitor):**
```typescript
import { SplashScreen } from '@capacitor/splash-screen';

this.platform.ready().then(() => {
  SplashScreen.hide();
});
```

### 2. Status Bar

**Antes:**
```typescript
import { StatusBar } from '@ionic-native/status-bar/ngx';

constructor(private statusBar: StatusBar) {}

this.statusBar.styleDefault();
this.statusBar.overlaysWebView(false);
```

**Después:**
```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setOverlaysWebView({ overlay: false });
```

### 3. In App Browser

**Opción 1: Usar Browser de Capacitor**
```bash
npm install @capacitor/browser
```

```typescript
import { Browser } from '@capacitor/browser';

async openBrowser(url: string) {
  await Browser.open({ url });
}
```

**Opción 2: Mantener Cordova plugin temporalmente**
```bash
npm install cordova-plugin-inappbrowser
```

---

## Actualizar AppComponent

Archivo: `src/app/app.component.ts`

**Antes:**
```typescript
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

constructor(
  private platform: Platform,
  private splashScreen: SplashScreen,
  private statusBar: StatusBar
) {
  this.initializeApp();
}

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
}
```

**Después:**
```typescript
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

constructor(private platform: Platform) {
  this.initializeApp();
}

async initializeApp() {
  await this.platform.ready();
  await StatusBar.setStyle({ style: Style.Dark });
  await SplashScreen.hide();
}
```

---

## Actualizar AppModule

**Eliminar providers de Ionic Native:**

**Antes:**
```typescript
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

providers: [
  StatusBar,
  SplashScreen,
  InAppBrowser
]
```

**Después:**
```typescript
// Eliminar imports y providers de Ionic Native
providers: [
  // Solo mantener otros providers necesarios
]
```

---

## Sincronizar Proyectos Nativos

```bash
# Sincronizar cambios
npx cap sync

# O individualmente
npx cap sync android
npx cap sync ios
```

---

## Actualizar Proyecto Android

### 1. Actualizar build.gradle (proyecto)

Archivo: `android/build.gradle`

```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.2.1'
        classpath 'com.google.gms:google-services:4.3.13'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

### 2. Actualizar gradle-wrapper.properties

Archivo: `android/gradle/wrapper/gradle-wrapper.properties`

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
```

### 3. Actualizar variables.gradle

Archivo: `android/variables.gradle`

```gradle
ext {
    minSdkVersion = 22
    compileSdkVersion = 32
    targetSdkVersion = 32
    androidxActivityVersion = '1.4.0'
    androidxAppCompatVersion = '1.4.2'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.8.0'
    androidxFragmentVersion = '1.4.1'
    coreSplashScreenVersion = '1.0.0-rc01'
    androidxWebkitVersion = '1.4.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.1.3'
    androidxEspressoCoreVersion = '3.4.0'
    cordovaAndroidVersion = '10.1.1'
}
```

---

## Testing

### Checklist
- [ ] Build exitoso
- [ ] App abre correctamente
- [ ] Splash screen funciona
- [ ] Status bar se configura correctamente
- [ ] Navegación funciona
- [ ] Plugins específicos funcionan

### Comandos de Prueba
```bash
# Build
npm run build

# Sincronizar
npx cap sync

# Abrir Android Studio
npx cap open android

# Abrir Xcode
npx cap open ios
```

---

## Problemas Comunes

### Error: "Plugin not implemented"
**Solución**: Verificar que el plugin esté instalado:
```bash
npm install @capacitor/[plugin-name]
npx cap sync
```

### Error al compilar Android
**Solución**: Limpiar y reconstruir:
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Plugins de Cordova no funcionan
**Solución**: Algunos plugins de Cordova necesitan configuración adicional en Capacitor 3.

---

## Criterios de Éxito
✅ Capacitor actualizado a v3.9.x
✅ Plugins nativos migrados de Ionic Native a Capacitor
✅ App compila en Android
✅ App compila en iOS (si aplica)
✅ Splash screen funciona
✅ Status bar funciona
✅ Navegación funciona

---

## Tiempo Estimado
⏱️ 6-10 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Capacitor de v1 a v3 y reemplazar Ionic Native"
```

---

## Siguiente Paso
➡️ `05-angular-11-to-12.md`
