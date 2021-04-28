import java.io.InputStreamReader;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

class StringJudge {
    public String [] read () throws IOException {
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
        return result.toArray(ss);
        
    }


    public boolean judge(String s) {
        if (s == null || s.length() == 0) {
            return true;
        }
        if (s.length() == 1) {
            return false;
        }

        Stack <Character> stack = new Stack<>();
        
        for (int i = 0; i < s.length(); i++) {
            char c;
            switch ( c = s.charAt(i) ) {
                case '(':
                case '[':
                case '{':
                    stack.push(c); break;
                default :
                    if (c == stack.pop())
                        return false;
            }
        }
        return stack.isEmpty();
        
    }


    public static void main(String[] args) {
        StringJudge sJudge = new StringJudge();
        try {
            String [] ss = sJudge.read();
            for (String s : ss) {
                System.out.println(sJudge.judge(s));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        
    }
}