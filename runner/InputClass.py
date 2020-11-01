class CodeInput:
    def __init__(self, rawCode):
        self.rawCode = rawCode

    def process(self):
        print("---Raw Code:")
        print(self.rawCode)
        # spilt the code
        rawCodeList = self.rawCode.split('\n')
        print(rawCodeList)
        # delete the unnecessary elements
        rawCodeList = list(filter(lambda x: x != '', rawCodeList))
        # calculate the indent
        rawCodeList[0] = rawCodeList[0].replace('>', '')
        indent = 0
        while indent < len(rawCodeList[0]):
            if rawCodeList[0][indent] != ' ':
                break
            indent += 1
        for i in range(len(rawCodeList)):
            # Delete the symbol of the beginning
            rawCodeList[i] = self.__deleSymbol(rawCodeList[i])
            # set the indent
            rawCodeList[i] = self.__indent(rawCodeList[i], indent)
            # replace the print
            rawCodeList[i] = self.__replacePrint(rawCodeList[i])
        rawCodeList.insert(0, 'global specialRes')
        rawCodeList.insert(1, 'specialRes = []')
        resCode = '\n'.join(rawCodeList)
        print('---Process Code:')
        print(resCode)
        return resCode

    def __deleSymbol(self, code):
        return code.replace('>', '')

    def __indent(self, code, indent):
        return code[indent:]

    def __replacePrint(self, code):
        return code.replace('print','specialRes.append')