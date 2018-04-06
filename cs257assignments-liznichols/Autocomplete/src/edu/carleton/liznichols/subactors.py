with open("actors.txt",'r') as source:
    with open("subactors.txt",'a') as dest:
        i = 0 
        for line in source:
            i +=1 
            if i%20 == 0:
                dest.write(line)
 