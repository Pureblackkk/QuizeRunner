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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)