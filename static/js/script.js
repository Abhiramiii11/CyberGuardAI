// ==============================
// ELEMENTS
// ==============================

const chatBox = document.getElementById("chat-box");
const sendButton = document.getElementById("send-btn");
const voiceButton = document.getElementById("voice-btn");
const userInput = document.getElementById("user-input");
const newChatButton = document.querySelector(".new-chat");
const themeToggle = document.getElementById("theme-toggle");

const suggestionButtons =
document.querySelectorAll(".suggestion-btn");

const toolButtons =
document.querySelectorAll(".tool-card");

// ==============================
// THEME
// ==============================

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-mode");
    themeToggle.innerHTML="☀️ Light Mode";

}else{

    themeToggle.innerHTML="🌙 Dark Mode";

}

themeToggle.onclick=()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");
        themeToggle.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");
        themeToggle.innerHTML="🌙 Dark Mode";

    }

};

// ==============================
// TIME
// ==============================

function getTime(){

    return new Date().toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });

}

// ==============================
// ADD MESSAGE
// ==============================

function addMessage(sender,message){

    const msg=document.createElement("div");

    msg.className=

        sender==="user"

        ? "user-message"

        : "bot-message";

    if(sender==="bot"){

        msg.innerHTML=marked.parse(message);

    }else{

        msg.textContent=message;

    }

    const time=document.createElement("div");

    time.className="message-time";

    time.innerHTML=getTime();

    msg.appendChild(time);

    chatBox.appendChild(msg);

    chatBox.scrollTop=chatBox.scrollHeight;

    return msg;

}
// ==============================
// SEND MESSAGE
// ==============================

async function sendMessage(){

    const message = userInput.value.trim();

    if(message==="") return;

    addMessage("user",message);

    userInput.value="";

    const loading=addMessage(

        "bot",

        "⏳ **CyberGuard AI is analyzing your request...**"

    );

    try{

        const response=await fetch("/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        const data=await response.json();

        loading.innerHTML=marked.parse(data.response);

        const time=document.createElement("div");

        time.className="message-time";

        time.innerHTML=getTime();

        loading.appendChild(time);

        const copy=document.createElement("button");

        copy.className="copy-btn";

        copy.innerHTML="📋 Copy";

        copy.onclick=()=>{

            navigator.clipboard.writeText(

                loading.innerText

            );

            copy.innerHTML="✅ Copied";

            setTimeout(()=>{

                copy.innerHTML="📋 Copy";

            },1500);

        };

        loading.appendChild(copy);

        chatBox.scrollTop=chatBox.scrollHeight;

    }

    catch(error){

        loading.innerHTML=`

        <strong>⚠ Unable to connect to CyberGuard AI.</strong>

        <br><br>

        Please check your backend server and try again.

        <div class="message-time">

            ${getTime()}

        </div>

        `;

    }

}
// ==============================
// VOICE INPUT
// ==============================

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceButton.onclick = ()=>{

        recognition.start();

    };

    recognition.onresult = (event)=>{

        userInput.value =
        event.results[0][0].transcript;

        userInput.focus();

    };

}else{

    voiceButton.style.display="none";

}


// ==============================
// SUGGESTED QUESTIONS
// ==============================

suggestionButtons.forEach(btn=>{

    btn.onclick=()=>{

        userInput.value = btn.innerText;

        sendMessage();

    };

});

// ==============================
// QUICK TOOLS
// ==============================

toolButtons.forEach(tool=>{

    tool.onclick=()=>{

        const text = tool.innerText;

        if(text.includes("URL")){

            userInput.value =
            "Check whether this URL is safe:";

        }

        else if(text.includes("Password")){

            userInput.value =
            "Check the strength of my password:";

        }

        else if(text.includes("News")){

            userInput.value =
            "Show me today's cybersecurity news.";

        }

        userInput.focus();

    };

});

// ==============================
// NEW CHAT
// ==============================

function newChat(){

    chatBox.innerHTML = `

    <div class="bot-message">

        <h3>👋 Welcome!</h3>

        <p>

        I'm <strong>CyberGuard AI</strong>,
        your AI-powered cybersecurity assistant.

        </p>

        <p>

        Ask me anything related to cybersecurity.

        </p>

        <div class="message-time">

        ${getTime()}

        </div>

    </div>

    `;

    userInput.value="";

    userInput.focus();

}

newChatButton.onclick = newChat;

// ==============================
// EVENTS
// ==============================

sendButton.onclick = sendMessage;

userInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

// ==============================
// SHORTCUT
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key.toLowerCase()==="l"){

        e.preventDefault();

        newChat();

    }

});

// ==============================
// PAGE LOAD
// ==============================

window.onload=()=>{

    userInput.focus();

};