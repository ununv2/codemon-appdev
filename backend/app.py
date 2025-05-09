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
        uid = data["uid"]
        db.reference(f"users/{uid}").set({
            "uid": uid,
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
        return jsonify({ "uid": uid, "message": "User created" }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/users", methods=["GET"])
def get_all_users():
    try:
        users_ref = db.reference(f"users")
        users_data = users_ref.get()
        
        if users_data:
            return jsonify(users_data), 200
        else:
            return jsonify({"message": "No users found"}), 404
    
    except Exception as e:
        return jsonify({"error": str(e) }), 500

@app.route("/users/<uid>", methods=["GET"])
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
    
@app.route("/users/<uid>/xp", methods=["PATCH"])
def update_xp(uid):
    data = request.json
    try:
        xp_gain = data.get("amount", 0)
        ref = db.reference(f"users/{uid}")
        user = ref.get()

        xp = user["xp"] + xp_gain
        level = xp // 100 + 1
        hp = 100 + level * 10

        ref.update({ "xp": xp, "level": level, "hp": hp })

        return jsonify({ "xp": xp, "level": level, "hp": hp }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route("/users/<uid>/coins", methods=["PATCH"])
def update_coins(uid):
    data = request.json
    try:
        amount = data.get("amount", 0)
        ref = db.reference(f"users/{uid}")
        user = ref.get()

        coins = user["coins"] + amount
        ref.update({ "coins": coins })

        return jsonify({ "coins": coins }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route("/users/<uid>/progress", methods=["PATCH"])
def update_progress(uid):
    data = request.json
    topic = data.get("topic")
    progress = data.get("progress")

    try:
        ref = db.reference(f"users/{uid}/progress")
        ref.update({ topic: progress })
        return jsonify({ topic: progress }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route("/users/<uid>/battle", methods=["PATCH"])
def update_battle(uid):
    data = request.json
    won = data.get("won")
    time = data.get("time")

    try:
        ref = db.reference(f"users/{uid}")
        user = ref.get()

        new_wins = user["battle"]["won"] + (1 if won else 0)
        new_losses = user["battle"]["lost"] + (0 if won == False else 0)
        fastest = min(user["battle"]["fastest"], time)

        ref.child("battle").update({
            "won": new_wins,
            "lost": new_losses,
            "fastest": fastest
        })

        return jsonify({ "won": new_wins, "lost": new_losses, "fastest": fastest }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400
    
@app.route("/users/<uid>/skins", methods=["PATCH"])
def update_skin(uid):
    data = request.json
    action = data.get("action")  # "equip" or "unlock"
    skin = data.get("skin")

    try:
        if action == "equip":
            db.reference(f"users/{uid}/inventory").update({
                "equipped_skin": skin
            })
            return jsonify({ "equipped_skin": skin }), 200
        elif action == "unlock":
            db.reference(f"users/{uid}/inventory/skins").update({
                skin: True
            })
            return jsonify({ "unlocked": skin }), 200
        else:
            return jsonify({ "error": "Invalid action" }), 400
    except Exception as e:
        return jsonify({ "error": str(e) }), 400
    
@app.route("/users/<uid>/skins", methods=["PATCH"])
def update_skin(uid):
    data = request.json
    action = data.get("action")  # "unlock" or "equip"
    skin = data.get("skin")

    try:
        if action == "unlock":
            db.reference(f"users/{uid}/inventory/skins").update({ skin: True })
            return jsonify({ "unlocked": skin }), 200
        elif action == "equip":
            db.reference(f"users/{uid}/inventory").update({ "equipped_skin": skin })
            return jsonify({ "equipped_skin": skin }), 200
        else:
            return jsonify({ "error": "Invalid action" }), 400
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@app.route("/users/<uid>", methods=["DELETE"])
def delete_user(uid):
    try:
        auth.delete_user(uid)
        db.reference(f"users/{uid}").delete()
        return jsonify({ "message": "User deleted" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == "__main__":
    app.run(debug=True)