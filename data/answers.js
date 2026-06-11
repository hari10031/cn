export const answersData = {
    '2a': {
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

print("Predicted:", predicted[:10])
print("Actual   :", y_test[:10])

accuracy = accuracy_score(y_test, predicted)
precision = precision_score(y_test, predicted, average='macro')
recall = recall_score(y_test, predicted, average='macro')
cm = confusion_matrix(y_test, predicted)

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("Confusion Matrix:")
print(cm)`,
        output: `Predicted: [1 0 2 1 1 0 1 2 1 1]
Actual   : [1 0 2 1 1 0 1 2 1 1]
Accuracy: 1.0
Precision: 1.0
Recall: 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '2b': {
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

model = KNeighborsRegressor(n_neighbors=3)

model.fit(x_train, y_train)

y_pred = model.predict(x_test)

print("Predicted:", y_pred[:5])
print("Actual   :", y_test[:5])

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("MSE:", mse)
print("R2 Score:", r2)`,
        output: `Predicted: [130.66666667 194.66666667 145.         239.         168.66666667]
Actual   : [219.  70. 202. 230. 111.]
MSE: 3364.3932584269664
R2 Score: 0.36498737331014663`
    },
    '3a': {
        code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

df = pd.read_csv("IRIS.csv")

df['species'] = df['species'].map({
    'Iris-setosa': 0,
    'Iris-versicolor': 1,
    'Iris-virginica': 2
})

X = df.drop("species", axis=1)
y = df["species"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(multi_class='multinomial', max_iter=200)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("Predicted:", y_pred[:10])
print("Actual   :", y_test.values[:10])

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)`,
        output: `Predicted: [1 0 2 1 1 0 1 2 1 1]
Actual   : [1 0 2 1 1 0 1 2 1 1]
Accuracy: 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '3b': {
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

print("Predicted:", y_pred[:5])
print("Actual   :", y_test[:5])

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("MSE:", mse)
print("R2 Score:", r2)`,
        output: `Predicted: [142.25188635 141.49730024 141.99010604 145.04413163 141.5545753 ]
Actual   : [219.  70. 202. 230. 111.]
MSE: 5190.387663027928
R2 Score: 0.020339939398460127`
    },
    '4a': {
        code: `import numpy as np
import matplotlib.pyplot as plt

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report

iris = load_iris()

X = iris.data
y = iris.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

clf_model = DecisionTreeClassifier(
    criterion="gini",
    max_depth=3,
    min_samples_leaf=5,
    random_state=42
)

clf_model.fit(x_train, y_train)

y_predict = clf_model.predict(x_test)

print("Predicted:", y_predict)
print("Actual   :", y_test)

accuracy = accuracy_score(y_test, y_predict)
print("Accuracy:", accuracy)

print("Classification Report:\n", classification_report(y_test, y_predict))

plt.figure(figsize=(10,6))
plot_tree(clf_model, filled=True)
plt.show()`,
        output: `Predicted: [1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0]
Actual   : [1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0]
Accuracy: 1.0
Classification Report:
               precision    recall  f1-score   support

           0       1.00      1.00      1.00        10
           1       1.00      1.00      1.00         9
           2       1.00      1.00      1.00        11

    accuracy                           1.00        30
   macro avg       1.00      1.00      1.00        30
weighted avg       1.00      1.00      1.00        30`
    },
    '4b': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans

data = load_iris()
X = data.data[:, :2]

model = KMeans(n_clusters=3, random_state=42)
model.fit(X)

labels = model.labels_
centroids = model.cluster_centers_

print("Centroids:\n", centroids)
print("Cluster Labels:\n", labels)

plt.figure(figsize=(8, 6))

plt.scatter(X[:, 0], X[:, 1],
            c=labels,
            cmap='viridis',
            s=50)

plt.scatter(centroids[:, 0],
            centroids[:, 1],
            marker='X',
            s=200)

plt.title("K-Means Clustering")
plt.xlabel("Sepal Length")
plt.ylabel("Sepal Width")
plt.grid(True)
plt.show()`,
        output: `Centroids:
 [[6.81276596 3.07446809]
  [5.77358491 2.69245283]
  [5.006      3.428     ]]
Cluster Labels:
 [2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
  2 2 2 2 2 2 2 2 2 2 2 2 2 0 0 0 1 0 1 0 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1
  0 0 0 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 0 0 0 0 1 0 0 0 0
  0 0 1 1 0 0 0 0 1 0 1 0 1 0 0 1 1 0 0 0 0 0 1 1 0 0 0 1 0 0 0 1 0 0 0 1 0
  0 1]`
    },
    '5a': [
        {
            title: 'KNN Classification (From Scratch)',
            code: `import numpy as np
from collections import Counter
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

data = load_iris()
X = data.data
y = data.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

def distance(x1, x2):
    return np.sqrt(np.sum((x1 - x2) ** 2))

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):
        self.X = X
        self.y = y

    def predict(self, X):
        return np.array([self._predict(x) for x in X])

    def _predict(self, x):
        d = [distance(x, x_train) for x_train in self.X]
        k_idx = np.argsort(d)[:self.k]
        k_labels = [self.y[i] for i in k_idx]
        return Counter(k_labels).most_common(1)[0][0]

model = KNN(k=3)

model.fit(x_train, y_train)

pred = model.predict(x_test)

accuracy = np.sum(pred == y_test) / len(y_test)

print("Accuracy:", accuracy)`,
            output: `Accuracy: 1.0`
        },
        {
            title: 'KNN Classification (Scikit-learn)',
            code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score

data = load_iris()
X = data.data
y = data.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = KNeighborsClassifier(n_neighbors=3)

model.fit(x_train, y_train)

y_pred = model.predict(x_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
cm = confusion_matrix(y_test, y_pred)

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("Confusion Matrix:")
print(cm)`,
            output: `Accuracy: 1.0
Precision: 1.0
Recall: 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
        }
    ],
    '5b': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

data = load_iris()
X = data.data[:, :2]

model = AgglomerativeClustering(n_clusters=3)

labels = model.fit_predict(X)

print("Cluster Labels:\n", labels)

plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1],
            c=labels,
            cmap='viridis',
            s=50)

plt.title("Agglomerative Hierarchical Clustering")
plt.xlabel("Sepal Length")
plt.ylabel("Sepal Width")
plt.grid(True)
plt.show()

Z = linkage(X, method='ward')
plt.figure(figsize=(10, 5))
dendrogram(Z)
plt.title("Dendrogram")
plt.xlabel("Data Points")
plt.ylabel("Distance")
plt.show()`,
        output: `Cluster Labels:
 [1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 2 0 2 0 1 0 1 1 0 2 0 2 0 2 2 2 2 0 0 2 0
  0 0 0 0 0 2 2 2 2 0 2 0 0 2 2 2 2 0 2 1 2 2 2 0 1 2 0 2 0 0 0 0 1 0 0 0 0
  0 0 2 2 0 0 0 0 2 0 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 2 0
  0 0]`
    },
    '6a': {
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score

data = load_iris()
X = data.data
y = data.target

x_train, x_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = SVC(kernel='linear')

model.fit(x_train, y_train)

y_pred = model.predict(x_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
cm = confusion_matrix(y_test, y_pred)

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("Confusion Matrix:")
print(cm)`,
        output: `Accuracy: 1.0
Precision: 1.0
Recall: 1.0
Confusion Matrix:
[[10  0  0]
 [ 0  9  0]
 [ 0  0 11]]`
    },
    '6b': {
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.mixture import GaussianMixture

data = load_iris()
X = data.data[:, :2]

model = GaussianMixture(
    n_components=3,
    random_state=42
)
model.fit(X)

labels = model.predict(X)
print("Cluster Labels:\n", labels)
print("\nMeans:\n", model.means_)
print("\nCovariances:\n", model.covariances_)
print("\nWeights:\n", model.weights_)

plt.figure(figsize=(8,6))
plt.scatter(X[:,0], X[:,1],
            c=labels,
            cmap='viridis',
            s=50)

plt.xlabel("Sepal Length")
plt.ylabel("Sepal Width")
plt.title("Expectation Maximization (Gaussian Mixture Model)")
plt.grid(True)
plt.show()`,
        output: `Cluster Labels:
 [2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
  2 2 2 2 1 2 2 2 2 2 2 2 2 0 0 0 1 1 1 0 1 0 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1
  1 0 0 0 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 0 1 0 0 1 0 0 0 0
  1 0 1 1 0 0 0 0 1 0 1 0 1 0 0 1 1 1 0 0 0 1 1 1 0 0 0 1 0 0 0 1 0 0 0 1 0
  0 1]

Means:
 [[6.68055626 3.02849627]
  [5.9009976  2.74387546]
  [5.01507898 3.4514463 ]]

Covariances:
 [[[0.36153508 0.05159664]
   [0.05159664 0.08927917]]

  [[0.27671149 0.08897036]
   [0.08897036 0.09389206]]

  [[0.11944714 0.08835648]
   [0.08835648 0.11893388]]]

Weights:
 [0.29474143 0.38081285 0.32444572]`
    },
    '8a': {
        code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score
from sklearn.metrics import recall_score, f1_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import ConfusionMatrixDisplay

data = load_wine()
X = data.data
y = data.target

print("Number of Samples:", X.shape[0])
print("Number of Features:", X.shape[1])
print("Classes:", np.unique(y))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

def compute_fpr_multiclass(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)
    fpr_list = []
    for i in range(cm.shape[0]):
        tp = cm[i, i]
        fn = np.sum(cm[i, :]) - tp
        fp = np.sum(cm[:, i]) - tp
        tn = np.sum(cm) - (tp + fp + fn)
        fpr = fp / (fp + tn) if (fp + tn) != 0 else 0
        fpr_list.append(fpr)
    return np.mean(fpr_list)

models = {
    "Logistic Regression": LogisticRegression(max_iter=5000),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "SVM": SVC(kernel='linear'),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Naive Bayes": GaussianNB()
}

results = []
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    ConfusionMatrixDisplay.from_predictions(y_test, y_pred)
    plt.title(name + " - Confusion Matrix")
    plt.show()

    results.append([
        name,
        accuracy_score(y_test, y_pred),
        precision_score(y_test, y_pred, average='macro'),
        recall_score(y_test, y_pred, average='macro'),
        compute_fpr_multiclass(y_test, y_pred),
        f1_score(y_test, y_pred, average='macro')
    ])

results = pd.DataFrame(
    results,
    columns=[
        "Model",
        "Accuracy",
        "Precision",
        "Recall (TPR)",
        "FPR",
        "F1 Score"
    ]
)
print(results)`,
        output: `Number of Samples: 178
Number of Features: 13
Classes: [0 1 2]

                 Model  Accuracy  Precision  Recall (TPR)       FPR  F1 Score
0  Logistic Regression    1.0000     1.0000        1.0000    0.0000    1.0000
1                  KNN    0.9444     0.9407        0.9524    0.0271    0.9433
2                  SVM    0.9722     0.9630        0.9762    0.0119    0.9680
3        Decision Tree    0.9444     0.9540        0.9345    0.0303    0.9425
4          Naive Bayes    1.0000     1.0000        1.0000    0.0000    1.0000`
    }
};
