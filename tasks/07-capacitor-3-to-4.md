# FASE 6: Capacitor 3 → Capacitor 4

## Objetivo
Actualizar Capacitor de v3 a v4.

---

## Documentación Oficial
📖 https://capacitorjs.com/docs/updating/4-0

---

## Pasos de Migración

### 1. Actualizar CLI y Dependencias

```bash
npm install @capacitor/cli@latest
npm install @capacitor/core@latest
npm install @capacitor/android@latest
npm install @capacitor/ios@latest
```

O en `package.json`:
```json
"@capacitor/core": "^4.8.0",
"@capacitor/android": "^4.8.0",
"@capacitor/ios": "^4.8.0",
"@capacitor/cli": "^4.8.0"
```

### 2. Actualizar Plugins

```json
"@capacitor/app": "^4.1.1",
"@capacitor/splash-screen": "^4.2.0",
"@capacitor/status-bar": "^4.1.1",
"@capacitor/browser": "^4.1.1"
```

### 3. Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios en Android

### 1. Actualizar Android SDK

**Archivo: `android/variables.gradle`**
```gradle
ext {
    minSdkVersion = 22
    compileSdkVersion = 33
    targetSdkVersion = 33
    androidxActivityVersion = '1.6.0'
    androidxAppCompatVersion = '1.5.1'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.9.0'
    androidxFragmentVersion = '1.5.5'
    coreSplashScreenVersion = '1.0.0'
    androidxWebkitVersion = '1.5.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.1.4'
    androidxEspressoCoreVersion = '3.5.0'
    cordovaAndroidVersion = '10.1.1'
}
```

### 2. Actualizar Gradle

**Archivo: `android/build.gradle`**
```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
        classpath 'com.google.gms:google-services:4.3.15'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

### 3. Actualizar Gradle Wrapper

**Archivo: `android/gradle/wrapper/gradle-wrapper.properties`**
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0-all.zip
```

### 4. Actualizar MainActivity

**Archivo: `android/app/src/main/java/.../MainActivity.java`**

**Antes:**
```java
package com.yourapp;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
}
```

**Después (sin cambios necesarios, pero verificar):**
```java
package com.yourapp;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  // Capacitor 4 maneja todo automáticamente
}
```

---

## Cambios en iOS

### 1. Actualizar Podfile

**Archivo: `ios/App/Podfile`**
```ruby
platform :ios, '13.0'
use_frameworks!

# Resto del Podfile...
```

### 2. Actualizar Pods
```bash
cd ios/App
pod repo update
pod install
cd ../..
```

---

## Cambios en el Código

### 1. App Plugin - Cambios en API

**Antes (Capacitor 3):**
```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', (state) => {
  console.log('App state changed. Is active?', state.isActive);
});
```

**Después (Capacitor 4 - sin cambios):**
```typescript
// La API sigue igual
import { App } from '@capacitor/app';

App.addListener('appStateChange', (state) => {
  console.log('App state changed. Is active?', state.isActive);
});
```

### 2. Status Bar - Sin cambios mayores
```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// API sigue igual
await StatusBar.setStyle({ style: Style.Dark });
```

### 3. Splash Screen - Sin cambios mayores
```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// API sigue igual
await SplashScreen.hide();
```

---

## Actualizar Configuración

### capacitor.config.ts

**Verificar y actualizar:**
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.purasangre.app',
  appName: 'PuraSangre',
  webDir: 'www',
  server: {
    androidScheme: 'https'  // Nuevo en Capacitor 4
  },
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

---

## Sincronizar Proyectos Nativos

```bash
npx cap sync
```

O individualmente:
```bash
npx cap sync android
npx cap sync ios
```

---

## Migrar Plugins de Cordova (si quedan)

Si todavía usas plugins de Cordova, considera migrar:

### cordova-plugin-inappbrowser → @capacitor/browser
```bash
npm uninstall cordova-plugin-inappbrowser
npm install @capacitor/browser
```

**Código:**
```typescript
import { Browser } from '@capacitor/browser';

async openUrl(url: string) {
  await Browser.open({ url });
}
```

---

## Testing

### Android
```bash
# Sincronizar
npx cap sync android

# Abrir Android Studio
npx cap open android

# Compilar y ejecutar en dispositivo/emulador
```

### iOS
```bash
# Sincronizar
npx cap sync ios

# Abrir Xcode
npx cap open ios

# Compilar y ejecutar en dispositivo/simulador
```

---

## Verificación

### Checklist
- [ ] Build Android exitoso
- [ ] Build iOS exitoso
- [ ] App abre correctamente
- [ ] Splash screen funciona
- [ ] Status bar funciona
- [ ] Navegación funciona
- [ ] Todos los plugins funcionan
- [ ] Deep links funcionan (si aplica)
- [ ] Push notifications funcionan (si aplica)

---

## Problemas Comunes

### Error: "Gradle version"
**Solución**: Actualizar gradle wrapper:
```bash
cd android
./gradlew wrapper --gradle-version 8.0
cd ..
```

### Error en Android Build
**Solución**: Limpiar y rebuild:
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Error en iOS Pods
**Solución**:
```bash
cd ios/App
pod deintegrate
pod install
cd ../..
```

---

## Criterios de Éxito
✅ Capacitor actualizado a v4.8.x
✅ Todos los plugins actualizados
✅ Build Android exitoso
✅ Build iOS exitoso
✅ App funciona en dispositivos
✅ Todos los plugins funcionan correctamente

---

## Tiempo Estimado
⏱️ 4-6 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Capacitor de v3 a v4"
```

---

## Siguiente Paso
➡️ `08-angular-14-to-15.md`
