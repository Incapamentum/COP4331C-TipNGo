package online.teamsixstar.tipngo.tippee.tabs;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import online.teamsixstar.tipngo.R;

public class TippeeAccountTab extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tippee_account_tab, container, false);

        // TODO: Generate QR code based on tippee email here
        // TODO: Create methods to add bank info

        return view;
    }
}
