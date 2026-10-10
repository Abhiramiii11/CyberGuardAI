import os

from groq import Groq
from dotenv import load_dotenv

from chatbot.prompt import SYSTEM_PROMPT
from chatbot.guardrails import (
    is_cybersecurity_query,
    is_greeting,
    is_small_talk
)
from chatbot.response_formatter import format_response

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_response(user_message):

    try:

        if is_greeting(user_message):
            return "Hello! I'm CyberGuard AI. How can I help you with cybersecurity today?"

        if is_small_talk(user_message):

            msg = user_message.lower().strip()

            if msg in ["thanks", "thank you"]:
                return "You're welcome! Stay safe online."

            if msg in ["bye", "goodbye"]:
                return "Goodbye! Stay safe."

            if msg == "who are you":
                return "I'm CyberGuard AI, your cybersecurity assistant."

            if msg in ["help", "what can you do"]:
                return (
                    "I can answer questions related to cybersecurity, "
                    "hacked Gmail, hacked WhatsApp, phishing, malware, "
                    "network security, cloud security, OWASP, NIST, "
                    "password security and more."
                )

        if not is_cybersecurity_query(user_message):
            return "I'm CyberGuard AI. Please ask only cybersecurity-related questions."


        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            temperature=0.3,
            max_tokens=1024
        )

        answer = response.choices[0].message.content

        return format_response(answer)

    except Exception as e:
        return f"Error: {str(e)}"