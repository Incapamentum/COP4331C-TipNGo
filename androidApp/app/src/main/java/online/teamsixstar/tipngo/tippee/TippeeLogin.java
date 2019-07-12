package online.teamsixstar.tipngo.tippee;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import online.teamsixstar.tipngo.R;

public class TippeeLogin extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tippee_login);
    }

    public void doLoginTippee(View v){
        EditText email = findViewById(R.id.tippeeEmail);
        EditText pass = findViewById(R.id.tippeePass);

        // TODO verify user here

        Boolean verified = false;

        if(verified){
            Intent i = new Intent(getApplicationContext(), TippeeHome.class);
            startActivity(i);
        }else{
            // Tell user password/email incorrect
        }

        return;
    }

    public void loadRegisterTippee(View v){
        Intent i = new Intent(getApplicationContext(), TippeeRegister.class);
        startActivity(i);

        return;
    }
}
