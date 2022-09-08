#!/bin/bash
hoppr_version=$(<version.txt)

# Constants - Change per flavour
apk_client_sample_id="com.example.clientexample"
apk_client_sample="client_sample.apk"

# DEFAULT VALUES
apk_app_apk=../$1-HopprTV/$1/app-$1.apk
apk_util_apk=../$1-HopprCC/$1/hopprtvutils-$1.apk
apk_app_bundleid=com.hoppr.androidtv.thumper.$1
apk_util_bundleid=com.hoppr.androidtv.utils.$1


case $1 in
  "dev")
    apk_app_bundleid=com.hoppr.androidtv.thumper
    apk_util_bundleid=com.hoppr.androidtv.utils
      ;;

  #any of the ff
  "uat" | "preview" | "prod" |  "prod2" |  "prod2debuggable" |  "prod3" |  "prod3debuggable")
    apk_app_bundleid=com.hoppr.androidtv.thumper.$1
    apk_util_bundleid=com.hoppr.androidtv.utils.$1
      ;;

  #"all else default to prod"
  *)
    apk_user_name="PRODUCTION"
    apk_app_apk=../prod-HopprTV/prod/app-prod.apk
    apk_util_apk=../prod-HopprCC/prod/hopprtvutils-prod.apk
    apk_app_bundleid=com.hoppr.androidtv.thumper.prod
    apk_util_bundleid=com.hoppr.androidtv.utils.prod
    ;;
esac

connect_device() {
   echo "______________________________________________________________"
   echo " Connect AndroidTV Devices "
   echo " IP Address can be found using Settings/General/Network Internet"
   echo "______________________________________________________________"
   read -r -p 'Enter IP Address : ' ip
   adb connect "$ip"
}


menu_analytics() {
    echo "______________________________________________________________"
    echo " Enable Analytics "
    echo "______________________________________________________________"
    echo adb shell setprop debug.firebase.analytics.app "$apk_app_bundleid"
    adb shell setprop debug.firebase.analytics.app "$apk_app_bundleid"
}

menu_disable_analytics() {
    echo "______________________________________________________________"
    echo " Disable Analytics "
    echo "______________________________________________________________"
    echo adb shell setprop debug.firebase.analytics.app .none.
    adb shell setprop debug.firebase.analytics.app .none.
}


disconnect_device() {
    echo "______________________________________________________________"
    echo " Disconnect all devices"
    echo "______________________________________________________________"
    adb disconnect
}

uninstall_hopprTV() {
    echo "______________________________________________________________"
    echo " Clean data and uninstalling..."
    echo "______________________________________________________________"
    echo adb shell pm clear "$apk_app_bundleid"
    adb shell pm clear "$apk_app_bundleid"
    echo adb uninstall "$apk_app_bundleid"
    adb uninstall "$apk_app_bundleid"
    echo adb uninstall "$apk_util_bundleid"
    adb uninstall "$apk_util_bundleid"
    echo adb uninstall "$apk_client_sample_id"
    adb uninstall "$apk_client_sample_id"
}


set_permissions() {
    echo "______________________________________________________________"
    echo " Set Permissions"
    echo "______________________________________________________________"

    echo adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow
    adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow
    sleep 2

    echo adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS
    adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS
    sleep 2

    echo adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE
    adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE
    sleep 2

    adb shell monkey -p "$apk_app_bundleid" 1
    adb shell input keyevent 3
    sleep 2

}

reboot() {
   echo "______________________________________________________________"
   echo " Rebooting TV.."
   echo "______________________________________________________________"
   adb reboot
}


launch_CC() {
   echo "______________________________________________________________"
   echo " Launch CC"
   echo "______________________________________________________________"
   adb shell monkey -p "$apk_util_bundleid" 1
}


set_permissions_api() {

  # Don't grant Write secure settings no accessibility will not be enabled

      echo adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow
    adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow

    echo adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS
    adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS

    echo adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE
    adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE

    echo adb shell am startservice "$apk_app_bundleid"/com.hoppr.android.services.HeadService
    adb shell am startservice "$apk_app_bundleid"/com.hoppr.android.services.HeadService
      adb shell monkey -p "$apk_app_bundleid" 1


}

clear_survey_history() {
  adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command clearSurveyHistory
}


request_hoppr_app_info() {

  echo "______________________________________________________________"
  echo "Hoppr Version Info"
  echo "______________________________________________________________"
  adb shell dumpsys package "$apk_app_bundleid" | grep version

  echo "______________________________________________________________"
  echo "Hoppr Permissions"
  echo "______________________________________________________________"
  adb shell dumpsys package "$apk_app_bundleid" | grep android.permission

  echo "______________________________________________________________"
  echo "Hoppr Signatures"
  echo ".............................................................."
  echo "_________________________  MAC  ______________________________"
    ./apksigner verify --verbose "$apk_app_apk"
  echo ".............................................................."

  echo ""
  echo ""

  echo ".............................................................."
  echo "________________________ Windows  ____________________________"
  echo ".............................................................."
  apksigner.bat verify --verbose "$apk_app_apk"
  echo ".............................................................."

}


install_hopprTV_API() {
    echo "______________________________________________________________"
    echo " Installing API hopprTV"
    echo "______________________________________________________________"
    clean_install_apps
    set_permissions_api
    adb install $apk_client_sample
    adb shell monkey -p $apk_client_sample_id 1
}

install_hopprTV() {
    echo "______________________________________________________________"
    echo " Installing"
    echo "______________________________________________________________"
    clean_install_apps
    set_permissions
    reboot
}

clean_install_apps(){
  uninstall_hopprTV
  echo adb install "$apk_app_apk"
  adb install "$apk_app_apk"
  echo adb install "$apk_util_apk"
  adb install "$apk_util_apk"
}

show_permissions() {
    echo "______________________________________________________________"
    echo " Permissions "
    echo "______________________________________________________________"

    echo Checking Overlay Permission
    echo *------------------------------------*
    adb shell appops get "$apk_app_bundleid" SYSTEM_ALERT_WINDOW
    echo *------------------------------------*
    echo

    echo Checking Write Secure Settings
    echo *------------------------------------*
    adb shell appops get "$apk_app_bundleid" WRITE_SECURE_SETTINGS
    echo *------------------------------------*
    echo

    echo Checking Read Phone State
    echo *------------------------------------*
    adb shell appops get "$apk_app_bundleid" READ_PHONE_STATE
    echo *------------------------------------*
    echo

    echo Checking HeadService
    echo *------------------------------------*
    adb shell dumpsys activity services com.hoppr.android.services.HeadService
    echo *------------------------------------*
    echo

    echo Checking AppInfoService
    echo *------------------------------------*
    adb shell dumpsys activity services com.hoppr.android.services.HopprAppInfoService
    echo *------------------------------------*
}

menu_setPermissions_manual() {
    echo adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow
    adb shell appops set "$apk_app_bundleid" SYSTEM_ALERT_WINDOW allow

    echo adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS
    adb shell pm grant "$apk_app_bundleid" android.permission.WRITE_SECURE_SETTINGS

    echo adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE
    adb shell pm grant "$apk_app_bundleid" android.permission.READ_PHONE_STATE

    echo adb shell settings put secure enabled_accessibility_services "$apk_app_bundleid"/com.hoppr.android.services.HopprAppInfoService
    adb shell settings put secure enabled_accessibility_services "$apk_app_bundleid"/com.hoppr.android.services.HopprAppInfoService

    echo adb shell am startservice "$apk_app_bundleid"/com.hoppr.android.services.HeadService
    adb shell am startservice "$apk_app_bundleid"/com.hoppr.android.services.HeadService
}

menu_setPermissions_manual_xray_only() {
    echo adb shell settings put secure enabled_accessibility_services "$apk_util_bundleid"/com.hoppr.xraysession.server.accessibilityServer.HopprAppInfoService
    adb shell settings put secure enabled_accessibility_services "$apk_util_bundleid"/com.hoppr.xraysession.server.accessibilityServer.HopprAppInfoService
}

menu_screenshot() {
    echo "______________________________________________________________"
    echo " X-Ray Screen Shot"
    echo "______________________________________________________________"
    read -r -p "Name of captured screen:" value
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command sendAccessibilityDataToServer  --es command2 "$value"
    sleep 1
    adb shell screencap -p /sdcard/screencap.png
}

menu_dev() {
    echo "______________________________________________________________"
    echo " Developer Menu"
    echo "______________________________________________________________"
    echo "  1)Toggle ConsoleView"
    echo "  2)Log Window/View hierarchy"
    echo "  3)Force enabling of keyEvents"
    echo "  4)Invoke TRIM_MEMORY_RUNNING_MODERATE ***"
    echo "  5)Invoke TRIM_MEMORY_RUNNING_LOW ***"
    echo "  6)Invoke TRIM_MEMORY_RUNNING_CRITICAL ***"
    echo "  7)Invoke TRIM_MEMORY_UI_HIDDEN ***"
    echo "  8)Invoke TRIM_MEMORY_BACKGROUND*"
    echo "  9)Invoke TRIM_MEMORY_MODERATE*"
    echo "  10)Invoke TRIM_MEMORY_COMPLETE*"
    echo "  11)Set Environment (Example)"
    echo "  12)Request Data Update"
    echo "  13)Restore to firmware (rollback apk)"
    echo "  14)Force crash"
    echo "  15)Play sample preroll"

    read -r -p "Enter choice (Ctrl-C cancel) " selection
       case $selection in
            1) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command toggleConsoleView;;
            2) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command logViewHierarchy;;
            3) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command enableKeys;;
            4) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_RUNNING_MODERATE;;
            5) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_RUNNING_LOW;;
            6) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_RUNNING_CRITICAL;;
            7) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_UI_HIDDEN;;
            8) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_BACKGROUND;;
            9) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_MODERATE;;
            10) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command TRIM_MEMORY_COMPLETE;;
            11) adb shell "am broadcast -a com.hoppr.androidtv.Broadcast -e command_params 'SET_ENVIRONMENT X Y'";;
            12) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command requestDataUpdate;;
            13) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command restoreToFirmware;;
            14) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command forceCrash;;
            15) adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command playSamplePreroll;;

          esac

}

screenshot() {
    echo "************Screenshot************"
    read -p "Enter filename: " value
    adb shell screencap -p /sdcard/"$value"
    sleep 1
    adb pull /sdcard/"$value"
    echo "save to $(pwd)/"$value""
}

menu_advanced() {
    echo " 1) Turn ON Analytics debugging"
    echo " 2) Turn OFF Analytics debugging"
    echo " 3) Developer options"
    echo " 4) Manual set permissions hopprTV"
    echo " 5) Manual set permissions XRaySession"
    echo " 6) API Install"
    echo " 7) Check permissions"
    echo " 8) set permissions (API Only)"
    echo " 9) Request Hoppr app info"
    echo " 10) Clear Survey History"



   read -p "Enter choice (Ctrl-C cancel) " n
   case $n in
     1)
       menu_analytics
     ;;
     2)
      menu_disable_analytics
     ;;
     3)
      menu_dev
     ;;
     4)
      menu_setPermissions_manual
     ;;
     5)
      menu_setPermissions_manual_xray_only
     ;;
     6)
      install_hopprTV_API
     ;;
     7)
      show_permissions
     ;;
     8)
      set_permissions_api
     ;;
     9)
      request_hoppr_app_info
     ;;
     10)
      clear_survey_history
     ;;


   esac

}

metrics_menu() {
    echo " 1) Enable metrics"
    echo " 2) Enable invisible metrics"
    echo " 3) Hide metrics"
    echo " 4) Show metrics"
    echo " 5) Clear metrics"
    echo " 6) Save report"
    echo " 7) Disable accessibility service"
    echo " 8) Enable charts"
    echo " 9) Enable IMA load metrics"

   read -p "Enter choice (Ctrl-C cancel) " n

   case $n in
     1)
      enable_metrics
     ;;
     2)
      enable_invisible_metrics
     ;;
     3)
      hide_metrics
     ;;
     4)
      show_metrics
     ;;
     5)
      clear_metrics
     ;;
     6)
      save_report
     ;;
     7)
      disable_accessibility_service
     ;;
     8)
      enable_metrics_charts
     ;;
     9)
      enable_ima_load_metrics
     ;;
   esac
}

enable_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command enableDebuggingMetrics
}

hide_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command hideMetricsWindow
}

show_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command showMetricsWindow
}

clear_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command clearMetrics
}

save_report() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command saveReport
}

enable_invisible_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command enableInvisibleMetrics
}

enable_metrics_charts() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command enableMetricsCharts
}

enable_ima_load_metrics() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command enableImaLoadMetrics
}

disable_accessibility_service() {
    adb shell am broadcast -a com.hoppr.androidtv.Broadcast --es command disableAccessibilityService
}

menu_top() {
    echo ""
    echo ""
    echo "______________________________________________________________"
    echo "hopprTV Utils v2.0 - $apk_user_name - $hoppr_version"
    echo "apk folder - $apk_app_apk"
    echo
    adb devices
    echo "______________________________________________________________"
    echo " 1) Connect Device"
    echo " 2) Install"
    echo " 3) Uninstall"
    echo " 4) Launch Control Center"
    echo " 5) Capture X-Ray"
    echo " 6) Disconnect all devices"
    echo " 7) Reboot box"
    echo " 8) More options"
    echo " 9) Screenshot"
    echo " 10) Metrics"
}


while true; do
   menu_top
   read -p "Enter choice (Ctrl-C cancel) " n
   case $n in
   1)
     connect_device
   ;;
   2)
     install_hopprTV
   ;;
   3)
     uninstall_hopprTV
   ;;
   4)
     launch_CC
   ;;
   5)
     menu_screenshot
   ;;
   6)
   disconnect_device
   ;;
   7)
    reboot
   ;;
   8)
   menu_advanced
   ;;
   9)
   screenshot
   ;;
   10)
   metrics_menu
   ;;
   esac
done
