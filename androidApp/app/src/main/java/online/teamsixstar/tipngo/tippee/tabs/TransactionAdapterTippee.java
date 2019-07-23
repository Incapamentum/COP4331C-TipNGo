package online.teamsixstar.tipngo.tippee.tabs;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import online.teamsixstar.tipngo.R;

public class TransactionAdapterTippee extends RecyclerView.Adapter<TransactionAdapterTippee.ViewHolder> {
    private List<TippeeTransactions> mTransactions;

    public TransactionAdapterTippee(List<TippeeTransactions> transactions){
        mTransactions = transactions;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        // Inflate the custom layout
        View transactionView = inflater.inflate(R.layout.item_transaction, parent, false);

        // Return a new holder instance
        ViewHolder viewHolder = new ViewHolder(transactionView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // Get the data model based on position
        TippeeTransactions transaction = mTransactions.get(position);

        // Set item views (transactions)
        TextView textViewName = holder.transContactName;
        textViewName.setText(transaction.getName());
        TextView textViewTime = holder.transContactTime;
        textViewTime.setText(transaction.getTime());
        TextView textViewAmount = holder.transContactAmount;
        textViewAmount.setText(transaction.getAmount());
    }

    @Override
    public int getItemCount() {
        return mTransactions.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        public TextView transContactName;
        public TextView transContactTime;
        public TextView transContactAmount;

        public ViewHolder(View itemView){
            super(itemView);

            transContactName = (TextView) itemView.findViewById(R.id.transContactName);
            transContactTime = (TextView) itemView.findViewById(R.id.transContactTime);
            transContactAmount = (TextView) itemView.findViewById(R.id.transContactAmount);
        }

    }
}
