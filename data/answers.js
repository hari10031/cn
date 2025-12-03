export const answersData = {
    'bfs': `// BFS - Breadth First Search
#include <stdio.h>
#include <stdlib.h>
#define MAX 100

int queue[MAX], front = -1, rear = -1;
int visited[MAX];

void enqueue(int v) {
    if (front == -1) front = 0;
    queue[++rear] = v;
}

int dequeue() {
    return queue[front++];
}

int isEmpty() {
    return front == -1 || front > rear;
}

void bfs(int graph[][MAX], int n, int start) {
    visited[start] = 1;
    enqueue(start);
    
    printf("BFS Traversal: ");
    while (!isEmpty()) {
        int v = dequeue();
        printf("%d ", v);
        
        for (int i = 0; i < n; i++) {
            if (graph[v][i] == 1 && !visited[i]) {
                visited[i] = 1;
                enqueue(i);
            }
        }
    }
}

int main() {
    int n = 5;
    int graph[MAX][MAX] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 1},
        {1, 0, 0, 0, 1},
        {0, 1, 0, 0, 0},
        {0, 1, 1, 0, 0}
    };
    
    bfs(graph, n, 0);
    return 0;
}`,

    'dfs': `// DFS - Depth First Search
#include <stdio.h>
#define MAX 100

int visited[MAX];

void dfs(int graph[][MAX], int n, int v) {
    visited[v] = 1;
    printf("%d ", v);
    
    for (int i = 0; i < n; i++) {
        if (graph[v][i] == 1 && !visited[i]) {
            dfs(graph, n, i);
        }
    }
}

int main() {
    int n = 5;
    int graph[MAX][MAX] = {
        {0, 1, 1, 0, 0},
        {1, 0, 0, 1, 1},
        {1, 0, 0, 0, 1},
        {0, 1, 0, 0, 0},
        {0, 1, 1, 0, 0}
    };
    
    printf("DFS Traversal: ");
    dfs(graph, n, 0);
    return 0;
}`,

    'quicksort': `// Quick Sort
#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    printArray(arr, n);
    
    quickSort(arr, 0, n - 1);
    
    printf("Sorted array: ");
    printArray(arr, n);
    
    return 0;
}`,

    'mergesort': `// Merge Sort
#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }
    
    while (i < n1)
        arr[k++] = L[i++];
    while (j < n2)
        arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original: ");
    printArray(arr, n);
    
    mergeSort(arr, 0, n - 1);
    
    printf("Sorted: ");
    printArray(arr, n);
    
    return 0;
}`,

    'floyd': `// Floyd-Warshall Algorithm
#include <stdio.h>
#define V 4
#define INF 99999

void printSolution(int dist[][V]) {
    printf("Shortest distances between every pair:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF)
                printf("%7s", "INF");
            else
                printf("%7d", dist[i][j]);
        }
        printf("\\n");
    }
}

void floydWarshall(int graph[][V]) {
    int dist[V][V];
    
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            dist[i][j] = graph[i][j];
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }
    
    printSolution(dist);
}

int main() {
    int graph[V][V] = {
        {0, 5, INF, 10},
        {INF, 0, 3, INF},
        {INF, INF, 0, 1},
        {INF, INF, INF, 0}
    };
    
    floydWarshall(graph);
    return 0;
}`,

    'dijkstra': `// Dijkstra's Algorithm
#include <stdio.h>
#include <limits.h>
#define V 6

int minDistance(int dist[], int visited[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (!visited[v] && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void printSolution(int dist[]) {
    printf("Vertex\\tDistance from Source\\n");
    for (int i = 0; i < V; i++)
        printf("%d\\t%d\\n", i, dist[i]);
}

void dijkstra(int graph[V][V], int src) {
    int dist[V], visited[V] = {0};
    
    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = 1;
        
        for (int v = 0; v < V; v++)
            if (!visited[v] && graph[u][v] && 
                dist[u] != INT_MAX && 
                dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
    
    printSolution(dist);
}

int main() {
    int graph[V][V] = {
        {0, 4, 2, 0, 0, 0},
        {4, 0, 1, 5, 0, 0},
        {2, 1, 0, 8, 10, 0},
        {0, 5, 8, 0, 2, 6},
        {0, 0, 10, 2, 0, 3},
        {0, 0, 0, 6, 3, 0}
    };
    
    dijkstra(graph, 0);
    return 0;
}`,

    'prims': `// Prim's Algorithm
#include <stdio.h>
#include <limits.h>
#define V 5

int minKey(int key[], int mstSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (!mstSet[v] && key[v] < min)
            min = key[v], min_index = v;
    return min_index;
}

void printMST(int parent[], int graph[V][V]) {
    printf("Edge\\tWeight\\n");
    int total = 0;
    for (int i = 1; i < V; i++) {
        printf("%d - %d\\t%d\\n", parent[i], i, graph[i][parent[i]]);
        total += graph[i][parent[i]];
    }
    printf("Total MST cost: %d\\n", total);
}

void primMST(int graph[V][V]) {
    int parent[V], key[V], mstSet[V] = {0};
    
    for (int i = 0; i < V; i++)
        key[i] = INT_MAX;
    
    key[0] = 0;
    parent[0] = -1;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);
        mstSet[u] = 1;
        
        for (int v = 0; v < V; v++)
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }
    
    printMST(parent, graph);
}

int main() {
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };
    
    primMST(graph);
    return 0;
}`,

    'kruskals': `// Kruskal's Algorithm with Union-Find
#include <stdio.h>
#include <stdlib.h>

struct Edge {
    int src, dest, weight;
};

int find(int parent[], int rank[], int i) {
    if (parent[i] != i)
        parent[i] = find(parent, rank, parent[i]);
    return parent[i];
}

void Union(int parent[], int rank[], int x, int y) {
    int xroot = find(parent, rank, x);
    int yroot = find(parent, rank, y);
    
    if (rank[xroot] < rank[yroot])
        parent[xroot] = yroot;
    else if (rank[xroot] > rank[yroot])
        parent[yroot] = xroot;
    else {
        parent[yroot] = xroot;
        rank[xroot]++;
    }
}

int compare(const void* a, const void* b) {
    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;
}

void KruskalMST(struct Edge edges[], int V, int E) {
    qsort(edges, E, sizeof(edges[0]), compare);
    
    int parent[V], rank[V];
    for (int v = 0; v < V; v++) {
        parent[v] = v;
        rank[v] = 0;
    }
    
    printf("Building MST:\\n");
    int mstCost = 0, edgeCount = 0;
    
    for (int i = 0; i < E && edgeCount < V - 1; i++) {
        int x = find(parent, rank, edges[i].src);
        int y = find(parent, rank, edges[i].dest);
        
        if (x != y) {
            printf("Add edge: %d - %d (weight: %d)\\n", 
                   edges[i].src, edges[i].dest, edges[i].weight);
            mstCost += edges[i].weight;
            edgeCount++;
            Union(parent, rank, x, y);
        }
    }
    printf("Total MST cost: %d\\n", mstCost);
}

int main() {
    int V = 4, E = 5;
    struct Edge edges[] = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}
    };
    
    KruskalMST(edges, V, E);
    return 0;
}`,

    'knapsack-brute': `// 0/1 Knapsack - Brute Force
#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int knapsackBrute(int W, int wt[], int val[], int n) {
    if (n == 0 || W == 0)
        return 0;
    
    if (wt[n-1] > W)
        return knapsackBrute(W, wt, val, n-1);
    
    else
        return max(
            val[n-1] + knapsackBrute(W - wt[n-1], wt, val, n-1),
            knapsackBrute(W, wt, val, n-1)
        );
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);
    
    printf("Maximum value: %d\\n", knapsackBrute(W, wt, val, n));
    return 0;
}`,

    'knapsack-greedy': `// Fractional Knapsack - Greedy
#include <stdio.h>
#include <stdlib.h>

struct Item {
    int id, value, weight;
    double ratio;
};

int compare(const void* a, const void* b) {
    double r1 = ((struct Item*)a)->ratio;
    double r2 = ((struct Item*)b)->ratio;
    return (r2 > r1) - (r2 < r1);
}

double fractionalKnapsack(int W, struct Item items[], int n) {
    for (int i = 0; i < n; i++)
        items[i].ratio = (double)items[i].value / items[i].weight;
    
    qsort(items, n, sizeof(items[0]), compare);
    
    printf("Filling knapsack (capacity=%d):\\n", W);
    double totalValue = 0.0;
    int remainingCapacity = W;
    
    for (int i = 0; i < n; i++) {
        if (remainingCapacity >= items[i].weight) {
            remainingCapacity -= items[i].weight;
            totalValue += items[i].value;
            printf("Item %d: Take 100%%, value=+%d\\n", 
                   items[i].id, items[i].value);
        } else {
            double fraction = (double)remainingCapacity / items[i].weight;
            totalValue += items[i].value * fraction;
            printf("Item %d: Take %.1f%%, value=+%.2f\\n", 
                   items[i].id, fraction * 100, items[i].value * fraction);
            break;
        }
    }
    
    return totalValue;
}

int main() {
    int W = 50;
    struct Item items[] = {
        {1, 60, 10}, {2, 100, 20}, {3, 120, 30}
    };
    int n = sizeof(items) / sizeof(items[0]);
    
    double maxVal = fractionalKnapsack(W, items, n);
    printf("\\nMaximum value: %.2f\\n", maxVal);
    return 0;
}`,

    'knapsack-dp': `// 0/1 Knapsack - Dynamic Programming
#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int knapsackDP(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i-1] <= w)
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    
    printf("DP Table:\\n");
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++)
            printf("%3d ", dp[i][w]);
        printf("\\n");
    }
    
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);
    
    printf("Maximum value: %d\\n", knapsackDP(W, wt, val, n));
    return 0;
}`,

    'tsp': `// TSP - Dynamic Programming
#include <stdio.h>
#include <limits.h>
#define N 4

int dist[N][N] = {
    {0, 10, 15, 20},
    {10, 0, 35, 25},
    {15, 35, 0, 30},
    {20, 25, 30, 0}
};

int visited_all = (1 << N) - 1;

int min(int a, int b) {
    return (a < b) ? a : b;
}

int tsp(int mask, int pos, int dp[][N]) {
    if (mask == visited_all)
        return dist[pos][0];
    
    if (dp[mask][pos] != -1)
        return dp[mask][pos];
    
    int ans = INT_MAX;
    
    for (int city = 0; city < N; city++) {
        if ((mask & (1 << city)) == 0) {
            int newAns = dist[pos][city] + tsp(mask | (1 << city), city, dp);
            ans = min(ans, newAns);
        }
    }
    
    return dp[mask][pos] = ans;
}

int main() {
    int dp[1 << N][N];
    for (int i = 0; i < (1 << N); i++)
        for (int j = 0; j < N; j++)
            dp[i][j] = -1;
    
    printf("Minimum cost: %d\\n", tsp(1, 0, dp));
    return 0;
}`,

    'nqueens': `// N-Queens Problem
#include <stdio.h>
#include <stdbool.h>
#define N 8

void printSolution(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            printf("%c ", board[i][j] ? 'Q' : '.');
        printf("\\n");
    }
    printf("\\n");
}

bool isSafe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++)
        if (board[row][i])
            return false;
    
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false;
    
    for (int i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j])
            return false;
    
    return true;
}

bool solveNQueens(int board[N][N], int col) {
    if (col >= N)
        return true;
    
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            
            if (solveNQueens(board, col + 1))
                return true;
            
            board[i][col] = 0;
        }
    }
    
    return false;
}

int main() {
    int board[N][N] = {0};
    
    if (solveNQueens(board, 0)) {
        printf("Solution for %d-Queens:\\n", N);
        printSolution(board);
    } else {
        printf("No solution exists\\n");
    }
    
    return 0;
}`,

    'hamiltonian': `// Hamiltonian Cycle Detection
#include <stdio.h>
#include <stdbool.h>
#define V 5

void printCycle(int path[]) {
    printf("Hamiltonian Cycle: ");
    for (int i = 0; i < V; i++)
        printf("%d ", path[i]);
    printf("%d\\n", path[0]);
}

bool isSafe(int v, int graph[V][V], int path[], int pos) {
    if (graph[path[pos - 1]][v] == 0)
        return false;
    
    for (int i = 0; i < pos; i++)
        if (path[i] == v)
            return false;
    
    return true;
}

bool hamiltonianCycle(int graph[V][V], int path[], int pos) {
    if (pos == V) {
        if (graph[path[pos - 1]][path[0]] == 1) {
            printCycle(path);
            return true;
        }
        return false;
    }
    
    for (int v = 1; v < V; v++) {
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;
            
            if (hamiltonianCycle(graph, path, pos + 1))
                return true;
            
            path[pos] = -1;
        }
    }
    
    return false;
}

int main() {
    int graph[V][V] = {
        {0, 1, 0, 1, 0},
        {1, 0, 1, 1, 1},
        {0, 1, 0, 0, 1},
        {1, 1, 0, 0, 1},
        {0, 1, 1, 1, 0}
    };
    
    int path[V];
    for (int i = 0; i < V; i++)
        path[i] = -1;
    
    path[0] = 0;
    
    if (!hamiltonianCycle(graph, path, 1))
        printf("No Hamiltonian Cycle exists\\n");
    
    return 0;
}`,

    'graph-coloring': `// Graph Coloring - Backtracking
#include <stdio.h>
#include <stdbool.h>
#define V 5

void printSolution(int color[]) {
    printf("Vertex colors:\\n");
    for (int i = 0; i < V; i++)
        printf("Vertex %d -> Color %d\\n", i, color[i]);
}

bool isSafe(int v, int graph[V][V], int color[], int c) {
    for (int i = 0; i < V; i++)
        if (graph[v][i] && c == color[i])
            return false;
    return true;
}

bool graphColoring(int graph[V][V], int m, int color[], int v) {
    if (v == V)
        return true;
    
    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c;
            
            if (graphColoring(graph, m, color, v + 1))
                return true;
            
            color[v] = 0;
        }
    }
    
    return false;
}

int main() {
    int graph[V][V] = {
        {0, 1, 1, 1, 0},
        {1, 0, 1, 0, 0},
        {1, 1, 0, 1, 1},
        {1, 0, 1, 0, 1},
        {0, 0, 1, 1, 0}
    };
    
    int m = 3; // Number of colors
    int color[V] = {0};
    
    if (graphColoring(graph, m, color, 0)) {
        printf("Solution exists with %d colors:\\n", m);
        printSolution(color);
    } else {
        printf("No solution exists with %d colors\\n", m);
    }
    
    return 0;
}`,

    'binary-search': `// Binary Search
#include <stdio.h>

int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        
        printf("Searching in range [%d, %d], mid=%d, arr[mid]=%d\\n", 
               l, r, mid, arr[mid]);
        
        if (arr[mid] == x) {
            printf("Element found at index %d\\n", mid);
            return mid;
        }
        
        if (arr[mid] < x) {
            printf("Search right half\\n");
            l = mid + 1;
        } else {
            printf("Search left half\\n");
            r = mid - 1;
        }
    }
    
    return -1;
}

int binarySearchRecursive(int arr[], int l, int r, int x, int depth) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        
        for (int i = 0; i < depth; i++) printf("  ");
        printf("Range [%d,%d], mid=%d, value=%d\\n", l, r, mid, arr[mid]);
        
        if (arr[mid] == x)
            return mid;
        
        if (arr[mid] > x)
            return binarySearchRecursive(arr, l, mid - 1, x, depth + 1);
        
        return binarySearchRecursive(arr, mid + 1, r, x, depth + 1);
    }
    
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40, 50, 60, 70, 80, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 40;
    
    printf("Array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\nSearching for: %d\\n\\n", x);
    
    printf("Iterative Binary Search:\\n");
    int result = binarySearch(arr, 0, n - 1, x);
    
    printf("\\n\\nRecursive Binary Search:\\n");
    result = binarySearchRecursive(arr, 0, n - 1, x, 0);
    if (result == -1)
        printf("Element not found\\n");
    else
        printf("Element found at index %d\\n", result);
    
    return 0;
}`
};
