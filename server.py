from flask import Flask, render_template, request, redirect, session, url_for


app = Flask(__name__)


app.config['SECRET_KEY'] = "prettysecretkey"


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return render_template('game.html', height=3, width=2)
    else:
        session['height'] = int(request.form['height'])
        session['width'] = int(request.form['width'])
        session['name'] = request.form['name']

        return redirect(url_for('game'))


@app.route("/game", methods=['GET'])
def game():
    return render_template("game.html", height=session['height'], width=session['width'], name=session['name'])


if __name__ == "__main__":
    app.run(debug=True)