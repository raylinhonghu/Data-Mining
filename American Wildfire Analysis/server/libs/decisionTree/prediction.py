import numpy as np
import pandas as pd
from sklearn.cross_validation import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn import tree

class Prediction(): 
    
    

    def predict(self, year, lat, lon):
        balance_data = pd.read_csv('/app/server/libs/decisionTree/new.csv',sep= ',', header= None)

        X= balance_data.values[:,0:3]
        Y= balance_data.values[:,3]
        X_train, X_test, y_train, y_test = train_test_split( X, Y, test_size = 0.3, random_state = 100)

        clf_gini = DecisionTreeClassifier(criterion = "gini", random_state = 100,
                                       max_depth=3, min_samples_leaf=5)
        clf_gini.fit(X_train, y_train)

        clf_entropy = DecisionTreeClassifier(criterion = "entropy", random_state = 100,
         max_depth=3, min_samples_leaf=5)
        clf_entropy.fit(X_train, y_train)
        print year
        print lat
        print lon
        value = clf_gini.predict([[int(year), int(lon), int(lat)]])
                    
    
   
        

        return value[0]

