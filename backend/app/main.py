from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import TinyLlamaChatbot
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

# Create the FastAPI app
app = FastAPI()

# Allow requests from your React frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your React frontend's origin
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize the chatbot model
chatbot_model = TinyLlamaChatbot()

# Define a data model for the incoming request
class RequestBody(BaseModel):
    message: str

@app.post("/get-response/")
async def get_response(body: RequestBody):
    try:
        # Validate if the input message is not empty
        if not body.message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Generate a response using the chatbot model
        prompt = body.message
        response = chatbot_model.generate_response(prompt)

        # Return a successful response with status code 200
        return JSONResponse(status_code=200, content={"response": response})

    except HTTPException as e:
        # Re-raise HTTP exceptions to preserve their status codes and details
        raise e

    except Exception as e:
        # Return a 500 status code for any other server error
        print(f"Error generating response: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)