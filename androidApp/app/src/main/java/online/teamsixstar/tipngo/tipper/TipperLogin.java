package online.teamsixstar.tipngo.tipper;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;


import org.json.JSONObject;

import online.teamsixstar.tipngo.R;

import static online.teamsixstar.tipngo.JWTUtils.decoded;
import static online.teamsixstar.tipngo.JWTUtils.getID;
import static online.teamsixstar.tipngo.JWTUtils.getName;
import static online.teamsixstar.tipngo.JsonIo.doJsonIo;
import static online.teamsixstar.tipngo.SaveSharedPreference.saveAccountType;
import static online.teamsixstar.tipngo.SaveSharedPreference.saveTipperLogin;

public class TipperLogin extends AppCompatActivity {

    public static final String URL = "https://tip-n-go.herokuapp.com/api/users/login";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_login);
    }

    public void doLoginTipper(View v){

        // Getting user input
        EditText email = (EditText) findViewById(R.id.tipperEmail);
        EditText pass = (EditText) findViewById(R.id.tipperPass);

        TextView textView = findViewById(R.id.tipperLoginErrorMsg);

        // Constructing json object
        JSONObject payload = new JSONObject();

        try{
            payload.put("email", email.getText().toString());
            payload.put("password", pass.getText().toString());

        }catch (Exception e){
            e.printStackTrace();
        }

        // Transmitting data
        JSONObject result = doJsonIo(URL, payload.toString());

        // Transmission failed
        if(result == null){
            textView.setText("Connection timeout");
            return;
        }

        // Login successful
        if(result.has("success")){
            // Saving id key for automatically login in
            try{
                String token = result.getString("token").substring(7, result.getString("token").length());
                decoded(token);
                String name = getName();
                String id = getID();
                if(id.compareTo("failed") == 0){
                    textView.setText("Decode failed");
                    Log.e("decode failed", "decode failed");
                    return;
                }
                // Storing user name and id in phone memory
                saveTipperLogin(this, id, name);
                saveAccountType(this, "tipper");
            }catch (Exception e){
                e.printStackTrace();
            }
            // Loading tipper home screen
            Intent intent = new Intent(getApplicationContext(), TipperHome.class);
            startActivity(intent);
            finish();
        }else{
            // Login failed, invalid input from user
            try{
                if(result.has("passwordincorrect"))
                    textView.setText(result.getString("passwordincorrect"));
                if(result.has("emailnotfound"))
                    textView.setText(result.getString("emailnotfound"));
                if(result.has("email"))
                    textView.setText(result.getString("email"));
                if(result.has("password"))
                    textView.setText(result.getString("password"));
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return;
    }

    // Loading register screen
    public void loadRegisterTipper(View v){
        Intent i = new Intent(getApplicationContext(), TipperRegister.class);
        startActivity(i);

        return;
    }
}
