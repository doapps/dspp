#Diagrama de base de datos

El diagrama de base de datos o esquema de una base de datos, describe en alto nivel la estructura de una base de datos en un lenguaje formal.
El objetivo principal de este diagrama es entender como es que los datos que se manejan se relacionan entre sí.


## Contenido

**1. Diagrama de base de datos**

* **Concepto:** Documento que contiene el modelado de la base de datos.

* **Tipo de documento:** Draw.io

* **Notación:**

 ```
erd.<macrotarget>
 ```

 Un ejemplo sería:
 ```
erd.web
 ```

**2. Diccionario de datos**


* **Concepto:** Documento  que contiene las definiciones de los datos referidos en el diagrama de base de datos.

* **Tipo de documento:** Google doc

* **Notación:**

 ```
erd.<macrotarget>.spec
 ```

 Un ejemplo sería:
 ```
erd.web.spec
 ```

**3. Imagen del diagrama de base de datos**


* **Concepto:** Imagen exportada del diagrama de base de datos.

* **Tipo de documento:** imagen.png

* **Notación:**

 ```
erd.<macrotarget>.v.<major>.<minor>.<patch>.png
```

 Un ejemplo sería:
 ```
erd.web.v.0.0.1.png
  ```

---
> **Nota:**

>* Cada imagen exportada del diagrama de base de datos, se generará las imagenes con [versionamiento.](http://wikipedia.org)
