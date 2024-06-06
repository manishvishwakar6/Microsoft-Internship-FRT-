//Chat Page

const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');

// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Function to display messages in the chatbox
function displayMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to send a message to the OpenAI API and display the response
async function sendMessage(message) {
    displayMessage(message, true);
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    if (!response.ok) {
        displayMessage(`Error: Received status ${response.status} ${response.statusText}`, true);
        return;
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    displayMessage(botMessage, false);
}

// Send message when the chat form is submitted
chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message.length > 0) {
        sendMessage(message);
        messageInput.value = '';
    }
});

/****************************Post *************************/

const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
const previewContainer = document.getElementById('preview');
const createPostcardButton = document.getElementById('create-postcard');
const postcardContainer = document.getElementById('postcard-container');
const postcardTitle = document.getElementById('postcard-title');
const postcardImage = document.getElementById('postcard-image');

imageInput.addEventListener('change', (e) => {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;
        const img = document.createElement('img');
        img.src = imageData;
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
});

createPostcardButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const image = previewContainer.querySelector('img').src;
    postcardTitle.textContent = title;
    postcardImage.src = image;
    postcardContainer.style.display = 'block';
});


/**************************** Notes *************************/

$(document).ready(function() {
	// Handle form submission
	$("#syllabusForm").submit(function(event) {
	  event.preventDefault();
  
	  // Get form values
	  var department = $("#department").val();
	  var semester = $("#semester").val();
	  var subject = $("#subject").val();
	  var code = $("#code").val();
  
	  // Create a JSON object to send to the server
	  var formData = {
		department: department,
		semester: semester,
		subject: subject,
		code: code
	  };
  
	  // Send a POST request to the server to download the syllabus
	  $.ajax({
		type: "POST",
		url: "downloadSyllabus.php", // Replace with your server-side script
		data: formData,
		success: function(response) {
			
		  // Handle response from server
		  console.log(response);
		  // Download the syllabus file
		  var blob = new Blob([response], { type: "application/pdf" });
		  var link = document.createElement("a");
		  link.href = URL.createObjectURL(blob);
		  link.download = "Syllabus_" + department + "_" + semester + "_" + subject + ".pdf";
		  link.click();
		},
		error: function(xhr, status, error) {
		  console.log("Error: " + error);
		}
	  });
	    });
    });




    