export const answersData = {
    'q1': `#include <stdio.h>
#include <stdlib.h>
#include<unistd.h>
#include <wait.h>

int main(){
    pid_t pid;
    printf("Main process starts\\n");
    pid = fork();
    if(pid <0){
        printf("Fork failed\\n");
        return 1;
    }else if(pid==0){
        printf("Child process is running\\n");
        sleep(5);
        printf("Child process ends\\n");
    }else{
        printf("Parent process is waiting for child process to complete\\n");
        wait(NULL);
        printf("Child process completed. Parent process resumes\\n");
    }
    
    return 0;
}`,
    'q2': `//zombie process
#include <stdio.h>  
#include <stdlib.h>
#include <unistd.h>
#include <wait.h>

int main(){
    pid_t pid;
    printf("Main process starts\n");
    pid = fork();
    if(pid <0){
        printf("Fork failed\n");
        return 1;
    }else if(pid==0){
        printf("Child process is running\n");
    }else{
        printf("Parent process is not waiting for child process\n");
        pause();
        printf("Parent process completed\n");
    }
    printf("main ends\n");

    return 0;
}`,
    'q3': [
        {
            title: 'Parent Process',
            code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main(){
    printf("Main starts\\n");
    execl("./q4", "q4", NULL);
    printf("Main ends\\n");
    return 0;
}`
        },
        {
            title: 'Child Process (q4.c)',
            code: `#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>

void main(){
    printf("p2 start\\n");
    printf("p2 ends\\n");

}`
        }
    ],
    'q4': `#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<pthread.h>

void* thread(void* arg){
    printf("Thread is running pid:%d\n",getpid());
    printf("Thread Id=%d\n",pthread_self());
    return NULL;
}
int main(){
    pthread_t tid;
    printf("Main starts: %d\n",getpid());
    pthread_create(&tid,NULL,thread,NULL);
    pthread_join(tid,NULL);
    printf("Main ends\n");
    return 0;
}`,
    'q5': `//Write a program to make a parent process wait for child process
#include <stdio.h>
#include <stdlib.h>
#include<unistd.h>
#include <wait.h>

int main(){
    pid_t pid;
    printf("Main process starts\n");
    pid = fork();
    if(pid <0){
        printf("Fork failed\n");
        return 1;
    }else if(pid==0){
        printf("Child process is running\n");
        sleep(5);
        printf("Child process ends\n");
    }else{
        printf("Parent process is waiting for child process to complete\n");
        wait(NULL);
        printf("Child process completed. Parent process resumes\n");
    }
    
    return 0;
}
`,
    'q6': `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

int a,b;
void* add(void* arg){
    printf("Thread id %ld\n",pthread_self());
    printf("Main process id %d\n",getpid());
    printf("Addition=%d\n", a+b);
    return NULL;
}

void* sub(void* arg){
    printf("Thread id %ld\n",pthread_self());
    printf("Main process id %d\n",getpid());
    printf("Subtraction=%d\n", a-b);
    return NULL;
}

int main(){
    pthread_t t1,t2;
    printf("Enter two numbers:\n");
    scanf("%d %d", &a, &b);
    pthread_create(&t1,NULL,add,NULL);
    pthread_create(&t2,NULL,sub,NULL);
    pthread_join(t1,NULL);
    pthread_join(t2,NULL);
    printf("Main process ends\n");
}`,
    'q7': `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
pthread_t tid[3];
int a,b;
void* thread(void* args){
    pthread_t temp = pthread_self();
    if(pthread_equal(temp,tid[0])){
        printf("Thraed-0 matched. sum=%d\n",a+b);
    }else if(pthread_equal(temp,tid[1])){
        printf("Thraed-1 matched. sub=%d\n",a-b);
    }else if(pthread_equal(temp,tid[2])){
        printf("Thraed-2 matched. mul=%d\n",a*b);
    }
    return NULL;
}
int main(){
    printf("Enter two numbers:\n");
    scanf("%d %d", &a, &b);
    for(int i=0;i<3;i++){
        pthread_create(&tid[i],NULL,thread,NULL);

    }
    
    for(int i=0;i<3;i++){
        pthread_join(tid[i],NULL);
    }
    printf("Main process ends\n");
    return 0;

}`,
    'q8': `#include <stdio.h>
#include <stdlib.h>

int main(){
    int n;
    printf("ENter number of process: ");
    scanf("%d",&n);
    int p[n],at[n],bt[n],wt[n],tat[n],ct[n];
    float awt=0,atat=0;
    for(int i=0;i<n;i++){
        p[i] = i+1;
        printf("Enter arrival time and burst time for process %d: ", p[i]);
        scanf("%d %d", &at[i], &bt[i]);

    }
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-i-1;j++){
            if((at[j]>at[j+1]) || (at[j] == at[j+1] && p[j] > p[j+1])){
                int temp = at[j];
                at[j] = at[j+1];
                at[j+1] = temp;
                temp = bt[j];
                bt[j] = bt[j+1];
                bt[j+1] = temp;
                temp = p[j];
                p[j] = p[j+1];
                p[j+1] = temp;

            }
        }
    }

    
    ct[0] = at[0]+bt[0];
    for(int i=1;i<n;i++){
        if(at[i]<=ct[i-1]){
            ct[i] = ct[i-1]+bt[i];
        }else{
            ct[i] = at[i]+bt[i];
        }
    
    }
    for(int i=0;i<n;i++){
        tat[i] = ct[i]-at[i];
        wt[i]=tat[i]-bt[i];
        awt+=wt[i];
        atat+=tat[i];
    }
    printf("P\tAT\tBT\tCT\tTAT\tWT\n");
    for(int i=0;i<n;i++){
        printf("%d\t%d\t%d\t%d\t%d\t%d\n",p[i],at[i],bt[i],ct[i],tat[i],wt[i]);
    }
    printf("Average waiting time: %.2f\n",awt/n);
    printf("Average turnaround time: %.2f\n",atat/n);

}`,
    'q9': `#include <stdio.h>
#define MAX 1000
int main(){
    int n;
    printf("Enter number of process: ");
    scanf("%d",&n);
    int p[n],at[n],bt[n],wt[n],ct[n],tat[n];
    int time=0,completed_count = 0;
    int completed[n],order[n];
    int k=0;
    float awt=0,atat=0;
    for(int i=0;i<n;i++){
        p[i] = i+1;
        printf("Enter arrival time and burst time for process %d: ", p[i]);
        scanf("%d %d", &at[i], &bt[i]);
        completed[i] = 0;
    }
    while(completed_count <n){
        int idx = -1,min = MAX;
        for(int i =0;i<n;i++){
            if(at[i]<=time && completed[i] == 0 && bt[i]<min ){
                min=bt[i];
                idx = i;
                
            }
        }
        if(idx != -1){
            time += bt[idx];
            completed[idx] = 1;
            completed_count++;
            ct[idx] = time;
            order[k++] = p[idx];

        }else{
            time++;
            
        }
    }
    for(int i=0;i<n;i++){
        tat[i] = ct[i]-at[i];
        wt[i]=tat[i]-bt[i];
        awt+=wt[i];
        atat+=tat[i];
    }
    printf("P\tAT\tBT\tCT\tTAT\tWT\n");
    for(int i=0;i<n;i++){
        printf("%d\t%d\t%d\t%d\t%d\t%d\n",p[i],at[i],bt[i],ct[i],tat[i],wt[i]);
    }
    printf("Order of execution: ");
    for(int i=0;i<n-1;i++){
        printf("%d-> ",order[i]);
    }
    printf("%d\n",order[n-1]);
    return 0;

}`,
    'q10': `#include <stdio.h>

#define MAX 1000

void main(){
    int n;
    printf("Enter number of process: ");
    scanf("%d",&n);
    int p[n],at[n],wt[n],tat[n],bt[n],ct[n],order[100],remaining[n];
    int time=0,tq,k=0,completed_count=0,done;
    float awt=0,atat=0;
    for(int i=0;i<n;i++){
        p[i] = i+1;
        printf("Enter arrival time and burst time for process %d: ", p[i]);
        scanf("%d %d", &at[i], &bt[i]);
        remaining[i] = bt[i];
    }
    printf("Enter time quantum: ");
    scanf("%d",&tq);
    while(completed_count < n){
        done =  1;
        for(int i=0;i<n;i++){
            if(at[i]<=time && remaining[i]>0){
                done = 0;
                if(remaining[i]>tq){

                    time += tq;
                    remaining[i] -= tq;
                    order[k++] = p[i];
                }else{
                    time +=remaining[i];
                    remaining[i] = 0;
                    completed_count++;
                    ct[i] = time;
                    order[k++] = p[i];
                }
            }
        }
        if(done){
            time++;
        }

    }
    for(int i=0;i<n;i++){
        tat[i] = ct[i]-at[i];
        wt[i]=tat[i]-bt[i];
        awt+=wt[i];
        atat+=tat[i];
    }
    printf("P\tAT\tBT\tCT\tTAT\tWT\n");
    for(int i=0;i<n;i++){
        printf("%d\t%d\t%d\t%d\t%d\t%d\n",p[i],at[i],bt[i],ct[i],tat[i],wt[i]);
    }
    printf("Order of execution: ");
    for(int i=0;i<k-1;i++){
        printf("%d-> ",order[i]);
    }
    printf("%d\n",order[k-1]);
    printf("Average waiting time: %.2f\n",awt/n);
    printf("Average turnaround time: %.2f\n",atat/n);
}`,
    'q11': `// dining philosophers problem using semaphores in C
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define N 5
sem_t chop[N];
void * phil(void *arg){
    int id = *(int *)arg;
        
    for(int i = 0; i < 5; i++){  // change to infinite loop if needed
        printf("Philosopher %d is thinking\n",id);
        sleep(1);
        printf("Philosopher %d is hungry\n",id);
        if(!(id & 1)){
            sem_wait(&chop[id]);
            sem_wait(&chop[(id+1)%N]);
        }else{
            sem_wait(&chop[(id+1)%N]);
            sem_wait(&chop[id]);

        }
        printf("Philosopher %d is eating\n",id);
        sleep(2);
        sem_post(&chop[id]);
        sem_post(&chop[(id+1)%N]);
        printf("Philosopher %d finished eating \n",id);
    
    }
}

int main(){
    pthread_t philosophers[N];
    int ids[N];
    for(int i=0;i<N;i++){
        sem_init(&chop[i],0,1);
    }
    for(int i=0;i<N;i++){
        ids[i]=i;
        pthread_create(&philosophers[i],NULL,phil,&ids[i]);
    }
    for(int i=0;i<N;i++){
        pthread_join(philosophers[i],NULL);
    }
    return 0;
}`,
    'q12': `// producer and consumer problem

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#define MAX 5
sem_t empty,full,mutex;
int buffer[MAX],in=0,out=0;

void* producer(void* arg){
    int item=1;
    while(1){
        sem_wait(&empty);
        sem_wait(&mutex);
        buffer[in] = item;
        in = (in+1)%MAX;
        printf("Produced %lu produced %d-> buffer\n",pthread_self()%1000,item);
        item++;
        sem_post(&mutex);
        sem_post(&full);
        sleep(1);
    }
}
void* consumer(void* arg){
    int item;
    while(1){
        sem_wait(&full);
        sem_wait(&mutex);
        item = buffer[out];
        out = (out+1)%MAX;
        printf("Consumed %lu consumed %d from buffer\n",pthread_self()%1000,item);
        sem_post(&mutex);
        sem_post(&empty);
        sleep(2);
    }
}
void main(){
    pthread_t prod,cons;
    sem_init(&mutex,0,1);
    sem_init(&empty,0,MAX);
    sem_init(&full,0,0);
    pthread_create(&prod,NULL,producer,NULL);
    pthread_create(&cons,NULL,consumer,NULL);
    pthread_join(prod,NULL);
    pthread_join(cons,NULL);

}
`,
    'q13': `// Reader Writer Problem using Semaphores (Readers Priority)

#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

sem_t mutex, rw_mutex;
int read_count = 0;
int shared_data = 10;

void* reader(void *arg){
    for(int i = 0; i < 5; i++){     // limited iterations for demo
        sem_wait(&mutex);
        read_count++;
        if(read_count == 1){
            sem_wait(&rw_mutex);   // first reader blocks writers
        }
        sem_post(&mutex);

        printf("Reader %lu is reading data: %d\n",
               pthread_self() % 1000, shared_data);
        sleep(1);

        sem_wait(&mutex);
        read_count--;
        if(read_count == 0){
            sem_post(&rw_mutex);   // last reader allows writers
        }
        sem_post(&mutex);
        sleep(1);
    }
    return NULL;
}

void* writer(void *arg){
    for(int i = 0; i < 5; i++){     // limited iterations for demo
        sem_wait(&rw_mutex);       // exclusive access
        shared_data += 5;
        printf("Writer %lu updated data to: %d\n",
               pthread_self() % 1000, shared_data);
        sleep(2);
        sem_post(&rw_mutex);
        sleep(1);
    }
    return NULL;
}

int main(){
    pthread_t r1, r2, w1, w2;

    sem_init(&mutex, 0, 1);
    sem_init(&rw_mutex, 0, 1);

    pthread_create(&r1, NULL, reader, NULL);
    pthread_create(&r2, NULL, reader, NULL);
    pthread_create(&w1, NULL, writer, NULL);
    pthread_create(&w2, NULL, writer, NULL);

    pthread_join(r1, NULL);
    pthread_join(r2, NULL);
    pthread_join(w1, NULL);
    pthread_join(w2, NULL);

    sem_destroy(&mutex);
    sem_destroy(&rw_mutex);

    printf("\nReader-Writer simulation completed.\n");
    return 0;
}
`
};
