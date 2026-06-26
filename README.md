# Chemistry 8 - First Half of Semester 1 Quiz App

A modern, dark-themed interactive web application designed for Grade 8 students to practice chemistry exercises for the first half of Semester 1. This application features dynamic question generation, automatic chemical formula formatting, and live performance tracking.

🎯 **Live Demo:** [https://xn--msiu-goa8b.vn/github/chemistry-8-first-half-semester-1/](https://xn--msiu-goa8b.vn/github/chemistry-8-first-half-semester-1/)

---

## 🚀 Features

*   **Dark Mode UI:** A clean, eye-friendly, and modern workspace built with fluid layouts.
*   **Dynamic Question Engine:** Automatically generates randomized variables ($n, n_1, n_2$, compounds) using pre-defined chemistry data pools to ensure infinite practice variations.
*   **Automatic Chemical Formatting:** Seamlessly parses regular text (e.g., `H2`, `CO2`, `6,022.10^23`) into proper chemical notation ($H_2$, $CO_2$, $6.022 \times 10^{23}$) using dynamic subscript/superscript rendering.
*   **Real-time Dashboard:** Tracks total questions answered, correct count, and live accuracy percentage (%).
*   **Interactive Log:** An automated exercise history system that records previous questions, user outcomes, and absolute answers for immediate review.

---

## 📚 Covered Chemistry Topics

The core logic contains 33 core formula generators structured across 6 main chapters:
1.  **Mole Calculations:** Calculating moles of atoms/molecules from Avogadro's number ($6.022 \times 10^{23}$), mass, or standard gas volume.
2.  **Mass, Volume & Quantities Conversions:** Working with standard ambient temperature and pressure (SATP: 25°C, 1 bar) volume constants ($24.79 \text{ L/mol}$).
3.  **Gas Density (Vapor Density):** Finding gas weight ratios against air ($M \approx 29 \text{ g/mol}$) or Hydrogen gas ($H_2$).
4.  **Solubility (Độ tan):** Calculating saturation points, solute masses, and remaining compounds post-cooling.
5.  **Percentage Concentration (C%):** Evaluating mass percentages of standard solutions and crystal hydrates (e.g., $CuSO_4 \cdot 5H_2O$).
6.  **Molar Concentration ($C_M$):** Working with solution volumes, multi-solution mixing, and chemical dilution metrics.

---

## 🛠️ Project Structure

The project is modularly split into clean vanilla web components:
```text
chemistry-8-first-half-semester-1/
│
├── index.html   # Main application structure & layout components
├── style.css    # CSS Variables, dark theme specifications, and layout engine
├── script.js    # Chemical formula formatter, database arrays, and scoring engine
└── README.md    # Repository documentation
```

## 💻 Installation & Usage
1. Clone the repository:
```bash
git clone [https://github.com/lemasieu/chemistry-8-first-half-semester-1.git](https://github.com/lemasieu/chemistry-8-first-half-semester-1.git)
```

2. Run locally:
Simply open the `index.html` file in any modern web browser (Chrome, Edge, Firefox, Safari) — no local server or installation required!

## 📝 License
This project is licensed under the terms of the MIT License. You are completely free to use, modify, and distribute it.
Created by Gemini with my idea.
