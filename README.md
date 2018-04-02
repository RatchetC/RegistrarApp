# RegistrarApp

Welcome to the RegistrarApp repository. This app is going to be used to register members of the public to the event that the admin has created on the **[EventCreatorApp](https://github.com/RatchetC/MSF-Database-and-API/tree/master/code/production/EventCreatorApp)**

## Required software

### NodeJS

>
>Download it **[here](https://nodejs.org)**
>

### Cordova

> To install Cordova please ensure that you have installed NodeJS and that npm was installed along with it (it should be).
> You can do this by running the `node -v` and the `npm -v` commands in either the Command Prompt (Windows) or the Terminal (Mac/Linux).
> Once you've confirmed that NodeJS and npm are installed on your machine, you can run the `npm install -g cordova` command to install Cordova onto your machine
> The following snippet shows you exactly this.

```bash
$ node -v
v8.9.0
$ npm -v
v5.5.1
$ npm install -g cordova
```

### Ionic

>Ionic is a framework built on top of Cordova that makes it easier to create cross platform mobile apps with one code base consisting of web technologies.
>To install Ionic you can simply follow the same process as installing **[Cordova](###Cordova)**
>Check if NodeJS and npm are installed and then run the `npm install -g ionic` command.
>Running this command before you have installed Cordova is fine as you will be prompted to confirm whether you want Cordova installed alongside with Ionic or not. Simply say yes and Cordova will be installed before Ionic to ensure that there aren't any problems.

Ionic installation :

```bash
$ node -v
v8.9.0
$ npm -v
v5.5.1
$ npm install -g ionic
```

### Java

>The Java Development Kit is required to build and run the project on android. You can download and install it [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

### Android Studio

>The Android SDK is also needed to build and run the project on Android and the best way to install it is to download Android Studio and use the SDK Manager to download the minimum SDK for the project which is Android 4.4 KitKat. You can download Android Studio [here](https://developer.android.com/studio/index.html).

## Download the project

>Download the project as a zip file and unzip into the folder you want to keep it in or clone this repository from GitHub. You can clone the repository easily using **[GitHub Desktop](https://desktop.github.com/)** or any other version control system software, e.g. **[SourceTree](https://www.sourcetreeapp.com/)**.

## Running the Event Creator App in your Browser

```bash
cd ~/Documents/GitHub/RegistrarApp
ionic serve
```

## Running the project in an Android Emulator

>Before you can run the project on an android device you must have the Android studio downloaded.
>You must create a project in Android Studio ( it can be an empty project as you are only doing this to get access to the AVD manager ) and open the AVD Manager and create the virtual device that you want to run the app on. You can find a guide to doing this **[here](https://developer.android.com/studio/run/managing-avds.html)**
>Once you have done this, you can navigate to the top level folder of the Ionic project and run the `ionic cordova emulate android` command to emulate the project in the android emulator that you set up earlier.

```bash
ionic cordova emulate android
```

## Running the project on an Android Device

### Requirements

Android Device
>Please make sure that USB debugging is turned on, on your device and that it is connected to the computer. To see if the computer detects your device, after connecting it to the computer with a USB cable, run the `adb devices` command.

Java Development Kit and Android Software Development Kit
>The JAVA_HOME PATH variable must be set to the location of your JDK installation.
>The ANDROID_HOME PATH variable must be set to the location of your Android SDK installation.
>A guide to set PATH variables can be found **[here](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-environment-variables)**

### Running the app on your Android Device

>Navigate to the top level folder of the project and run the `ionic cordova platform` command. This should show you a list of platforms that you have installed and a list of platforms that are available for installation. If android is not already installed, ( which it shouldn't be if this is the first time that you are running this app on a device ), run the `ionic cordova platform add android` command to download and add the android platform. Once that is finished, run the `ionic cordova run android` command to build and run the app on your Android Device.

```bash
ionic cordova platform
ionic cordova platform add android
ionic cordova run android
```
