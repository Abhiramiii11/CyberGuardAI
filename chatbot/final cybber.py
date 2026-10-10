CYBERSECURITY_KEYWORDS = [

    "cybersecurity",
    "cyber security",
    "security",
    "ethical hacking",
    "hacking",
    "malware",
    "virus",
    "worm",
    "trojan",
    "ransomware",
    "spyware",
    "adware",
    "rootkit",
    "botnet",
    "phishing",
    "smishing",
    "vishing",
    "spoofing",
    "ddos",
    "dos",
    "firewall",
    "vpn",
    "encryption",
    "password",
    "authentication",
    "authorization",
    "2fa",
    "mfa",
    "sql injection",
    "xss",
    "csrf",
    "owasp",
    "nist",
    "mitre",
    "vulnerability",
    "exploit",
    "patch",
    "cve",
    "penetration testing",
    "pentest",
    "network security",
    "cloud security",
    "web security",
    "api security",
    "linux security",
    "windows security",
    "digital forensics",
    "incident response",
    "soc",
    "siem",
    "ids",
    "ips",
    "zero trust",

    "gmail",
    "email",
    "google account",
    "whatsapp",
    "instagram",
    "facebook",
    "telegram",
    "twitter",
    "linkedin",

    "wifi",
    "wi-fi",
    "router",
    "internet",
    "browser",

    "phone",
    "mobile",
    "laptop",
    "computer",
    "device",

    "hack",
    "hacked",
    "compromised",
    "breach",
    "leak",
    "stolen",
    "scam",
    "fraud",
    "spam",
    "fake",
    "otp",
    "link",
    "password",
    "account",
    "login",
    "suspicious"
]


GREETINGS = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening"
]


SMALL_TALK = [
    "thanks",
    "thank you",
    "bye",
    "goodbye",
    "who are you",
    "help",
    "what can you do"
]


def is_greeting(message):
    return message.lower().strip() in GREETINGS


def is_small_talk(message):
    return message.lower().strip() in SMALL_TALK


def is_cybersecurity_query(message):

    message = message.lower()

    return any(keyword in message for keyword in CYBERSECURITY_KEYWORDS)