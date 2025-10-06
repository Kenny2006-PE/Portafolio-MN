# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar el portafolio de Melanie Nieves

### 1. Preparación del Proyecto

Asegúrate de que todos los archivos estén listos:
- ✅ `package.json` configurado
- ✅ `server.js` funcionando
- ✅ `vercel.json` configurado
- ✅ Archivos estáticos en `/public`

### 2. Instalación de Vercel CLI

```bash
npm install -g vercel
```

### 3. Login en Vercel

```bash
vercel login
```

### 4. Configuración del Proyecto

Desde el directorio del proyecto:

```bash
vercel
```

Responde las preguntas:
- **Set up and deploy**: Y
- **Which scope**: Tu cuenta personal
- **Link to existing project**: N
- **What's your project's name**: portafolio-melanie-nieves
- **In which directory**: `./` (directorio actual)
- **Want to override settings**: N

### 5. Despliegue en Producción

```bash
vercel --prod
```

### 6. Configuración de Dominio Personalizado (Opcional)

Si tienes un dominio personalizado:

```bash
vercel domains add tu-dominio.com
vercel alias tu-url-vercel.app tu-dominio.com
```

## 🔧 Variables de Entorno

Si necesitas agregar variables de entorno:

```bash
vercel env add NODE_ENV
# Ingresa el valor: production
```

## 📝 Comandos Útiles

- **Ver deployments**: `vercel ls`
- **Ver logs**: `vercel logs`
- **Remover proyecto**: `vercel rm portafolio-melanie-nieves`
- **Ver dominios**: `vercel domains ls`

## 🌐 URLs Esperadas

Después del despliegue tendrás:
- **URL principal**: `https://portafolio-melanie-nieves.vercel.app`
- **API de contacto**: `https://portafolio-melanie-nieves.vercel.app/api/contact`
- **API de portfolio**: `https://portafolio-melanie-nieves.vercel.app/api/portfolio`
- **Health check**: `https://portafolio-melanie-nieves.vercel.app/health`

## 🐛 Solución de Problemas

### Error de Build
Si hay errores durante el build:
```bash
vercel --debug
```

### Error de Rutas
Verifica que `vercel.json` esté correctamente configurado para redireccionar todas las rutas al servidor.

### Error de Dependencies
Asegúrate de que todas las dependencias estén en `package.json`:
```bash
npm install
vercel --prod
```

## 📱 Testing Post-Despliegue

Una vez desplegado, verifica:
- ✅ Página principal carga correctamente
- ✅ Todas las secciones son visibles
- ✅ Animaciones funcionan
- ✅ Enlaces de redes sociales funcionan
- ✅ Formulario de contacto funciona
- ✅ Responsive design en móvil
- ✅ Performance es buena (usar Lighthouse)

## 🔄 Actualizaciones Futuras

Para actualizar el sitio:
1. Hacer cambios en el código
2. Commit y push a Git (recomendado)
3. Ejecutar: `vercel --prod`

## 📊 Monitoreo

Vercel proporciona:
- Analytics automático
- Logs de errores
- Métricas de performance
- Información de visitantes

Accede a través del dashboard de Vercel.

---

**¡Listo! El portafolio de Melanie estará disponible en línea 🎉**