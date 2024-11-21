# Dynamic Form Builder and JSON Editor

This project allows users to dynamically generate forms based on JSON schemas. It also includes features like real-time JSON validation, responsive layouts, and form validation.

---

## Features

- Real-time JSON validation
- Dynamic form generation
- Responsive layout
- Form validation and submission
- Error handling for invalid JSON and incorrect field types

---

## Setup Instructions

### Prerequisites

1. **Node.js and npm**: Make sure you have Node.js (v14 or higher) and npm installed. You can download them from [Node.js Official Site](https://nodejs.org/).
2. **Browser**: This project has been tested with modern browsers like Chrome, Edge, and Firefox.

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name

Install dependencies:
npm install

Start the local development server: 
npm start

Open the app in your browser:
http://localhost:5173


Simple Form

{
  "formTitle": "Contact Us",
  "formDescription": "Please fill out the form to get in touch",
  "fields": [
    { "type": "text", "label": "Name", "id": "name", "required": true },
    { "type": "email", "label": "Email", "id": "email", "required": true },
    { "type": "textarea", "label": "Message", "id": "message" }
  ]
}


Survey Form

{
  "formTitle": "Customer Feedback",
  "formDescription": "We value your feedback",
  "fields": [
    { "type": "text", "label": "Full Name", "id": "fullName", "required": true },
    { "type": "radio", "label": "Rate Our Service", "id": "rating", "options": ["Excellent", "Good", "Average", "Poor"] },
    { "type": "checkbox", "label": "Services Used", "id": "services", "options": ["Consultation", "Support", "Product Purchase"] },
    { "type": "textarea", "label": "Additional Comments", "id": "comments" }
  ]
}


Registration Form

{
  "formTitle": "Event Registration",
  "formDescription": "Register for the upcoming event",
  "fields": [
    { "type": "text", "label": "First Name", "id": "firstName", "required": true },
    { "type": "text", "label": "Last Name", "id": "lastName", "required": true },
    { "type": "date", "label": "Date of Birth", "id": "dob" },
    { "type": "email", "label": "Email Address", "id": "email", "required": true }
  ]
}



Local Development Guide
Folder Structure

├── public
│   ├── index.html       # Main HTML file
│   └── ...
├── src
│   ├── components       # React components
│   ├── styles           # CSS/TailwindCSS styles
│   ├── tests            # Playwright and Jest test files
│   ├── App.js           # Main application component
│   └── ...
├── package.json         # Node.js dependencies and scripts
└── README.md            # Documentation


Available npm Scripts
Start the Development Server:
npm start


Run Tests:
npm test


Build the Project for Production:
npm run build


Testing
npx playwright install
npm test


Error Scenarios
Invalid JSON:
Displays an error message below the editor: Invalid JSON format.

Empty Field:
Displays an error on form submission if a required field is left empty.

Incorrect Field Types:
Displays an error for unsupported field types (e.g., invalidType).



Author
Developed by Sk Rafikul Islam.


# Deployed Site Name = zigment-assignment.netlify.app


