from flask import Flask, request
import json
from runner.Execute import Execute
from wsgiref.simple_server import make_server
app = Flask(__name__)

@app.route('/quizrunner', methods=['POST','GET'])
def serverQuiz():
    # get the code and run
    rawData = request.get_data()
    rawCode = json.loads(rawData)['code']
    outPut = Execute(rawCode).exctuteCode()
    return outPut