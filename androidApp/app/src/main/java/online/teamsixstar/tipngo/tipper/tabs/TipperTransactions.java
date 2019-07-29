package online.teamsixstar.tipngo.tipper.tabs;

public class TipperTransactions {
    // Storing transaction information for recent activity
    private String name;
    private String amount;
    private String time;

    public TipperTransactions(String name, String time, int amount){
        this.name = name;
        this.time = time;
        if(amount == 0)
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
