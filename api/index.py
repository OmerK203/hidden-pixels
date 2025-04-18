import os
from flask import Flask, request, send_file, jsonify
from werkzeug.utils import secure_filename

from utils import aes_utils, hash_utils, rsa_utils
from steganography import embed_message, extract_message

app = Flask(__name__)
UPLOAD_FOLDER = 'api/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- Steganography ---

@app.route('/api/embedImage', methods=['POST'])
def api_embed():
    carrier = request.files.get('carrier')
    message = request.files.get('message')
    start_bit = int(request.form.get('start_bit', 0))
    period = int(request.form.get('period', 1))
    mode = request.form.get('mode', '')

    if not carrier or not message:
        return jsonify({"error": "carrier and message files are required"}), 400

    carrier_path = os.path.join(UPLOAD_FOLDER, secure_filename(carrier.filename))
    message_path = os.path.join(UPLOAD_FOLDER, secure_filename(message.filename))
    output_path = os.path.join(UPLOAD_FOLDER, 'embedded_' + secure_filename(carrier.filename))

    carrier.save(carrier_path)
    message.save(message_path)

    embed_message(carrier_path, message_path, output_path, start_bit, period, mode)

    return send_file(output_path, as_attachment=True)


@app.route('/api/extractImage', methods=['POST'])
def api_extract():
    carrier = request.files.get('carrier')
    if not carrier:
        return jsonify({"error": "carrier file is required"}), 400

    start_bit = int(request.form.get('start_bit', 0))
    period = int(request.form.get('period', 1))
    mode = request.form.get('mode', '')
    message_length = int(request.form.get('message_length', 0) or 0)

    carrier_path = os.path.join(UPLOAD_FOLDER, secure_filename(carrier.filename))
    carrier.save(carrier_path)

    output_path = extract_message(carrier_path, start_bit, period, message_length, mode)
    return send_file(output_path, as_attachment=True)


# --- AES ---

@app.route("/encrypt/aes", methods=["POST"])
def encrypt_aes():
    file = request.files.get("file")
    password = request.form.get("password")
    if not file or not password:
        return jsonify({"error": "file and password are required"}), 400

    key_size = int(request.form.get("key_size", 128))
    mode = request.form.get("mode", "CBC")

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    output_path, iv = aes_utils.encrypt_file(file_path, password, key_size, mode)
    return jsonify({
        "download_url": f"/download/{os.path.basename(output_path)}",
        "iv": iv.hex()
    })


@app.route("/decrypt/aes", methods=["POST"])
def decrypt_aes():
    file = request.files.get("file")
    password = request.form.get("password")
    iv_hex = request.form.get("iv")

    if not file or not password or not iv_hex:
        return jsonify({"error": "file, password, and iv are required"}), 400

    key_size = int(request.form.get("key_size", 128))
    mode = request.form.get("mode", "CBC")
    iv = bytes.fromhex(iv_hex)

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    output_path = aes_utils.decrypt_file(file_path, password, key_size, iv, mode)
    return send_file(output_path, as_attachment=True)


# --- Hashing ---

@app.route("/hash", methods=["POST"])
def hash_file():
    file = request.files.get("file")
    algorithm = request.form.get("algorithm", "sha256")

    if not file:
        return jsonify({"error": "file is required"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    hash_val = hash_utils.hash_file(file_path, algorithm)
    return jsonify({"hash": hash_val})


# --- RSA ---

@app.route("/encrypt/rsa", methods=["POST"])
def rsa_encrypt():
    file = request.files.get("file")
    pub_key = request.form.get("public_key")

    if not file or not pub_key:
        return jsonify({"error": "file and public_key are required"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    encrypted_path = rsa_utils.encrypt_file(file_path, pub_key)
    return send_file(encrypted_path, as_attachment=True)


@app.route("/decrypt/rsa", methods=["POST"])
def rsa_decrypt():
    file = request.files.get("file")
    priv_key = request.form.get("private_key")

    if not file or not priv_key:
        return jsonify({"error": "file and private_key are required"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    decrypted_path = rsa_utils.decrypt_file(file_path, priv_key)
    return send_file(decrypted_path, as_attachment=True)


# --- Optional: File Downloader Endpoint ---
@app.route("/download/<filename>")
def download_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    return send_file(file_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, port=5328)
