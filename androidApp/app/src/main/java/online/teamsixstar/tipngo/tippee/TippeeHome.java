package online.teamsixstar.tipngo.tippee;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;

import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.tippee.tabs.SectionPagerAdapterTippee;
import online.teamsixstar.tipngo.tippee.tabs.TippeeAccountTab;
import online.teamsixstar.tipngo.tippee.tabs.TippeeBalanceTab;

public class TippeeHome extends AppCompatActivity {

    private SectionPagerAdapterTippee sectionPagerAdapterTippee;

    private ViewPager viewPager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.tippee_home);

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

        return super.onOptionsItemSelected(item);
    }

    public void setupViewPager(ViewPager viewPager){
        SectionPagerAdapterTippee adapter = new SectionPagerAdapterTippee(getSupportFragmentManager());
        adapter.addFragment(new TippeeBalanceTab(), "Balance");
        adapter.addFragment(new TippeeAccountTab(), "Account");
        viewPager.setAdapter(adapter);

    }


}
