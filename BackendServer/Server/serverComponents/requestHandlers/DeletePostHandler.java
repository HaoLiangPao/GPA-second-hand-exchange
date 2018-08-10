package serverComponents.requestHandlers;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class DeletePostHandler implements HttpHandler{

	/*
	 * Example URL: http://localhost:8000/post/delete?OwnerID=val1&BookTitle=val2
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_POST_OWNER_ID, Configuration.COL_POST_BOOK_TITLE};
		Map<String, String> parameters = Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_DELETE_POST);
		// Delete image files
		if( parameters != null ) {
			final String ownerID = parameters.get(Configuration.COL_POST_OWNER_ID);
			final String bookTitle = parameters.get(Configuration.COL_POST_BOOK_TITLE);
			final String bookImgDirPath = Configuration.IMAGE_DIR + "/" + ownerID + "/" + ownerID + "-" + bookTitle;
			File bookImgDir = new File(bookImgDirPath);
			System.out.println(bookImgDirPath);
			if ( bookImgDir.exists() && bookImgDir.isDirectory() ) {
				System.out.println("Deleting image directory: " + bookImgDirPath);
				FileUtils.deleteDirectory(bookImgDir);
			}
		}
	}

}
