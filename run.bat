@echo off
REM Pythoneer launcher — serves the static site and opens your browser.
REM Code runs in your browser via Pyodide; there is no Python backend.
cd /d "%~dp0web"
set PORT=8000
start "" http://localhost:%PORT%/
where py >nul 2>nul && (py -m http.server %PORT% & goto :eof)
python -m http.server %PORT%
