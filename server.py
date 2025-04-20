from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

# -------------------------------------------------
# Photography tutorial data
# -------------------------------------------------
tutorial_data = {
    "home": {
        "title": "Master the Rule of Thirds in 10 Minutes!",
        "button_text": "Start Lesson",
        "button_link": "introduction"
    },
    "introduction": {
        "sections": [
            {
                "id": "intro_1",
                "content": "Do you ever look at a photo and wonder why it's so pleasing to the eye? Often, you'll find that the photographer used the rule of thirds.",
                "has_drop_cap": True
            },
            {
                "id": "intro_2",
                "content": "This compositional technique is one of the most important fundamentals of photography — and, bonus, it's also one of the easiest to learn and apply. Keep reading to find out how the rule of thirds can help you take better photos.",
                "has_drop_cap": False
            }
        ],
        "next_button": {
            "text": "NEXT: What is the rule of thirds?",
            "link": "introduction_part2"
        }
    },
    "introduction_part2": {
        "sections": [
            {
                "id": "intro_part2_1",
                "content": "The rule of thirds is one of the most well-known compositional techniques in photography. It involves dividing an image into thirds, both horizontally and vertically, to create a grid of nine equal parts.",
                "has_drop_cap": False
            },
            {
                "id": "intro_part2_2",
                "content": "It requires the photographer to place the main subject or focal point of the photo along these lines or their intersections - helping to create more balanced and eye-catching compositions.",
                "has_drop_cap": False
            }
        ],
        "image": {
            "src": "images/intro_img.jpg",
            "alt": "Rule of thirds example",
            "class": "image-example grid-example"
        },
        "next_button": {
            "text": "NEXT: How to make grid lines",
            "link": "preparation"
        }
    },
    "preparation": {
        "steps": [
            {
                "id": "prep_step_1",
                "title": "1. Use your brain",
                "content": "Mentally divide your image into thirds, both horizontally and vertically, and place your subject accordingly."
            },
            {
                "id": "prep_step_2",
                "title": "2. Use the grid on your camera/phone viewfinder",
                "content": "Most cameras have a grid overlay that you can use to compose your images using the rule of thirds. Easy peasy."
            }
        ],
        "videos": [
            {
                "id": "video_1",
                "src": "https://www.youtube.com/embed/IC2YC-ThzMg",
                "caption": "Set grid on Camera"
            },
            {
                "id": "video_2",
                "src": "https://www.youtube.com/embed/mVvZU_w5Vr4",
                "caption": "Set grid on iPhone"
            }
        ],
        "next_button": {
            "text": "NEXT: How to apply the rule of thirds",
            "link": "examples"
        }
    },
    "examples": {
        "title": "Rule of Thirds Examples",
        "content": "Here you'll find inspiring examples of photographs that effectively use the rule of thirds.",
        "placeholder": "Example gallery will be added in future updates."
    },
    "quiz": {
        "title": "Test Your Knowledge",
        "content": "Take this quiz to test your understanding of the rule of thirds and compositional techniques.",
        "placeholder": "Quiz questions will be added in future updates."
    }
}


# -------------------------------------------------
# 2) ROUTES
# -------------------------------------------------

@app.route("/")
def home():
    """Render homepage (home.html)."""
    return render_template("home.html", page_data=tutorial_data["home"])


@app.route("/introduction")
def introduction():
    """Render the Introduction page."""
    return render_template("introduction.html", page_data=tutorial_data["introduction"])


@app.route("/introduction/part2")
def introduction_part2():
    """Render the second part of the Introduction page."""
    return render_template("introduction_part2.html", page_data=tutorial_data["introduction_part2"])


@app.route("/preparation")
def preparation():
    """Render the Preparation page."""
    return render_template("preparation.html", page_data=tutorial_data["preparation"])

@app.route("/examples")
def examples():
    """Render the Examples page."""
    return render_template("examples.html", page_data=tutorial_data["examples"])

@app.route("/quiz")
def quiz():
    """Render the Quiz page."""
    return render_template("quiz.html", page_data=tutorial_data["quiz"])

# -------------------------------------------------
# Launch
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)


