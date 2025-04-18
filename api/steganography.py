# def embed_message(carrier_file_path, message_file_path, output_file_path, start_bit, period, mode=None):
#     with open(carrier_file_path, 'rb') as carrier_file:
#         carrier_data = bytearray(carrier_file.read())
#     with open(message_file_path, 'rb') as message_file:
#         message_data = message_file.read()
#
#     message_bits = ''.join(f'{byte:08b}' for byte in message_data)
#     message_length = len(message_bits)
#
#     bit_index = 0
#     mode_index = 0
#     mode_values = [int(x) for x in mode.split(',')] if mode else [period]
#
#     for i in range(start_bit, len(carrier_data) * 8, mode_values[mode_index]):
#         if bit_index >= message_length:
#             break
#
#         byte_index = i // 8
#         bit_in_byte = i % 8
#
#         carrier_data[byte_index] &= ~(1 << (7 - bit_in_byte))
#         carrier_data[byte_index] |= (int(message_bits[bit_index]) << (7 - bit_in_byte))
#         bit_index += 1
#
#         if mode:
#             mode_index = (mode_index + 1) % len(mode_values)
#
#     with open(output_file_path, 'wb') as output_file:
#         output_file.write(carrier_data)
#
#     return output_file_path
#
#
# def extract_message(carrier_file_path, start_bit, period, message_length, mode=None):
#     with open(carrier_file_path, 'rb') as carrier_file:
#         carrier_data = carrier_file.read()
#
#     message_bits = []
#     bit_index = 0
#     mode_index = 0
#     mode_values = [int(x) for x in mode.split(',')] if mode else [period]
#
#     for i in range(start_bit, len(carrier_data) * 8, mode_values[mode_index]):
#         if bit_index >= message_length * 8:
#             break
#
#         byte_index = i // 8
#         bit_in_byte = i % 8
#
#         bit = (carrier_data[byte_index] >> (7 - bit_in_byte)) & 1
#         message_bits.append(str(bit))
#         bit_index += 1
#
#         if mode:
#             mode_index = (mode_index + 1) % len(mode_values)
#
#     message_bytes = bytearray(int(''.join(message_bits[i:i + 8]), 2) for i in range(0, len(message_bits), 8))
#     return message_bytes.decode(errors='replace')
import os


def embed_message(carrier_path, message_path, output_path, start_bit=0, period=1, mode=''):
    # Read the carrier file
    with open(carrier_path, 'rb') as f:
        carrier_data = bytearray(f.read())

    # Read the message file
    with open(message_path, 'rb') as f:
        message_data = f.read()

    # Convert message to binary string
    message_bits = ''.join(format(byte, '08b') for byte in message_data)

    # First, store the length of the message (in bits) at the beginning
    message_length = len(message_bits)
    length_bits = format(message_length, '032b')  # 32 bits = up to 4GB

    # Combine length + message bits
    all_bits_to_embed = length_bits + message_bits

    period_index = 0
    # Handle different modes
    if mode == 'variable':
        periods = [8, 16, 28]
    else:
        periods = [period]

    # Current position in carrier (in bits)
    carrier_bit_pos = start_bit

    for i, bit in enumerate(all_bits_to_embed):
        byte_pos = carrier_bit_pos // 8
        bit_offset = 7 - (carrier_bit_pos % 8)

        # Set or clear the bit
        if bit == '1':
            carrier_data[byte_pos] |= (1 << bit_offset)
        else:
            carrier_data[byte_pos] &= ~(1 << bit_offset)

        # Move to next position based on period
        carrier_bit_pos += periods[period_index]

        # Cycle period if variable mode
        if mode == 'variable' and (i + 1) % 100 == 0:
            period_index = (period_index + 1) % len(periods)

    # Save modified carrier
    with open(output_path, 'wb') as f:
        f.write(carrier_data)


def extract_message(carrier_path, start_bit=0, period=1, message_length=None, mode=''):
    with open(carrier_path, 'rb') as f:
        carrier_data = f.read()

    period_index = 0
    if mode == 'variable':
        periods = [8, 16, 28]
    else:
        periods = [period]

    carrier_bit_pos = start_bit

    # Extract 32-bit length header
    extracted_length_bits = ''
    for i in range(32):
        byte_pos = carrier_bit_pos // 8
        bit_offset = 7 - (carrier_bit_pos % 8)

        if byte_pos >= len(carrier_data):
            raise ValueError("Carrier file too small to read message length.")

        bit = (carrier_data[byte_pos] >> bit_offset) & 1
        extracted_length_bits += str(bit)

        carrier_bit_pos += periods[period_index]

        if mode == 'variable' and (i + 1) % 100 == 0:
            period_index = (period_index + 1) % len(periods)

    embedded_length = int(extracted_length_bits, 2)
    bits_to_extract = message_length if message_length is not None else embedded_length

    # Reset for message body
    if mode == 'variable':
        period_index = 0

    extracted_bits = ''
    for i in range(bits_to_extract):
        byte_pos = carrier_bit_pos // 8
        bit_offset = 7 - (carrier_bit_pos % 8)

        if byte_pos >= len(carrier_data):
            raise ValueError("Carrier file too small to extract full message.")

        bit = (carrier_data[byte_pos] >> bit_offset) & 1
        extracted_bits += str(bit)

        carrier_bit_pos += periods[period_index]

        if mode == 'variable' and (i + 1) % 100 == 0:
            period_index = (period_index + 1) % len(periods)

    # Convert bits to bytes
    extracted_bytes = bytearray()
    for i in range(0, len(extracted_bits), 8):
        byte_chunk = extracted_bits[i:i+8]
        if len(byte_chunk) == 8:
            extracted_bytes.append(int(byte_chunk, 2))

    output_path = os.path.join(os.path.dirname(carrier_path), 'extracted_message')
    with open(output_path, 'wb') as f:
        f.write(extracted_bytes)

    return output_path
