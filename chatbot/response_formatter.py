import re


def format_response(text):

    if not text:
        return "No response generated."

    # Convert headings to Markdown
    headings = [
        "Definition",
        "Explanation",
        "Example",
        "Best Practices",
        "Prevention",
        "Immediate Actions",
        "Recovery Steps",
        "Recommendations",
        "Warning",
        "Conclusion" 
    ]

    for heading in headings:
        text = re.sub(
            rf"(?im)^{heading}\s*:?",
            f"**{heading}**",
            text
        )

    # Remove extra blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Remove leading/trailing spaces
    text = text.strip()

    return text