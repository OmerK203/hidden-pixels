from Crypto.Cipher import DES3
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2


def pad(data):
    padding_len = 8 - len(data) % 8
    return data + bytes([padding_len]) * padding_len

def unpad(data):
    return data[:-data[-1]]

def encrypt_file(path, password):
    with open(path, 'rb') as f:
        data = f.read()

    salt = get_random_bytes(8)
    key = PBKDF2(password, salt, dkLen=24)  # 3DES key must be 24 bytes
    iv = get_random_bytes(8)

    cipher = DES3.new(key, DES3.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(data))

    out_path = path + '.3des'
    with open(out_path, 'wb') as f:
        f.write(salt + iv + ciphertext)
    return out_path, iv

def decrypt_file(path, password):
    with open(path, 'rb') as f:
        salt = f.read(8)
        iv = f.read(8)
        data = f.read()

    key = PBKDF2(password, salt, dkLen=24)
    cipher = DES3.new(key, DES3.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(data))

    out_path = path + '.decrypted'
    with open(out_path, 'wb') as f:
        f.write(plaintext)
    return out_path
