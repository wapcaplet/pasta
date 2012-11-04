#! /usr/bin/env python

from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def edit():
    return render_template('edit.html')

if __name__ == '__main__':
    app.debug = True
    app.run()

