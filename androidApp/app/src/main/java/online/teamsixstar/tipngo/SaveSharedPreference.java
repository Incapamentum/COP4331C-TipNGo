package online.teamsixstar.tipngo;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class SaveSharedPreference {

    static final String TIPPER_LGOIN = "TipperLogin";
    static final String TIPPEE_LOGIN = "TippeeLogin";

    static SharedPreferences getSharedPreference(Context ctx){
        return PreferenceManager.getDefaultSharedPreferences(ctx);
    }

    public static void saveTipperLogin(Context ctx, String tipperLogin){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.putString(TIPPER_LGOIN, tipperLogin);
        editor.commit();
        return;
    }

    public static void saveTippeeLogin(Context ctx, String tippeeLogin){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.putString(TIPPEE_LOGIN, tippeeLogin);
        editor.commit();
        return;
    }

    public static String getTipperLgoin(Context ctx){
        return getSharedPreference(ctx).getString(TIPPER_LGOIN, "");
    }

    public static String getTippeeLogin(Context ctx){
        return getSharedPreference(ctx).getString(TIPPEE_LOGIN, "");
    }

}
