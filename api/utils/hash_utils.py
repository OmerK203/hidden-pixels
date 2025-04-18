import hashlib

def hash_file(file_path, algorithm='sha256'):
    hash_func = getattr(hashlib, algorithm, None)
    if not hash_func:
        raise ValueError(f"Unsupported hash algorithm: {algorithm}")

    hasher = hash_func()
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

