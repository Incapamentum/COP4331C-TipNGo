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

    public static final String url = "https://tip-n-go.herokuapp.com/api/users/registertipper";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_register);
    }

    public void doRegisterTipper(View v){
        EditText username = findViewById(R.id.tipperUsername);
        EditText email = findViewById(R.id.tipperRegisterEmail);
        EditText pass = findViewById(R.id.tipperRegPass);
        EditText passConfirm = findViewById(R.id.tipperRegPassConfirm);

        TextView textView = findViewById(R.id.tipperRegisterErrorMsg);

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
            Intent intent = new Intent(getApplicationContext(), TipperLogin.class);
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
