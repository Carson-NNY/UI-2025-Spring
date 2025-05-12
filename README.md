# Master the rule of thirds in 10 minutes

This project is a Flask-based web application that provides a tutorial on the rule of thirds in photography.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/4d5cbd4d-6fbf-4b01-afdd-336fad622d14" />

## Setup and Installation

### Prerequisites

*   Python 3.8 or newer
*   `pip` (Python package installer)
*   `venv` (Python virtual environment module, usually included with Python)

### Steps

1.  **Clone the repository (if applicable):**
    ```bash
    git clone git@github.com:Carson-NNY/UI-2025-Spring.git
    cd UI-2025-Spring
    ```

2.  **Create and activate a virtual environment:**
    It's highly recommended to use a virtual environment to manage project dependencies.

    *   On macOS and Linux:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
    *   On Windows:
        ```bash
        python -m venv venv
        .\venv\Scripts\activate
        ```
    You should see `(venv)` at the beginning of your terminal prompt, indicating that the virtual environment is active.

3.  **Install dependencies:**
    With the virtual environment activated, install the required packages from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

1.  **Ensure your virtual environment is active.** If not, reactivate it using the commands in step 2 of the setup.

2.  **Run the Flask development server:**
    ```bash
    python server.py
    ```

3.  **Open your web browser** and navigate to `http://127.0.0.1:5000/`.

    The application will be running in debug mode, which means it will automatically reload if you make changes to the code.

## Website URL Structure

The website provides a step-by-step tutorial on photography concepts. Here's a basic overview of the URL structure:

*   `/`: **Homepage** - Introduction to the tutorial.
*   `/introduction`: **Introduction** - Detailed explanation of the rule of thirds.
*   `/preparation`: **Preparation** - How to set up grid lines on your camera/phone.
*   `/examples`: **Examples Main Page** - Overview of rule of thirds examples.
    *   `/examples/example1`: Specific example 1.
    *   `/examples/example2`: Specific example 2.
    *   `/examples/example3`: Specific example 3.
    *   `/examples/example4`: Specific example 4 (e.g., breaking the rule).
*   `/quiz`: **Quiz Main Page** - Introduction to the quiz.
    *   `/quiz2`: Quiz question page 2.
    *   `/quiz3`: Quiz question page 3.
    *   `/quiz4`: Quiz question page 4.
    *   `/quiz5`: Quiz question page 5.
    *   `/quiz/result`: **Quiz Result Page** - Shows the user's quiz score.

## Deactivating the Virtual Environment

When you're finished working on the project, you can deactivate the virtual environment:
```bash
deactivate
``` 
