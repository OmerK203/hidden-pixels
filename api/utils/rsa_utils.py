from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding

def encrypt_file(file_path, public_key_pem):
    public_key = serialization.load_pem_public_key(public_key_pem.encode())
    with open(file_path, 'rb') as f:
        data = f.read()

    ciphertext = public_key.encrypt(
        data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    encrypted_path = file_path + '.rsa'
    with open(encrypted_path, 'wb') as f:
        f.write(ciphertext)
    return encrypted_path

def decrypt_file(file_path, private_key_pem):
    private_key = serialization.load_pem_private_key(private_key_pem.encode(), password=None)
    with open(file_path, 'rb') as f:
        ciphertext = f.read()

    plaintext = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    decrypted_path = file_path + '.decrypted'
    with open(decrypted_path, 'wb') as f:
        f.write(plaintext)
    return decrypted_path
