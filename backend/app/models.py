import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline


class TinyLlamaModel:
    def __init__(self):
        # self.model_id = "mradermacher/TinyLlama-Friendly-Psychotherapist-GGUF"
        self.model_id = r"D:\TY\mental-health-chatbot\backend\app\saved_models"
        self.filename = r"TinyLlama-Friendly-Psychotherapist.f16.gguf"
        
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_id, gguf_file=self.filename, local_files_only=True)
        self.tokenizer.save_pretrained(f"{self.model_id}/saved_tokenizer")
        self.model = AutoModelForCausalLM.from_pretrained(self.model_id,gguf_file=self.filename,  local_files_only=True)
        

    def generate_response(self, prompt):
        inputs = self.tokenizer(prompt, return_tensors="pt")
        outputs = self.model.generate(**inputs)
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response