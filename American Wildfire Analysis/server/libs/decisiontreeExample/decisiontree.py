from util2 import Arff2Skl
from sklearn import tree


class DecisionTree: 

    def createDecisionTreeModel(self):
        cvt = Arff2Skl('/app/server/libs/decisiontreeExample/contact-lenses.arff')  
        label = cvt.meta.names()[-1]
        X, y = cvt.transform(label)
        clf = tree.DecisionTreeClassifier(criterion = 'entropy')
        clf = clf.fit(X,y)
        return clf
    
    def __init__(self):
        print("ok")        




