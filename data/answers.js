export const answersData = {
    'bfs': `//bfs

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

    'quicksort': `//quick sort
#include<stdio.h>
int arr[10]={99,98,97,96,95,94,93,92,91,90};

int Parition(int l,int r){
    int pivot = arr[l];
    int i =l;
    int j= r;
    while (i < j) {
        while (i <= r && arr[i] <= pivot)
            i++;

        while (j >= l && arr[j] > pivot)
            j--;

        if (i < j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    int temp = arr[l];
    arr[l] = arr[j];
    arr[j] = temp;

    return j;


}

void quick(int l,int r){
    if(l<r){
        int pi = Parition(l,r);
        quick(l,pi-1);
        quick(pi+1,r);
    }
    
}



void main(){
    
    quick(0,9);
    for(int i=0;i<10;i++){
        printf("%d ",arr[i]);
    }
}`,

    'mergesort': `// merge sort

#include<stdio.h>
int arr[10]={99,98,97,96,95,94,93,92,91,90};

void merge(int l,int mid,int r){
    int temp[10];
    int i = l;
    int j = mid+1;
    int m = 0;
    while(i<=mid && j<=r){
        if(arr[i]<arr[j]){
            temp[m]=arr[i];
            i++;
        }
        else{
            temp[m]=arr[j];
            j++;
        }
        m++;
    }
    while(i<=mid){
        temp[m]=arr[i];
        i++;
        m++;
    }
    while(j<=r){
        temp[m]=arr[j];
        j++;
        m++;
    }
    for(int i=l;i<=r;i++){
        arr[i]=temp[i-l];
    }
    
}

void mergeSort(int l,int r){
    if(l<r){
        int mid=(l+r)/2;
        mergeSort(l,mid);
        mergeSort(mid+1,r);
        merge(l,mid,r);
    }
    
}

void main(){
    
    mergeSort(0,9);
    for(int i=0;i<10;i++){
        printf("%d ",arr[i]);
    }
}`,

    'floyd': `//floyd warshal

#include<stdio.h>

#define N 4
#define INF 99999
int main(){
    int dist[N][N]={{0,3,INF,7},{8,0,2,INF},{5,INF,0,1},{2,INF,INF,0}};

    for(int k=0;k<N;k++){
        for(int i=0;i<N;i++){
            for(int j=0;j<N;j++){
                if(dist[i][k] + dist[k][j] <dist[i][j] && dist[i][k] != INF && dist[k][j] != INF){
                    dist[i][j] = dist[i][k] + dist[k][j];

                }
            }
        }
    }
    for(int i=0;i<N;i++){
        for(int j=0;j<N;j++){
            printf("%d ",dist[i][j]);
        }
        printf("\\n");
    }


}`,

    'dijkstra': `//dijkstra algo

#include<stdio.h>
#define V 6
int graph[V][V] = {
        {0, 4, 0, 0, 0, 0},
        {4, 0, 8, 0, 0, 0},
        {0, 8, 0, 7, 0, 4},
        {0, 0, 7, 0, 9, 14},
        {0, 0, 0, 9, 0, 10},
        {0, 0, 4, 14, 10, 0}
    };
#define INF 99999

int minDistance(int visited[],int dist[]){
    int min= INF;
    int idx = -1;
    for(int i=0;i<V;i++){
        if(!visited[i] && dist[i]<min){
            min = dist[i];
            idx = i;
        }
    }
    return idx;
}


void dijkstra(int start){
    int dist[V];
    int visited[V];
    for(int i=0;i<V;i++){
        dist[i] = INF;
        visited[i] = 0;

    }
    dist[start] = 0;
    for(int i =0;i<V-1;i++){
        int u = minDistance(visited,dist);
        visited[u]=1;
        for(int v=0;v<V;v++){
            if(!visited[v] && graph[u][v]!=0 && dist[u]!=INF && dist[u] + graph[u][v] < dist[v] ){
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    printf("Vertex Distance from source vertex %d\\n",start);
    for(int i=0;i<V;i++){
        printf("%d ",dist[i]);
    }

}

void main(){
    dijkstra(0);
}`,

    'prims': `//prims

#include <stdio.h>
#include <limits.h>

#define INF 999999

int main() {
    int n;
    printf("Enter number of vertices: ");
    scanf("%d", &n);

    int graph[20][20];

    printf("Enter the adjacency matrix (use 0 for no edge):\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &graph[i][j]);
            if (graph[i][j] == 0 && i != j)
                graph[i][j] = INF;  // replace 0 with INF (except diagonal)
        }
    }
    int start;
    printf("Enter starting vertex (1 to %d): ",n);
    scanf("%d",&start);
    start--;
    int selected[20]={0};
    selected[start] = 1;
    int edgecount = 0;
    int mst =0;
    while(edgecount<n-1){
        int min = INF;
        int u =-1,v=-1;
        for(int i=0;i<n;i++){
            if(selected[i]){
                for(int j=0;j<n;j++){
                    if(!selected[j] && graph[i][j] <min){
                        min = graph[i][j];
                        u = i;
                        v = j;
                    }
                }

            }

        }
        if(u !=-1 && v!=-1){
            printf("%d -- %d cost = %d\\n",u+1,v+1,min);
            selected[v] = 1;
            mst +=min;
            edgecount++;
        }
    }



}`,

    'kruskals': `#include <stdio.h>

#define INF 999
int parent[20];
int find(int i){
    while(parent[i] != i) i = parent[i];
    return i;
}

void union1(int i,int j){
    parent[i] = parent[j]; 
}

void main(){
    int cost[20][20];
    int n,i,j,min,u,v,a,b,ne=1,mincost=0;
    printf("ENter number of vertices: ");
    scanf("%d",&n);
    printf("Enter the cost matrix:\\n");
    for(i=1;i<=n;i++){
        for(j=1;j<=n;j++){
            scanf("%d",&cost[i][j]);
            if(cost[i][j] == 0) cost[i][j] = INF;
        }
    }
    for(i = 1;i<=n;i++) parent[i] = i;

    printf("\\n Edges in the Minimum Spanning Tree:\\n");

    while(ne<n){
        min = INF;
        for(i=1;i<=n;i++){
            for(j=1;j<=n;j++){
                if(cost[i][j]<min ){
                    min = cost[i][j];
                    u=i;
                    v=j;
                }
            }
        }
        a = find(u);
        b= find(v);
        if(a!=b){
            printf("%d -- %d cost = %d\\n",u,v,min);
            union1(a,b);
            mincost += min;
            ne++;
        }
        cost[u][v] = cost[v][u] = INF;
    }
    printf("Minimum cost = %d\\n",mincost);
}`,

    'knapsack-brute': `// knapsack brute

#include<stdio.h>
#define N 4      
#define W 7 

int main(){
    int weight[N] = {1, 3, 4, 5};
    int value[N]  = {1, 4, 5, 7};
    int maxValue = 0;
    int bestMask = 0;
    int toalSubsets = 1<<N;
    for(int i =0;i<toalSubsets;i++){
        int sumweight = 0;
        int sumvalue = 0;
        for(int j=0;j<N;j++){
            if(i & (1<<j)){
                sumweight += weight[j];
                sumvalue += value[j];
            }
            
        }
        if(sumweight<= W && sumvalue > maxValue){
            maxValue = sumvalue;
            bestMask = i;
        }
    }
    printf("Maximum value: %d\\n",maxValue);
    for(int i =0;i<N;i++){
        if(bestMask & (1<<i)){
            printf("%d ",i);
        }
    }

}`,

    'knapsack-greedy': `//knapsack greedy
#include<stdio.h>
#define N 4      
#define W 7 

int main(){
    int weight[N] = {1, 3, 4, 5};
    int value[N]  = {1, 4, 5, 7};
    double ratio[N];
    for(int i=0;i<N;i++){
        ratio[i] = (double)value[i]/weight[i];
    }
    for(int i=0;i<N;i++){
        for(int j=i+1;j<N;j++){

            if(ratio[i]<ratio[j]){
                double temp = ratio[i];
                ratio[i] = ratio[j];
                ratio[j] = temp;
                int temp2 = weight[i];
                weight[i] = weight[j];
                weight[j] = temp2;
                int temp3 = value[i];
                value[i] = value[j];
                value[j] = temp3;
            }
        }
    }
    double totalvalue = 0;
    int reaminig = W;
    for(int i =0;i<N;i++){
        if(weight[i]<=reaminig){
            totalvalue += value[i];
            reaminig -= weight[i];
        }else{
            totalvalue += ratio[i]*reaminig;
            break;
        }
    }
    printf("Maximum value in knapsack is %.2f",totalvalue);
}`,

    'knapsack-dp': `//knapsack dp

#include<Stdio.h>
#define N 4     
#define W 7     
int main() {
    int weight[N] = {1, 3, 4, 5};
    int value[N]  = {1, 4, 5, 7};
    int dp[N+1][W+1];
    for(int i =0;i<=N;i++){
        for(int j =0;j<=W;j++){
            if(i==0 || j== 0) {
                dp[i][j] = 0;
            }else if(weight[i-1]<=j){
                int include = value[i-1]+dp[i-1][j-weight[i-1]];
                int exclude = dp[i-1][j];
                dp[i][j] = (include>exclude)?include:exclude;
            }else{
                dp[i][j] = dp[i-1][j];
            }
        }

    }
    printf("Maximum value = %d\\n", dp[N][W]);


}`,

    'tsp': `#include<stdio.h>
#define INF 99999
int n,cost[20][20],dp[n][1<< 15];

int tsp(int pos,int mask){
    if(mask == (1<<n) -1) return cost[pos][0];
    if(dp[pos][mask] != -1) return dp[pos][mask];
    int ans = INF;
    for(int city = 0;city<n;city++){
        if((mask &(1<<city)) == 0){
            int newans = cost[pos][city] +tsp(city, mask | (1<<city));
            if(newans < ans){
                ans = newans;
            }
        }
    }
    dp[pos][mask] = ans;
    return ans;
}

int main(){
    int i,j;
    printf("Enter the number of cities: ");
    scanf("%d",&n);
    printf("Enter the cost matrix: \\n");
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            scanf("%d",&cost[i][j]);
            if(cost[i][j] == 0) cost[i][j] = INF;
        }
    }
    for(i=0;i<n;i++){
        for(j=0;j<(1<<n);j++){
            dp[i][j] = -1;
        }
    }
    int ans = tsp(0,1);
    printf("Minimum cost = %d\\n",ans);
    return 0;
}`,

    'nqueens': `#include<stdio.h>
int x[30],count = 0;
#include<math.h>

#include <stdlib.h>


int place(int k,int n){
    for(int i=1;i<k;i++){
        if(x[i] == n || abs(x[i]-n) == abs(k-i) ){
            return 0;
        }
    }
    return 1;
}
void print_sol(int n){
    int i,j;
    count++;
    printf("\\n\\nSolution%d:\\n",count);
    for(i=1;i<=n;i++){
        for(j=1;j<=n;j++){
            if(x[i]==j) printf("Q\\t");
            else printf("-\\t");
        }
        printf("\\n");
    }

}
void queen(int k,int n){
    for(int i =1;i<=n;i++){
        if(place(k,i)){
            x[k] = i;
            if(k==n) print_sol(n);
            else queen(k+1,n);

        }
    }
    
}


void main(){
    int n=4;
    // printf("Enter the number of queens: ");
    // scanf("%d",&n);
    queen(1,n);
    printf("Total solutions = %d\\n",count);
}`,

    'hamiltonian': `// hamiltonian cycle

#include<stdio.h>
int n;
int s;
int x[10]={0};
int count=0;
int a[10][10];

void nextvalue(int k){
    int j;
    do{
        x[k] = (x[k]+1)%(n+1);
        
        if(x[k]==0) return ;
        if(a[x[k-1]][x[k]] != 0){
            for(j=1;j<k;j++){
                if(x[j] == x[k]) break;
            }
            if(j==k){
                if(k<n || (k==n && a[x[n]][x[1]]!=0)) return ;
            }
        }

    }while(1);
}


void hamiltonian(int k){
    do{
        nextvalue(k);
        if(x[k]==0) return;
        if(k==n){
            count++;
            for(int i=1;i<=n;i++){
                printf("%d-",x[i]);
            }
            printf("\\n");

        }else{
            hamiltonian(k+1);
        }

    }while(1);
}



void main(){
    int i,j;

    printf("Enter nu of vertices: ");
    scanf("%d",&n);
    printf("\\nEnter adjacency Matrix of graph\\n");
    for(i=1;i <= n;i++)
    {
        for( j=1;j <= n;j++)
            scanf("%d",&a[i][j]);
    }
    printf("enter the starting vertex: ");
    scanf("%d",&s);
    x[1]=s;
    hamiltonian(2);
    printf("no. of hamiltonian cycles in given graph: %d ",count);

}`,

    'graph-coloring': `// graph coloring
#include<stdio.h>
int n,m,x[10]={0},a[10][10];

void nextvalue(int k){
    int j;
    do{
        x[k]=(x[k]+1)%(m+1);
        if(x[k]==0) return;
        for(j=1;j<=n;j++){
            if((a[k][j] !=0 && x[k]==x[j])|| (a[j][k] != 0 && x[k]==x[j])) break;


        }
        if(j==n+1) return;

    }while(1);
}

void mcoloring(int k){
    do{
        nextvalue(k);
        if(x[k]==0) return;
        if(k==n){
            printf("{");
            for(int i=1;i<=n;i++){
                printf("%d, ",x[i]);
            }
            printf("\\t}\\n");
            
        }else{
            mcoloring(k+1);

        }
    }while(1);
}

void main(){
    int v;
    printf("\\n Enter the number of vertices: ");
    scanf("%d",&n);
    printf("\\n Enter the number of colors: ");
    scanf("%d",&m);
    printf("\\n Enter the adjacency matrix: ");
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){
            scanf("%d",&a[i][j]);
        }
    }
    mcoloring(1);
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
