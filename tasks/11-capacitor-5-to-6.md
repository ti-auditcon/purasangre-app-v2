# FASE 10: Capacitor 5 → Capacitor 6

## Objetivo
Actualizar Capacitor de v5 a v6 (según el link proporcionado).

---

## Documentación Oficial
📖 https://capacitorjs.com/docs/updating/6-0

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
"@capacitor/core": "^6.0.0",
"@capacitor/android": "^6.0.0",
"@capacitor/ios": "^6.0.0",
"@capacitor/cli": "^6.0.0"
```

### 2. Actualizar Plugins Oficiales

```bash
npm install @capacitor/app@latest
npm install @capacitor/splash-screen@latest
npm install @capacitor/status-bar@latest
npm install @capacitor/browser@latest
npm install @capacitor/keyboard@latest
```

O en `package.json`:
```json
"@capacitor/app": "^6.0.0",
"@capacitor/splash-screen": "^6.0.0",
"@capacitor/status-bar": "^6.0.0",
"@capacitor/browser": "^6.0.0",
"@capacitor/keyboard": "^6.0.0"
```

### 3. Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios en Android

### 1. Actualizar Android SDK Target

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
    androidxWebkitVersion = '1.10.0'
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
        classpath 'com.google.gms:google-services:4.4.1'
        
        // Kotlin si lo usas
        // classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.22'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

tasks.register('clean', Delete) {
    delete rootProject.buildDir
}
```

### 3. Actualizar Gradle Wrapper

**Archivo: `android/gradle/wrapper/gradle-wrapper.properties`**
```properties
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.2.1-all.zip
networkTimeout=10000
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

### 4. Actualizar app/build.gradle

**Archivo: `android/app/build.gradle`**

Verificar que tenga:
```gradle
android {
    namespace "com.purasangre.app"  // Nuevo en Capacitor 6
    compileSdkVersion rootProject.ext.compileSdkVersion
    
    defaultConfig {
        applicationId "com.purasangre.app"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## Cambios en iOS

### 1. Actualizar Deployment Target a iOS 13

**Archivo: `ios/App/Podfile`**
```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# Importar capacitor_pods
def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  
  # Añadir tus pods aquí
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 2. Actualizar Proyecto en Xcode

Si es necesario, actualizar el deployment target en Xcode:
- Abrir `ios/App/App.xcworkspace`
- Seleccionar el proyecto
- General → Deployment Info → iOS 13.0

### 3. Actualizar Pods
```bash
cd ios/App
pod repo update
pod install
cd ../..
```

---

## Cambios en el Código

### 1. Cambios en la API de Plugins (Mínimos)

La mayoría de los plugins mantienen la misma API:

```typescript
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Browser } from '@capacitor/browser';

// Las APIs siguen iguales
```

### 2. Capacitor Preferences (Nuevo)

Si usabas el plugin Storage, ahora se recomienda usar Preferences:

```bash
npm install @capacitor/preferences
```

**Código:**
```typescript
import { Preferences } from '@capacitor/preferences';

// Guardar
await Preferences.set({
  key: 'name',
  value: 'Max',
});

// Leer
const { value } = await Preferences.get({ key: 'name' });

// Eliminar
await Preferences.remove({ key: 'name' });

// Limpiar todo
await Preferences.clear();
```

**Nota**: Ionic Storage sigue funcionando, esto es opcional.

---

## Actualizar capacitor.config.ts

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.purasangre.app',
  appName: 'PuraSangre',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'ionic'  // Nuevo en Capacitor 6
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    }
  }
};

export default config;
```

---

## Sincronizar Proyectos Nativos

```bash
# Sincronizar todo
npx cap sync

# O individualmente
npx cap sync android
npx cap sync ios
```

---

## Live Reload (Nuevo en Capacitor 6)

Capacitor 6 mejora el live reload:

```bash
# Android
ionic cap run android -l --external

# iOS
ionic cap run ios -l --external
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

# Ejecutar en dispositivo
ionic cap run android
```

### iOS
```bash
# Limpiar
cd ios/App
rm -rf Pods Podfile.lock DerivedData
pod install
cd ../..

# Sincronizar
npx cap sync ios

# Abrir Xcode
npx cap open ios

# Ejecutar en dispositivo
ionic cap run ios
```

---

## Verificación Completa

### Checklist de Build
- [ ] Build Android exitoso con Gradle 8.2
- [ ] Build iOS exitoso con iOS 13+
- [ ] No hay warnings de deprecación importantes
- [ ] App compila sin errores

### Checklist de Funcionalidad
- [ ] App abre correctamente
- [ ] Splash screen funciona
- [ ] Status bar funciona
- [ ] Navegación funciona
- [ ] Formularios funcionan
- [ ] Storage/Preferences funciona
- [ ] HTTP requests funcionan
- [ ] Plugins nativos funcionan
- [ ] Keyboard se comporta correctamente
- [ ] Deep links funcionan (si aplica)
- [ ] Push notifications funcionan (si aplica)

### Checklist de Rendimiento
- [ ] App carga rápidamente
- [ ] Navegación es fluida
- [ ] No hay lag en scrolling
- [ ] Animaciones son suaves

---

## Problemas Comunes

### Error: "namespace is required in build.gradle"
**Solución**: Agregar namespace en `android/app/build.gradle`:
```gradle
android {
    namespace "com.tuapp.id"
    // ...
}
```

### Error: "Gradle version incompatible"
**Solución**:
```bash
cd android
./gradlew wrapper --gradle-version 8.2.1
cd ..
```

### Error: "iOS deployment target"
**Solución**: Actualizar a iOS 13 en Podfile y en Xcode.

### Error: "Module not found"
**Solución**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npx cap sync
```

---

## Mejoras de Rendimiento

### 1. Configurar ProGuard (Android)

**Archivo: `android/app/proguard-rules.pro`**
```pro
# Capacitor
-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * {
    @com.getcapacitor.annotation.PluginMethod public *;
}

# Tus reglas adicionales aquí
```

### 2. Optimizar Assets

Verificar que solo se incluyan assets necesarios en `www`.

---

## Criterios de Éxito
✅ Capacitor actualizado a v6.0.x
✅ Todos los plugins actualizados a v6
✅ Android compila con Gradle 8.2
✅ iOS compila con deployment target 13
✅ Build Android exitoso
✅ Build iOS exitoso
✅ App funciona perfectamente en dispositivos
✅ Todos los plugins funcionan
✅ Live reload funciona

---

## Tiempo Estimado
⏱️ 5-8 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Capacitor de v5 a v6"
```

---

## Siguiente Paso
➡️ `12-ionic-7-to-8.md`
