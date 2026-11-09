"""Root entrypoint to run saathi-wellbeing (A LITTLE SPACE FOR YOU).

Usage:
    py main.py
    # or
    python main.py
    # or double click run_app.bat
"""

import sys
import os
import subprocess

# Self-healing dependency check
try:
    import uvicorn
    import fastapi
    from backend.main import app
except ModuleNotFoundError as err:
    missing_pkg = getattr(err, "name", "package")
    print("\n" + "=" * 65)
    print(f"⚠️  Missing dependency: '{missing_pkg}' in active Python interpreter.")
    print(f"📍 Active Python: {sys.executable}")
    print("⏳ Attempting automatic installation from requirements.txt...")
    print("=" * 65 + "\n")
    req_file = os.path.join(os.path.dirname(__file__), "requirements.txt")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", req_file])
        print("\n✅ Dependencies installed successfully! Continuing startup...\n")
        import uvicorn
        from backend.main import app
    except Exception as install_err:
        print(f"\n❌ Automatic installation failed: {install_err}")
        print("Please run this command manually in your terminal:")
        print(f'    "{sys.executable}" -m pip install -r requirements.txt\n')
        sys.exit(1)

if __name__ == "__main__":
    print("=" * 68)
    print("🌱 Starting saathi-wellbeing Server")
    print("✨ Tagline: A LITTLE SPACE FOR YOU")
    print("🎓 Configured for: Devi Ahilya Vishwavidyalaya & Indian Academics")
    print("🌐 Dashboard URL: http://127.0.0.1:8000")
    print("📚 Interactive API Docs (Swagger): http://127.0.0.1:8000/docs")
    print("🩺 Health Check: http://127.0.0.1:8000/health")
    print("=" * 68)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)
