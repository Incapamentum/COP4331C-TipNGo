package online.teamsixstar.tipngo.tipper;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import online.teamsixstar.tipngo.R;

public class TipperRegister extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_register);
    }

    public void doRegisterTipper(View v){
        EditText usernameTxt = findViewById(R.id.tipperUsername);
        EditText emailTxt = findViewById(R.id.tipperRegisterEmail);
        EditText passTxt = findViewById(R.id.tipperRegPass);
        EditText passConfirmTxt = findViewById(R.id.tipperRegPassConfirm);

        // TODO register user to the server here

        Boolean successful = false;

        if(successful){
            // Go to home screen
        }else{
            // Tell user what's wrong
        }

    }
}
