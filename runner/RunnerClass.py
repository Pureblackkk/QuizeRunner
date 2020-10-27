class Runner:
    def __init__(self, processCode):
        self.proCode = processCode

    def run(self):
        compCode = compile(self.proCode, '', 'exec')
        exec(compCode)


