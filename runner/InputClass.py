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
        rawCodeList[0] = rawCodeList[0].replace('\xa0', '')
        indent = 0
        while indent < len(rawCodeList[0]):
            if rawCodeList[0][indent] != ' ':
                break
            indent += 1
        # change the content
        for i in range(len(rawCodeList)):
            # Delete the symbol of the beginning
            rawCodeList[i] = self.__deleSymbol(rawCodeList[i])
            # set the indent
            rawCodeList[i] = self.__indent(rawCodeList[i], indent)
        # change the sys output
        self.__changeOutput(rawCodeList)
        # join the content
        resCode = '\n'.join(rawCodeList)
        print('---Process Code:')
        print(resCode)
        return resCode

    def __deleSymbol(self, code):
        code = code.replace('>', '')
        code = code.replace('\xa0','')
        return code

    def __indent(self, code, indent):
        return code[indent:]

    def __changeOutput(self, list):
        list.insert(0, "tempFile = open('tempOutput.txt', 'w')")
        list.insert(1, "sys.stdout = tempFile")
        list.insert(0, "stdout_backup = sys.stdout")
        list.append("tempFile.close()")
        list.append("sys.stdout = stdout_backup")
