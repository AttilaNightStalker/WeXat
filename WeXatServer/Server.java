import java.net.*;
import java.io.*;
import org.json.*; 

public class Server {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.err.println("Usage: java Server <port number>");
            System.exit(1);
        }

        int portNumber = Integer.parseInt(args[0]);
        try (
            ServerSocket serverSocket = new ServerSocket(portNumber);           
        ) {
            while (true) {
                new Thread(new RequestHandler(serverSocket.accept())).start();
                System.out.println("A new request is handled.");
            }

        } catch (IOException e) {
            System.out.println("Exception caught when trying to listen on port "
                + portNumber + " or listening for a connection");
            System.out.println(e.getMessage());
        }
        
    }
}