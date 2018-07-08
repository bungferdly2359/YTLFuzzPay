package com.ytlfuzzpay;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "YTLFuzzPay";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected Bundle getLaunchOptions() {
                Bundle initialProps = new Bundle();
                initialProps.putBoolean("debug", BuildConfig.DEBUG);
                initialProps.putBoolean("merchant", BuildConfig.APPLICATION_ID.contains("merchant"));
                initialProps.putBoolean("customer", BuildConfig.APPLICATION_ID.contains("customer"));
                initialProps.putBoolean("staging", BuildConfig.APPLICATION_ID.contains("staging"));
                initialProps.putBoolean("prod", !BuildConfig.APPLICATION_ID.contains("staging"));
                return initialProps;
            }
        };
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
