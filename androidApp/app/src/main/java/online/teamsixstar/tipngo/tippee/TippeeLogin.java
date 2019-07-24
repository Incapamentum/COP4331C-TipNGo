package online.teamsixstar.tipngo.tippee;

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

import static online.teamsixstar.tipngo.JsonIo.doJsonIo;
import static online.teamsixstar.tipngo.SaveSharedPreference.saveTippeeLogin;

public class TippeeLogin extends AppCompatActivity {

    public static final String url = "https://tip-n-go.herokuapp.com/api/users/login";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tippee_login);
    }

    public void doLoginTippee(View v){
        EditText email = findViewById(R.id.tippeeEmail);
        EditText pass = findViewById(R.id.tippeePass);

        TextView textView = findViewById(R.id.tippeeLoginErrorMsg);

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
            try {
                saveTippeeLogin(this, result.getString("token").substring(7, result.getString("token").length() - 1));
            } catch (Exception e){
                e.printStackTrace();
            }
            // Loading tippee home screen
            Intent intent = new Intent(getApplicationContext(), TippeeHome.class);
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
                if(result.has("firstname"))
                    textView.setText(result.getString("firstname"));
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return;
    }

    public void loadRegisterTippee(View v){
        Intent i = new Intent(getApplicationContext(), TippeeRegister.class);
        startActivity(i);

        return;
    }
}
