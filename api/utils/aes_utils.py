
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2
import os

def pad(data):
    padding_len = 16 - len(data) % 16
    return data + bytes([padding_len]) * padding_len

def unpad(data):
    return data[:-data[-1]]

def encrypt_file(path, password, key_size=128, mode="CBC"):
    with open(path, 'rb') as f:
        data = f.read()

    salt = get_random_bytes(16)
    key = PBKDF2(password, salt, dkLen=key_size // 8)
    iv = get_random_bytes(16)

    if mode == "CBC":
        cipher = AES.new(key, AES.MODE_CBC, iv)
        ciphertext = cipher.encrypt(pad(data))
    elif mode == "GCM":
        cipher = AES.new(key, AES.MODE_GCM, nonce=iv)
        ciphertext, tag = cipher.encrypt_and_digest(data)
    else:
        raise ValueError("Unsupported AES mode")

    out_path = path + ".aes"
    with open(out_path, 'wb') as f:
        f.write(salt + iv + ciphertext)
    return out_path, iv

def decrypt_file(path, password, key_size=128, iv=None, mode="CBC"):
    with open(path, 'rb') as f:
        salt = f.read(16)
        actual_iv = f.read(16)
        data = f.read()

    key = PBKDF2(password, salt, dkLen=key_size // 8)

    if mode == "CBC":
        cipher = AES.new(key, AES.MODE_CBC, actual_iv)
        plaintext = unpad(cipher.decrypt(data))
    elif mode == "GCM":
        cipher = AES.new(key, AES.MODE_GCM, nonce=actual_iv)
        plaintext = cipher.decrypt(data)  # No tag verification here
    else:
        raise ValueError("Unsupported AES mode")

    out_path = path + ".decrypted"
    with open(out_path, 'wb') as f:
        f.write(plaintext)
    return out_path
