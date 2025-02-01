from flask import Flask, request, jsonify
import openai

# Initialize the Flask app
app = Flask(__name__)

# Set up OpenAI API key
openai.api_key = "your_openai_api_key_here"  # Replace with your OpenAI API key

@app.route('/chat', methods=['POST'])
def chat_with_gpt():
    # Get the user's message from the request
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "Message content is empty!"}), 400

    try:
        # Send the user's message to the GPT API
        response = openai.Completion.create(
            engine="text-davinci-003",  # Use text-davinci-003 for GPT-3.5 or GPT-4 (if available)
            prompt=f"You are an AI assistant. {user_input}",
            max_tokens=150,
            temperature=0.7,
        )

        # Extract GPT's response
        bot_reply = response.choices[0].text.strip()

        # Send the response back to the front-end
        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)