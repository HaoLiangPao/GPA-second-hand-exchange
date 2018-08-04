package serverComponents.requestHandlers;

import java.io.IOException;

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
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_DELETE_POST);
	}

}
