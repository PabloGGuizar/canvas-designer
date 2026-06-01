# Canvas Designer Manual: Smart Component Creation

The **Canvas Designer** extension features a "Smart Parsing" engine. This means the tool understands how you structure your text in the Canvas editor *before* you click a component button.

Below, we explain the ideal structure you should give your text in the editor to get the most out of each component.

---

## 1. "Title and Body" Components

Applies to components that need a strong header and supporting text.

### 🎯 Hero & 🃏 Simple Card
- **Ideal structure:** A heading or short first line, followed by a paragraph.
- **How to do it in the editor:**
  ```text
  Main Title
  This is the paragraph text that accompanies the title. You can use bold or links here.
  ```
- **Result:** The first line is assigned as the title (in large font), and the next paragraph will be the subtitle or body of the card.
  
  ![Hero Simple](Imagenes/Hero-1.png)
  ![Hero Advanced](Imagenes/Hero-2.png)

### 📋 Accordion
The accordion is ideal for Frequently Asked Questions (FAQs).
- **Ideal structure:** 
  ```text
  How do I submit my assignment?
  You must upload a PDF file through the submission section before 11:59 pm.
  Remember to check the rubric.
  ```
  *(The first line will be the tab that unfolds; the subsequent paragraphs will remain hidden inside by default).*

  ![Accordion 1](Imagenes/Acordeon-1.png)
  ![Accordion 2](Imagenes/Acordeon-2.png)
  ![Accordion 3](Imagenes/Acordeon-3.png)
  ![Accordion 4](Imagenes/Acordeon-4.png)

---

## 2. Collection Components ("Items")

Applies to elements that display multiple repeated items in a series. **The trick for these is to use the `+` and `-` symbols at the beginning of each line** in the editor, as native lists don't always transform properly.

### ⊞ Card Grid
- **Ideal structure:** Use `+` for the card title and `-` for the content.
- **How to do it in the editor:**
  ```text
  + Suggested Reading
  - Review chapter 4 of the textbook.
  + Assignment 1
  - Complete the 10-question quiz.
  + Forum Activity
  - Participate by commenting on two peers.
  ```
- **Result:** The system will generate **3 independent cards** arranged in a column layout (Grid). "Suggested Reading" will be the title of the first card, "Assignment 1" for the second, etc.
  
  ![Card Grid 1](Imagenes/Card-grid-1.png)
  ![Card Grid 2](Imagenes/Card-grid-2.png)

### 🧭 Nav Bar & 🔗 Breadcrumb
- **Ideal Structure:** Simply write each option on a new line. If you add links (`🔗`) to the text in Canvas, they will be preserved!
- **How to do it in the editor:**
  ```text
  My Super Course
  Home (hyperlinked to your cover)
  Modules
  Grades
  ```
- **Result:** Creates a horizontal bar. In Navbar, the first item ("My Super Course") becomes the "Logo/Brand" on the left, and the rest will be links on the right.

  ![Navbar 1](Imagenes/Nav-bar-1.png)
  ![Navbar 2](Imagenes/Nav-bar-2.png)
  ![Breadcrumb](Imagenes/Breadcumb.png)

### ▾ Dropdown
- **Ideal Structure:** Just like navigation, simply write each option on a new line.
- **How to do it in the editor:**
  ```text
  View Modules
  Module 1
  Module 2
  Module 3
  ```
- **Result:** "View Modules" will be the main button you click, and pressing it will reveal a white dropdown list with options "Module 1, 2, and 3".

  ![Dropdown](Imagenes/Dropdown.png)

### ⚡ Button Group & 📝 List Group
- **Ideal Structure:** Simply write each word or phrase on a new line.
  ```text
  Option A
  Option B
  Option C
  ```
- **Result:** Creates a horizontally joined button bar (Btn Group) or a stacked table with dividing rows (List Group).

  ![Button Group](Imagenes/Grupo%20de%20botones.png)
  ![List Group 1](Imagenes/List-group%201.png)
  ![List Group 2](Imagenes/List-group%202.png)

### 🔢 Pagination
- **Ideal Structure:** Simply write the numbers or names of the pages on new lines. If any ends with an asterisk (`*`), it will be the currently active page. It will also preserve hyperlinks if you add them from Canvas.
- **How to do it in the editor:**
  ```text
  1
  2*
  3
  ```
- **Result:** Creates enumerated pagination buttons and automatically detects and links the back (`‹`) and forward (`›`) arrows to the previous and next links based on the list you provided.

  ![Pagination 1](Imagenes/Paginacion-1.png)
  ![Pagination 2](Imagenes/Paginacion-2.png)

---

## 3. Wrappers

These components simply wrap your text to give it a visual style, without fragmenting it.

### ℹ️ Alert, 💬 Blockquote & 📢 Banner
- **Ideal structure:** A normal paragraph. You can include any text, bolding, or links inside.
  ```text
  Important: The deadline has been postponed to next Monday.
  ```
- **Result:** Everything selected will be packaged inside the background box or the quote with the stripe on the left. In the case of Quotes (Blockquote), when you open the advanced editor you can optionally add an "Author / Source" to appear below the quote. For Alerts, it will ask you to choose the color (Info, Success, Warning, or Error).

  ![Alert 1](Imagenes/Alerta%201.png)
  ![Alert 2](Imagenes/Alerta%202.png)
  ![Blockquote](Imagenes/Bloque%20de%20cita.png)
  ![Banner 1](Imagenes/Banner-1.png)
  ![Banner 2](Imagenes/Banner-2.png)

---

## 4. Mini Components (Inline)

### 🔘 Button & 🏷️ Badge
- **Ideal structure:** A single phrase or word. If the text already has a Canvas hyperlink applied, the Button will automatically adopt it.
  ```text
  Go to Final Exam
  ```

  ![Button 1](Imagenes/Boton-1.png)
  ![Button 2](Imagenes/Boton-2.png)
  ![Badge](Imagenes/Badge.png)

### 📊 Progress Bar
- **Ideal structure:** A label that includes a number followed by the `%` sign.
  ```text
  Unit Progress 40%
  ```
- **Result:** The system will automatically detect the number `40` and build the colored bar halfway to the left, leaving "Unit Progress" as the top text.

  ![Progress 1](Imagenes/Progreso-1.png)
  ![Progress 2](Imagenes/Progreso-2.png)

---

## 5. New Editor Features

### 👁️ Live Preview
When selecting a component from the panel, you will see a preview box at the top. Any changes you make to the texts or style options will update immediately so you can see the exact result before inserting it into Canvas.

### 🎨 Advanced Color Controls
Within the **"⚙️ Element styles"** section, properties representing a color (like background or text color) now display a visual color picker identical to the main Builder. You can change the color by clicking on the color box or by typing the hex code, and you will see the change reflected instantly in the live preview.
