package online.teamsixstar.tipngo;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class SaveSharedPreference {

    // This class is storing user data in phone memory.

    static final String TIPPER_LGOIN = "TipperLogin";
    static final String TIPPEE_LOGIN = "TippeeLogin";
    static final String ACCOUNT_TYPE = "AccountType";
    static final String TIPPER_NAME = "TipperName";
    static final String TIPPEE_NAME = "TippeeName";

    static SharedPreferences getSharedPreference(Context ctx){
        return PreferenceManager.getDefaultSharedPreferences(ctx);
    }

    // Storing account type
    public static void saveAccountType(Context ctx, String type){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.putString(ACCOUNT_TYPE, type);
        editor.commit();
        return;
    }

    // Storing tipper login id and name
    public static void saveTipperLogin(Context ctx, String tipperLogin, String tipperName){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.putString(TIPPER_LGOIN, tipperLogin);
        editor.putString(TIPPER_NAME, tipperName);
        editor.commit();
        return;
    }

    // Storing tippee login id and name
    public static void saveTippeeLogin(Context ctx, String tippeeLogin, String tippeeName){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.putString(TIPPEE_LOGIN, tippeeLogin);
        editor.putString(TIPPEE_NAME, tippeeName);
        editor.commit();
        return;
    }

    public static String getAccountType(Context ctx){
        return getSharedPreference(ctx).getString(ACCOUNT_TYPE, "");
    }

    public static String getTipperLogin(Context ctx){
        return getSharedPreference(ctx).getString(TIPPER_LGOIN, "");
    }

    public static String getTipperName(Context ctx){
        return getSharedPreference(ctx).getString(TIPPER_NAME, "");
    }

    public static String getTippeeLogin(Context ctx){
        return getSharedPreference(ctx).getString(TIPPEE_LOGIN, "");
    }

    public static String getTippeeName(Context ctx){
        return getSharedPreference(ctx).getString(TIPPEE_NAME, "");
    }

    public static void clearUserName(Context ctx){
        SharedPreferences.Editor editor = getSharedPreference(ctx).edit();
        editor.clear(); //clear all stored data
        editor.commit();
    }

}
