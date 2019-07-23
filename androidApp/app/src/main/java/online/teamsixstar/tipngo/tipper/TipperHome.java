package online.teamsixstar.tipngo.tipper;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;

import online.teamsixstar.tipngo.About;
import online.teamsixstar.tipngo.MainActivity;
import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.tipper.tabs.SectionPageAdapterTipper;
import online.teamsixstar.tipngo.tipper.tabs.TipperBalanceTab;
import online.teamsixstar.tipngo.tipper.tabs.TipperSendMoneyTab;

public class TipperHome extends AppCompatActivity {

    private SectionPageAdapterTipper sectionPageAdapterTipper;

    private ViewPager viewPager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tipper_home);
        //Toolbar toolbar = findViewById(R.id.tipperToolbar);
        //setSupportActionBar(toolbar);

        sectionPageAdapterTipper = new SectionPageAdapterTipper(getSupportFragmentManager());

        viewPager = findViewById(R.id.activityTabPage);
        setupViewPager(viewPager);

        TabLayout tabLayout = findViewById(R.id.tipperTabs);
        tabLayout.setupWithViewPager(viewPager);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
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

    private void setupViewPager(ViewPager viewPager){
        SectionPageAdapterTipper adapter = new SectionPageAdapterTipper(getSupportFragmentManager());
        adapter.addFragment(new TipperBalanceTab(), "Activity");
        adapter.addFragment(new TipperSendMoneyTab(), "Send Money");
        viewPager.setAdapter(adapter);
        return;
    }

    private void startSettings(){
        Intent i = new Intent(getApplicationContext(), TipperSettings.class);
        startActivity(i);
        return;
    }

    private void startAbout(){
        Intent i = new Intent(getApplicationContext(), About.class);
        startActivity(i);
        return;
    }

    private void doLogout(){
        // TODO clear user data
        Intent i = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(i);
        return;
    }

}

