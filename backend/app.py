from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, db

# Initialize
app = Flask(__name__)
CORS(app)

# Connect to firebase and database
cred = credentials.Certificate('serviceAccountKey.json')
firebase = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://codemon-fffca-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

@app.route('/')
def home():
    return "Hello"

# Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        user = auth.create_user(
            email=data['email'],
            password=data['password'],
            display_name=data['name']
        )

        db.reference(f"users/{user.uid}").set({
            "uid": user.uid,
            "name": data["name"],
            "email": data["email"],
            "hp": 100,
            "xp": 0,
            "level": 1,
            "coins": 0,
            "progress": { "python": 0.0, "java": 0.0, "react": 0.0, "cs" : 0.0 },
            "battle": { "won": 0, "lost": 0, "fastest": 9999 },
            "inventory": {
                "skins": {
                    "default": True,
                    "skin1": False,
                    "skin2": False,
                    "skin3": False
                },
                "equipped_skin": "default"
            },
        })
        return jsonify({ "uid": user.uid, "message": "User created" }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/user/<uid>", methods=["GET"])
def get_user(uid):
    ref = db.reference(f"users/{uid}")
    data = ref.get()
    if data:
        return jsonify(data), 200
    else:
        return jsonify({"error": "User not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)