import socket
import threading

# Receive messages from the server
def receive_messages(client_socket):
    while True:
        try:
            message = client_socket.recv(1024).decode()
            print(message)
        except Exception as e:
            print(f"Error: {e}")
            break

# Send messages to the server
def send_message(client_socket):
    while True:
        message = input()
        client_socket.send(message.encode())

# Start the client
def start_client(host, port):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))

    # Start thread to receive messages
    receive_thread = threading.Thread(target=receive_messages, args=(client_socket,))
    receive_thread.start()

    # Start thread to send messages
    send_thread = threading.Thread(target=send_message, args=(client_socket,))
    send_thread.start()

if __name__ == "__main__":
    HOST = input("Enter server IP address: ")
    PORT = 5555
    start_client(HOST, PORT)
