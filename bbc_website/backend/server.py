# source venv/bin/activate
# python3 server.py

from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/run-script', methods=['POST'])
def run_script():
    address = request.json.get("address")
    try:
        result = subprocess.run(['python3', 'address_search.py', address], capture_output=False, text=True)
        print("Script executed")
        return jsonify({'output': result.stdout, 'error': result.stderr}), 200
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
