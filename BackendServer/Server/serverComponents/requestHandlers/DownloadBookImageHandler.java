package serverComponents.requestHandlers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class DownloadBookImageHandler implements HttpHandler {

	/*
	 * Example URL: http://localhost:8000/bookImage/download?OwnerID=val1&BookTitle=val2&No=1
	 * 
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		
		OutputStream out = null;
		InputStream in = null;
		BufferedInputStream bufIn = null;
		
		try{
			
			// Parse parameters
			Map<String, String> params = new HashMap<String, String>(){
				private static final long serialVersionUID = 1L;
				{
					put(Configuration.COL_POST_OWNER_ID, null);
					put(Configuration.COL_POST_BOOK_TITLE, null);
					put("No", null);
				}
			};
			Util.parseQuery(arg0.getRequestURI().getRawQuery(), params);
			
			// Read image file; Do response
			arg0.getResponseHeaders().add("Content-Type", "image/jpg");
			
			final String owner_id = params.get(Configuration.COL_POST_OWNER_ID);
			final String book_title = params.get(Configuration.COL_POST_BOOK_TITLE);
			final String book_No = params.get("No");
			final String fPath = Configuration.IMAGE_DIR + "/" + owner_id + "/" + owner_id + "-" + book_title + 
					"/" + owner_id + "-" + book_title + book_No + ".jpg";
            File imgFile = new File(fPath);
            if ( !imgFile.exists() ) {
            	throw new Exception("Cannot find image file: " + fPath);
            }
            byte[] imgInBytes  = new byte [(int)imgFile.length()];
            System.out.println(imgFile.getAbsolutePath());
            System.out.println("length:" + imgFile.length());
            FileInputStream fileIn = new FileInputStream(imgFile);
            bufIn = new BufferedInputStream(fileIn);
            bufIn.read(imgInBytes, 0, imgInBytes.length);
 
            arg0.sendResponseHeaders(200, imgFile.length());
            OutputStream outputStream = arg0.getResponseBody();
            outputStream.write(imgInBytes, 0, imgInBytes.length);
            outputStream.close();
			
		} catch(Exception e) {
			
			Util.doError(e, new StringBuilder(), arg0, "Failed to handle file download!");
			
		} finally {
			
			if ( out != null ) {
				out.close();
				out = null;
			}
			if ( in != null ) {
				in.close();
				in = null;
			}
			if ( bufIn != null ) {
				bufIn.close();
				bufIn = null;
			}
			
		}
		
	}

}
