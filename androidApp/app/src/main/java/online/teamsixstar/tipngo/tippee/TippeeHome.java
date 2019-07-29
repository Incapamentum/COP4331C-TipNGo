package online.teamsixstar.tipngo.tippee;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;

import online.teamsixstar.tipngo.About;
import online.teamsixstar.tipngo.MainActivity;
import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.SaveSharedPreference;
import online.teamsixstar.tipngo.tippee.tabs.SectionPagerAdapterTippee;
import online.teamsixstar.tipngo.tippee.tabs.TippeeAccountTab;
import online.teamsixstar.tipngo.tippee.tabs.TippeeBalanceTab;

import static online.teamsixstar.tipngo.SaveSharedPreference.getTippeeName;

public class TippeeHome extends AppCompatActivity {

    public static final String URL = "https://tip-n-go.herokuapp.com/api/accounts/findtippee";

    private SectionPagerAdapterTippee sectionPagerAdapterTippee;

    private ViewPager viewPager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tippee_home);

        Toolbar title = findViewById(R.id.tippeeHome);
        title.setTitle("Welcome " + getTippeeName(this));

        // TODO fetch tippee information and set up name and recent transaction

        sectionPagerAdapterTippee = new SectionPagerAdapterTippee(getSupportFragmentManager());

        viewPager = findViewById(R.id.tippeeTabPage);
        setupViewPager(viewPager);

        TabLayout tabLayout = findViewById(R.id.tippeeTabs);
        tabLayout.setupWithViewPager(viewPager);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            startSettings();
            return true;
        }else if(id == R.id.about){
            startAbout();
            return true;
        }else if(id == R.id.logout){
            doLogout();
            return true;
        }


        return super.onOptionsItemSelected(item);
    }

    private void startSettings(){
        Intent i = new Intent(getApplicationContext(), TippeeSettings.class);
        startActivity(i);
        return;
    }

    private void startAbout(){
        Intent i = new Intent(getApplicationContext(), About.class);
        startActivity(i);
        return;
    }

    private void doLogout(){
        SaveSharedPreference.clearUserName(this);
        Intent i = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(i);
        finish();
        return;
    }

    public void setupViewPager(ViewPager viewPager){
        SectionPagerAdapterTippee adapter = new SectionPagerAdapterTippee(getSupportFragmentManager());
        adapter.addFragment(new TippeeBalanceTab(), "Balance");
        adapter.addFragment(new TippeeAccountTab(), "Account");
        viewPager.setAdapter(adapter);

    }


}
