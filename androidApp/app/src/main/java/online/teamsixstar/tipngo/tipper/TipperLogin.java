package online.teamsixstar.tipngo.tipper;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import online.teamsixstar.tipngo.R;

public class TipperLogin extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tipper_login);
    }

    public void doLoginTipper(View v){

        EditText email = (EditText) findViewById(R.id.tipperEmail);
        EditText pass = (EditText) findViewById(R.id.tipperPass);

        //TODO verify user here
        Boolean verified = true;

        if(verified){
            Intent i = new Intent(getApplicationContext(), TipperHome.class);
            startActivity(i);
        }else{
            // Tell user password/email incorrect
        }

        return;
    }

    public void loadRegisterTipper(View v){
        Intent i = new Intent(getApplicationContext(), TipperRegister.class);
        startActivity(i);

        return;
    }
}
