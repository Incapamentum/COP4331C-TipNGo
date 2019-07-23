package online.teamsixstar.tipngo.tippee.tabs;

public class TippeeTransactions {
    // Storing transaction information for recent activity
    private String name;
    private String amount;
    private String time;

    public TippeeTransactions(String name, String time, double amount){
        this.name = name;
        this.time = time;
        this.amount = '$' + String.format("%.2f", amount);
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
