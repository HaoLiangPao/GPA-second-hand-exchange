package wechat;
import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class search {
	
//s[0]=name;s[1]=crn;s[2]=status;
	
	
//模糊查询
	public List mohusearch(String name,List<String> list){
		  List results = new ArrayList();
		  Pattern pattern = Pattern.compile(name,Pattern.CASE_INSENSITIVE);
		  for(int i=0; i < list.size(); i++){
			 
		   Matcher matcher = pattern.matcher(list.get(i));//not sure
		   if(matcher.find()){
		     results.add(list.get(i));
		   }
		  }
		  return results;
		}
	
	
	private List<String> findbyname(String Sname)//通过书名字查询information。
    {
	 List<String> list=new ArrayList<String>();
	 List<String> result=new ArrayList<String>();
	 List<String> mohulist=new ArrayList<String>();
     try
      {
         
        FileReader file = new FileReader("workspace.txt");
        
        BufferedReader brea = new BufferedReader(file);
        
        String str = brea.readLine();
        while(str!=null)
        {
            String[] strs = str.split(",");//假设书名和别的信息用逗号隔开
           /* if(strs[0].equals(Sname))
            {
                result = "crn: "+strs[1]+" status:  "+strs[2];//TODO:此处应返回搜索后想得到的信息。
                break;
            }
            */
           list.add(strs[0]);
           str = brea.readLine();
        }
        mohulist=mohusearch(Sname,list);
        
        FileReader file2 = new FileReader("workspace.txt");
        
        BufferedReader brea2 = new BufferedReader(file2);
        
        String str2 = brea2.readLine();
        
        while(str2!=null)
        {
            String[] strs2 = str.split(",");//假设书名和别的信息用逗号隔开
            for(int i=0;i<mohulist.size();i++){
            if(strs2[0].equals(mohulist.get(i)))
            {
                result.add(strs2[1]);//TODO:此处应返回搜索后想得到的信息。
                result.add(strs2[2]);
            }
            }
          
           str = brea.readLine();
        }
        
        
        file.close();
        }catch(Exception ex)
        {
            System.out.println("未找到");
        }
        return result;
    }

        
    
    //通过crn找information
    private String findbycrn(String Snum)
    {
        String result = "";
        try
        {
            FileReader file = new FileReader("workspace.txt");
            BufferedReader bre = new BufferedReader(file);
            String str = bre.readLine();
            while(str!=null)
            {
                String[] tmp = str.split(",");
                if(tmp[1].equals(Snum))
                {
                    result = tmp[0]+tmp[2];
                }
                str = bre.readLine();
            }
            file.close();
        }
        catch(Exception ex)
        {
            System.out.println("");
        }
        return result;
    }
    
    
	
	
}
