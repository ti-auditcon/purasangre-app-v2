# FASE 8: Capacitor 4 → Capacitor 5

## Objetivo
Actualizar Capacitor de v4 a v5.

---

## Documentación Oficial
📖 https://capacitorjs.com/docs/updating/5-0

---

## Pasos de Migración

### 1. Actualizar Dependencias de Capacitor

```bash
npm install @capacitor/cli@latest
npm install @capacitor/core@latest
npm install @capacitor/android@latest
npm install @capacitor/ios@latest
```

O en `package.json`:
```json
"@capacitor/core": "^5.7.0",
"@capacitor/android": "^5.7.0",
"@capacitor/ios": "^5.7.0",
"@capacitor/cli": "^5.7.0"
```

### 2. Actualizar Plugins

```json
"@capacitor/app": "^5.0.6",
"@capacitor/splash-screen": "^5.0.6",
"@capacitor/status-bar": "^5.0.6",
"@capacitor/browser": "^5.1.0"
```

### 3. Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios en Android

### 1. Actualizar Android SDK y Dependencias

**Archivo: `android/variables.gradle`**
```gradle
ext {
    minSdkVersion = 22
    compileSdkVersion = 34
    targetSdkVersion = 34
    androidxActivityVersion = '1.8.0'
    androidxAppCompatVersion = '1.6.1'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.12.0'
    androidxFragmentVersion = '1.6.2'
    coreSplashScreenVersion = '1.0.1'
    androidxWebkitVersion = '1.9.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.1.5'
    androidxEspressoCoreVersion = '3.5.1'
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
        classpath 'com.android.tools.build:gradle:8.2.1'
        classpath 'com.google.gms:google-services:4.4.0'
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
distributionUrl=https\://services.gradle.org/distributions/gradle-8.2-all.zip
```

### 4. Actualizar gradle.properties

**Agregar si no existe:**
```properties
android.useAndroidX=true
android.enableJetifier=true
```

---

## Cambios en iOS

### 1. Actualizar Deployment Target

**Archivo: `ios/App/Podfile`**
```ruby
platform :ios, '13.0'
use_frameworks!

# Resto del Podfile...
```

### 2. Actualizar Info.plist (si es necesario)

Verificar que los permisos estén correctamente configurados.

### 3. Actualizar Pods
```bash
cd ios/App
pod repo update
pod install
cd ../..
```

---

## Cambios en el Código

### 1. Keyboard Plugin - Cambio Importante

Si usas el plugin de teclado, ahora es un plugin oficial separado:

```bash
npm install @capacitor/keyboard
```

**Antes (Capacitor 4):**
```typescript
import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins;

Keyboard.addListener('keyboardWillShow', () => {
  // ...
});
```

**Después (Capacitor 5):**
```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', () => {
  // ...
});
```

### 2. Permissions - API Mejorada

```typescript
import { App } from '@capacitor/app';

// Las permissions ahora son más explícitas
// La API sigue siendo similar
```

### 3. App Plugin - Sin cambios mayores
```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});
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
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'Default'
    },
    Keyboard: {  // Nueva configuración si usas keyboard
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  }
};

export default config;
```

---

## Migrar Plugins Deprecados

### 1. Si usas Camera
```bash
npm install @capacitor/camera
```

### 2. Si usas Filesystem
```bash
npm install @capacitor/filesystem
```

### 3. Si usas Geolocation
```bash
npm install @capacitor/geolocation
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

## Testing

### Android
```bash
# Limpiar build anterior
cd android
./gradlew clean
cd ..

# Sincronizar
npx cap sync android

# Abrir Android Studio
npx cap open android

# Compilar y ejecutar
```

### iOS
```bash
# Limpiar pods
cd ios/App
rm -rf Pods Podfile.lock
pod install
cd ../..

# Sincronizar
npx cap sync ios

# Abrir Xcode
npx cap open ios

# Compilar y ejecutar
```

---

## Verificación

### Checklist
- [ ] Build Android exitoso
- [ ] Build iOS exitoso
- [ ] App abre correctamente
- [ ] Splash screen funciona
- [ ] Status bar funciona
- [ ] Teclado funciona correctamente
- [ ] Navegación funciona
- [ ] Todos los plugins funcionan
- [ ] Permisos se solicitan correctamente
- [ ] Deep links funcionan (si aplica)

---

## Problemas Comunes

### Error: "Gradle sync failed"
**Solución**:
```bash
cd android
./gradlew clean
./gradlew wrapper --gradle-version 8.2
cd ..
npx cap sync android
```

### Error: "Pod install failed"
**Solución**:
```bash
cd ios/App
pod deintegrate
pod cache clean --all
pod install
cd ../..
```

### Error: "Module not found @capacitor/keyboard"
**Solución**:
```bash
npm install @capacitor/keyboard
npx cap sync
```

### Build de Android falla con Java
**Solución**: Asegurarse de usar Java 17:
```bash
# Verificar versión de Java
java -version

# Debería ser Java 17
```

---

## Criterios de Éxito
✅ Capacitor actualizado a v5.7.x
✅ Todos los plugins actualizados a v5
✅ Build Android exitoso
✅ Build iOS exitoso
✅ App funciona en dispositivos Android
✅ App funciona en dispositivos iOS
✅ Todos los plugins funcionan correctamente

---

## Tiempo Estimado
⏱️ 4-6 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Capacitor de v4 a v5"
```

---

## Siguiente Paso
➡️ `10-ionic-6-to-7.md`
