@echo off

set "done=F"
set "mode=%~1"
setlocal EnableDelayedExpansion
if "!mode!"=="" ( echo ERROR : EMPTY ARG : provide an engine to use : js or py )

if "%mode%"=="js" ( node ..\..\hamill\hamilljs\hamill.mjs -p .\hamill.config.json )
if "%mode%"=="js" ( echo Produced with JavaScript )
if "%mode%"=="js" ( set "done=T" )

if "%mode%"=="py" ( python ..\..\hamill\hamillpy\hamill\hamill.py -p .\hamill.config.json )
if "%mode%"=="py" ( echo Produced with Python )
if "%mode%"=="py" ( set "done=T" )

if defined mode ( if "%done%"=="F" ( echo ERROR : UNKNOWN ENGINE : %mode%. Use only js or py ) )
