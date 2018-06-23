import java.net.*;
import java.util.*;

import org.json.*;
import java.io.*;


public class RequestHandler implements Runnable{
    static final String responseFirstLine = "HTTP/1.1 200 OK"; 
    static JSONArray messages;
    static final DBQuary dbOperator;
    
    static {
        dbOperator = new DBQuary();
        messages = dbOperator.getText(-1);
        System.out.println("RequstHandler Initialized.");
    }

    private Socket clientSocket;
    private BufferedReader in;
    private PrintWriter out;

    public RequestHandler (Socket clientSocket) {
        this.clientSocket = clientSocket;
    }


    public void run () {
        try {
            String input;
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            
            int cnt = 0;
            while ((input = this.in.readLine()).length() != 0) {
                System.out.println(input);
            }
            
            StringBuilder data = new StringBuilder();
            while (in.ready()) {
                data.append((char)in.read());
            }

            System.out.println("data: " + data);
            
            if (data.length() > 0) {
                JSONObject recievedData = new JSONObject(data.toString());  
                try {
                    response(recievedData.getString("goal"), recievedData);
                } catch (Exception e) {}
            }

        } catch (IOException e) {
            System.out.println(e.getMessage());
            return;
        }
    }

    private void response (String goal, JSONObject recievedData) {
        
        out.println(responseFirstLine);
        out.println("");
        System.out.println("start: ");
        
        //user get all messages
        if (goal.equals("get")) {
            out.println(messages);
            System.out.println(messages.toString());
        }
        //user post new message
        else if (goal.equals("post")) {
            try {
                System.out.println(recievedData.get("content").toString());
                dbOperator.saveMsg(recievedData.get("userId").toString(), recievedData.get("content").toString());
                messages = dbOperator.getText(-1);
                out.println(messages);
            } catch (Exception e) {
               System.out.println("failed post");
            }                 
        }
        //user load comments of a specific message
        else if (goal.equals("get_comment")) {
            try {
                System.out.println((int)recievedData.get("textId"));
                JSONArray comments = dbOperator.getComment((int)recievedData.get("textId"));
                out.println(comments);
            } catch (Exception e) {
               System.out.println("failed get comment");
            }        
        } 
        //user post new comment to a specific message
        else if (goal.equals("post_comment")) {
            try {
                dbOperator.saveCmt(recievedData.get("userId").toString(), (int)recievedData.get("textId"), -1, recievedData.get("content").toString());
                JSONArray comments = dbOperator.getComment((int)recievedData.get("textId"));
                System.out.println(comments);
                out.println(comments);
            } catch (Exception e) {
                System.out.println("failed post comment");
            } 
        }
        //get user's own message
        else if (goal.equals("get_mine")) {
            try {
                JSONArray myMsgs = dbOperator.getMine(recievedData.get("userId").toString());
                out.println(myMsgs);
            } catch (Exception e) {
               System.out.println("failed get mine");
            }   
            
        }
        //remove a message
        else if (goal.equals("remove")) {
            try {
                dbOperator.removeMsg((int)recievedData.get("textId"));
                messages = dbOperator.getText(-1);
                out.println(messages);
            } catch (Exception e) {
               System.out.println("failed remove");
            }   
        }
           
        out.flush();
        out.close();
        System.out.println("finished.");
    }
}