@Echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------


SETLOCAL enabledelayedexpansion
echo This script can repair Wallpaper Engine if Steam failed to install it correctly.

timeout 2 >nul

CD /d "%~dp0"

reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OS=32BIT || set OS=64BIT


if %OS%==64BIT (
echo Deleting potentially corrupted Dx9 runtime files
if exist "%systemroot%\SysWOW64\d3dx9_43.dll" (
del %systemroot%\SysWOW64\d3dx9_43.dll
)
)

echo Installing DirectX Redistributable
if not exist ".\_CommonRedist\DirectX\Jun2010\dxsetup.exe" (
echo The file _CommonRedist\DirectX\Jun2010\dxsetup.exe is missing. Please re-install.
pause
) else (
".\_CommonRedist\DirectX\Jun2010\dxsetup.exe" /silent
)

rem We don't want to run this as admin!!!
rem echo Resetting Wallpaper Engine installation
rem ".\installer.exe"

echo Done.
timeout 3 >nul
