#Conceptos

Este documento define todos los términos relacionados al DoApps Standard Project Planning (DSPP).


## Project-name

Nombre real o título del proyecto.

## Namespace

Nombre de identificación del proyecto. Con este nombre se crearán las carpetas, repositorios, canales y todo lo necesario para llevar a cabo el correcto desarrollo del proyecto.


## Macrotarget
Especifica en forma general, una parte de la cual esta conformada la arquitectura del proyecto. En este caso, se definen 2 macrotargets principalmente:

* **Mobile:** Aplicación que funcionará en dispositivos móviles.
* **Web:** Aplicación que funcionará en ordenadores.


## Target
Especifica para que tipo de dispositivo se va a orientar el desarrollo del proyecto tomando en cuenta cada macrotarget.

En el macrotarget **Mobile**, los targets son:

* Android
* iOS


En el macrotarget **Web**, el target es:

* Web admin
* Web aplicación

## Scope
Especifica los roles identificados en los macrotargets, en el caso de mobile, y los roles identificados en los targets, en el caso de web.


## **Ejemplo:**
Proyecto de aplicacion de taxi.

* **Project-name:** FAST TAXI
* **Namespace:** fast-taxi
* **Macrotargets:**
 - Mobile
 - Web
* **Targets:**
 - Mobile
    - Android
    - iOS
 - Web
    - Web admin

* **Scopes:**
  - Mobile
     - Cliente
     - Taxista

  - Web admin
     - Superadmin
     - Agente
     - Operador
