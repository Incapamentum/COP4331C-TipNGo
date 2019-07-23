package online.teamsixstar.tipngo.tippee;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.util.TypedValue;
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
import static online.teamsixstar.tipngo.JsonIo.sendPostRequest;

public class TippeeRegister extends AppCompatActivity {

    private static final String url = "https://tip-n-go.herokuapp.com/api/users/registertippee";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tippee_register);
    }

    public void doRegisterTippee(View v){
        EditText username = findViewById(R.id.tippeeUsername);
        EditText email = findViewById(R.id.tippeeRegisterEmail);
        EditText pass = findViewById(R.id.tippeeRegPass);
        EditText passConfirm = findViewById(R.id.tippeeRegPassConfirm);

        TextView textView = findViewById(R.id.tippeeRegisterErrorMsg);

        if (pass.getText().toString().compareTo(passConfirm.getText().toString()) != 0){
            textView.setText("Passwords doesn't match");
            return;
        }

        JSONObject payload = new JSONObject();

        try {

            payload.put("firstname", username.getText().toString());
            payload.put("email", email.getText().toString());
            payload.put("password", pass.getText().toString());
            payload.put("password2", passConfirm.getText().toString());

        } catch (JSONException e){
            e.printStackTrace();
        }

        JSONObject result  = doJsonIo(url, payload.toString());

        if(result == null){
            textView.setText("Connection timeout");
            return;
        }

        if(result.has("_id")){
            Toast.makeText(this,"Registration successful", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(getApplicationContext(), TippeeLogin.class);
            startActivity(intent);
            finish();
        }else{
            try {
                if(result.has("name"))
                    textView.setText(result.getString("name"));
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
