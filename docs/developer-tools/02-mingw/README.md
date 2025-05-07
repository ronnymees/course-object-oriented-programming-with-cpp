# C++ Compiler - MinGW

The C++ compiler will allow you to compile C++ source code into a binary that can be executed on your system.
As a compiler you can make use of **MinGW** which stands for "Minimalist GNU for Windows", which is a native Windows port of the GNU Compiler Collection (GCC).

::: tip GNU
GNU is an operating system and an extensive collection of computer software. **GNU is composed wholly of free software**, most of which is licensed under GNU's own GPL (General Purpose License). GNU is a recursive acronym for "GNU's Not Unix!", chosen because GNU's design is Unix-like, but differs from Unix by being free software and containing no Unix code. The GNU project includes an operating system kernel, GNU HURD, which was the original focus of the Free Software Foundation (FSF). However, non-GNU kernels, most famously Linux, can also be used with GNU software; and since the kernel is the least mature part of GNU, this is how it is usually used. The combination of GNU software and the Linux kernel is commonly known as GNU/Linux.
:::

MinGW can be downloaded at [https://sourceforge.net/projects/mingw/](https://sourceforge.net/projects/mingw/).

![MinGW Website](./img/step-01-mingw-site.png)

Navigate to `Downloads` and allow `mingw-get-setup.exe` to download.

![MinGW Download](./img/step-02-download.png)

Launch the installer and accept the license to continue.

![MinGW Accept License](./img/step-03-license.png)

Keep the installation directory to its default setting.

![MinGW Accept License](./img/step-04-destination.png)

Wait for the installer to finish. Then click `Continue`.

![MinGW Accept License](./img/step-05-installed.png)

Now the *Installation Manager* will open and allow you to install the required packages. Make sure to select the following packages from the `Basic Setup` category:

* `mingw32-base`
* `mingw32-gcc-g++`

![MinGW Accept License](./img/step-06-packages.png)

Next hit `Installation => Apply Changes` and click `Apply` in the confirmation dialog.

![MinGW Accept License](./img/step-07-apply.png)

Now wait for the packages to install.

![MinGW Accept License](./img/step-08-finished.png)

The end result should be the same as shown in the next screenshot.

![MinGW Packages](./img/step-09-all-green.png)

## Adding to PATH environment

Next you will need to add the `bin` directory of MinGW to your environment path on Windows. Right click `My Computer` and hit `Properties`.

Now navigate to `Advanced System settings => Advanced => Environment Variables => User variables`. Select the `Path` variable and hit `Edit`. Now create a `New` entry and choose `Browse`. Select the `bin` directory where you installed MinGW, standard this should be `C:\MinGW\bin`.

![Add MinGW bin dir to Path](./img/step-10-path.png)

## Check

To check if all is working as needed, open up a PowerShell window and issue the following command:

```bash
g++ --version
```

It should display the version of your C++ compiler.

![Check g++ version](./img/step-11-version.png)

