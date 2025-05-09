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
    try:
        user_ref = db.reference(f"users/{uid}")
        user_data = user_ref.get()

        if user_data:
            return jsonify(user_data), 200
        else:
            return jsonify({ "error": "User not found" }), 404

    except Exception as e:
        return jsonify({ "error": str(e) }), 500
    
@app.route("/gain-xp", methods=["POST"])
def gain_xp():
    data = request.json
    uid = data["uid"]
    xp_gain = data["amount"]

    ref = db.reference(f"users/{uid}")
    user = ref.get()
    
    xp = user["xp"] + xp_gain
    new_level = xp // 100 + 1
    new_hp = 100 + (new_level * 10)

    ref.update({
        "xp": xp,
        "level": new_level,
        "hp": new_hp
    })

    return jsonify({ "xp": xp, "level": new_level, "hp": new_hp })

@app.route("/add-coins", methods=["POST"])
def add_coins():
    data = request.json
    uid = data["uid"]
    amount = data["amount"]

    ref = db.reference(f"users/{uid}")
    current = ref.get()
    coins = current["coins"] + amount
    ref.update({ "coins": coins })

    return jsonify({ "coins": coins })

@app.route("/update-progress", methods=["POST"])
def update_progress():
    data = request.json
    uid = data["uid"]
    topic = data["topic"]
    progress = data["progress"]  # float between 0.0–1.0

    ref = db.reference(f"users/{uid}/progress")
    ref.update({ topic: progress })

    return jsonify({ topic: progress })


@app.route("/battle-result", methods=["POST"])
def battle_result():
    data = request.json
    uid = data["uid"]
    won = data["won"]  # boolean
    time = data["time"]  # seconds

    ref = db.reference(f"users/{uid}")
    user = ref.get()

    new_wins = user["battle"]["won"] + (1 if won else 0)
    new_losses = user["battle"]["lost"] + (0 if won else 1)
    fastest = min(user["battle"]["fastest"], time)

    ref.child("battle").update({
        "won": new_wins,
        "lost": new_losses,
        "fastest": fastest
    })

    return jsonify({ "won": new_wins, "lost": new_losses, "fastest": fastest })

@app.route("/equip-skin", methods=["POST"])
def equip_skin():
    data = request.json
    uid = data["uid"]
    skin = data["skin"]

    ref = db.reference(f"users/{uid}/inventory")
    ref.update({ "equipped_skin": skin })

    return jsonify({ "equipped_skin": skin })

@app.route("/unlock-skin", methods=["POST"])
def unlock_skin():
    data = request.json
    uid = data["uid"]
    skin = data["skin"]

    ref = db.reference(f"users/{uid}/inventory/skins")
    ref.update({ skin: True })

    return jsonify({ "unlocked": skin })


if __name__ == "__main__":
    app.run(debug=True)