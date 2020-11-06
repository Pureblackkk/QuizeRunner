# import possible package
import numpy as np
import pandas as pd
import requests
import sys
import time

class Runner:
    def __init__(self, processCode):
        self.proCode = processCode

    def run(self):
        compCode = compile(self.proCode, '', 'exec')
        exec(compCode)




