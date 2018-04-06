/**
 * Actor.java
 * Liz Nichols, 05 April 2018
 * Chiraag Gohel, 05 April 2018
 *
 * Defines Actor class to be used by Autocompleter.java
 *
 */
package edu.carleton.liznichols;

public class Actor implements Comparable<Actor>{

    private String name;
    private String compareString;
    private int matchType;
    private int matchIndex;

    /**
     * Constructs an Actor object with name
     *
     * @param name a string representing the actor's name as it is listed in actors.txt
     */
    public Actor(String name, String compareString, int matchType, int matchIndex ){
        this.name = name;
        this.compareString = compareString;
        this.matchType = matchType;
        this.matchIndex = matchIndex;
    }

    /**
     * @return Returns name of Actor
     */
    public String getName(){
        return name;
    }

    /**
     * @return compareString which is name of actor without spaces and in all lowercase
     */
    public String getCompareString(){
        return compareString;
    }

    /**
     * @return matchType - beginning of last name,
     * beginning of first name, middle of last name, middle of first name,
     * or across comma
     */
    public int getMatchType(){
        return matchType;
    }

    /**
     * @return matchIndex - return first index at which match occurs
     */
    public int getMatchIndex(){
        return matchIndex;
    }

    public int compareTo(Actor otherActor){

        if (matchType == otherActor.getMatchType())
        {
            System.out.println("species is the same");
            System.out.println("name" + name);
            System.out.println("other name" + otherActor.getName());

            if (matchIndex == otherActor.getMatchIndex())
            {
                if (this.getCompareString() == otherActor.getCompareString())
                {
                    return 0;
                }
                else {
                    String noComma = this.getCompareString().replace(",", "");
                    String otherActorNoComma = otherActor.getCompareString().replace(",", "");
                    return noComma.compareTo(otherActorNoComma);
                }
            }
            else
            {
                return matchIndex - otherActor.getMatchIndex();
            }
        }
        else
        {
            return matchType - otherActor.getMatchType();
        }
    }

    public boolean equals(Actor otherActor)
    {
        if (this.compareTo(otherActor) == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


}
