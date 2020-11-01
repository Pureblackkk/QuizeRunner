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
    # return the outPut to Client
    for i in range(len(outPut)):
        outPut[i] = 'Output'+str(1)+': '+outPut[i]
    retOutput = ';'.join(outPut)
    return retOutput