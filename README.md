# Mental Health Support Chatbot

This project is a **mental health support system** designed to aid individuals in understanding and validating their feelings. The chatbot is not intended to replace professional therapy or counseling but aims to provide a space where users can express themselves, get validation, and gain insights into their emotional state. It acts as a mediator to help people feel heard and acknowledged, while ensuring a safe and supportive interaction.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Ethical Considerations](#ethical-considerations)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **Mental Health Support Chatbot** is built using advanced Natural Language Processing (NLP) models fine-tuned on mental health conversation data. It provides empathetic responses and aims to foster a supportive environment for users who may want to express their emotions.

Key points:

- **Purpose**: Aid users in expressing and validating their emotions.
- **Disclaimer**: The chatbot is not a replacement for professional mental health services, but serves as an aid in emotional understanding and validation.

## Technologies Used

- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI (Python)
- **NLP Model**: Hugging Face's `DialoGPT` (or another transformer model fine-tuned for mental health dialogues)
- **Deployment**: FastAPI for backend API, React for frontend interface

## Features

- **Emotionally Aware Conversations**: Provides responses that are empathetic and contextually aware.
- **Continued Conversations**: The chatbot keeps track of the conversation context to ensure responses are meaningful across multiple interactions.
- **Interactive Frontend**: Built using React and Tailwind for an intuitive and user-friendly interface.
- **API Integration**: The chatbot is powered by a FastAPI backend that handles prompts and responses.
- **Non-judgmental Support**: The bot focuses on validation and understanding without offering medical advice or diagnoses.

## Architecture Overview

1. **Frontend**:
   - React + Tailwind for the user interface.
   - Chat interface allows users to type their prompts and get responses in real-time.
2. **Backend**:

   - FastAPI to handle incoming requests and communicate with the Hugging Face model.
   - The model processes the input text and generates a response based on the current and previous conversation context.

3. **NLP Model**:
   - Hugging Face transformer models (e.g., `DialoGPT` or a fine-tuned BERT/GPT model) handle text generation.
   - Continued conversation support by tracking previous exchanges.

### System Flow:

- User sends a message → Frontend forwards it to the backend → Backend passes it to the NLP model → NLP model generates a response → Backend returns the response to the frontend → Frontend displays the response to the user.

## Installation

### Prerequisites

- Python 3.8+
- Node.js and npm
- Hugging Face transformers library
- FastAPI
- Tailwind CSS

### Clone the repository

```bash
git clone https://github.com/yourusername/mental-health-chatbot.git
cd mental-health-chatbot
```

### Backend Setup (FastAPI + Hugging Face)

1. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

3. (Optional) Fine-tune the Hugging Face model:
   - You can either use a pre-trained conversational model or fine-tune your own on a mental health conversation dataset.

### Frontend Setup (React + Tailwind)

1. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

### API Integration

- Make sure the FastAPI server is running on `http://localhost:8000`, and the React app will communicate with it via `POST` requests to the `/chat` endpoint.

## Usage

1. **Starting the App**:

   - Open the React frontend at `http://localhost:3000`.
   - Type your prompt into the chat input field and submit it.
   - The chatbot will respond in real-time based on the conversation context.

2. **Backend**:
   - The backend handles the user input by passing it to the Hugging Face model and responding with generated text.
   - The chat maintains a conversation history to ensure context-aware responses.

## Ethical Considerations

- This chatbot is **not a replacement** for professional mental health services.
- It is important to make users aware of the limitations of the chatbot and provide resources for professional help when necessary.
- We recommend adding a disclaimer stating that the responses are not professional advice and suggest users seek professional mental health support for critical issues.

## Contributing

Contributions are welcome! If you would like to contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Submit a pull request for review.

Please ensure all changes align with the project's goal of providing empathetic, non-judgmental support.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
