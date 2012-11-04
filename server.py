#! /usr/bin/env python

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def edit():
    return render_template('edit.html')

@app.route('/import', methods=['POST'])
def import_file():
    return request.files['import_file'].read()

if __name__ == '__main__':
    app.debug = True
    app.run()

