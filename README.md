# 🕵️‍♂️ Hidden Pixels

**Hidden Pixels** is a cryptography toolkit that lets users securely hide messages within images (steganography) and encrypt files using modern encryption algorithms like AES and 3DES. Built for privacy enthusiasts, students, and developers interested in applied cryptography.

---

## ✨ Features

- 🔐 **Steganography**
  - Embed secret messages inside PNG images
  - Extract hidden messages from stego-images
  - Adjustable start bit and interval for added complexity

- 🧱 **File Encryption**
  - AES (128, 192, 256-bit) encryption & decryption
  - 3DES encryption & decryption
  - Secure IV handling and download-ready files

- 🧑‍💻 **User Authentication**
  - Sign up / log in via Supabase & NextAuth.js
  - Access tools securely with authenticated sessions

- 🌐 **Full Stack Architecture**
  - Frontend: Next.js (TypeScript)
  - Backend: Python (Flask)
  - Auth + Storage: Supabase
  - Deployment: Vercel (Frontend), PythonAnywhere/Fly.io/etc. (Backend)

---

## 🛠 Tech Stack

| Layer       | Tech                          |
|------------|-------------------------------|
| Frontend    | Next.js (TypeScript)          |
| Backend     | Flask (Python)                |
| Auth        | Supabase + NextAuth.js        |
| Storage     | Supabase Storage              |
| Crypto      | Python `cryptography`, `pycryptodome` |
| Hosting     | Vercel (frontend), TBD (backend) |

---

## 📦 Installation

### 🔧 Backend (Flask API)

```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python index.py


cd app
npm install
npm run dev



📂 API Endpoints

🔍 Steganography

Route	Method	Description
/api/embedImage	POST	Embed a message in an image
/api/extract	POST	Extract hidden message from image
🔒 Encryption

Route	Method	Description
/encrypt/aes	POST	Encrypt file with AES
/decrypt/aes	POST	Decrypt AES-encrypted file
/encrypt/3des	POST	Encrypt file with 3DES
/decrypt/3des	POST	Decrypt 3DES-encrypted file
🧪 Usage (Example with Postman)

Embed Image
POST /api/embedImage
Form Data:
carrier: (image file)
message: "Secret message"
start_bit: 2048
period: 8
Returns:

output_image: Modified image with embedded message
🚧 Roadmap

 Add RSA encryption support
 Drag-and-drop UI

🧠 Credits

Built by Omer Khan to combine cryptography and creative design.
