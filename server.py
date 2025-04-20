from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

# -------------------------------------------------
# 10 items with required fields
# -------------------------------------------------
data = {
    "1": {
        "id": "1",
        "title": "The Intelligent Investor",
        "image": "https://images-na.ssl-images-amazon.com/images/I/91+t0Di07FL.jpg",
        "year": "1949",
        "summary": (
            "Considered the bible of investing, 'The Intelligent Investor' by Benjamin Graham "
            "introduces the concept of value investing. It emphasizes the importance of fundamental "
            "analysis, investor psychology, and long-term discipline over speculation. Graham's "
            "approach has influenced many successful investors, including Warren Buffett. "
            "It remains a must-read for those seeking to understand the stock market's ups and downs."
        ),
        "author": ["Benjamin Graham"],
        "rating": 9.2,
        "key_takeaways": [
            "Focus on intrinsic value rather than market speculation",
            "Margin of safety is crucial for investment decisions",
            "Emotional discipline is key to long-term success"
        ]
    },
    "2": {
        "id": "2",
        "title": "One Up on Wall Street",
        "image": "https://m.media-amazon.com/images/I/71pvFCvMM2L._SL1360_.jpg",
        "year": "1989",
        "summary": (
            "Peter Lynch shares his insights on how average investors can beat the pros by observing "
            "daily life and using that information to find winning stocks. He emphasizes a straightforward "
            "approach to investing that capitalizes on personal knowledge and experiences. With real-life "
            "anecdotes and practical tips, the book demystifies the stock market. It encourages readers "
            "to invest in what they know for long-term gains."
        ),
        "author": ["Peter Lynch"],
        "rating": 9.0,
        "key_takeaways": [
            "Invest in companies you understand",
            "Long-term holding outperforms short-term speculation",
            "Observe everyday trends for investment ideas"
        ]
    },
    "3": {
        "id": "3",
        "title": "Common Stocks and Uncommon Profits",
        "image": "https://m.media-amazon.com/images/I/61tzuAYGKqL._SL1500_.jpg",
        "year": "1958",
        "summary": (
            "Philip A. Fisher introduces the concept of investing in high-quality growth companies "
            "for extended periods. He outlines a 15-point checklist for evaluating a company's long-term "
            "prospects. The book emphasizes qualitative factors like management quality and product "
            "potential. Fisher's insights have significantly influenced modern growth investing strategies."
        ),
        "author": ["Philip A. Fisher"],
        "rating": 8.8,
        "key_takeaways": [
            "Look for long-term growth in high-quality companies",
            "Management strength is critical to success",
            "Conduct thorough research before investing"
        ]
    },
    "4": {
        "id": "4",
        "title": "A Random Walk Down Wall Street",
        "image": "https://m.media-amazon.com/images/I/51r8SHx7vSL.jpg",
        "year": "1973",
        "summary": (
            "Burton G. Malkiel argues that stock prices are largely unpredictable, recommending "
            "that investors buy and hold low-cost index funds. The book critiques technical analysis "
            "and stock-picking strategies, advocating a more passive approach. It provides an accessible "
            "overview of the efficient market hypothesis. Readers learn that patience and diversification "
            "often yield better outcomes than frequent trading."
        ),
        "author": ["Burton G. Malkiel"],
        "rating": 8.5,
        "key_takeaways": [
            "Markets are generally efficient and unpredictable",
            "Index funds often outperform managed funds",
            "Diversification is key to reducing risk"
        ]
    },
    "5": {
        "id": "5",
        "title": "The Little Book of Common Sense Investing",
        "image": "https://m.media-amazon.com/images/I/81vPxCvGMcL._AC_UY436_QL65_.jpg",
        "year": "2007",
        "summary": (
            "John C. Bogle, the founder of Vanguard, advocates for low-cost index investing as the "
            "simplest and most effective strategy. He provides evidence that high-fee mutual funds "
            "often underperform their benchmarks over time. The book encourages a disciplined, "
            "long-term approach to building wealth. Bogle's philosophy has shaped the modern investing "
            "landscape with a focus on cost efficiency."
        ),
        "author": ["John C. Bogle"],
        "rating": 8.7,
        "key_takeaways": [
            "Minimize fees to maximize returns",
            "Index funds outperform most active managers",
            "Stay the course with a long-term perspective"
        ]
    },
    "6": {
        "id": "6",
        "title": "The Warren Buffett Way",
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS1P6kzdFqStRrmT5S9ICjLSMMTVHSyObKxJhGb61HKh0OHVj5a5RB9f4IXvk3Rw9FrCspBayQ-8ZwIyHmrJPIFHfRDUkRXNWA-6z0aOaY",
        "year": "1994",
        "summary": (
            "Robert G. Hagstrom examines Warren Buffett's investment philosophies. The book details "
            "how Buffett zeroes in on undervalued companies with durable competitive advantages. It also "
            "highlights the importance of patience and rational thinking in achieving superior returns. "
            "Investors learn how to build and manage a stock portfolio for long-term success."
        ),
        "author": ["Robert G. Hagstrom"],
        "rating": 8.6,
        "key_takeaways": [
            "Focus on companies with sustainable competitive advantages",
            "Patience is crucial for compounding returns",
            "Avoid emotional decision-making"
        ]
    },
    "7": {
        "id": "7",
        "title": "Security Analysis",
        "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRK4YfXIh2Z0tRDQbTKyvzOPnsvonHJhMv-ymuhn4qRzh8tQPa0",
        "year": "1934",
        "summary": (
            "Written by Benjamin Graham and David Dodd, 'Security Analysis' lays the groundwork for "
            "modern value investing. They show how to evaluate financial statements to determine a "
            "company's intrinsic worth. With comprehensive case studies, the book explains why market "
            "price and underlying value often diverge. It remains a cornerstone reference for serious "
            "value investors worldwide."
        ),
        "author": ["Benjamin Graham", "David Dodd"],
        "rating": 9.1,
        "key_takeaways": [
            "Intrinsic value is separate from market price",
            "Deep fundamental analysis guides investment decisions",
            "Patience and discipline are indispensable"
        ]
    },
    "8": {
        "id": "8",
        "title": "Market Wizards",
        "image": "https://m.media-amazon.com/images/I/81BI5v5yBSL._AC_UY436_QL65_.jpg",
        "year": "1989",
        "summary": (
            "Jack D. Schwager interviews legendary traders and fund managers to uncover the secrets "
            "of their success. The book highlights diverse styles, from technical analysis to fundamental "
            "strategies, proving multiple paths can be profitable. Each interview reveals personal risk "
            "management techniques and psychological insights. The collection teaches discipline, "
            "adaptability, and self-awareness."
        ),
        "author": ["Jack D. Schwager"],
        "rating": 8.2,
        "key_takeaways": [
            "Various trading strategies can be successful",
            "Risk management is essential to longevity",
            "Self-awareness and adaptability lead to better decisions"
        ]
    },
    "9": {
        "id": "9",
        "title": "The Psychology of Money",
        "image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
        "year": "2020",
        "summary": (
            "Morgan Housel explores the behavioral aspects of personal finance and investing. "
            "Using real-life stories, he explains how emotions, biases, and experiences shape "
            "financial decisions. The book emphasizes that wealth creation is less about technical "
            "knowledge and more about consistently good habits. Readers learn the importance of "
            "humility, patience, and flexibility in achieving financial security."
        ),
        "author": ["Morgan Housel"],
        "rating": 9.0,
        "key_takeaways": [
            "Behavior plays a critical role in financial outcomes",
            "Small habits compound over time",
            "Flexibility and humility help navigate market volatility"
        ]
    },
    "10": {
        "id": "10",
        "title": "Rich Dad Poor Dad",
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b9/Rich_Dad_Poor_Dad.jpg",
        "year": "1997",
        "summary": (
            "Robert T. Kiyosaki contrasts the financial philosophies he learned from two father "
            "figures in his life. The book underscores the difference between working for money "
            "versus letting money work for you through investments. It also highlights the value "
            "of financial education and generating passive income streams. Over time, these lessons "
            "become pivotal in achieving wealth and financial independence."
        ),
        "author": ["Robert T. Kiyosaki"],
        "rating": 8.0,
        "key_takeaways": [
            "Focus on building assets over expenses",
            "Financial education is critical to success",
            "Create multiple income streams for security"
        ]
    }
}

# -------------------------------------------------
# 2) ROUTES
# -------------------------------------------------

@app.route("/")
def home():
    """Render homepage (home.html)."""
    return render_template("home.html")


@app.route("/introduction")
def introduction():
    """Render the Introduction page."""
    return render_template("introduction.html")


@app.route("/introduction/part2")
def introduction_part2():
    """Render the second part of the Introduction page."""
    return render_template("introduction_part2.html")


@app.route("/preparation")
def preparation():
    """Render the Preparation page."""
    return render_template("preparation.html")

@app.route("/examples")
def examples():
    """Render the Examples page."""
    return render_template("examples.html")

@app.route("/quiz")
def quiz():
    """Render the Quiz page."""
    return render_template("quiz.html")

# -------------------------------------------------
# Launch
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)


