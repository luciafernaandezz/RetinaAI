from flask import Flask, request, render_template, jsonify
import joblib
import mysql.connector
import sys, importlib, numpy as np
from flask_cors import CORS
#from tensorflow.keras.models import load_model
from joblib import load
import sys, importlib


from modelos.datos import genero, edad_erg
app = Flask(__name__)
CORS(app)

# Cargar modelo .joblib (ajusta el nombre según el tuyo)
modelo = joblib.load("modelo_xgboost.joblib")
modelo_com = joblib.load("modelo_C4.joblib")



db_con = mysql.connector.connect(
    host="localhost", user="root", password="12345", database="animales"
)


@app.route("/api/consultor", methods=["GET"])
def obtener_animales():

    cursor = db_con.cursor()

    cursor = db_con.cursor(dictionary=True)  # Use dictionary cursor for named access

    # Query to fetch all the animals' data
    cursor.execute("SELECT * FROM animales")

    # Fetch all rows with named access
    rows = cursor.fetchall()
    # Prepare a list of dictionaries for the response
    animales_data = []
    for row in rows:
        # Access each column by name
        animal = {
            "ID_Animal": row["ID_animal"],
            "Sexo": (
                "Feminino"
                if row["Sexo"] == 0
                else "Masculino" if row["Sexo"] == 1 else "Sin specificar"
            ),
            "OD_1": row["OD_1"],
            "OI_1": row["OI_1"],
            "OD_2": row["OD_2"],
            "OI_2": row["OI_2"],
            "OD_3": row["OD_3"],
            "OI_3": row["OI_3"],
            "OD_4": row["OD_4"],
            "OI_4": row["OI_4"],
            "OD_5": row["OD_5"],
            "OI_5": row["OI_5"],
            "Edad_Opto": row["Edad_Opto"],
            "Dato_OPT": row["Dato_OPT"],
            "Edad_ERG": next(
                (
                    item["nombre"]
                    for item in edad_erg
                    if item["numero"] == row["Edad_ERG"]
                ),
                "Unknown",
            ),
            "degenera": row["degenera"],
        }
        animales_data.append(animal)
        cursor.close()
    return jsonify(animales_data)

@app.route("/clasificar_completo", methods=["POST"])
def clasificar_completo():
    print("mierda")
    try:
        # Obtener genero primero
        genero = int(request.form["genero"])
        print("hola")
        print(genero)
        # OD/OI Escotópico y Fotópico
        valores_od_oi = [
            float(request.form["OD_12"]),
            float(request.form["OI_12"]),
            float(request.form["OD_22"]),
            float(request.form["OI_22"]),
            float(request.form["OD_32"]),
            float(request.form["OI_32"]),
            float(request.form["OD_42"]),
            float(request.form["OI_42"]),
        ]
        # Datos adicionales
        edad_opto = float(request.form["Edad_Opto2"])
        print(edad_opto)
        dato_opt = float(request.form["Dato_OPT2"])
        oct_onl = float(request.form["OD_52"])
        oct_retina = float(request.form["OI_52"])
        edad_erg = float(request.form["edad_erg"])
        # Construir entrada al modelo
        valores = [genero] + valores_od_oi + [edad_opto, dato_opt, oct_onl, oct_retina, edad_erg]
        print("Valores recibidos:", valores)

        # Convertir y predecir
        entrada = np.array([valores])
        prediccion = modelo_com.predict(entrada)
        print("Predicción:", prediccion[0])

        return jsonify({"resultado": str(prediccion[0])})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)})


# Funciones
@app.route("/api/genero", methods=["GET"])
def obtener_genero():
    return jsonify(genero)


@app.route("/api/edad_erg", methods=["GET"])
def obtener_edad_erg():
    return jsonify(edad_erg)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/clasificar", methods=["POST"])
def clasificar():
    try:
        # Obtener genero primero
        genero = int(request.form["genero"])

        # Obtener los valores OD/OI
        valores_od_oi = [
            float(request.form["OD_1"]),
            float(request.form["OI_1"]),
            float(request.form["OD_2"]),
            float(request.form["OI_2"]),
            float(request.form["OD_3"]),
            float(request.form["OI_3"]),
            float(request.form["OD_4"]),
            float(request.form["OI_4"]),
        ]

        # Obtener edad_erg al final
        edad_erg = float(request.form["edad_erg"])

        # Formar el array en el orden correcto
        valores = [genero] + valores_od_oi + [edad_erg]

        print("Valores recibidos:", valores)

        # Convertir a array y hacer predicción
        entrada = np.array([valores])
        prediccion = modelo.predict(entrada)
        print("Predicción hecha " + str(prediccion[0]))

        return jsonify({"resultado": str(prediccion[0])})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
