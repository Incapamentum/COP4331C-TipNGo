package online.teamsixstar.tipngo.tippee.tabs;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import com.google.zxing.WriterException;

import org.json.JSONException;
import org.json.JSONObject;

import androidmads.library.qrgenearator.QRGContents;
import androidmads.library.qrgenearator.QRGEncoder;
import online.teamsixstar.tipngo.R;
import online.teamsixstar.tipngo.SaveSharedPreference;

import static android.content.Context.LAYOUT_INFLATER_SERVICE;
import static androidx.core.content.ContextCompat.getSystemService;
import static online.teamsixstar.tipngo.JsonIo.doJsonIo;

public class TippeeAccountTab extends Fragment {

    public static final String URL = "https://tip-n-go.herokuapp.com/api/accounts/findtippee";
    private static String email = "";

    Bitmap bitmap;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tippee_account_tab, container, false);

        Button button = view.findViewById(R.id.addBankButt);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                addAccount(view);
            }
        });

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

        if(result.has("email")){
            try {
                email = result.getString("email");
            }catch (JSONException e){
                e.printStackTrace();
                Toast.makeText(getActivity(), "Connection timeout", Toast.LENGTH_LONG).show();
                return view;
            }
        }

        ImageView imageView = view.findViewById(R.id.tippeeQRCodeImage);

        WindowManager manager = (WindowManager) getActivity().getSystemService(Context.WINDOW_SERVICE);
        Display display = manager.getDefaultDisplay();
        Point point = new Point();
        display.getSize(point);
        int width = point.x;
        int height = point.y;
        int smallerDimension = width < height ? width : height;
        if(email.compareTo("") == 0) {
            Toast.makeText(getActivity(), "Cannot fetch email", Toast.LENGTH_LONG);
            return view;
        }

        QRGEncoder qrgEncoder = new QRGEncoder(email, null, QRGContents.Type.EMAIL, smallerDimension);
        try{
            bitmap = qrgEncoder.encodeAsBitmap();
            imageView.setImageBitmap(bitmap);

        }catch (WriterException e){
            e.printStackTrace();
        }


        // TODO: Create methods to add bank info

        return view;
    }

    public void addAccount(View view){

        // inflate the layout of the popup window
        LayoutInflater inflater = (LayoutInflater)
                getActivity().getSystemService(LAYOUT_INFLATER_SERVICE);
        View popupView = inflater.inflate(R.layout.tippee_account_form, null);


        // create the popup window
        int width = ConstraintLayout.LayoutParams.WRAP_CONTENT;
        int height = ConstraintLayout.LayoutParams.WRAP_CONTENT;
        boolean focusable = true; // lets taps outside the popup also dismiss it
        final PopupWindow popupWindow = new PopupWindow(popupView, width, height, focusable);


        // show the popup window
        // which view you pass in doesn't matter, it is only used for the window tolken
        popupWindow.showAtLocation(view, Gravity.CENTER, 0, 0);
        //popupWindow.setBackgroundDrawable(getActivity().getDrawable(android.R.drawable.picture_frame));

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            popupWindow.setElevation(10);
        }

        // dismiss the popup window when touched
        popupView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                popupWindow.dismiss();
                return true;
            }
        });



    }
}
