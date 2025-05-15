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
            "progress": { "python": 0, "java": 0, "react": 0, "cs" : 0 },
            "battle": { "won": 0, "lost": 0, "fastest": 9999 },
            "skin" : data["skin"]
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
        level = xp // 500 + 1

        ref.update({ "xp": xp, "level": level})

        return jsonify({ "xp": xp, "level": level}), 200
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

    try:
        ref = db.reference(f"users/{uid}/progress/{topic}")
        current = ref.get() or 0
        updated = current + 1

        ref.set(updated)

        return jsonify({ topic: updated }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

@app.route("/users/<uid>/battle", methods=["PATCH"])
def update_battle(uid):
    data = request.json
    won = data.get("won")
    # time = data.get("time")

    try:
        ref = db.reference(f"users/{uid}")
        user = ref.get()

        new_wins = user["battle"]["won"] + (1 if won else 0)
        new_losses = user["battle"]["lost"] + (1 if won == False else 0)
        # fastest = min(user["battle"]["fastest"], time)

        ref.child("battle").update({
            "won": new_wins,
            "lost": new_losses,
            # "fastest": fastest
        })

        return jsonify({ "won": new_wins, "lost": new_losses}), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 400
    
@app.route("/users/<uid>/skins", methods=["PATCH"])
def update_skin(uid):
    data = request.json
    skin = data.get("skin")
    if skin not in ["unun", "matt"]:
        return jsonify({ "error": "Invalid skin" }), 400
    try:
        db.reference(f"users/{uid}/skin").set(skin)
        return jsonify({ "skin": skin }), 200
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

@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    try:
        ref = db.reference("users")
        users = ref.get()

        leaderboard = []
        for uid, data in users.items():
            leaderboard.append({
                "uid": uid,
                "name": data.get("name", "Unknown"),
                "wins": data.get("battle", {}).get("won", 0),
            })

        # Sort by wins descending
        leaderboard.sort(key=lambda x: x["wins"], reverse=True)
        

        return jsonify(leaderboard[:10]), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)