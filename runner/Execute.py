from runner.RunnerClass import Runner as Run
from runner.InputClass import CodeInput as Input

class Execute:
    def __init__(self, code):
        self.code = code

    def exctuteCode(self):
        inputCode = Input(self.code)
        processCode = inputCode.process()
        runner = Run(processCode)
        outPut = runner.run()
        return outPut

