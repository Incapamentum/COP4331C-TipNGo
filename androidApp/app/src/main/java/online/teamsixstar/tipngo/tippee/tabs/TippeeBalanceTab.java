package online.teamsixstar.tipngo.tippee.tabs;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.tipper.tabs.TransactionAdapterTipper;

public class TippeeBalanceTab extends Fragment {

    ArrayList<TippeeTransactions> transactions;

    public TippeeBalanceTab(){

    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tippee_balance_tab, container, false);

        RecyclerView rvTransactions = view.findViewById(R.id.tippeeRecerntActivity);

        // TODO: load recent activity from the server here then add them to transactions ArrayList

        // Testing RecyclerView entries
        transactions = createTransactions(20);
        TransactionAdapterTippee adapter = new TransactionAdapterTippee(transactions);
        rvTransactions.setAdapter(adapter);
        rvTransactions.setLayoutManager(new LinearLayoutManager(this.getActivity()));
        return view;
    }

    // Function to test RecyclerView
    public ArrayList<TippeeTransactions> createTransactions(int numOfTrans){
        ArrayList<TippeeTransactions> transactions = new ArrayList<>();
        String name = "Tippee";
        for (int i = 0; i < numOfTrans; i++){
            TippeeTransactions trans = new TippeeTransactions(name + " " + i, "10:" + i + " " + "am", (double)i);
            transactions.add(trans);
        }
        return transactions;
    }
}
