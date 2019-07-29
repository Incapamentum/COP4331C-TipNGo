package online.teamsixstar.tipngo;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.View;

import online.teamsixstar.tipngo.tippee.TippeeHome;
import online.teamsixstar.tipngo.tippee.TippeeLogin;
import online.teamsixstar.tipngo.tipper.TipperHome;
import online.teamsixstar.tipngo.tipper.TipperLogin;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Checking if user already logged in
        if(SaveSharedPreference.getTipperLogin(MainActivity.this).length() == 0 &&
            SaveSharedPreference.getTippeeLogin(MainActivity.this).length() == 0){
            // User is not logged in
            setContentView(R.layout.activity_main);
        }else{
            // User is logged in, checking account type
            if(SaveSharedPreference.getAccountType(MainActivity.this).compareTo("tipper") == 0){
                Intent intent = new Intent(this, TipperHome.class);
                startActivity(intent);
                finish();
            }
            if(SaveSharedPreference.getAccountType(MainActivity.this).compareTo("tippee") == 0){
                Intent intent = new Intent(this, TippeeHome.class);
                startActivity(intent);
                finish();
            }
        }
    }

    public void loadTipperLogin(View v){
        Intent i = new Intent(getApplicationContext(), TipperLogin.class);
        startActivity(i);

        return;
    }

    public void loadTippeeLogin(View v){
        Intent i = new Intent(getApplicationContext(), TippeeLogin.class);
        startActivity(i);

        return;
    }
}
