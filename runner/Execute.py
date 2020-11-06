from runner.RunnerClass import Runner as Run
from runner.InputClass import CodeInput as Input

class Execute:
    def __init__(self, code):
        self.code = code

    def exctuteCode(self):
        inputCode = Input(self.code)
        processCode = inputCode.process()
        runner = Run(processCode)
        runner.run()
        # get the print content
        f = open("tempOutput.txt", "r")
        outPut = f.read()
        f.close()
        return outPut
