from runner.RunnerClass import Runner as Run
from runner.InputClass import CodeInput as Input
testCode = '''
>>>  class fruits:

>>>      def __init__(self, price):

>>>        self.price = price
>>>  obj=fruits(50)

>>>  obj.quantity=10

>>>  obj.bags=2

>>>  print(obj.quantity+len(obj.__dict__))'''
inputCode = Input(testCode)
runner = Run(inputCode.process())
runner.run()
