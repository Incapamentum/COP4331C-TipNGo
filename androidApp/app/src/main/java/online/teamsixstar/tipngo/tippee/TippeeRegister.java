package online.teamsixstar.tipngo.tippee;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import online.teamsixstar.tipngo.R;

public class TippeeRegister extends AppCompatActivity {

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

        // TODO register user to the server here

        Boolean succesful = false;

        if(succesful){
            // Load home screen (prompt user to add bank info
        }else{
            // Tell user what's wrong
        }

        return;
    }
}
