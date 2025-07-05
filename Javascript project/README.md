# Beautiful Calculator

A responsive calculator web application with light and dark theme options, built using HTML, CSS, Bootstrap 5, and JavaScript.

## Features

- **Responsive Design**: Works on all device sizes
- **Light/Dark Theme**: Toggle between light and dark themes
- **Theme Persistence**: Remembers your theme preference
- **Keyboard Support**: Use your keyboard for calculations
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Additional Functions**: Percentage calculation, clear, delete
- **Error Handling**: Prevents division by zero

## Technologies Used

- HTML5
- CSS3 with custom properties (variables)
- Bootstrap 5.3
- JavaScript (ES6+)
- Font Awesome icons

## How to Use

1. Open `index.html` in any modern web browser
2. Use the calculator by clicking the buttons or using your keyboard:

   - Numbers: 0-9
   - Operations: +, -, \*, /
   - Equals: Enter or =
   - Clear: Escape or Delete
   - Backspace: Delete the last digit
   - Percent: %

3. Toggle between light and dark themes using the switch in the top-right corner

## Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # Project documentation
```

## Features in Detail

### Calculator Operations

- **Basic Arithmetic**: Perform addition, subtraction, multiplication, and division
- **Percentage**: Calculate percentages with a single button
- **Clear (AC)**: Reset the calculator
- **Delete (DEL)**: Remove the last entered digit

### Theme Toggle

The calculator supports both light and dark themes. The theme preference is saved in the browser's local storage, so it persists between sessions. The initial theme is determined by:

1. Previously saved preference (if any)
2. System preference (if no saved preference)

### Responsive Design

The calculator is fully responsive and works well on:

- Desktop computers
- Tablets
- Mobile phones

## License

This project is open source and available for personal and educational use.
