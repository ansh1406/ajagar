# अजगर (Ajagar) - Python Web Notebook

**NASA wale sanskrit me coding karte hai aur hum hindi me bas 19-20 ka farak hai**

## Features
- **Write Python code** in the browser
- **Run code** instantly using Pyodide (Python in WebAssembly)
- **Input/Output/Error** panels for interactive coding
- **Save, Open, and Clear** code sessions
- **Hindi language UI** for meme
- **Modern, responsive design** using Tailwind CSS classes

## File Structure
- `index.html` — Main HTML file, UI layout, and script includes
- `script.js` — Handles UI logic and user interactions
- `wrapper.js` — Manages Pyodide integration and Python execution
- `style.css` — Stylesheet (Compiled Tailwind CSS)

## How to Use
1. **Open `index.html` in your browser.**
2. Write Python code in the 'निर्देश' (Instructions) section.
3. Use the buttons:
   - **आरम्भ (Run):** Execute the code
   - **सुरक्षित (Save):** Save your code
   - **खोलें (Open):** Load saved code
   - **स्वच्छ (Clear):** Clear all fields
4. View output in 'परिणाम' (Result), provide input in 'प्रविष्टि' (Input), and see errors in 'त्रुटिया' (Errors).

## Requirements
- Modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection (for loading Pyodide from CDN)

## Credits
- [Pyodide](https://pyodide.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Note:** This project is for educational and demonstration purposes. For production use, consider security and performance implications of running Python in the browser.
