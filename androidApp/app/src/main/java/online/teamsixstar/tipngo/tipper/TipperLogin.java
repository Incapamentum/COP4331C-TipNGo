package online.teamsixstar.tipngo.tipper;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

import online.teamsixstar.tipngo.R;

import static online.teamsixstar.tipngo.JsonIo.doJsonIo;
import static online.teamsixstar.tipngo.SaveSharedPreference.saveTipperLogin;

public class TipperLogin extends AppCompatActivity {

    public static final String url = "https://tip-n-go.herokuapp.com/api/users/login";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_login);
    }

    public void doLoginTipper(View v){

        EditText email = (EditText) findViewById(R.id.tipperEmail);
        EditText pass = (EditText) findViewById(R.id.tipperPass);

        TextView textView = findViewById(R.id.tipperLoginErrorMsg);

        JSONObject payload = new JSONObject();

        try{

            payload.put("email", email.getText().toString());
            payload.put("password", pass.getText().toString());

        }catch (Exception e){
            e.printStackTrace();
        }

        JSONObject result = doJsonIo(url, payload.toString());

        if(result == null){
            textView.setText("Connection timeout");
            return;
        }

        if(result.has("success")){
            // Saving bearer key for automatically login in
            try{
                saveTipperLogin(this, result.getString("token").substring(7, result.getString("token").length() - 1));
            }catch (Exception e){
                e.printStackTrace();
            }
            // Loading tipper home screen
            Intent intent = new Intent(getApplicationContext(), TipperHome.class);
            startActivity(intent);
            finish();
        }else{
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

    public void loadRegisterTipper(View v){
        Intent i = new Intent(getApplicationContext(), TipperRegister.class);
        startActivity(i);

        return;
    }
}
