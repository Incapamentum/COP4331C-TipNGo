package online.teamsixstar.tipngo;

import android.util.Base64;
import android.util.Log;

import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class JWTUtils {

    // This class is used to decode bearer from login

    static String name;
    static String id;

    public static void decoded(String JWTEncoded) throws Exception {
        try {
            String[] split = JWTEncoded.split("\\.");
            Log.d("JWT_DECODED", "Header: " + getJson(split[0]));
            Log.d("JWT_DECODED", "Body: " + getJson(split[1]));
            JSONObject json = new JSONObject(getJson(split[1]));
            id = json.getString("id");
            name = json.getString("name");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public static String getName(){
        return name;
    }

    public static String getID(){
        return id;
    }

    private static String getJson(String strEncoded) throws UnsupportedEncodingException{
        byte[] decodedBytes = Base64.decode(strEncoded, Base64.URL_SAFE);
        return new String(decodedBytes, "UTF-8");
    }
}