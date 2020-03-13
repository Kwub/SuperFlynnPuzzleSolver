import math
# Daniel Wei AOOD Pd. 3
# ACSLVeitch
# NOTE: this program is written with Python 3.

#converts hex to 4 digit binary
def hexToBinary(hexStr):
    # Code to convert hex to binary
    n = int(hexStr, 16)
    bStr = ''
    while n > 0:
        bStr = str(n % 2) + bStr
        n = n >> 1
    res = bStr

    fill = 4 - len(res)
    for i in range(0, fill):
        res = "0" + res
    return res

#constructs the board based on an input string
def constructBoard(inputStr):
    board = []
    for i in range(0, len(inputStr)):
        array = []
        res = hexToBinary(inputStr[i])
        for j in range(0, len(res)):
            array.append(int(res[j]))
        board.append(array)
    return board

#provides a list of variables corresponding to each position
def posToPlaceholder(pos):
    dict = [
        [0, 2, 5, 7], [0, 2, 4, 7], [1, 2, 4, 7], [1, 2, 5, 7],
        [0, 2, 5, 6], [0, 2, 4, 6], [1, 2, 4, 6], [1, 2, 5, 6],
        [0, 3, 5, 6], [0, 3, 4, 6], [1, 3, 4, 6], [1, 3, 5, 6],
        [0, 3, 5, 7], [0, 3, 4, 7], [1, 3, 4, 7], [1, 3, 5, 7],
    ]
    return dict[pos]

# placeholders range 0-7 and are used in place of the variable names for easier manipulation
def placeholderToVar(ph):
    dict = ["A", "~A", "B", "~B", "C", "~C", "D", "~D"]
    return dict[ph]
def varToPlaceholder(var):
    dict = {"A": 0, "~A": 1, "B": 2, "~B": 3, "C": 4, "~C": 5, "D": 6, "~D": 7}
    return dict[var]

# coordinates range from 0-15 and are used in place of (row, column) pairs
def coordinateToPosition(co):
    pos = co[1] + co[0] * 4
    return pos
def positionToCoordinate(pos):
    col = pos % 4
    row = int(pos / 4)
    return [row, col]

# Algorithm for simplify method:
# provides a simplification based on the coordinates given and marks off the coordinates from the board
# method to simplify
# Each square is associated with a combination of 4 distinct letters
# if the square is marked, then return that list of 4 distinct letters
# assemble the master string that represents the expression using the combinations of 4 letters from each square
# While assembling, use an array to track the count of each of the 8 unique letters possible
# if one of the unique letters AND its negation both appear once or more, then remove all occurences of that letter and its negation from the master string
# What remains should be the simplified expression
def simplify(positions):
    masterStr = ""

    variableCounter = [0, 0, 0, 0, 0, 0, 0, 0]
    for i in range(0, len(positions)):
        pos = positions[i]
        phList = posToPlaceholder(pos)
        for ph in phList:
            masterStr += str(ph)
            variableCounter[ph] += 1
        if i < len(positions) - 1:
            masterStr += "+"

    # remove variables which are present with their negations
    for i in range(0, 8, 2):
        if variableCounter[i] > 0 and variableCounter[i+1] > 0:
            masterStr = masterStr.replace(str(i), "")
            masterStr = masterStr.replace(str(i+1), "")

    # since we use the full 4 variable term, we will get overlap (ex. 2+2+2+2+2+2+2+2). simplify any overlapping terms by removing duplicate strings
    # accomplished through a trick involving using the values of the masterStr as unique keys.
    filteredList = list(dict.fromkeys(masterStr.split("+")))
    #sorting the list so we can have alphabetical order later
    filteredList.sort()

    masterStr = ""
    for i in range(0, len(filteredList)):
        masterStr += filteredList[i]
        if i < len(filteredList) - 1:
            masterStr += "+"

    # print(masterStr)
    return masterStr

#returns the piece of the equation from grouping 8
def group8(board, expression=""):
    #full row
    for i in range(0, len(board) - 1):
        if board[i] == [1, 1, 1, 1] and board[i + 1] == [1, 1, 1, 1]:
            #mark off the used squares so we don't use them again
            board[i] = [0, 0, 0, 0]
            board[i + 1] = [0, 0, 0, 0]
            positions = [coordinateToPosition([j, k]) for j in [i, i+1] for k in range(0, 4)]
            string = simplify(positions)
            expression += "+" + string
    #col
    for i in range(0, len(board[0]) - 1):
        # fancy list comprehension 
        if len([j for j in range(0, 4) if board[j][i] == 1]) == 4 and len([j for j in range(0, 4) if board[j][i + 1] == 1]) == 4:
            # mark off used squares
            for k in range(0, 4):
                board[k][i] = 0
                board[k][i + 1] = 0  
            positions = [coordinateToPosition([l, m]) for l in range(0, 4) for m in [i, i+1]]
            string = simplify(positions)
            expression += "+" + string
    #end row
    if len([j for j in range(0, 4) if board[j][0] == 1]) == 4 and len([j for j in range(0, 4) if board[j][3] == 1]) == 4:
        for k in range(0, 4):
            board[k][0] = 0
            board[k][3] = 0
        positions = [coordinateToPosition([l, m]) for l in range(0, 4) for m in [0, 3]]
        string = simplify(positions)
        expression += "+" + string

    #endcol
    if board[0] == [1, 1, 1, 1] and board[3] == [1, 1, 1, 1]:
       board[0] = [0, 0, 0, 0]
       board[3] = [0, 0, 0, 0]
       positions = [coordinateToPosition([j, k]) for j in [0, 3] for k in range(0, 4)]
       string = simplify(positions)
       expression += "+" + string
    return expression

def group4(board, expression):
    #rows
    for i in range(0, 4):
        if board[i] == [1, 1, 1, 1]:
            #mark off the used squares so we don't use them again
            board[i] = [0, 0, 0, 0]
            positions = [coordinateToPosition([i, j]) for j in range(0, 4)]
            string = simplify(positions)
            expression += "+" + string
    #columns
    for i in range(0, 4):
        # fancy list comprehension 
        if len([j for j in range(0, 4) if board[j][i] == 1]) == 4:
            # mark off used squares
            for k in range(0, 4):
                board[k][i] = 0
            positions = [coordinateToPosition([l, i]) for l in range(0, 4)]
            string = simplify(positions)
            expression += "+" + string
    #blocks
    for i in range(0, 3):
        for j in range(0, 3):
            if (board[i][j] == 1 and board[i][j + 1] == 1 and board[i+1][j] == 1 and board[i+1][j+1]== 1):
                 # mark off used squares
                board[i][j] = 0
                board[i][j + 1] = 0
                board[i+1][j] = 0
                board[i+1][j+1]= 0
                positions = [coordinateToPosition([l, m]) for l in [i,i+1] for m in [j, j+1]] 
                string = simplify(positions)
                expression += "+" + string
    #adjacent end row
    for i in range(0, 3):
        if board[i][0] == 1 and board[i+1][0] == 1 and board[i][3] == 1 and board[i+1][3] == 1:
             # mark off used squares
            board[i][0] = 0
            board[i+1][0] = 0
            board[i][3] = 0
            board[i+1][3] = 0
            positions = [coordinateToPosition([j, k]) for j in [i, i+1] for k in [0, 3]]
            string = simplify(positions)
            expression += "+" + string
    #adjacent end column
    for i in range(0, 3):
        if board[0][i] == 1 and board[0][i+1] == 1 and board[3][i] == 1 and board[3][i+1] == 1:
            board[0][i] = 0 
            board[0][i+1] = 0 
            board[3][i] = 0
            board[3][i+1] = 0
            positions = [coordinateToPosition([j, k]) for j in [0, 3] for k in [i, i+1]]
            string = simplify(positions)
            expression += "+" + string
    #corners
    if board[0][0] == 1 and board[0][3] == 1 and board[3][0] == 1 and board[3][3] == 1:
         # mark off used squares
        board[0][0] = 0 
        board[0][3] = 0
        board[3][0] == 0
        board[3][3] == 0
        expression += "+57"
    return expression

def group2(board, expression):
    #row
    for i in range(0, 4):
        for j in range(0, 3):
            if (board[i][j] == 1 and board[i][j + 1] == 1):
                # mark off used squares
                board[i][j] = 0
                board[i][j + 1] = 0
                positions = [coordinateToPosition([i, j]), coordinateToPosition([i, j+1])] 
                string = simplify(positions)
                expression += "+" + string
    #col
    for i in range(0, 3):
        for j in range(0, 4):
            if (board[i][j] == 1 and board[i + 1][j] == 1):
                # mark off used squares
                board[i][j] = 0 
                board[i + 1][j] = 0
                positions = [coordinateToPosition([i, j]), coordinateToPosition([i + 1, j])] 
                string = simplify(positions)
                expression += "+" + string
    #endrow
    for i in range(0, 4):
        if board[i][0] == 1 and board[i][3] == 1:
            board[i][0] = 0 
            board[i][3] = 0
            positions = [coordinateToPosition([i, 0]), coordinateToPosition([i, 3])] 
            string = simplify(positions)
            expression += "+" + string
    #endcolumn
    for i in range(0, 4):
        if board[0][i] ==1 and board[3][i] == 1:
            board[0][i] = 0 
            board[3][i] = 0
            positions = [coordinateToPosition([0, i]), coordinateToPosition([3, i])] 
            string = simplify(positions)
            expression += "+" + string
    return expression

def group1(board, expression):
    for i in range(0, 4):
        for j in range(0, 4):
            if board[i][j] == 1:
                board[i][j] = 0
                position = [coordinateToPosition([i, j])]
                string = simplify(position)
                expression += "+" + string
    return expression

def translateString(placeholderString):
    newString = ""
    #since we always add a + before a term, there may be a leading +
    if placeholderString[0] == "+": placeholderString = placeholderString[1:]
    for i in range(0, len(placeholderString)):
        if placeholderString[i] == "+":
            newString += "+"
        else:
            newString += placeholderToVar(int(placeholderString[i]))
    return newString

def solve(board):
    answerStr = group8(board)
    answerStr = group4(board, answerStr)
    answerStr = group2(board, answerStr)
    answerStr = group1(board, answerStr)
    answerStr = translateString(answerStr)
    return answerStr

testData = ["FF33", "00CC", "6090", "8810", "9008", "F0B8", "9699", "8DD8", "C3C3", "F111"]
for data in testData:
    board = constructBoard(data)
    print(solve(board))



