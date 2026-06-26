export const algorithmsData = [
  {
    id: 'set1',
    name: 'Set 1',
    description: 'Naïve Bayes & KNN Regression',
    parts: [
      {
        id: '1a',
        title: '(a) Naïve Bayes Classification',
        fullName: '1. (a) Implement Naïve Bayes Classification using the Iris dataset and predict the class of a new instance.',
        description: 'Naïve Bayes classifiers are a family of simple probabilistic classifiers based on applying Bayes\' theorem with strong (naïve) independence assumptions between features.'
      },
      {
        id: '1b',
        title: '(b) KNN Regression',
        fullName: '1. (b) Implement K-Nearest Neighbors (KNN) Regression using the Diabetes dataset and predict the target value of a new instance.',
        description: 'K-Nearest Neighbors (KNN) regression predicts the target value of a new instance by averaging the values of its K nearest neighbors in the feature space.'
      }
    ]
  },
  {
    id: 'set2',
    name: 'Set 2',
    description: 'Prolog Family Tree & SVM Regression',
    parts: [
      {
        id: '2a',
        title: '(a) Prolog Family Tree',
        fullName: '2. (a) Write a Prolog program for a Family Tree and perform queries.',
        description: 'Prolog (Programming in Logic) is a logic programming language associated with artificial intelligence and computational linguistics. This program implements a family tree using facts (gender, parent relations) and rules (father, mother, sibling, grandparent, uncle, aunt) and executes queries.'
      },
      {
        id: '2b',
        title: '(b) SVM Regression',
        fullName: '2. (b) Implement Support Vector Machine (SVM) Regression using the Diabetes dataset and predict the target value of a new instance.',
        description: 'Support Vector Regression (SVR) applies Support Vector Machine principles to regression problems, finding a hyperplane that fits the data within a specified margin of tolerance (epsilon).'
      }
    ]
  },
  {
    id: 'set3',
    name: 'Set 3',
    description: 'A* Search & Prolog Simple Facts',
    parts: [
      {
        id: '3a',
        title: '(a) A* Search Algorithm',
        fullName: '3. (a) Write a program to implement A* (A-Star) Search Algorithm for finding the shortest path in a graph.',
        description: 'A* is a graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and optimal efficiency. It uses both actual distance from the start (g) and heuristic estimates to the goal (h) to guide its search.'
      },
      {
        id: '3b',
        title: '(b) Prolog Simple Facts & Queries',
        fullName: '3. (b) Write simple facts in Prolog for real-world statements and execute queries on them.',
        description: 'Prolog is built on facts and rules. This program defines simple real-world facts (such as people\'s food preferences and food categories) and defines queries to find relationships like food compatibility and cuisine preferences.'
      }
    ]
  },
  {
    id: 'set4',
    name: 'Set 4',
    description: 'Logistic Regression & Decision Tree',
    parts: [
      {
        id: '4a',
        title: '(a) Multiclass Logistic Regression',
        fullName: '4. (a) Implement Multiclass Logistic Regression using the Iris dataset and predict the class of a new instance.',
        description: 'Multiclass Logistic Regression (or Multinomial Logistic Regression) generalizes logistic regression to multiclass classification problems. It uses a Softmax function or a one-vs-rest strategy to classify instances.'
      },
      {
        id: '4b',
        title: '(b) Decision Tree Classification',
        fullName: '4. (b) Implement Decision Tree Classification using the Iris dataset and predict the class of a new instance.',
        description: 'A Decision Tree is a non-parametric supervised learning method. It creates a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.'
      }
    ]
  },
  {
    id: 'set5',
    name: 'Set 5',
    description: 'K-Means Clustering & Greedy Best First Search',
    parts: [
      {
        id: '5a',
        title: '(a) K-Means Clustering',
        fullName: '5. (a) Implement K-Means Clustering and visualize the clusters.',
        description: 'K-Means clustering is an unsupervised learning algorithm that partitions N observations into K clusters, in which each observation belongs to the cluster with the nearest mean (centroid).'
      },
      {
        id: '5b',
        title: '(b) Greedy Best First Search',
        fullName: '5. (b) Write a program to implement Greedy Best First Search Algorithm.',
        description: 'Greedy Best First Search is an AI search algorithm that explores a graph by expanding the node that is closest to the goal according to a heuristic function, neglecting the cost to reach that node.'
      }
    ]
  },
  {
    id: 'set6',
    name: 'Set 6',
    description: 'KNN Classification & Hierarchical Clustering',
    parts: [
      {
        id: '6a',
        title: '(a) KNN Classification',
        fullName: '6. (a) Implement K-Nearest Neighbors (KNN) Classification using the Iris dataset and predict the class of a new instance.',
        description: 'KNN classification is a supervised classifier that assigns a class label to a query point based on the majority vote of its K closest neighbors in the training dataset. This includes both manual (from scratch) and Scikit-learn implementations.'
      },
      {
        id: '6b',
        title: '(b) Agglomerative Hierarchical Clustering',
        fullName: '6. (b) Implement Agglomerative Hierarchical Clustering and visualize the clusters.',
        description: 'Agglomerative clustering is a bottom-up hierarchical clustering method. It starts with each data point in its own cluster and iteratively merges the closest pairs of clusters based on a linkage criterion.'
      }
    ]
  },
  {
    id: 'set7',
    name: 'Set 7',
    description: 'SVM Classification & GMM Clustering',
    parts: [
      {
        id: '7a',
        title: '(a) SVM Classification',
        fullName: '7. (a) Implement Support Vector Machine (SVM) Classification using the Iris dataset and predict the class of a new instance.',
        description: 'Support Vector Machine (SVM) is a powerful supervised algorithm. It finds the optimal decision boundary (hyperplane) that maximizes the margin between classes.'
      },
      {
        id: '7b',
        title: '(b) Gaussian Mixture Model (GMM) Clustering',
        fullName: '7. (b) Implement Gaussian Mixture Model (GMM) clustering using the Expectation Maximization (EM) algorithm and visualize the clusters.',
        description: 'Gaussian Mixture Models (GMM) are probabilistic models that assume all data points are generated from a mixture of a finite number of Gaussian distributions with unknown parameters.'
      }
    ]
  }
];
