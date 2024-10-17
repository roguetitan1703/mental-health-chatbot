from langchain_huggingface.llms import HuggingFacePipeline
from transformers import AutoTokenizer, pipeline
import torch

class TinyLlamaChatbot:
    def __init__(self):

        # Wrap the pipeline using HuggingFacePipeline for LangChain
        self.llm = HuggingFacePipeline.from_model_id(
            model_id="gpt2",
            task="text-generation",
            pipeline_kwargs={"max_new_tokens": 10},
        )

    def generate_response(self, prompt):
        # Use the LangChain pipeline to generate a response
        
        # response = self.llm(prompt)
        response = self.llm.invoke(prompt)
        
        return response

if __name__ == "__main__":
    chatbot = TinyLlamaChatbot()
    user_prompt = "I'm feeling stressed lately."
    response = chatbot.generate_response(user_prompt)
    print(response)
