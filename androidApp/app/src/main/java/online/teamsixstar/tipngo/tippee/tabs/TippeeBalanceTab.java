package online.teamsixstar.tipngo.tippee.tabs;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.SaveSharedPreference;

import static online.teamsixstar.tipngo.JsonIo.doJsonIo;

public class TippeeBalanceTab extends Fragment {

    public static final String URL = "https://tip-n-go.herokuapp.com/api/accounts/findtippee";

    ArrayList<TippeeTransactions> transactions = new ArrayList<>();

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

        TextView balanceView = view.findViewById(R.id.tippeeBalanceAmount);

        // TODO: load recent activity from the server here then add them to transactions ArrayList

        JSONObject payload = new JSONObject();

        try{
            payload.put("id", SaveSharedPreference.getTippeeLogin(getActivity()));
        }catch (Exception e){
            e.printStackTrace();
        }

        JSONObject result = doJsonIo(URL, payload.toString());

        if(result == null){
            Toast.makeText(getActivity(), "Connection timeout", Toast.LENGTH_LONG).show();
            return view;
        }

        JSONArray jsonArray = new JSONArray();

        if(result.has("_id")){
            try {
                int balanceCent = result.getInt("balanceUSD");
                double balance =  ((double)balanceCent / 100);
                balanceView.setText('$' + String.format("%.2f", balance));
                jsonArray = result.getJSONArray("transactionHistory");
            }catch (JSONException e){
                e.printStackTrace();
                Toast.makeText(getActivity(), "Connection timeout", Toast.LENGTH_LONG).show();
                return view;
            }
        }

        try {
            createTransactions(jsonArray);
        }catch (JSONException e){
            e.printStackTrace();
            Toast.makeText(getActivity(), "Connection timeout", Toast.LENGTH_LONG).show();
            return view;
        }

        // Testing RecyclerView entries
        TransactionAdapterTippee adapter = new TransactionAdapterTippee(transactions);
        rvTransactions.setAdapter(adapter);
        rvTransactions.setLayoutManager(new LinearLayoutManager(this.getActivity()));
        return view;
    }

    // Function to test RecyclerView
    public void createTransactions(JSONArray jsonArray) throws JSONException{
        if(jsonArray.length() == 0){
            noTransactions();
        }else {
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Log.d("jsonObjectTransactions", jsonObject.toString());
                TippeeTransactions trans = new TippeeTransactions(jsonObject.getString("tippeeName"), jsonObject.getString("date"), jsonObject.getInt("ammount"));
                transactions.add(trans);
            }
            return;
        }
    }

    public void noTransactions(){
        TippeeTransactions trans = new TippeeTransactions("No transactions","", 0);
        transactions.add(trans);
    }
}
