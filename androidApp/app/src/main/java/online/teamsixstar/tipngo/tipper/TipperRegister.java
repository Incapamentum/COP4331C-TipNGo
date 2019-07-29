package online.teamsixstar.tipngo.tipper;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

import online.teamsixstar.tipngo.R;

import static online.teamsixstar.tipngo.JsonIo.doJsonIo;

public class TipperRegister extends AppCompatActivity {

    public static final String URL = "https://tip-n-go.herokuapp.com/api/users/registertipper";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_register);
    }

    public void doRegisterTipper(View v){
        // Getting user input
        EditText username = findViewById(R.id.tipperUsername);
        EditText email = findViewById(R.id.tipperRegisterEmail);
        EditText pass = findViewById(R.id.tipperRegPass);
        EditText passConfirm = findViewById(R.id.tipperRegPassConfirm);

        TextView textView = findViewById(R.id.tipperRegisterErrorMsg);

        // Checking if passwords match
        if (pass.getText().toString().compareTo(passConfirm.getText().toString()) != 0){
            textView.setText("Passwords doesn't match");
            return;
        }

        //Constructing json object
        JSONObject payload = new JSONObject();

        try {

            payload.put("firstname", username.getText().toString());
            payload.put("email", email.getText().toString());
            payload.put("password", pass.getText().toString());
            payload.put("password2", passConfirm.getText().toString());

        } catch (JSONException e){
            e.printStackTrace();
        }

        // Transmitting json using Jsonio class
        JSONObject result  = doJsonIo(URL, payload.toString());

        // Transmission failed
        if(result == null){
            textView.setText("Connection timeout");
            return;
        }

        // If registration successful loading TipperLogin class and terminating register class
        if(result.has("_id")){
            Toast.makeText(this,"Registration successful", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(getApplicationContext(), TipperLogin.class);
            startActivity(intent);
            finish();
        }else{
            // Registration failed
            try {
                if(result.has("firstname"))
                    textView.setText(result.getString("firstname"));
                if(result.has("email"))
                    textView.setText(result.getString("email"));
                if(result.has("password"));
                textView.setText(result.getString("password"));
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        return;
    }
}
