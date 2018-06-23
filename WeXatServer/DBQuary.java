import java.sql.*;
import com.microsoft.sqlserver.jdbc.*;  
import org.json.*;

public class DBQuary {
    static Connection connDB;
    static Statement statement;
    static {      
        String url = "jdbc:sqlserver://localhost:1433;databaseName=WeXat;useUnicode=true;characterEncoding=utf-8;"; //useUnicode=true;characterEncoding=utf-8;
        String username = "sa"; 
        String password = "";
      
        try {
            connDB = DriverManager.getConnection(url, username, password);
            statement = connDB.createStatement();
        } catch (Exception e) {
            e.printStackTrace(); 
            System.exit(1);
        }
    }


    JSONArray getText(int lastId) {
        JSONArray msgArray = new JSONArray();
        // ResultSet result = null;
        String sqlQuary = lastId == -1 ? "SELECT * FROM texttable" : "SELECT * FROM texttable WHERE textid > " + lastId;
        try {
            ResultSet result = statement.executeQuery(sqlQuary);
            while (result.next()) {
                JSONObject message = new JSONObject();
                message.put("textId", result.getInt(2));
                message.put("userId",result.getString(1));
                message.put("content", result.getString(4));//new String(result.getString(4).getBytes("ISO-8859-1"), "UTF-8"));
                message.put("time", result.getDate(5).toString() + " " + result.getTime(5).toString());
                msgArray.put(message);
            }
        } catch (Exception e) {
            e.printStackTrace(); 
            return null;
        }

        return msgArray;
    }

    JSONArray getMine(String userId) {
        JSONArray msgArray = new JSONArray();
        // ResultSet result = null;
        String sqlQuary = "SELECT * FROM texttable WHERE userid = '" + userId + "'";
        try {
            ResultSet result = statement.executeQuery(sqlQuary);
            while (result.next()) {
                JSONObject message = new JSONObject();
                message.put("textId", result.getInt(2));
                message.put("userId",result.getString(1));
                message.put("content", result.getString(4));//new String(result.getString(4).getBytes("ISO-8859-1"), "UTF-8"));
                message.put("time", result.getDate(5).toString() + " " + result.getTime(5).toString());
                msgArray.put(message);
            }
        } catch (Exception e) {
            e.printStackTrace(); 
            return null;
        }

        return msgArray;
    }

    JSONArray getComment (int textId) {
        System.out.println("comment with: " + textId);
        JSONArray cmtArray = new JSONArray();
        String sqlQuary = "SELECT commentid, commenttext FROM commenttable WHERE textid = " + textId;
        try {
            ResultSet result = statement.executeQuery(sqlQuary);
            while (result.next()) {
                JSONObject comment = new JSONObject();
                comment.put("commentId", result.getInt(1));
                comment.put("content", result.getString(2));//new String(result.getString(2).getBytes("ISO-8859-1"), "UTF-8"));
                cmtArray.put(comment);
            }
        } catch (Exception e) {
            e.printStackTrace(); 
            return null;
        }

        return cmtArray;
    }


    boolean saveCmt (String userId, int textId, int replyid, String text) {
        try {
            String sqlExec = "EXEC insertcomment ?,?,?,?,?";
            PreparedStatement ps = connDB.prepareStatement(sqlExec);
            ps.setEscapeProcessing(true);
            ps.setString(1, "default");
            ps.setInt(2, textId);
            if (replyid == -1) ps.setNull(3, java.sql.Types.INTEGER); else  ps.setInt(3, replyid == -1 ? null : replyid); 
            ps.setString(4, userId);
            ps.setString(5, text);//new String(text.getBytes("UTF-8"), "ISO-8859-1"));
            ps.execute();
            return true;
        } catch (Exception e) {
            e.printStackTrace(); 
            return false;
        }
    }

    boolean saveMsg (String userId, String text) {
        try {
            String sqlExec = "EXEC insert_text ?,?";
            PreparedStatement ps = connDB.prepareStatement(sqlExec);
            ps.setEscapeProcessing(true);
            ps.setString(1, userId);
            ps.setString(2, text);//new String(text.getBytes("UTF-8"), "ISO-8859-1"));
            ps.execute();
            return true;
        } catch (Exception e) {
            e.printStackTrace(); 
            return false;
        }
    }

    boolean removeMsg (int textId) {
        try {
            String delCmt = "DELETE FROM commenttable where textid = " + textId;
            String sqlExec = "DELETE FROM texttable where textid = " + textId;
            PreparedStatement del = connDB.prepareStatement(delCmt);
            PreparedStatement ps = connDB.prepareStatement(sqlExec);
            del.execute();
            ps.execute();
            return true;
        } catch (Exception e) {
            e.printStackTrace(); 
            return false;
        }
    }

    // public static void main(String[] args) {
    //     DBQuary sample = new DBQuary();
    //     System.out.println(sample.saveMsg("AttilaAdmin", "This one tests saving message from JDBC."));
    //     System.out.println(sample.getAll());
    // }
}