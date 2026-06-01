# Manual de Canvas Designer: Creación Inteligente de Componentes

La extensión **Canvas Designer** cuenta con un motor de "Extracción Inteligente" (Smart Parsing). Esto significa que la herramienta entiende cómo estructuraste tu texto en el editor de Canvas *antes* de que presiones el botón de un componente. 

A continuación, te explicamos la estructura ideal que debes darle a tu texto en el editor para sacarle el máximo provecho a cada componente.

---

## 1. Componentes de "Título y Cuerpo"

Aplica para componentes que necesitan una cabecera fuerte y un texto de apoyo.

### 🎯 Héroe (Hero) y 🃏 Tarjeta Simple (Card)
- **Estructura ideal:** Un encabezado o primera línea corta, seguida de un párrafo.
- **Cómo hacerlo en el editor:**
  ```text
  Título Principal
  Este es el texto del párrafo que acompaña al título. Puedes usar negritas o enlaces aquí.
  ```
- **Resultado:** La primera línea se asigna como título (en grande) y el párrafo siguiente será el subtítulo o el cuerpo de la tarjeta.

### 📋 Acordeón (Accordion)
El acordeón es ideal para preguntas frecuentes.
- **Estructura ideal:** 
  ```text
  ¿Cómo entrego mi tarea?
  Debes subir un archivo PDF a través de la sección de entregas antes de las 11:59pm.
  Recuerda revisar la rúbrica.
  ```
  *(La primera línea será la pestaña que se despliega; los párrafos siguientes quedarán dentro ocultos por defecto).*

---

## 2. Componentes de Colección ("Ítems")

Aplica para elementos que muestran múltiples ítems repetidos en serie. **El truco para estos es usar los símbolos `+` y `-` al inicio de cada línea** en el editor, ya que las listas nativas no siempre se transforman adecuadamente.

### ⊞ Grid de Tarjetas (Card Grid)
- **Estructura ideal:** Usar `+` para el título de la tarjeta y `-` para el contenido.
- **Cómo hacerlo en el editor:**
  ```text
  + Lectura Sugerida
  - Revisa el capítulo 4 del libro de texto.
  + Tarea 1
  - Resuelve el cuestionario de 10 preguntas.
  + Actividad en Foros
  - Participa comentando a dos compañeros.
  ```
- **Resultado:** El sistema generará **3 tarjetas independientes** acomodadas en un layout de columnas (Grid). "Lectura Sugerida" será el título de la primera tarjeta, "Tarea 1" el de la segunda, etc.

### 🧭 Barra de Navegación (Navbar) y 🔗 Migas de pan (Breadcrumb)
- **Estructura ideal:** Líneas de texto que inician con `+`. Si agregas enlaces (`🔗`) al texto en Canvas, ¡se respetarán!
- **Cómo hacerlo en el editor:**
  ```text
  + Mi Super Curso
  + Inicio (con hipervínculo a tu portada)
  + Módulos
  + Calificaciones
  ```
- **Resultado:** Crea la barra horizontal. En Navbar, el primer ítem ("Mi Super Curso") se convierte en el "Logo/Marca" que va a la izquierda y el resto serán enlaces a la derecha.

### ▾ Desplegable (Dropdown)
- **Estructura ideal:** Igual que la navegación, líneas que inician con `+`.
- **Cómo hacerlo en el editor:**
  ```text
  + Ver Módulos
  + Módulo 1
  + Módulo 2
  + Módulo 3
  ```
- **Resultado:** "Ver Módulos" será el botón principal en el que debes hacer clic, y al presionarlo se desplegará una lista blanca hacia abajo con las opciones "Módulo 1, 2 y 3".

### ⚡ Grupo de Botones (Button Group) y 📝 Lista de Grupo (List Group)
- **Estructura ideal:** Puedes usar líneas que inician con `+`, o separar las palabras por comas o saltos de línea normales.
  ```text
  + Opción A
  + Opción B
  + Opción C
  ```
- **Resultado:** Crea una botonera unida horizontalmente (Btn Group) o una tabla apilada con filas divisoras (Lista de Grupo).

---

## 3. Componentes de Bloque Único

Estos componentes simplemente envuelven tu texto para darle un estilo visual, sin fragmentarlo.

### ℹ️ Alerta (Alert), 💬 Cita (Blockquote) y 📢 Banner
- **Estructura ideal:** Un párrafo normal. Puedes incluir cualquier tipo de texto, negritas o enlaces adentro.
  ```text
  Importante: La fecha de entrega se ha pospuesto para el próximo lunes.
  ```
- **Resultado:** Todo lo seleccionado quedará empaquetado dentro de la caja de fondo o la cita con la franja a la izquierda. En el caso de las Alertas, te pedirá elegir el color (Información, Éxito, Advertencia o Error).

---

## 4. Mini Componentes (En Línea)

### 🔘 Botón (Button) e 🏷️ Insignia (Badge)
- **Estructura ideal:** Una sola frase o palabra. Si el texto tiene un hipervínculo de Canvas ya aplicado, el Botón automáticamente lo adoptará.
  ```text
  Ir al Examen Final
  ```

### 📊 Barra de Progreso (Progress)
- **Estructura ideal:** Una etiqueta que incluye un número seguido del signo `%`.
  ```text
  Avance de la unidad 40%
  ```
- **Resultado:** El sistema detectará automáticamente el número `40` y construirá la barra coloreada hasta la mitad izquierda, dejando "Avance de la unidad" como texto superior.

---

## 5. Novedades del Editor

### 👁️ Vista Previa en Vivo
Al seleccionar un componente desde el panel, verás un recuadro de vista previa en la parte superior. Cualquier cambio que hagas en los textos o en las opciones de estilo se actualizará inmediatamente para que veas el resultado exacto antes de insertarlo en Canvas.

### 🎨 Controles de Color Avanzados
Dentro de la sección **"⚙️ Estilos de este elemento"**, las propiedades que representan un color (como el fondo o el color del texto) ahora muestran un selector visual de color idéntico al del Constructor principal. Puedes cambiar el color haciendo clic en el cuadro de color o escribiendo el código hexadecimal, y verás el cambio reflejado al instante en la vista previa.
