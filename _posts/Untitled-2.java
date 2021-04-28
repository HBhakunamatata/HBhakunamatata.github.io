import java.io.InputStreamReader;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

public class Remain {
    public String read () throws IOException {
        List<String> result = new ArrayList<>();
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(
                System.in
            )
        );
        String s;
        while ( (s = reader.readLine()) != null ) {
            result.add(s);
        }
        String [] ss = new String[result.size()];
        return result.get(0);
        
    }

    public String beef (String s) {
    
        Set<Character> stringSet = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            stringSet.add(s.charAt(i));
        }
        StringBuilder sb = new StringBuilder();
        for (Character character : stringSet) {
            sb.append(character);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Remain remain = new Remain();
        System.out.println( remain.beef(remain.read()) );
    }
    
}