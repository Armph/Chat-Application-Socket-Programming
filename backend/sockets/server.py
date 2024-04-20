import socket
import threading
import requests

# Global variables
clients = {}
groups = {}

# Send private messages to the backend
def private_message_to_backend(message, recipient, sender):
    url = "http://localhost:5000/api/private_messages"
    data = {"message": message, "recipient": recipient, "sender": sender}
    requests.post(url, json=data)

# Create groups in the backend
def create_group_to_backend(group_name, sender):
    url = "http://localhost:5000/api/groups"
    data = {"group_name": group_name, "sender": sender}
    requests.post(url, json=data)

# Join groups in the backend
def join_group_to_backend(group_name, sender):
    url = "http://localhost:5000/api/groups/join"
    data = {"group_name": group_name, "sender": sender}
    requests.post(url, json=data)

# Send group messages to the backend
def group_message_to_backend(message, group_name, sender):
    url = "http://localhost:5000/api/group_messages"
    data = {"message": message, "group_name": group_name, "sender": sender}
    requests.post(url, json=data)

# Handle client connections
def handle_client(client_socket, client_address):
    print(f"Connection from {client_address}")
    client_socket.send("Welcome to the chat server. Enter your name: ".encode())
    client_name = client_socket.recv(1024).decode()
    clients[client_name] = client_socket

    while True:
        try:
            message = client_socket.recv(1024).decode()
            if message.startswith("/private"):
                recipient, private_message = message.split(" ", 1)
                recipient = recipient[9:]
                if recipient in clients:
                    clients[recipient].send(f"[Private from {client_name}]: {private_message}".encode())
                    private_message_to_backend(private_message, recipient, client_name)
                else:
                    client_socket.send("Recipient not found.".encode())
            elif message.startswith("/creategroup"):
                group_name = message.split(" ")[1]
                groups[group_name] = []
                groups[group_name].append(client_name)
                client_socket.send(f"Group '{group_name}' created.".encode())
                create_group_to_backend(group_name, client_name)
            elif message.startswith("/joingroup"):
                group_name = message.split(" ")[1]
                if group_name in groups:
                    groups[group_name].append(client_name)
                    client_socket.send(f"Joined group '{group_name}'.".encode())
                    join_group_to_backend(group_name, client_name)
                else:
                    client_socket.send("Group not found.".encode())
            elif message.startswith("/group"):
                group_name, group_message = message.split(" ", 1)
                group_name = group_name[6:]
                if group_name in groups:
                    for member in groups[group_name]:
                        clients[member].send(f"[{group_name}] {client_name}: {group_message}".encode())
                        group_message_to_backend(group_message, group_name, client_name)
                else:
                    client_socket.send("Group not found.".encode())
            else:
                for name, socket in clients.items():
                    if socket != client_socket:
                        socket.send(f"{client_name}: {message}".encode())
        except Exception as e:
            print(f"Error: {e}")
            del clients[client_name]
            client_socket.close()
            break

# Start the server
def start_server(host, port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(5)
    print(f"Server listening on {host}:{port}")

    while True:
        client_socket, client_address = server_socket.accept()
        client_thread = threading.Thread(target=handle_client, args=(client_socket, client_address))
        client_thread.start()

if __name__ == "__main__":
    HOST = "0.0.0.0"
    PORT = 5555
    start_server(HOST, PORT)
