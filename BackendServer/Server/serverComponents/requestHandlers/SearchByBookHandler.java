package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchByBookHandler extends SearchHandler {
	
	/*
	 * Example URL: http://localhost:8000?/search/detail?OwnerID=val1&BookTitle=val2
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_OWNER_ID, Configuration.COL_POST_BOOK_TITLE};
		this.qry_template = Configuration.QRY_GET_POST_BY_PRIMARY_KEY;
		super.handle(arg0);
	}
}
