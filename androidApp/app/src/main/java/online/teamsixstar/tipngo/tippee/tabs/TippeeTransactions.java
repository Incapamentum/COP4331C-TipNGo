package online.teamsixstar.tipngo.tippee.tabs;

public class TippeeTransactions {
    // Storing transaction information for recent activity
    private String name;
    private String amount;
    private String time;

    public TippeeTransactions(String name, String time, int amount){
        this.name = name;
        this.time = time;
        if(amount == 0.00)
            this.amount = "";
        else {
            double balance = ((double)amount) / 100;
            this.amount = '$' + String.format("%.2f", balance);
        }
    }

    public String getName() {
        return name;
    }

    public String getTime(){
        return time;
    }

    public String getAmount() {
        return amount;
    }
}
