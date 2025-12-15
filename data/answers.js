export const answersData = {
    'set1': [
        {
            title: 'Q1: a) ifconfig, netstat',
            code: `// a) ifconfig, netstat

/*
1. ifconfig (Interface Configuration)
   - Function: Used to configure the kernel-resident network interfaces. It is used at boot time to set up interfaces as necessary. After that, it is usually only needed when debugging or when system tuning is needed.
   - Usage:
     $ ifconfig          // Displays all active interfaces
     $ ifconfig -a       // Displays all interfaces, including down ones
     $ ifconfig eth0     // View details of specific interface
     $ ifconfig eth0 up  // Enable an interface

2. netstat (Network Statistics)
   - Function: Prints information about the Linux networking subsystem.
   - Usage:
     $ netstat -a        // List all ports
     $ netstat -at       // List all TCP ports
     $ netstat -au       // List all UDP ports
     $ netstat -l        // List only listening ports
     $ netstat -s        // Display statistics for each protocol
     $ netstat -tp       // Display PID and program name
*/`
        },
        {
            title: 'Q2: b) SERVER - Connection Oriented Iterative',
            code: `// SERVER CODE
// Connection Oriented Iterative Server (TCP)
#include<stdio.h>
#include<unistd.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<string.h>
#include<stdlib.h>
#include<sys/types.h>
#include<arpa/inet.h>

int main(){
    int sockfd, newsockfd;
    socklen_t cilien;
    struct sockaddr_in server,client;
    char a[50];
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=htonl(INADDR_ANY);
    if(server.sin_addr.s_addr<0){
        printf("Error in IP address\\n");
        exit(1);
    }
    server.sin_port=htons(8082);
    if(bind(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in binding\\n");
        exit(1);
    }
    if(listen(sockfd,5)<0){
        printf("Error in listening\\n");
        exit(1);
    }
    cilien = sizeof(client);
    while(1){
        newsockfd=accept(sockfd,(struct sockaddr *)&client,&cilien);
        if(newsockfd<0){
            printf("Error in accepting\\n");
            exit(1);
        }
        memset(a,0,sizeof(a));
        read(newsockfd,a,50);
        printf("Server Recived: %s\\n",a);
        write(newsockfd,a,50);
        // printf("Message from client: %s\\n",a);
        if(strcmp(a,"exit")){
            printf("Server Exit...\\n");
            close(newsockfd);
            break;
        }
        close(newsockfd);
    }
    close(sockfd);

}`
        },
        {
            title: 'Q2: b) CLIENT - Connection Oriented Iterative',
            code: `// CLIENT CODE
// Connection Oriented Iterative Client (TCP)
#include<stdio.h>
#include<unistd.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<string.h>
#include<stdlib.h>
#include<sys/types.h>
#include<arpa/inet.h>


int main(){
    int sockfd;
    struct sockaddr_in server;
    char a[50],a1[50];
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    if(server.sin_addr.s_addr<0){
        printf("Error in IP address\\n");
        exit(1);
    }
    server.sin_port=htons(8082);
    if(connect(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in connection\\n");
        exit(1);
    }
    printf("enter a message: \\n");
    fgets(a,50,stdin);
    write(sockfd,a,50);
    memset(a1,0,sizeof(a1));
    read(sockfd,a1,50);
    printf("client received the msg: %s\\n",a1);
    if(!strcmp(a,"exit")){
        printf("Client Exit...\\n");
    }
    close(sockfd);




    return 0;
}`
        }
    ],

    'set2': [
        {
            title: 'Q1: tcpdump, nslookup',
            code: `// tcpdump, nslookup

/*
1. tcpdump
   - Function: A command-line packet analyzer. It prints the contents of network packets.
   - Usage:
     $ tcpdump -i eth0        // Capture packets on specific interface
     $ tcpdump -c 5           // Capture only 5 packets
     $ tcpdump -A             // Print captured packets in ASCII
     $ tcpdump port 80        // Capture traffic on a specific port
     $ tcpdump src 192.168.1.1 // Capture traffic from specific source

2. nslookup (Name Server Lookup)
   - Function: A tool for querying the Domain Name System (DNS) to obtain domain name or IP address mapping.
   - Usage:
     $ nslookup google.com    // Find IP of domain
     $ nslookup 8.8.8.8       // Reverse lookup (find domain of IP)
     $ nslookup -type=mx google.com // Query for MX records
*/`
        },
        {
            title: 'Q2: SERVER - Connection Less Iterative',
            code: `// SERVER CODE
// Connection Less Iterative Server (UDP)
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>
#include<sys/socket.h>
#include<sys/types.h>
#include<netinet/in.h>

int main(){
    int sockfd,newsockfd;
    socklen_t clilen;
    char a[50];
    struct sockaddr_in server,client;
    sockfd=socket(AF_INET,SOCK_DGRAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr = htonl(INADDR_ANY);
    server.sin_port=htons(8080);
    if(bind(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in binding\\n");
        exit(1);
    }
    clilen=sizeof(client);
    recvfrom(sockfd,a,50,0,(struct sockaddr *)&client,&clilen);
    printf("Message from client: %s\\n",a);
    sendto(sockfd,a,50,0,(struct sockaddr *)&client,clilen);
    
    close(sockfd);



}`
        },
        {
            title: 'Q2: CLIENT - Connection Less Iterative',
            code: `// CLIENT CODE
// Connection Less Iterative Client (UDP)
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>
#include<sys/socket.h>
#include<sys/types.h>
#include<netinet/in.h>
#include <arpa/inet.h>
int main(){
    int sockfd,n,servlen;
    socklen_t clilen;
    char a[50],a1[50];
    struct sockaddr_in server;
    sockfd=socket(AF_INET,SOCK_DGRAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");   
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=inet_addr("127.0.0.1");
    server.sin_port=htons(8080);

    printf("Enter String: ");
    fgets(a,50,stdin);
    if(sendto(sockfd,a,50,0,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in sending\\n");
        exit(1);
    }
    servlen=sizeof(server);
    n = recvfrom(sockfd,a1,50,0,(struct sockaddr *)&server,&servlen);

    if(n<0){
        printf("Error in receiving\\n");
        exit(1);
    }
    else{
        printf("Message from server: %s\\n",a1);
    }
    close(sockfd);






    return 0;

}`
        }
    ],

    'set3': [
        {
            title: 'Q1: traceroute, FTP',
            code: `// traceroute, FTP

/*
1. traceroute
   - Function: Diagnostic tool for displaying the route (path) and measuring transit delays of packets across an Internet Protocol (IP) network.
   - Usage:
     $ traceroute google.com  // Trace path to google.com
     $ traceroute -m 5 google.com // Set max hops to 5

2. FTP (File Transfer Protocol)
   - Function: Standard network protocol used for the transfer of computer files between a client and server on a computer network.
   - Usage:
     $ ftp 192.168.1.50       // Connect to FTP server
     > user username          // Enter username
     > pass password          // Enter password
     > ls                     // List files
     > get file.txt           // Download file
     > put file.txt           // Upload file
     > quit                   // Exit
*/`
        },
        {
            title: 'Q2: SERVER - Connection Oriented Concurrent',
            code: `// SERVER CODE
// Connection Oriented Concurrent Server (TCP)
#include<stdio.h>
#include<stdlib.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<string.h>
#include<unistd.h>
#include<sys/types.h>
#include<arpa/inet.h>

int main(){
    int sockfd,newsockfd,pid,n;
    socklen_t clilen;
    char a[50];
    struct sockaddr_in server,client;
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=htonl(INADDR_ANY);
    server.sin_port=htons(8080);
    if(bind(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in binding\\n");
        exit(1);
    }
    if(listen(sockfd,5)<0){
        printf("Error in listening\\n");
        exit(1);
    }
    while(1){
        clilen=sizeof(client);
        newsockfd=accept(sockfd,(struct sockaddr *)&client,&clilen);
        pid = fork();
        if(pid ==0){
            while(1){
                memset(a,0,sizeof(a));
                n= read(newsockfd,a,sizeof(a)-1);
                if(n<=0) break;
                a[n] = '\\0';
                printf("Instance: %d,\\n \\t Server Recived %s\\n",(int)getpid(),a);
                write(newsockfd,a,sizeof(a));
                if(strcmp(a,"exit")==0){
                    printf("Closing connection for instance: %d\\n",(int)getpid());
                    break;
                }
            }
            close(newsockfd);
            exit(0);
        }else{

            close(newsockfd);
        }
    }
}`
        },
        {
            title: 'Q2: CLIENT - Connection Oriented Concurrent',
            code: `// CLIENT CODE
// Connection Oriented Concurrent Client (TCP)
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<unistd.h>
#include<arpa/inet.h>


int main(){
    int sockfd,n;
    struct sockaddr_in server;
    char a[50],a1[50],*pos;
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=inet_addr("127.0.0.1");
    server.sin_port=htons(8080);
    if(connect(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in connection\\n");
        exit(1);
    }
    while(1){
        memset(a,0,sizeof(a));
        printf("Enter the msg: \\n");
        fgets(a,sizeof(a),stdin);
        if((pos=strchr(a,'\\n'))!=NULL)
            *pos='\\0';
        write(sockfd,a,sizeof(a));
        n= read(sockfd,a1,sizeof(a1));
        printf("Client Recived: %s\\n",a1);
        if(!strcmp(a,"exit")){
            printf("Closing connection\\n");
            close(sockfd);
            break;
        }
    }

    
}`
        }
    ],

    'set4': [
        {
            title: 'Q1: telnet, ping',
            code: `// telnet, ping

/*
1. telnet
   - Function: User interface to the TELNET protocol. Enables communication with another host using the TELNET protocol. (Not secure, data sent in clear text).
   - Usage:
     $ telnet 192.168.1.1     // Connect to host
     $ telnet google.com 80   // Connect to specific port (debugging)

2. ping (Packet Internet Groper)
   - Function: Used to test the reachability of a host on an Internet Protocol (IP) network and to measure the round-trip time. It uses ICMP.
   - Usage:
     $ ping google.com        // Ping a host
     $ ping -c 5 google.com   // Send 5 packets then stop
     $ ping -i 2 google.com   // Set interval between packets
*/`
        },
        {
            title: 'Q2: SERVER - Connection Less Concurrent',
            code: `// SERVER CODE
// Connection Less Concurrent Server (UDP)
#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>

int main()
{
    int sockfd, n, clilen, pid;
    struct sockaddr_in serv_addr, cli_addr;
    char a[50];

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0)
    {
        printf("socket failed\\n");
        exit(0);
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if (serv_addr.sin_addr.s_addr < 0)
    {
        printf("Invalid IP address: Unable to decode\\n");
        exit(0);
    }
    serv_addr.sin_port = htons(3100);

    if (bind(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)
    {
        printf("Bind failed\\n");
        exit(1);
    }

    clilen = sizeof(cli_addr);
    printf("Waiting for clients\\n");

    while (1)
    {
        memset(a, 0, sizeof(a));
        n = recvfrom(sockfd, a, 50, 0, (struct sockaddr *)&cli_addr, (socklen_t *)&clilen);
        if (n > 0)
        {
            pid = fork();
            if (pid == 0)
            {
                printf("Instance : %d \\n\\tServer Recieved: %s\\n", (int)getpid(), a);
                if (sendto(sockfd, a, 50, 0, (struct sockaddr *)&cli_addr, (socklen_t)clilen) < 0)
                {
                    printf("UDP sending failed\\nExiting... \\n");
                    close(sockfd);
                    exit(1);
                }
                close(sockfd);
                break;
            }
        }
        else
        {
            printf("UDP receiving failed\\nExiting... \\n");
            close(sockfd);
            exit(1);
        }
    }
    return 0;
}`
        },
        {
            title: 'Q2: CLIENT - Connection Less Concurrent',
            code: `// CLIENT CODE
// Connection Less Concurrent Client (UDP)
#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>

int main()
{
    int sockfd, servlen;
    struct sockaddr_in serv_addr;
    char a[50], a1[50], *pos;

    servlen = sizeof(serv_addr);
    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0)
    {
        printf("socket failed\\n");
        exit(0);
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    serv_addr.sin_port = htons(3100);

    memset(a, 0, sizeof(a));
    printf("Enter the msg :\\n");
    fgets(a, sizeof(a), stdin);

    if ((pos = strchr(a, '\\n')) != NULL)
        *pos = '\\0';

    if (sendto(sockfd, a, 50, 0, (struct sockaddr *)&serv_addr, (socklen_t)servlen) < 0)
    {
        printf("UDP client : Message sending failed\\nExiting...");
        close(sockfd);
        exit(1);
    }

    if (recvfrom(sockfd, a1, 50, 0, (struct sockaddr *)&serv_addr, (socklen_t *)&servlen) < 0)
    {
        printf("UDP client : Message receiveing failed\\nExiting...");
        close(sockfd);
        exit(1);
    }

    printf("Client Received the msg: %s\\n", a1);
    close(sockfd);
    return 0;
}`
        }
    ],

    'set5': [
        {
            title: 'Q1: ifconfig, netstat',
            code: `// ifconfig, netstat

/*
1. ifconfig (Interface Configuration)
   - Function: Used to configure network interfaces.
   - Usage:
     $ ifconfig          // Show active interfaces
     $ ifconfig -a       // Show all interfaces
     $ ifconfig eth0     // Show specific interface

2. netstat (Network Statistics)
   - Function: Network statistics (connections, routing tables, etc).
   - Usage:
     $ netstat -a        // All sockets
     $ netstat -t        // TCP sockets
     $ netstat -u        // UDP sockets
     $ netstat -l        // Listening sockets
*/`
        },
        {
            title: 'Q2: SERVER - Date Time',
            code: `// SERVER CODE
// Date Time Server
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<unistd.h>
#include<arpa/inet.h>
#include<time.h>

int main(){
    int sockfd,newsockfd;
    socklen_t clilen;
    struct sockaddr_in server,client;
    char buffer[80];
    time_t now;
    struct tm *present;
    sockfd=socket(AF_INET,SOCK_STREAM,0);   
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=htonl(INADDR_ANY);
    server.sin_port=htons(8080);
    if(bind(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in binding\\n");
        exit(1);
    }
    if(listen(sockfd,5)<0){
        printf("Error in listening\\n");
        exit(1);
    }
    while(1){
        clilen=sizeof(client);
        printf("Waiting for Clients: \\n");
        newsockfd=accept(sockfd,(struct sockaddr *)&client,&clilen);
        // memset(buffer,0,sizeof(buffer));
        // read(newsockfd,buffer,80);
        time(&now);
        present=localtime(&now);
        sprintf(buffer,"Time: %d-%d-%d %d:%d:%d\\n",present->tm_year+1900,present->tm_mon+1,present->tm_mday,present->tm_hour,present->tm_min,present->tm_sec);
        write(newsockfd,buffer,sizeof(buffer));
        close(newsockfd);
    }
}`
        },
        {
            title: 'Q2: CLIENT - Date Time',
            code: `// CLIENT CODE
// Date Time Client
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<unistd.h>
#include<arpa/inet.h>
#include<time.h>


int main(){
    int sockfd,n;
    struct sockaddr_in server;
    char a1[50];
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");

        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=inet_addr("127.0.0.1");
    server.sin_port=htons(8080);
    if(connect(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in connection\\n");
        exit(1);
    
    }
    // memset(a,0,sizeof(a));
    // write(sockfd,a,sizeof(a));
    n = read(sockfd,a1,sizeof(a1)-1);
    a1[n] = '\\0';
    printf("Client Recived: %s\\n",a1);
    close(sockfd);
}`
        }
    ],

    'set6': [
        {
            title: 'Q1: tcpdump, nslookup',
            code: `// tcpdump, nslookup

/*
1. tcpdump
   - Function: Packet analyzer.
   - Usage:
     $ tcpdump -i eth0
     $ tcpdump port 80

2. nslookup
   - Function: Query DNS.
   - Usage:
     $ nslookup example.com
     $ nslookup -type=ns example.com
*/`
        },
        {
            title: 'Q2: CPT - End Systems Communication',
            code: `// Using CPT to connect to end systems and establish communication between them.


/*
Steps to Connect End Systems and Establish Communication:

1.  **Add Devices:**
    *   Open Cisco Packet Tracer.
    *   Drag two "End Devices" (e.g., PC-PT, Laptop-PT) into the workspace.
    *   Drag a "Network Device" like a generic "Switch" (e.g., 2960).

2.  **Connect Devices:**
    *   Select the "Connections" (lightning bolt) tab.
    *   Choose use a **Copper Straight-Through** cable (solid black line).
    *   Connect PC0 (FastEthernet0) to the Switch (FastEthernet0/1).
    *   Connect PC1 (FastEthernet0) to the Switch (FastEthernet0/2).

3.  **Configure IP Addresses:**
    *   Click on **PC0** -> **Desktop** tab -> **IP Configuration**.
    *   Set **IP Address**: 192.168.1.1
    *   Set **Subnet Mask**: 255.255.255.0
    *   Click on **PC1** -> **Desktop** tab -> **IP Configuration**.
    *   Set **IP Address**: 192.168.1.2
    *   Set **Subnet Mask**: 255.255.255.0

4.  **Verify Connectivity:**
    *   Click on **PC0** -> **Desktop** tab -> **Command Prompt**.
    *   Type: \`ping 192.168.1.2\`
    *   You should see "Reply from 192.168.1.2..." indicating successful communication.
*/`
        }
    ],

    'set7': [
        {
            title: 'Q1: Traceroute, FTP',
            code: `// Traceroute, FTP

/*
1. traceroute
   - Function: Trace route to host.
   - Usage:
     $ traceroute 8.8.8.8

2. FTP
   - Function: Transfer files.
   - Usage:
     $ ftp host_address
     > get filename
     > put filename
     > bye
*/`
        },
        {
            title: 'Q2: CPT - Router Configuration',
            code: `// Using CPT to configure router to establish connection between two different networks.


/*
Steps to Configure Router for Two Different Networks:

1.  **Setup Topology:**
    *   Place 1 Router (e.g., 1841 or 1941) and 2 Switches (e.g., 2960).
    *   Place 2 PCs (PC0, PC1) connected to Switch0.
    *   Place 2 PCs (PC2, PC3) connected to Switch1.
    *   Connect Switch0 to Router GigabitEthernet0/0.
    *   Connect Switch1 to Router GigabitEthernet0/1.

2.  **Assign IP Addresses: (Network 1: 192.168.1.0/24)**
    *   **PC0:** IP: 192.168.1.2, Mask: 255.255.255.0, **Gateway: 192.168.1.1**
    *   **PC1:** IP: 192.168.1.3, Mask: 255.255.255.0, **Gateway: 192.168.1.1**

3.  **Assign IP Addresses: (Network 2: 192.168.2.0/24)**
    *   **PC2:** IP: 192.168.2.2, Mask: 255.255.255.0, **Gateway: 192.168.2.1**
    *   **PC3:** IP: 192.168.2.3, Mask: 255.255.255.0, **Gateway: 192.168.2.1**

4.  **Configure Router Interfaces:**
    *   Click Router -> **CLI** tab -> \`No\` to initial dialog.
    *   **Configure Interface 0/0 (Gateway for Network 1):**
        \`Router> enable\`
        \`Router# configure terminal\`
        \`Router(config)# interface gigabitEthernet 0/0\`
        \`Router(config-if)# ip address 192.168.1.1 255.255.255.0\`
        \`Router(config-if)# no shutdown\`
        \`Router(config-if)# exit\`

    *   **Configure Interface 0/1 (Gateway for Network 2):**
        \`Router(config)# interface gigabitEthernet 0/1\`
        \`Router(config-if)# ip address 192.168.2.1 255.255.255.0\`
        \`Router(config-if)# no shutdown\`
        \`Router(config-if)# end\`

5.  **Verify Communication:**
    *   From **PC0** (Network 1), open **Command Prompt**.
    *   Ping PC2 (Network 2): \`ping 192.168.2.2\`
    *   First request may timeout (ARP), subsequent replies signify success.
*/`
        }
    ],

    'set8': [
        {
            title: 'Q1: telnet, ping',
            code: `// telnet, ping

/*
1. telnet
   - Function: Remote login (unencrypted).
   - Usage:
     $ telnet host

2. ping
   - Function: Check connectivity.
   - Usage:
     $ ping host
*/`
        },
        {
            title: 'Q2: Capturing Traffic using Wireshark',
            code: `// CAPTURING THE TRAFFIC using Wireshark


/*
Steps to Capture Traffic using Wireshark:

1.  **Launch Wireshark:**
    *   Open the Wireshark application on your system.

2.  **Select Interface:**
    *   On the welcome screen, identify the active network interface (e.g., Wi-Fi or Ethernet). It will usually show a small graph of activity.
    *   Double-click the interface name to start capturing immediately.

3.  **Filter (Optional but Recommended):**
    *   To see specific traffic (like ICMP for ping), type \`icmp\` in the filter bar at the top and press Enter.

4.  **Generate Traffic:**
    *   Open a Command Prompt or Terminal.
    *   Run a command like \`ping google.com\`.

5.  **Analyze Packets:**
    *   Look at the Wireshark window. You should see "Echo (ping) request" and "Echo (ping) reply" packets.
    *   **Source:** The IP sending the packet.
    *   **Destination:** The IP receiving the packet.
    *   **Protocol:** ICMP (for ping).
    *   **Info:** Details about the packet (e.g., sequence number).

6.  **Stop Capture:**
    *   Click the red square "Stop" button in the top toolbar when finished.
*/`
        }
    ],

    'set9': [
        {
            title: 'Q1: SERVER - Date Time',
            code: `// SERVER CODE
// Date Time Server
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<unistd.h>
#include<arpa/inet.h>
#include<time.h>

int main(){
    int sockfd,newsockfd;
    socklen_t clilen;
    struct sockaddr_in server,client;
    char buffer[80];
    time_t now;
    struct tm *present;
    sockfd=socket(AF_INET,SOCK_STREAM,0);   
    if(sockfd<0){
        printf("Error in socket creation\\n");
        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=htonl(INADDR_ANY);
    server.sin_port=htons(8080);
    if(bind(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in binding\\n");
        exit(1);
    }
    if(listen(sockfd,5)<0){
        printf("Error in listening\\n");
        exit(1);
    }
    while(1){
        clilen=sizeof(client);
        printf("Waiting for Clients: \\n");
        newsockfd=accept(sockfd,(struct sockaddr *)&client,&clilen);
        // memset(buffer,0,sizeof(buffer));
        // read(newsockfd,buffer,80);
        time(&now);
        present=localtime(&now);
        sprintf(buffer,"Time: %d-%d-%d %d:%d:%d\\n",present->tm_year+1900,present->tm_mon+1,present->tm_mday,present->tm_hour,present->tm_min,present->tm_sec);
        write(newsockfd,buffer,sizeof(buffer));
        close(newsockfd);
    }
}`
        },
        {
            title: 'Q1: CLIENT - Date Time',
            code: `// CLIENT CODE
// Date Time Client
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<unistd.h>
#include<arpa/inet.h>
#include<time.h>


int main(){
    int sockfd,n;
    struct sockaddr_in server;
    char a1[50];
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0){
        printf("Error in socket creation\\n");

        exit(1);
    }
    server.sin_family=AF_INET;
    server.sin_addr.s_addr=inet_addr("127.0.0.1");
    server.sin_port=htons(8080);
    if(connect(sockfd,(struct sockaddr *)&server,sizeof(server))<0){
        printf("Error in connection\\n");
        exit(1);
    
    }
    // memset(a,0,sizeof(a));
    // write(sockfd,a,sizeof(a));
    n = read(sockfd,a1,sizeof(a1)-1);
    a1[n] = '\\0';
    printf("Client Recived: %s\\n",a1);
    close(sockfd);
}`
        },
        {
            title: 'Q2: Capturing Traffic using Wireshark',
            code: `// CAPTURING THE TRAFFIC using Wireshark


/*
Steps to Capture Traffic (e.g., for TCP/HTTP or Port 8080):

1.  **Start Date/Time Server:**
    *   Run your C server program first (listening on port 8080).

2.  **Start Wireshark:**
    *   Open Wireshark and select your loopback interface (Adapter for loopback traffic capture) if running locally, or your main interface.
    *   In the filter bar, type: \`tcp.port == 8080\` and press Enter. This ensures you only see traffic for your server.

3.  **Start Capture:**
    *   Double-click the interface to begin capturing.

4.  **Run Client:**
    *   Execute your client program to connect to the server.

5.  **Observe Traffic:**
    *   You should see:
        *   **[SYN], [SYN, ACK], [ACK]:** The 3-way handshake establishing connection.
        *   **[PSH, ACK]:** Data transfer packets (containing the time string).
        *   **[FIN, ACK]:** Connection termination steps.

6.  **Stop Capture:**
    *   Click the red square "Stop" button.
*/`
        }
    ],

    'set10': [
        {
            title: 'Q1: Program to implement DNS',
            code: `// Program to implement DNS
#include<stdio.h>
#include<netdb.h>
#include<arpa/inet.h>
#include<netinet/in.h>
#include<stdlib.h>

int main(int argc, char** argv)
{
    struct hostent *host;
    struct in_addr h_addr;

    if (argc != 2)
    {
        fprintf(stderr, "USAGE: nslookup <hostname>\\n");
        exit(1); // Exit the program if the usage is incorrect
    }

    if ((host = gethostbyname(argv[1])) == NULL)
    {
        fprintf(stderr, "(mini)nslookup failed on %s\\n", argv[1]);
        exit(1); // Exit the program if the lookup fails
    }

    h_addr.s_addr = *((unsigned long*)host->h_addr_list[0]);
    printf("\\nIP ADDRESS = %s\\n", inet_ntoa(h_addr));
    printf("HOST NAME = %s\\n", host->h_name);
    printf("ADDRESS LENGTH = %d\\n", host->h_length);
    printf("ADDRESS TYPE = %d\\n", host->h_addrtype);
    return 0;
}`
        },
        {
            title: 'Q2: Filtering Traffic using Wireshark',
            code: `// FILTERING TRAFFIC using Wireshark.


/*
Wireshark Filtering Commands & Usage:

1.  **Protocol Filters:**
    *   \`http\`: Displays only HTTP traffic.
    *   \`tcp\`: Displays only TCP traffic.
    *   \`udp\`: Displays only UDP traffic.
    *   \`dns\`: Displays only DNS queries and responses.
    *   \`icmp\`: Displays only ICMP (ping) traffic.

2.  **IP Address Filters:**
    *   \`ip.addr == 192.168.1.5\`: Shows traffic where source OR destination is this IP.
    *   \`ip.src == 192.168.1.5\`: Shows traffic originating FROM this IP.
    *   \`ip.dst == 192.168.1.5\`: Shows traffic sent TO this IP.

3.  **Port Filters:**
    *   \`tcp.port == 80\`: Shows TCP traffic on port 80.
    *   \`udp.port == 53\`: Shows UDP traffic on port 53 (DNS).

4.  **Logical Operators:**
    *   \`and\` (or \` && \`): both conditions true. (e.g., \`http and ip.src == 192.168.1.5\`)
    *   \`or\` (or \` || \`): either condition true.
    *   \`not\` (or \`!\`): excludes condition. (e.g., \`not arp\`)

5.  **How to Apply:**
    *   Type the command into the "Apply a display filter" bar at the top.
    *   If the bar turns **Green**, the syntax is correct.
    *   Press Enter to apply.
*/`
        }
    ],

    'set11': [
        {
            title: 'Q1: Wireshark Statistics',
            code: `// WIRESHARK STATISTICS.


/*
Overview of Wireshark Statistics Tools:

1.  **Capture File Properties:**
    *   Location: \`Statistics\` -> \`Capture File Properties\`.
    *   Details: Shows general info like file name, size, hash, first/last packet time, and hardware interface used.

2.  **Protocol Hierarchy:**
    *   Location: \`Statistics\` -> \`Protocol Hierarchy\`.
    *   Details: Tree view showing distribution of protocols (e.g., what % of traffic is TCP vs UDP). Helps identify top talkers or unusual protocol activity.

3.  **Conversations:**
    *   Location: \`Statistics\` -> \`Conversations\`.
    *   Details: Lists traffic between two specific endpoints (IP A <-> IP B). Shows packet counts, byte counts, and duration for each conversation session.

4.  **Endpoints:**
    *   Location: \`Statistics\` -> \`Endpoints\`.
    *   Details: Lists all unique devices (IP addresses or MAC addresses) found in the capture and their transmit/receive statistics.

5.  **I/O Graphs:**
    *   Location: \`Statistics\` -> \`I / O Graphs\`.
    *   Details: Visualizes traffic over time. You can plot number of packets/bytes per second to see spikes or drops in network activity.

6.  **Flow Graph:**
    *   Location: \`Statistics\` -> \`Flow Graph\`.
    *   Details: Visualizes the flow of packets between hosts (like a time-sequence diagram), useful for understanding TCP handshakes.
*/`
        },
        {
            title: 'Q2: Select Socket System Call',
            code: `// Program to implement select socket system call.
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/select.h>
#include <sys/time.h>
#include <fcntl.h>

int main() {

    int fd1, fd2, nfds;
    fd_set readfds;
    struct timeval timeout;

    fd1 = open("file1.txt", O_RDONLY);
    if (fd1 < 0) {
        perror("open file1");
        exit(EXIT_FAILURE);
    }

    fd2 = open("file2.txt", O_RDONLY);
    if (fd2 < 0) {
        perror("open file2");
        close(fd1);
        exit(EXIT_FAILURE);
    }

    FD_ZERO(&readfds);
    FD_SET(fd1, &readfds);
    FD_SET(fd2, &readfds);

    nfds = (fd1 > fd2 ? fd1 : fd2) + 1;

    timeout.tv_sec = 5;
    timeout.tv_usec = 0;

    int ret = select(nfds, &readfds, NULL, NULL, &timeout);

    if (ret == -1) {
        perror("select");
        close(fd1);
        close(fd2);
        exit(EXIT_FAILURE);
    } else if (ret == 0) {
        printf("Timeout occurred! No file descriptor is ready.\\n");
    } else {
        if (FD_ISSET(fd1, &readfds)) {
            printf("File descriptor %d is ready to read.\\n", fd1);
        }
        if (FD_ISSET(fd2, &readfds)) {
            printf("File descriptor %d is ready to read.\\n", fd2);
        }
    }

    close(fd1);
    close(fd2);

    return 0;
}`
        }
    ]
};
