import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline


class TinyLlamaModel:
    def __init__(self):
        # self.model_id = "mradermacher/TinyLlama-Friendly-Psychotherapist-GGUF"
        self.model_id = r"D:\TY\mental-health-chatbot\backend\app\saved_models"
        self.filename = r"TinyLlama-Friendly-Psychotherapist.f16.gguf"
        # self.tokenizer = AutoTokenizer.from_pretrained(self.model_id, gguf_file=self.filename, local_files_only=True)
        self.tokenizer = AutoTokenizer.from_pretrained(f"{self.model_id}\\saved_tokenizer")
        self.model = AutoModelForCausalLM.from_pretrained(self.model_id,gguf_file=self.filename, local_files_only=True)
        
         # Creating the pipeline for chat-like interaction
        self.pipe = pipeline("text-generation", model=self.model, tokenizer=self.tokenizer)

    def generate_response(self, prompt):
        system_message = {
            "role": "system",
            "content": "You are a supportive and understanding chatbot designed to provide assistance and information related to mental health. Always strive to be helpful, informative, and respectful in your responses."
        }

        # Building the chat history with system message, user prompt, and assistant role for prefill
        chat_history = [
            system_message,
            {"role": "user", "content": prompt},
            # {"role": "assistant", "content": ""}  # Placeholder for assistant response
        ]


        # self.tokenized_chat = self.tokenizer.apply_chat_template(chat_history, chat_template="TinyLlama-1.1B-32k", tokenize=True, add_generation_prompt=True, return_tensors="pt")
        
        # outputs = self.model.generate(self.tokenized_chat, max_new_tokens=128) 

        # Using the pipeline to generate response based on the chat history
        response = self.pipe(chat_history, max_length=1024, return_tensors="pt")["generated_text"][-1]
        # assistant_response = self.tokenizer.decode(response, skip_special_tokens=True)

        # return assistant_response
        return response
        # return self.tokenizer.decode(outputs[0])