from flask import Flask
from redirects import redirects  # Importa o blueprint

app = Flask(__name__)

# Registra o blueprint
app.register_blueprint(redirects)

if __name__ == "__main__":
    app.run(debug=True)

