# cd backend
# source venv/bin/activate
# python3 server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

@app.route('/run-script', methods=['POST'])
def run_script():
    address = request.json.get("address")
  
    try:
        # Run address_search.py with input_value and capture output
        result = subprocess.run(["python3", "address_search.py", address], capture_output=False, text=True)

        return jsonify({"output": result.stdout, "error": result.stderr}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
