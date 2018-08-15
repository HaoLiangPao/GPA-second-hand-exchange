package serverComponents.requestHandlers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class UploadBookImageHandler implements HttpHandler {
	
	/*
	 * Example URL: http://localhost:8000/bookImage/upload?OwnerID=val1&BookTitle=val2
	 * 
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// TODO: Check if there already exists a record for this book in database
		
		
		OutputStream out = null;
		InputStream in = null;
		BufferedInputStream bufIn = null;
		
		try{
			
			/*
			 *  Parse parameters
			 */
			
			Map<String, String> params = new HashMap<String, String>(){
				private static final long serialVersionUID = 1L;
				{
					put(Configuration.COL_POST_OWNER_ID, null);
					put(Configuration.COL_POST_BOOK_TITLE, null);
				}
			};
			Util.parseQuery(arg0.getRequestURI().getRawQuery(), params);
			
			/* 
			 * Build file name; Read the image content from client; Save image in the file
			 */
			
			final String owner_id = params.get(Configuration.COL_POST_OWNER_ID);
			final String book_title = params.get(Configuration.COL_POST_BOOK_TITLE);
			final String usrDirPath = Configuration.IMAGE_DIR + "/" + owner_id;
			final String bookImgDirPath = usrDirPath + "/" + owner_id + "-" + book_title;
			
			// Check if the directories exists, if not then create them
			File usrDir = new File(usrDirPath);
			if( !usrDir.exists() ) {
				usrDir.mkdir();
			} else {
				if ( !usrDir.isDirectory() ) {
					throw new Exception("User directory path " + usrDir + " is already took by a regular file.");
				}
			}
			File bookImgDir = new File(bookImgDirPath);
			if( !bookImgDir.exists() ) {
				bookImgDir.mkdir();
			} else {
				if ( !bookImgDir.isDirectory() ) {
					throw new Exception("Book image directory path " + bookImgDir + " is already took by a regular file.");
				}
			}
			
			// Parse the client's form data and get the images
			ServletFileUpload fileUploadSolver = new ServletFileUpload(new DiskFileItemFactory());
			List<FileItem> imgList = fileUploadSolver.parseRequest(new HttpHandlerRequestContext(arg0));
			
			// Store the images on our host file system
			int numOfFiles = bookImgDir.list().length;
			int idx = numOfFiles + 1;
			for ( FileItem img : imgList ) {
				System.out.println(img.getFieldName() + " - " + img.getName());
				final String fPath = bookImgDirPath + "/" + owner_id + "-" + book_title + idx + ".jpg";
	            File imgFile = new File(fPath);
	            out = new FileOutputStream(imgFile, false); // false indicates that the old content will be replaced if the file already exists
				in = img.getInputStream();
				bufIn = new BufferedInputStream(in);
	            int length = 0;
	            byte[] buf = new byte[1024];
	            while ( (length = bufIn.read(buf, 0, 1024)) != -1 ) {
	                out.write(buf, 0, length);
	            }
	            out.close();
	            out = null;
	            in.close();
	            in = null;
	            bufIn.close();
	            bufIn = null;
	            idx++;
			}
            
            /*
             *  Build response JSON message containing image URL; Send response
             */
            
            StringBuilder response = new StringBuilder();
			JsonArray json_arr;
			JsonArrayBuilder json_arr_builder = Json.createArrayBuilder();
			JsonObjectBuilder json_builder = Json.createObjectBuilder();
			for ( int i = numOfFiles + 1; i < idx; i++ ) {
				json_builder.add(Configuration.COL_POST_BOOK_PHOTO_URL, "http://" + Configuration.DOMAIN_NAME + Configuration.IMAGE_DOWNLOAD_ROUTE +
						"?" + Configuration.COL_POST_OWNER_ID + "=" + owner_id + "&" + Configuration.COL_POST_BOOK_TITLE + "=" + book_title + "&" +
						"No=" + i);
				json_arr_builder.add(json_builder);
			}
			json_arr = json_arr_builder.build();
			response.append(json_arr);
			Util.doSuccessResponse(response, arg0);
			
		} catch (Exception e){
			
			Util.doError(e, new StringBuilder(), arg0, "Failed to handle file upload!");
			
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
