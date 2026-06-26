export const answersData = {
    '1a': {
        code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score

iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = GaussianNB()
model.fit(X_train, y_train)

predicted = model.predict(X_test)

new_instance = [[5.1, 3.5, 1.4, 0.2]]
new_pred = model.predict(new_instance)

print("Test Set Predicted:", predicted[:10])
print("Test Set Actual   :", y_test[:10])
print(f"Predicted class for new instance {new_instance}: {iris.target_names[new_pred[0]]} (Class {new_pred[0]})")

accuracy = accuracy_score(y_test, predicted)
precision = precision_score(y_test, predicted, average='macro')
recall = recall_score(y_test, predicted, average='macro')
cm = confusion_matrix(y_test, predicted)

print("Accuracy:", accuracy)
print("Precision (Macro):", precision)
print("Recall (Macro):", recall)
print("Confusion Matrix:")
print(cm)`,
        output: `Test Set Predicted: [1 0 2 1 1 0 1 2 1 1]
Test Set Actual   : [1 0 2 1 1 0 1 2 1 1]
Predicted class for new instance [[5.1, 3.5, 1.4, 0.2]]: setosa (Class 0)
Accuracy: 1.0
Precision (Macro): 1.0
Recall (Macro): 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '1b': {
        code: `import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error, r2_score

data = load_diabetes()
X = data.data
y = data.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = KNeighborsRegressor(n_neighbors=5)
model.fit(x_train, y_train)

y_pred = model.predict(x_test)

new_instance = [x_test[0]]
new_pred = model.predict(new_instance)

print("Test Set Predicted (first 5):", y_pred[:5])
print("Test Set Actual (first 5)   :", y_test[:5])
print(f"Predicted target value for new instance: {new_pred[0]:.2f}")
print(f"Actual target value: {y_test[0]:.2f}")

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error (MSE):", mse)
print("R2 Score (Coefficient of Determination):", r2)`,
        output: `Test Set Predicted (first 5): [138.8 190.2 144.  228.6 153. ]
Test Set Actual (first 5)   : [219.  70. 202. 230. 111.]
Predicted target value for new instance: 138.80
Actual target value: 219.00
Mean Squared Error (MSE): 3019.073483146067
R2 Score (Coefficient of Determination): 0.4301389814488812`
    },
    '2a': {
        code: `male(jack).
male(oliver).
male(ali).
male(simon).
female(eve).
female(joy).
female(lisa).

parent(jack, oliver).
parent(jack, joy).
parent(eve, oliver).
parent(eve, joy).
parent(oliver, ali).
parent(lisa, ali).
parent(oliver, simon).
parent(lisa, simon).

father(F, C) :- parent(F, C), male(F).
mother(M, C) :- parent(M, C), female(M).

sibling(X, Y) :- 
    parent(P, X), 
    parent(P, Y), 
    X \\= Y.

grandparent(GP, GC) :- 
    parent(GP, P), 
    parent(P, GC).

grandfather(GF, GC) :- 
    grandparent(GF, GC), 
    male(GF).

grandmother(GM, GC) :- 
    grandparent(GM, GC), 
    female(GM).

uncle(U, N) :- 
    parent(P, N), 
    sibling(U, P), 
    male(U).

aunt(A, N) :- 
    parent(P, N), 
    sibling(A, P), 
    female(A).`,
        output: `% Query results:
?- father(jack, oliver).
true.

?- sibling(oliver, joy).
true.

?- grandparent(jack, ali).
true.

?- grandfather(jack, ali).
true.

?- uncle(joy, ali).
false.

?- aunt(joy, ali).
true.

?- sibling(X, joy).
X = oliver.`
    },
    '2b': {
        code: `import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error, r2_score

data = load_diabetes()
X = data.data
y = data.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = SVR(kernel='linear')
model.fit(x_train, y_train)

y_pred = model.predict(x_test)

new_instance = [x_test[0]]
new_pred = model.predict(new_instance)

print("Test Set Predicted (first 5):", y_pred[:5])
print("Test Set Actual (first 5)   :", y_test[:5])
print(f"Predicted target value for new instance: {new_pred[0]:.2f}")
print(f"Actual target value: {y_test[0]:.2f}")

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error (MSE):", mse)
print("R2 Score (Coefficient of Determination):", r2)`,
        output: `Test Set Predicted (first 5): [142.25188635 141.49730024 141.99010604 145.04413163 141.5545753 ]
Test Set Actual (first 5)   : [219.  70. 202. 230. 111.]
Mean Squared Error (MSE): 5190.387663027928
R2 Score (Coefficient of Determination): 0.020339939398460127`
    },
    '3a': {
        code: `from heapq import heappush, heappop

graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('D', 2), ('E', 5)],
    'C': [('F', 3)],
    'D': [('G', 1)],
    'E': [('G', 2)],
    'F': [('G', 5)],
    'G': []
}

# Heuristic values
heuristic = {
    'A': 7,
    'B': 6,
    'C': 2,
    'D': 1,
    'E': 2,
    'F': 4,
    'G': 0
}

def a_star(start, goal):
    open_list = []
    heappush(open_list, (0, start))

    g_cost = {start: 0}
    parent = {start: None}

    while open_list:
        f, current = heappop(open_list)

        if current == goal:
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1], g_cost[goal]

        for neighbor, cost in graph[current]:
            new_g = g_cost[current] + cost

            if neighbor not in g_cost or new_g < g_cost[neighbor]:
                g_cost[neighbor] = new_g
                f_cost = new_g + heuristic[neighbor]
                heappush(open_list, (f_cost, neighbor))
                parent[neighbor] = current

    return None, float('inf')

path, cost = a_star('A', 'G')

print("Shortest Path:", path)
print("Total Cost:", cost)`,
        output: `Shortest Path: ['A', 'B', 'D', 'G']
Total Cost: 4`
    },
    '3b': {
        code: `likes(john, pizza).
likes(mary, sushi).
likes(john, sushi).
likes(ali, burger).
likes(eve, pizza).
likes(eve, sushi).

food_type(pizza, italian).
food_type(sushi, japanese).
food_type(burger, american).

food_compatible(X, Y) :- 
    likes(X, Food), 
    likes(Y, Food), 
    X \\= Y.

likes_cuisine(Person, Cuisine) :- 
    likes(Person, Food), 
    food_type(Food, Cuisine).`,
        output: `% Query results:
?- likes(john, Food).
Food = pizza ;
Food = sushi.

?- food_compatible(mary, john).
true.

?- likes_cuisine(Who, japanese).
Who = mary ;
Who = john ;
Who = eve.`
    },
    '4a': {
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
model = LogisticRegression(multi_class='multinomial', max_iter=200)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

new_instance = [[5.1, 3.5, 1.4, 0.2]]
new_pred = model.predict(new_instance)

print("Test Set Predicted:", y_pred[:10])
print("Test Set Actual   :", y_test[:10])
print(f"Predicted class for new instance {new_instance}: {iris.target_names[new_pred[0]]} (Class {new_pred[0]})")

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))`,
        output: `Test Set Predicted: [1 0 2 1 1 0 1 2 1 1]
Test Set Actual   : [1 0 2 1 1 0 1 2 1 1]
Predicted class for new instance [[5.1, 3.5, 1.4, 0.2]]: setosa (Class 0)
Accuracy: 1.0

Classification Report:
              precision    recall  f1-score   support

      setosa       1.00      1.00      1.00        10
  versicolor       1.00      1.00      1.00         9
   virginica       1.00      1.00      1.00        11

    accuracy                           1.00        30
   macro avg       1.00      1.00      1.00        30
weighted avg       1.00      1.00      1.00        30

Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '4b': {
        code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

iris = load_iris()
X = iris.data
y = iris.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=42)
model.fit(x_train, y_train)

y_pred = model.predict(x_test)

new_instance = [[5.1, 3.5, 1.4, 0.2]]
new_pred = model.predict(new_instance)

print("Test Set Predicted:", y_pred[:10])
print("Test Set Actual   :", y_test[:10])
print(f"Predicted class for new instance {new_instance}: {iris.target_names[new_pred[0]]} (Class {new_pred[0]})")

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))`,
        output: `Test Set Predicted: [1 0 2 1 1 0 1 2 1 1]
Test Set Actual   : [1 0 2 1 1 0 1 2 1 1]
Predicted class for new instance [[5.1, 3.5, 1.4, 0.2]]: setosa (Class 0)
Accuracy: 1.0

Classification Report:
              precision    recall  f1-score   support

      setosa       1.00      1.00      1.00        10
  versicolor       1.00      1.00      1.00         9
   virginica       1.00      1.00      1.00        11

    accuracy                           1.00        30
   macro avg       1.00      1.00      1.00        30
weighted avg       1.00      1.00      1.00        30

Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '5a': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans

iris = load_iris()
X = iris.data[:, :2]

model = KMeans(n_clusters=3, random_state=42, n_init=10)
model.fit(X)

labels = model.labels_
centroids = model.cluster_centers_

print("Centroids:\\n", centroids)
print("\\nFirst 30 Cluster Labels:\\n", labels[:30])

plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', s=50, label='Data Points')
plt.scatter(centroids[:, 0], centroids[:, 1], marker='X', color='red', s=200, label='Centroids')
plt.title("K-Means Clustering on Iris (Sepal Features)")
plt.xlabel("Sepal Length (cm)")
plt.ylabel("Sepal Width (cm)")
plt.legend()
plt.grid(True)
plt.show()`,
        output: `Centroids:
[[6.81276596 3.07446809]
 [5.77358491 2.69245283]
 [5.006      3.428     ]]

First 30 Cluster Labels:
[2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2]`
    },
    '5b': {
        code: `from heapq import heappush, heappop

# Graph representation
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': ['G'],
    'E': ['G'],
    'F': ['G'],
    'G': []
}

# Heuristic values
heuristic = {
    'A': 6,
    'B': 4,
    'C': 3,
    'D': 1,
    'E': 2,
    'F': 5,
    'G': 0
}

def greedy_best_first_search(start, goal):
    open_list = []
    visited = set()
    parent = {}

    heappush(open_list, (heuristic[start], start))
    parent[start] = None

    while open_list:
        h, current = heappop(open_list)

        if current == goal:
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1]

        if current not in visited:
            visited.add(current)

            for neighbor in graph[current]:
                if neighbor not in visited:
                    heappush(open_list,
                             (heuristic[neighbor], neighbor))
                    parent[neighbor] = current

    return None

path = greedy_best_first_search('A', 'G')

print("Path to goal:", path)`,
        output: `Path to goal: ['A', 'C', 'F', 'G']`
    },
    '6a': {
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score

iris = load_iris()
X = iris.data
y = iris.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(x_train, y_train)

y_pred = model.predict(x_test)

new_instance = [[5.1, 3.5, 1.4, 0.2]]
new_pred = model.predict(new_instance)

print("Test Set Predicted:", y_pred[:10])
print("Test Set Actual   :", y_test[:10])
print(f"Predicted class for new instance {new_instance}: {iris.target_names[new_pred[0]]} (Class {new_pred[0]})")

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
cm = confusion_matrix(y_test, y_pred)

print("Accuracy:", accuracy)
print("Precision (Macro):", precision)
print("Recall (Macro):", recall)
print("Confusion Matrix:")
print(cm)`,
        output: `Test Set Predicted: [1 0 2 1 1 0 1 2 1 1]
Test Set Actual   : [1 0 2 1 1 0 1 2 1 1]
Predicted class for new instance [[5.1, 3.5, 1.4, 0.2]]: setosa (Class 0)
Accuracy: 1.0
Precision (Macro): 1.0
Recall (Macro): 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '6b': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

iris = load_iris()
X = iris.data[:, :2]

model = AgglomerativeClustering(n_clusters=3)
labels = model.fit_predict(X)

print("First 30 Cluster Labels:\\n", labels[:30])

plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', s=50)
plt.title("Agglomerative Hierarchical Clustering")
plt.xlabel("Sepal Length (cm)")
plt.ylabel("Sepal Width (cm)")
plt.grid(True)
plt.show()

Z = linkage(X, method='ward')

plt.figure(figsize=(10, 5))
dendrogram(Z)
plt.title("Hierarchical Clustering Dendrogram (Ward Linkage)")
plt.xlabel("Data Point Indices")
plt.ylabel("Distance Threshold")
plt.show()`,
        output: `First 30 Cluster Labels:
[1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1]`
    },
    '7a': {
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score

iris = load_iris()
X = iris.data
y = iris.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = SVC(kernel='linear', C=1.0)
model.fit(x_train, y_train)

y_pred = model.predict(x_test)

new_instance = [[5.1, 3.5, 1.4, 0.2]]
new_pred = model.predict(new_instance)

print("Test Set Predicted:", y_pred[:10])
print("Test Set Actual   :", y_test[:10])
print(f"Predicted class for new instance {new_instance}: {iris.target_names[new_pred[0]]} (Class {new_pred[0]})")

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
cm = confusion_matrix(y_test, y_pred)

print("Accuracy:", accuracy)
print("Precision (Macro):", precision)
print("Recall (Macro):", recall)
print("Confusion Matrix:")
print(cm)`,
        output: `Test Set Predicted: [1 0 2 1 1 0 1 2 1 1]
Test Set Actual   : [1 0 2 1 1 0 1 2 1 1]
Predicted class for new instance [[5.1, 3.5, 1.4, 0.2]]: setosa (Class 0)
Accuracy: 1.0
Precision (Macro): 1.0
Recall (Macro): 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '7b': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.mixture import GaussianMixture

iris = load_iris()
X = iris.data[:, :2]

model = GaussianMixture(n_components=3, random_state=42)
model.fit(X)

labels = model.predict(X)

print("First 30 Cluster Labels:\\n", labels[:30])
print("\\nGMM Estimated Means:\\n", model.means_)
print("\\nGMM Estimated Covariances:\\n", model.covariances_)
print("\\nGMM Estimated Weights (Priors):\\n", model.weights_)

plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', s=50)
plt.title("Expectation Maximization (Gaussian Mixture Model)")
plt.xlabel("Sepal Length (cm)")
plt.ylabel("Sepal Width (cm)")
plt.grid(True)
plt.show()`,
        output: `First 30 Cluster Labels:
[2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2]

GMM Estimated Means:
[[6.68055626 3.02849627]
 [5.9009976  2.74387546]
 [5.01507898 3.4514463 ]]

GMM Estimated Covariances:
[[[0.36153508 0.05159664]
  [0.05159664 0.08927917]]

 [[0.27671149 0.08897036]
  [0.08897036 0.09389206]]

 [[0.11944714 0.08835648]
  [0.08835648 0.11893388]]]

GMM Estimated Weights (Priors):
[0.29474143 0.38081285 0.32444572]`
    }
};
