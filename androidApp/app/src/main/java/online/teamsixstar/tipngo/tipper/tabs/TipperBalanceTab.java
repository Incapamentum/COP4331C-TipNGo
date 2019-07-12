package online.teamsixstar.tipngo.tipper.tabs;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import online.teamsixstar.tipngo.R;

public class TipperBalanceTab extends Fragment {
    private static final String TAG = "tipperBalanceTab";
    ArrayList<TipperTransactions> transactions;

    public TipperBalanceTab(){

    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tipper_balanace_tab, container, false);

        RecyclerView rvTransactions = (RecyclerView) view.findViewById(R.id.tipperRecentActivity);

        // TODO: load recent activity from the server here then add them to transactions ArrayList
        // Testing RecyclerView entries
        transactions = createTransactions(20);
        TransactionAdapter adapter = new TransactionAdapter(transactions);
        rvTransactions.setAdapter(adapter);
        rvTransactions.setLayoutManager(new LinearLayoutManager(this.getActivity()));

        return view;
    }

    // Function to test RecyclerView
    public ArrayList<TipperTransactions> createTransactions(int numOfTrans){
        ArrayList<TipperTransactions> transactions = new ArrayList<>();
        String name = "Person";
        for (int i = 0; i < numOfTrans; i++){
            TipperTransactions trans = new TipperTransactions(name + " " + i, "10:" + i + " " + "am", (double)i);
            transactions.add(trans);
        }
        return transactions;
    }
}
