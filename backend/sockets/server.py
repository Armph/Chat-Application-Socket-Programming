import socket
import threading

# Global variables to store clients and groups
clients = {}
groups = {}

# Function to handle client connections
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
                else:
                    client_socket.send("Recipient not found.".encode())
            elif message.startswith("/creategroup"):
                group_name = message.split(" ")[1]
                groups[group_name] = []
                groups[group_name].append(client_name)
                client_socket.send(f"Group '{group_name}' created.".encode())
            elif message.startswith("/joingroup"):
                group_name = message.split(" ")[1]
                if group_name in groups:
                    groups[group_name].append(client_name)
                    client_socket.send(f"Joined group '{group_name}'.".encode())
                else:
                    client_socket.send("Group not found.".encode())
            elif message.startswith("/group"):
                group_name, group_message = message.split(" ", 1)
                group_name = group_name[6:]
                if group_name in groups:
                    for member in groups[group_name]:
                        clients[member].send(f"[{group_name}] {client_name}: {group_message}".encode())
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

# Function for debugging purposes
def debug():
    while True:
        message = input()
        if message == "clients":
            for name, socket in clients.items():
                print(f"Client '{name}': {socket}")
            print(f"Total clients: {len(clients)}")
        elif message == "groups":
            for name, members in groups.items():
                print(f"Group '{name}': {members}")
            print(f"Total groups: {len(groups)}")

# Start the server
def start_server(host, port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(5)
    print(f"Server listening on {host}:{port}")

    # Start thread for debugging
    debug_thread = threading.Thread(target=debug)
    debug_thread.start()

    while True:
        client_socket, client_address = server_socket.accept()
        client_thread = threading.Thread(target=handle_client, args=(client_socket, client_address))
        client_thread.start()

if __name__ == "__main__":
    HOST = "0.0.0.0"
    PORT = 5555
    start_server(HOST, PORT)
